import { NextResponse } from "next/server";
import prisma from "../../lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse(null, { status: 401 });
  }

  const body = await request.json();

  const { name, description, imageSrc } = body;

  if (!name || typeof name !== 'string') {
    return new NextResponse('Blog name is required', { status: 400 });
  }

  if (!description || typeof description !== 'string') {
    return new NextResponse('Blog description is required', { status: 400 });
  }

  if (!imageSrc || typeof imageSrc !== 'string') {
    return new NextResponse('Blog image is required', { status: 400 });
  }

  const blog = await prisma?.blog.create({
    data: { name, description, imageSrc, userId: currentUser.id },
  });

  return new NextResponse(JSON.stringify(blog), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}