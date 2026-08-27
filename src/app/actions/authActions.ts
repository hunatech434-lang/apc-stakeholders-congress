'use server';

import { prisma } from '@/lib/prisma';
import { verifyPassword, setSessionCookie, clearSessionCookie, getSession } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';
import { logAudit } from '@/lib/auditLogger';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return { success: false, error: 'Please enter a valid email and password (minimum 6 characters).' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      return { success: false, error: 'Invalid credentials or account deactivated.' };
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Invalid credentials.' };
    }

    // Set session cookie
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      roleId: user.roleId,
      stateId: user.stateId,
    });

    // Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Audit log
    await logAudit({
      actorId: user.id,
      actorEmail: user.email,
      action: 'ADMIN_LOGIN_SUCCESS',
      entity: 'User',
      entityId: user.id,
    });

    return { success: true };
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
