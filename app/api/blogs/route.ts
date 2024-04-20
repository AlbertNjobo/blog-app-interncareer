// Assuming this is the content of app/api/blogs/route.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

// This should be the default export
export default async function(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, description, imageSrc } = req.body;

  try {
    const blog = await prisma.blog.create({
      data: {
        name,
        description,
        imageSrc,
        userId: currentUser.id,
      },
    });

    return res.status(200).json(blog);
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return res.status(500).json({ error: 'Failed to create blog post' });
  }
}