import { prisma } from './prisma';

export interface LogAuditOptions {
  actorId?: string | null;
  actorEmail?: string | null;
  action: string;
  entity: string;
  entityId: string;
  details?: Record<string, any> | string | null;
  ipAddress?: string | null;
  forumId?: string | null;
}

export async function logAudit(options: LogAuditOptions) {
  try {
    const detailsString =
      typeof options.details === 'object' && options.details !== null
        ? JSON.stringify(options.details)
        : (options.details as string | null);

    return await prisma.auditLog.create({
      data: {
        actorId: options.actorId || null,
        actorEmail: options.actorEmail || null,
        action: options.action,
        entity: options.entity,
        entityId: options.entityId,
        details: detailsString || null,
        ipAddress: options.ipAddress || null,
        forumId: options.forumId || null,
      },
    });
  } catch (err) {
    console.error('Audit logging failed:', err);
    // Non-blocking in dev to preserve user flow if DB is transitioning
  }
}
