import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prismadb"; // Ensure the path is correct.
import getCurrentUser from "@/app/actions/getCurrentUser"; // Ensure this function is properly implemented.

// Define the type for the expected request body to improve type checking.
interface BlogPostRequestBody {
  name: string;
  description: string;
  imageSrc: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure this handler only responds to POST requests
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    // If no current user is found, return a 401 Unauthorized response.
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const body: BlogPostRequestBody = await req.json();
    const { name, description, imageSrc } = body;

    const blog = await prisma.blog.create({
      data: {
        name,
        description,
        imageSrc,
        userId: currentUser.id
      }
    });

    // Return the created blog post as a JSON response with a 200 OK status.
    return res.status(200).json(blog);
  } catch (error) {
    // Handle any errors that occur during the request processing.
    console.error('Failed to create blog post:', error);
    return res.status(500).json({ error: 'Failed to create blog post' });
  }
}