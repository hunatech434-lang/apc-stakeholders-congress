import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/auditLogger';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // Format data cleanly (excluding sensitive private notes)
    const exportData = forums.map((f, idx) => ({
      'S/N': idx + 1,
      'Registration Ref': f.registrationRef,
      'Forum Name': f.name,
      'Acronym': f.acronym || 'N/A',
      'Year Established': f.yearEstablished,
      'Area of Coverage': f.areaOfCoverage,
      'LGA': f.lga?.name || 'Kwara',
      'Ward': f.wardName || 'N/A',
      'Office Address': f.officeAddress,
      'Coordinator Name': f.coordinatorName,
      'Coordinator Phone': f.coordinatorPhone,
      'Secretary Name': f.secretaryName,
      'Secretary Phone': f.secretaryPhone,
      'Declared Member Strength': f.totalStrength,
      'Previous Election Activity': f.previousElectionActivity,
      'Status': f.status.toUpperCase(),
      'Submitted Date': f.submittedAt ? new Date(f.submittedAt).toLocaleDateString('en-GB') : 'N/A',
      'Approved Date': f.approvedAt ? new Date(f.approvedAt).toLocaleDateString('en-GB') : 'N/A',
    }));

    // Log export event to audit trail
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
        },
      });
    }

    // Default: XLSX
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registered Forums');
    const xlsxBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(xlsxBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="APC_Stakeholders_Registry_${new Date().toISOString().slice(0, 10)}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to generate export file' }, { status: 500 });
  }
}
