'use server';

import { prisma } from '@/lib/prisma';
import { generateRegistrationRef, generateVerificationToken } from '@/lib/refGenerator';
import { fullRegistrationSchema, FullRegistrationInput } from '@/lib/validators';
import { logAudit } from '@/lib/auditLogger';
import { generateLetterOfRecognitionPdf } from '@/lib/documentGenerator';
import { sendRegistrationDocumentsEmail } from '@/lib/emailService';
import { syncForumToGoogleDrive } from '@/lib/googleDriveSync';
import fs from 'fs';
import path from 'path';

export interface RegistrationResult {
  success: boolean;
  registrationRef?: string;
  forumId?: string;
  letterDocId?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitForumRegistration(
  data: FullRegistrationInput
): Promise<RegistrationResult> {
  try {
    // 1. Validate payload with Zod
    const validation = fullRegistrationSchema.safeParse(data);
    if (!validation.success) {
      const fieldErrors: Record<string, string[]> = {};
      validation.error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!fieldErrors[path]) fieldErrors[path] = [];
        fieldErrors[path].push(err.message);
      });
      return {
        success: false,
        error: 'Validation failed. Please review the highlighted fields in the form.',
        fieldErrors,
      };
    }

    const validData = validation.data;

    // 2. Duplicate detection check
    const existing = await prisma.forum.findFirst({
      where: {
        OR: [
          { name: { equals: validData.name.trim() } },
          { coordinatorPhone: validData.coordinatorPhone.trim() },
        ],
      },
    });

    if (existing) {
      if (existing.name.toLowerCase() === validData.name.trim().toLowerCase()) {
        return {
          success: false,
          error: `A forum with the name "${validData.name}" has already been registered. If you are the coordinator, you can check your registration status on the portal.`,
        };
      }
      if (existing.coordinatorPhone === validData.coordinatorPhone.trim()) {
        return {
          success: false,
          error: `The coordinator phone number (${validData.coordinatorPhone}) is already associated with an existing forum registration (${existing.name}).`,
        };
      }
    }

    // 3. Find or Auto-seed Kwara state reference
    let state = await prisma.state.findFirst({ where: { code: 'KW' } });
    if (!state) {
      // Auto-heal reference record if unseeded
      let zone = await prisma.geopoliticalZone.findFirst({ where: { code: 'NC' } });
      if (!zone) {
        let country = await prisma.country.findFirst({ where: { id: 'NGA' } });
        if (!country) {
          country = await prisma.country.create({ data: { id: 'NGA', name: 'Nigeria', isActive: true } });
        }
        zone = await prisma.geopoliticalZone.create({
          data: { name: 'North Central', code: 'NC', countryId: country.id },
        });
      }
      state = await prisma.state.create({
        data: { name: 'Kwara', code: 'KW', zoneId: zone.id, isActive: true },
      });
    }

    const primaryLgaId = validData.lgaId || (validData.selectedLgaIds && validData.selectedLgaIds[0]) || 1;
    let lga = await prisma.lga.findUnique({
      where: { id: primaryLgaId },
      include: { senatorialDistrict: true },
    });

    if (!lga) {
      // Fallback find any LGA in state or create default
      lga = await prisma.lga.findFirst({ where: { stateId: state.id }, include: { senatorialDistrict: true } });
      if (!lga) {
        lga = await prisma.lga.create({
          data: { name: 'Ilorin South', code: 'KW-ILS', stateId: state.id, isActive: true },
          include: { senatorialDistrict: true },
        });
      }
    }

    // 4. Generate unique registration reference
    const registrationRef = generateRegistrationRef('KW', 2026);

    // Format Ward string
    let formattedWard = validData.wardName?.trim() || '';
    if (validData.isAllWards) {
      formattedWard = 'All Wards';
    }

    const now = new Date();

    // 5. Create Forum record - IMMEDIATELY APPROVED
    const forum = await prisma.$transaction(async (tx) => {
      const createdForum = await tx.forum.create({
        data: {
          registrationRef,
          name: validData.name.trim(),
          motto: validData.motto?.trim() || null,
          yearEstablished: validData.yearEstablished,
          areaOfCoverage: validData.areaOfCoverage,
          stateId: state.id,
          senatorialDistrictId: lga?.senatorialDistrictId || null,
          lgaId: lga?.id || primaryLgaId,
          wardId: validData.wardId || null,
          wardName: formattedWard || null,
          officeAddress: validData.officeAddress.trim(),

          // Leadership
          coordinatorName: validData.coordinatorName.trim(),
          coordinatorPhone: validData.coordinatorPhone.trim(),
          coordinatorPassportUrl: validData.coordinatorPassportUrl || null,
          secretaryName: validData.secretaryName.trim(),
          secretaryPhone: validData.secretaryPhone.trim(),
          forumEmail: validData.forumEmail?.trim() || null,
          socialMediaHandles: validData.socialMediaHandles?.trim() || null,

          // Structure & Capacity
          totalStrength: validData.totalStrength,
          keyActivities: JSON.stringify(validData.keyActivities),
          otherActivity: validData.otherActivity?.trim() || null,
          hasWhatsappGroup: validData.hasWhatsappGroup,
          whatsappGroupLink: validData.whatsappGroupLink?.trim() || null,
          additionalCapacityInfo: validData.strengthRange ? `Declared Range: ${validData.strengthRange}` : null,

          // Political Track Record
          previousElectionActivity: validData.previousElectionActivity,
          rolePlayedLastElection: validData.rolePlayedLastElection?.trim() || null,
          leaderSponsorAlignment: validData.leaderSponsorAlignment?.trim() || null,

          // Commitment & Declaration
          commitWork2027: validData.commitWork2027,
          agreeWithCongress: validData.agreeWithCongress,
          declarationConfirmed: validData.declarationConfirmed,
          consentDataProcessing: validData.consentDataProcessing,

          // Resources & Support
          supportNeeded: JSON.stringify(validData.supportNeeded),
          willingAttendMeetings: validData.willingAttendMeetings,

          // Documents
          resolutionLetterUrl: validData.resolutionLetterUrl || null,
          supportingDocumentUrl: validData.supportingDocumentUrl || null,

          // Instant Approval State
          status: 'approved_verified',
          submittedAt: now,
          approvedAt: now,
        },
      });

      // Create contact records
      await tx.forumContact.createMany({
        data: [
          {
            forumId: createdForum.id,
            role: 'Coordinator',
            fullName: validData.coordinatorName.trim(),
            phoneNumber: validData.coordinatorPhone.trim(),
          },
          {
            forumId: createdForum.id,
            role: 'Secretary',
            fullName: validData.secretaryName.trim(),
            phoneNumber: validData.secretaryPhone.trim(),
          },
        ],
      });

      return createdForum;
    });

    // 6. GENERATE OFFICIAL LETTER OF RECOGNITION PDF
    const storageDir = path.join(process.cwd(), 'storage', 'generated');
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }

    const docForumData = {
      id: forum.id,
      name: forum.name,
      registrationRef: forum.registrationRef,
      lgaName: lga?.name || 'Kwara State',
      areaOfCoverage: forum.areaOfCoverage,
      stateName: 'Kwara State',
      yearEstablished: forum.yearEstablished,
      approvedAt: now,
      coordinatorName: forum.coordinatorName,
      officeAddress: forum.officeAddress,
    };

    const letterToken = generateVerificationToken();
    const letterBuffer = await generateLetterOfRecognitionPdf(docForumData, letterToken);
    const letterFilename = `letter_${forum.id}_${Date.now()}.pdf`;
    const letterFilePath = path.join(storageDir, letterFilename);
    fs.writeFileSync(letterFilePath, letterBuffer);

    const letterDoc = await prisma.generatedDocument.create({
      data: {
        forumId: forum.id,
        docType: 'letter_of_recognition',
        verificationToken: letterToken,
        filePath: `/storage/generated/${letterFilename}`,
        fileSizeBytes: letterBuffer.length,
        issuedAt: now,
      },
    });

    // 7. DISPATCH SMTP EMAIL WITH LETTER OF RECOGNITION PDF ATTACHMENT (Non-blocking)
    const recipientEmail = validData.forumEmail;
    if (recipientEmail) {
      sendRegistrationDocumentsEmail({
        toEmail: recipientEmail,
        coordinatorName: forum.coordinatorName,
        forumName: forum.name,
        registrationRef: forum.registrationRef,
        areaOfCoverage: forum.areaOfCoverage,
        lgaName: lga?.name || 'Kwara State',
        letterPdfBuffer: letterBuffer,
      }).catch((err) => console.error('Background email dispatch error:', err));
    }

    // 8. Real-Time Google Drive / Google Sheets Sync (Non-blocking)
    syncForumToGoogleDrive({
      timestamp: now.toISOString(),
      registrationRef: forum.registrationRef,
      forumName: forum.name,
      motto: forum.motto || '',
      yearEstablished: forum.yearEstablished,
      areaOfCoverage: forum.areaOfCoverage,
      lga: lga?.name || 'Kwara State',
      ward: forum.wardName || 'All Wards',
      officeAddress: forum.officeAddress || '',
      coordinatorName: forum.coordinatorName,
      coordinatorPhone: forum.coordinatorPhone,
      secretaryName: forum.secretaryName,
      secretaryPhone: forum.secretaryPhone,
      forumEmail: forum.forumEmail || '',
      memberStrength: forum.totalStrength,
      capacityRange: validData.strengthRange || '',
      previousElections: forum.previousElectionActivity || '',
      status: 'APPROVED_VERIFIED',
    }).catch((err) => console.error('Background Google Drive sync error:', err));

    // 8. Log Audit
    await logAudit({
      action: 'REGISTRATION_AUTO_APPROVED',
      entity: 'Forum',
      entityId: forum.id,
      forumId: forum.id,
      details: {
        registrationRef: forum.registrationRef,
        forumName: forum.name,
        lga: lga?.name || 'Kwara State',
        areaOfCoverage: validData.areaOfCoverage,
        declaredStrength: forum.totalStrength,
        letterDocId: letterDoc.id,
      },
    });

    return {
      success: true,
      registrationRef: forum.registrationRef,
      forumId: forum.id,
      letterDocId: letterDoc.id,
    };
  } catch (error: any) {
    console.error('Registration submission error:', error);
    return {
      success: false,
      error: error?.message || 'A server error occurred while processing your registration. Please try again or contact support.',
    };
  }
}
