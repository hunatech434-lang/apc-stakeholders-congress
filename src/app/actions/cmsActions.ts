'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/seo';
import { logAudit } from '@/lib/auditLogger';

export async function createAnnouncement(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  const title = (formData.get('title') as string || '').trim();
  const body = (formData.get('body') as string || '').trim();
  const targetAudience = (formData.get('targetAudience') as string) || 'all';

  if (!title || !body) {
    return { success: false, error: 'Title and body are required.' };
  }

  try {
    const ann = await prisma.announcement.create({
      data: {
        title,
        body,
        targetAudience,
        status: 'published',
      },
    });

    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'ANNOUNCEMENT_CREATE',
      entity: 'Announcement',
      entityId: ann.id,
      details: { title, targetAudience },
    });

    revalidatePath('/admin/cms');
    revalidatePath('/news');
    revalidatePath('/');
    return { success: true };
  } catch (err) {
    console.error('Create announcement failed:', err);
    return { success: false, error: 'Failed to publish announcement.' };
  }
}

export async function deleteAnnouncement(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  const id = formData.get('id') as string;
  if (!id) return { success: false, error: 'ID required' };

  try {
    await prisma.announcement.delete({
      where: { id },
    });

    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'ANNOUNCEMENT_DELETE',
      entity: 'Announcement',
      entityId: id,
    });

    revalidatePath('/admin/cms');
    revalidatePath('/news');
    revalidatePath('/');
    return { success: true };
  } catch (err) {
    console.error('Delete announcement failed:', err);
    return { success: false, error: 'Failed to delete announcement.' };
  }
}

export async function createNewsPost(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  const title = (formData.get('title') as string || '').trim();
  const excerpt = (formData.get('excerpt') as string || '').trim();
  const body = (formData.get('body') as string || '').trim();
  const category = (formData.get('category') as string || 'Press Release').trim();

  if (!title || !body) {
    return { success: false, error: 'Title and article content are required.' };
  }

  let slug = slugify(title);
  // Ensure unique slug
  const existing = await prisma.newsPost.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  try {
    const post = await prisma.newsPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || body.slice(0, 180),
        body,
        category,
        status: 'published',
        publishedAt: new Date(),
        authorId: session.userId,
      },
    });

    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'NEWS_POST_CREATE',
      entity: 'NewsPost',
      entityId: post.id,
      details: { title, slug, category },
    });

    revalidatePath('/admin/cms');
    revalidatePath('/news');
    revalidatePath(`/news/${slug}`);
    revalidatePath('/');
    return { success: true };
  } catch (err) {
    console.error('Create news post failed:', err);
    return { success: false, error: 'Failed to publish news post.' };
  }
}

export async function deleteNewsPost(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  const id = formData.get('id') as string;
  if (!id) return { success: false, error: 'ID required' };

  try {
    const post = await prisma.newsPost.findUnique({ where: { id } });
    await prisma.newsPost.delete({ where: { id } });

    await logAudit({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'NEWS_POST_DELETE',
      entity: 'NewsPost',
      entityId: id,
    });

    revalidatePath('/admin/cms');
    revalidatePath('/news');
    if (post?.slug) {
      revalidatePath(`/news/${post.slug}`);
    }
    revalidatePath('/');
    return { success: true };
  } catch (err) {
    console.error('Delete news post failed:', err);
    return { success: false, error: 'Failed to delete news post.' };
  }
}
