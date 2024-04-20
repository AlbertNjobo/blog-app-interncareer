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
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Access the request body directly, assuming it's already parsed as JSON.
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