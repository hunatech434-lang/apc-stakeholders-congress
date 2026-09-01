'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/auditLogger';
import { generateVerificationToken } from '@/lib/refGenerator';
import { generateLetterOfRecognitionPdf } from '@/lib/documentGenerator';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function updateForumStatus(
  forumId: string,
  action: 'under_review' | 'more_info_required' | 'approved_verified' | 'rejected' | 'suspended_revoked',
  notes?: string,
  queryMessage?: string,
  rejectionReason?: string
) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Please sign in.' };
  }

  try {
    const forum = await prisma.forum.findUnique({
      where: { id: forumId },
      include: { lga: true },
    });

    if (!forum) {
      return { success: false, error: 'Forum record not found.' };
    }

    const isApproval = action === 'approved_verified';

    // Update forum record
    const updated = await prisma.forum.update({
      where: { id: forumId },
      data: {
        status: action,
        reviewerNotes: notes || forum.reviewerNotes,
        queryMessage: queryMessage || null,
        rejectionReason: rejectionReason || null,
        reviewedAt: new Date(),
        approvedAt: isApproval ? new Date() : forum.approvedAt,
      },
    });

    // If approved, trigger document generation automatically if not already issued
    if (isApproval) {
      await generateOfficialDocumentsForForum(forum.id);
    }

    // Audit log
    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: `FORUM_STATUS_${action.toUpperCase()}`,
      entity: 'Forum',
      entityId: forum.id,
      forumId: forum.id,
      details: {
        previousStatus: forum.status,
        newStatus: action,
        notes,
        queryMessage,
        rejectionReason,
      },
    });

    revalidatePath(`/admin/forums/${forumId}`);
    revalidatePath('/admin/forums');
    revalidatePath('/admin/dashboard');
    revalidatePath('/verified-groups');
    revalidatePath('/status');

    return { success: true };
  } catch (error) {
    console.error('Status update failed:', error);
    return { success: false, error: 'Failed to update forum status' };
  }
}

/**
 * Generates official Certificate of Registration and Letter of Recognition artifacts.
 */
export async function generateOfficialDocumentsForForum(forumId: string) {
  const forum = await prisma.forum.findUnique({
    where: { id: forumId },
    include: { lga: true, state: true },
  });

  if (!forum) throw new Error('Forum not found');

  const forumData = {
    id: forum.id,
    name: forum.name,
    registrationRef: forum.registrationRef,
    lgaName: forum.lga?.name || 'Kwara',
    areaOfCoverage: forum.areaOfCoverage,
    stateName: 'Kwara State',
    yearEstablished: forum.yearEstablished,
    approvedAt: forum.approvedAt || new Date(),
    coordinatorName: forum.coordinatorName,
    officeAddress: forum.officeAddress,
  };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const genDir = path.join(process.cwd(), 'storage', 'generated');
  if (!fs.existsSync(genDir)) {
    fs.mkdirSync(genDir, { recursive: true });
  }

  // Official Letter of Recognition
  let letterDoc = await prisma.generatedDocument.findFirst({
    where: { forumId: forum.id, docType: 'letter_of_recognition' },
  });

  if (!letterDoc) {
    const letterToken = generateVerificationToken();
    const letterBuffer = await generateLetterOfRecognitionPdf(forumData, letterToken, appUrl);
    const letterFileName = `letter_${forum.registrationRef.replace(/[^a-zA-Z0-9]/g, '_')}_${letterToken.slice(0, 8)}.pdf`;
    const letterFilePath = path.join(genDir, letterFileName);
    fs.writeFileSync(letterFilePath, letterBuffer);

    letterDoc = await prisma.generatedDocument.create({
      data: {
        forumId: forum.id,
        docType: 'letter_of_recognition',
        verificationToken: letterToken,
        filePath: `/storage/generated/${letterFileName}`,
        fileSizeBytes: letterBuffer.length,
      },
    });
  }

  return { letter: letterDoc };
}

/**
 * Super Admin & Reporting Viewers can trigger batch sync to Google Drive / Sheets.
 */
export async function triggerGoogleDriveSync() {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  const { syncAllRecordsToGoogleDrive } = await import('@/lib/googleDriveSync');
  const result = await syncAllRecordsToGoogleDrive();

  if (result.success) {
    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'GOOGLE_DRIVE_BATCH_SYNC',
      entity: 'Forum',
      entityId: 'ALL',
      details: { recordsSynced: result.count },
    });
  }

  return result;
}
