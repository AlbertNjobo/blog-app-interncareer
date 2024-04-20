import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";

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
    const json = await request.json();

    if(!currentUser){
        return NextResponse.error()
    }

    const {blogId} = params

    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid ID')
    }
    const updated = await prisma.blog.update(
      {  where: {
            id: blogId,
       
        },
        data:json
    }
    ) 

    return NextResponse.json(updated)
}