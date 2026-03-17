import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

interface IParams {
    blogId?:string
}

export async function DELETE(
    request:Request,
    {params}: {params:IParams}
){

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const {blogId} = params

    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid ID')
    }
    const blog = await prisma.blog.deleteMany(
      {  where: {
            id: blogId,
            userId: currentUser.id,
        }
    }
    ) 

    return NextResponse.json(blog)
}

export async function PUT(
    request:Request,
    {params}: {params:IParams}
){

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const {blogId} = params

    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid ID')
    }

    const json = await request.json();

    // Only allow updating specific fields to prevent mass assignment
    const { name, description, imageSrc } = json;

    if (!name || typeof name !== 'string') {
        return new NextResponse('Blog name is required', { status: 400 });
    }

    if (!description || typeof description !== 'string') {
        return new NextResponse('Blog description is required', { status: 400 });
    }

    if (!imageSrc || typeof imageSrc !== 'string') {
        return new NextResponse('Blog image is required', { status: 400 });
    }

    const updated = await prisma.blog.updateMany(
      {  where: {
            id: blogId,
            userId: currentUser.id,
        },
        data: { name, description, imageSrc }
    }
    )

    if (updated.count === 0) {
        return new NextResponse('Blog not found or you do not have permission to update it', { status: 403 });
    }

    return NextResponse.json(updated)
}