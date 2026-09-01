'use server';

import { prisma } from '@/lib/prisma';
import { verifyPassword, hashPassword, setSessionCookie, clearSessionCookie, getSession } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';
import { logAudit } from '@/lib/auditLogger';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const DESIGNATED_ADMINS: Record<
  string,
  { roleId: string; fullName: string; phoneNumber: string; initialPass: string }
> = {
  '33kahuna': {
    roleId: 'super_admin',
    fullName: '33kahuna (State Administrator)',
    phoneNumber: '07030592380',
    initialPass: 'Kahuna@Apc2027#State',
  },
  'dghakeem': {
    roleId: 'reporting_viewer',
    fullName: 'Dr. Hakeem Babalola Akande (Director General)',
    phoneNumber: '08032010479',
    initialPass: 'DgAkande@Apc2027#Kwara',
  },
  'apcscarewa': {
    roleId: 'content_editor',
    fullName: 'APCSC Arewa (Media & Operations)',
    phoneNumber: '07031693124',
    initialPass: 'ArewaMedia@Apc2027#Kw',
  },
};

export async function loginAdmin(formData: FormData) {
  const rawUsername = (
    formData.get('username') ||
    formData.get('identifier') ||
    ''
  ).toString().trim().toLowerCase();
  
  const password = (formData.get('password') || '').toString();

  const validation = loginSchema.safeParse({ identifier: rawUsername, password });
  if (!validation.success) {
    return {
      success: false,
      error: 'Please enter your username and password (minimum 6 characters).',
    };
  }

  try {
    const username = rawUsername.replace('@apcstakeholderscongress.ng', '');

    // 1. Ensure Roles exist in Database
    await prisma.role.upsert({
      where: { id: 'super_admin' },
      update: { name: 'Super Administrator' },
      create: { id: 'super_admin', name: 'Super Administrator', description: 'Full system access & admin control' },
    });
    await prisma.role.upsert({
      where: { id: 'reporting_viewer' },
      update: { name: 'DG / Reporting Viewer' },
      create: { id: 'reporting_viewer', name: 'DG / Reporting Viewer', description: 'View & Export submitted forms' },
    });
    await prisma.role.upsert({
      where: { id: 'content_editor' },
      update: { name: 'Media & Operations Editor' },
      create: { id: 'content_editor', name: 'Media & Operations Editor', description: 'View & Export forms + CMS News/Gallery' },
    });

    // 2. Find user in database
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: `${username}@apcstakeholderscongress.ng` } },
          { email: { equals: username } },
        ],
      },
      include: { role: true },
    });

    // 3. If account doesn't exist yet, check if it's one of the designated 3 admins and seed it
    const designatedConfig = DESIGNATED_ADMINS[username];
    if (!user && designatedConfig) {
      const initialHash = await hashPassword(designatedConfig.initialPass);
      user = await prisma.user.create({
        data: {
          email: `${username}@apcstakeholderscongress.ng`,
          fullName: designatedConfig.fullName,
          roleId: designatedConfig.roleId,
          passwordHash: initialHash,
          phoneNumber: designatedConfig.phoneNumber,
          isActive: true,
        },
        include: { role: true },
      });
    }

    if (!user) {
      return { success: false, error: 'Invalid username or password.' };
    }

    if (!user.isActive) {
      return {
        success: false,
        error: 'This administrator account is currently deactivated. Please contact the State Administrator (33kahuna) to re-enable access.',
      };
    }

    // 4. Verify Password against stored hash
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Invalid password. Please check your credentials and try again.' };
    }

    // 5. Establish encrypted session cookie
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      roleId: user.roleId,
      stateId: user.stateId,
    });

    // 6. Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // 7. Audit log
    await logAudit({
      actorId: user.id,
      actorEmail: user.email,
      action: 'ADMIN_LOGIN_SUCCESS',
      entity: 'User',
      entityId: user.id,
    });

    return { success: true, roleId: user.roleId };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An authentication error occurred. Please try again.' };
  }
}

export async function logoutAdmin() {
  const session = await getSession();
  if (session) {
    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'ADMIN_LOGOUT',
      entity: 'User',
      entityId: session.userId,
    });
  }
  await clearSessionCookie();
  redirect('/admin/login');
}

/**
 * Super Admin (33kahuna) actions to Enable / Disable administrator accounts.
 */
export async function toggleAdminUserStatus(targetUserId: string, makeActive: boolean) {
  const session = await getSession();
  if (!session || session.roleId !== 'super_admin') {
    return { success: false, error: 'Unauthorized. Only Super Administrator (33kahuna) can manage admin accounts.' };
  }

  try {
    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!targetUser) {
      return { success: false, error: 'User account not found.' };
    }

    if (targetUser.email.startsWith('33kahuna')) {
      return { success: false, error: 'The primary Super Administrator account cannot be deactivated.' };
    }

    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { isActive: makeActive },
    });

    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: makeActive ? 'ADMIN_USER_ENABLED' : 'ADMIN_USER_DISABLED',
      entity: 'User',
      entityId: targetUserId,
      details: { targetEmail: targetUser.email, newStatus: makeActive },
    });

    revalidatePath('/admin/users');
    revalidatePath('/admin/dashboard');

    return { success: true, isActive: updated.isActive };
  } catch (error: any) {
    console.error('Failed to toggle admin status:', error);
    return { success: false, error: error.message || 'Failed to update administrator status.' };
  }
}
