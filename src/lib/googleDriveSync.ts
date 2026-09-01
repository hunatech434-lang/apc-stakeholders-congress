import { prisma } from '@/lib/prisma';

export interface GoogleSyncRow {
  timestamp: string;
  registrationRef: string;
  forumName: string;
  motto: string;
  yearEstablished: number;
  areaOfCoverage: string;
  lga: string;
  ward: string;
  officeAddress: string;
  coordinatorName: string;
  coordinatorPhone: string;
  secretaryName: string;
  secretaryPhone: string;
  forumEmail: string;
  memberStrength: number;
  capacityRange: string;
  previousElections: string;
  status: string;
}

/**
 * Automatically syncs a newly registered forum to Google Drive / Google Sheets in real-time.
 */
export async function syncForumToGoogleDrive(forumData: GoogleSyncRow): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_DRIVE_WEBHOOK_URL;
  if (!webhookUrl) {
    // If webhook is not yet configured, log silently without breaking registration flow
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'ADD_ROW',
        row: forumData,
        source: 'APC_STAKEHOLDERS_CONGRESS_PORTAL',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Google Drive Real-Time Sync Error:', error);
    return false;
  }
}

/**
 * Syncs all existing records in the database to Google Drive / Google Sheets.
 */
export async function syncAllRecordsToGoogleDrive(): Promise<{ success: boolean; count: number; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_DRIVE_WEBHOOK_URL;
  if (!webhookUrl) {
    return {
      success: false,
      count: 0,
      error: 'Google Drive Webhook URL is not configured in environment variables (GOOGLE_SHEETS_WEBHOOK_URL).',
    };
  }

  try {
    const forums = await prisma.forum.findMany({
      include: { lga: true },
      orderBy: { createdAt: 'asc' },
    });

    const rows: GoogleSyncRow[] = forums.map((f) => ({
      timestamp: f.submittedAt ? new Date(f.submittedAt).toISOString() : new Date(f.createdAt).toISOString(),
      registrationRef: f.registrationRef,
      forumName: f.name,
      motto: f.motto || '',
      yearEstablished: f.yearEstablished,
      areaOfCoverage: f.areaOfCoverage,
      lga: f.lga?.name || 'Kwara State',
      ward: f.wardName || 'All Wards',
      officeAddress: f.officeAddress || '',
      coordinatorName: f.coordinatorName,
      coordinatorPhone: f.coordinatorPhone,
      secretaryName: f.secretaryName,
      secretaryPhone: f.secretaryPhone,
      forumEmail: f.forumEmail || '',
      memberStrength: f.totalStrength,
      capacityRange: f.additionalCapacityInfo || '',
      previousElections: f.previousElectionActivity || '',
      status: f.status.toUpperCase(),
    }));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'BATCH_SYNC',
        rows: rows,
        source: 'APC_STAKEHOLDERS_CONGRESS_PORTAL',
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Webhook returned HTTP ${response.status}`);
    }

    return { success: true, count: rows.length };
  } catch (error: any) {
    console.error('Batch Google Drive sync error:', error);
    return { success: false, count: 0, error: error.message || 'Failed to sync with Google Drive.' };
  }
}
