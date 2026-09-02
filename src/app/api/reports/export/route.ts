import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/auditLogger';
import * as XLSX from 'xlsx';

/**
 * Neutralizes Spreadsheet Formula Injection (CWE-1236)
 * Prevents execution of malicious formulas in Excel/CSV by prefixing unsafe leading characters.
 */
function sanitizeCell(value: any): any {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (trimmed.length === 0) return '';
  // Check for dangerous formula starters: =, +, -, @, \t, \r, %
  if (/^[=+\-@\t\r%]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Directorate login required' }, { status: 401 });
    }

    // Role check: Only Super Admin, DG (Reporting Viewer), and Media & Ops can export
    const allowedRoles = ['super_admin', 'state_admin', 'reporting_viewer', 'content_editor'];
    if (!allowedRoles.includes(session.roleId)) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges for data export' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'xlsx';
    const status = searchParams.get('status') || '';
    const lgaId = searchParams.get('lgaId') ? parseInt(searchParams.get('lgaId')!, 10) : undefined;
    const area = searchParams.get('area') || '';

    const where: any = {};
    if (status) where.status = status;
    if (lgaId) where.lgaId = lgaId;
    if (area) where.areaOfCoverage = area;

    const forums = await prisma.forum.findMany({
      where,
      include: { lga: true },
      orderBy: { createdAt: 'desc' },
    });

    // Format data with strict formula injection defense
    const exportData = forums.map((f, idx) => ({
      'S/N': idx + 1,
      'Registration Ref': sanitizeCell(f.registrationRef),
      'Forum Name': sanitizeCell(f.name),
      'Year Established': f.yearEstablished,
      'Area of Coverage': sanitizeCell(f.areaOfCoverage),
      'LGA': sanitizeCell(f.lga?.name || 'Kwara State'),
      'Office Address': sanitizeCell(f.officeAddress || 'N/A'),
      'Coordinator Name': sanitizeCell(f.coordinatorName),
      'Coordinator Phone': sanitizeCell(f.coordinatorPhone),
      'Secretary Name': sanitizeCell(f.secretaryName),
      'Secretary Phone': sanitizeCell(f.secretaryPhone),
      'Official Forum Email': sanitizeCell(f.forumEmail || 'N/A'),
      'Declared Member Strength': f.totalStrength,
      'Status': sanitizeCell(f.status.toUpperCase()),
      'Registration Date': f.submittedAt 
        ? new Date(f.submittedAt).toLocaleDateString('en-GB') 
        : new Date(f.createdAt).toLocaleDateString('en-GB'),
    }));

    // Log export event to immutable audit trail
    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: `DATA_EXPORT_${format.toUpperCase()}`,
      entity: 'Forum',
      entityId: 'ALL_FILTERED',
      details: {
        recordCount: forums.length,
        format,
        filters: { status, lgaId, area },
      },
    });

    if (format === 'csv') {
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

      return new NextResponse(csvOutput, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="APC_Stakeholders_Registry_${new Date().toISOString().slice(0, 10)}.csv"`,
          'Cache-Control': 'no-store, max-age=0',
        },
      });
    }

    // Default: XLSX
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registered Forums');
    const xlsxBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(new Uint8Array(xlsxBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="APC_Stakeholders_Registry_${new Date().toISOString().slice(0, 10)}.xlsx"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to generate export file safely' }, { status: 500 });
  }
}
