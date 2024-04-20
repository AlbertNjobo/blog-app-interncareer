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

  const blog = await prisma?.blog.create({
    data: { name, description, imageSrc, userId: currentUser.id },
  });

  return new NextResponse(JSON.stringify(blog), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}