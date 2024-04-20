import {NextResponse}  from "next/server"
import primsa from "../../lib/prismadb"

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
     ){
        const currentUser = await getCurrentUser();

        if (!currentUser){
            return null
        }
        const body = await request.json();

        const {name, description, imageSrc} = body

        const blog = await prisma?.blog.create({
            data: {name, 
                description, 
                imageSrc,
            userId: currentUser.id}
        })
        return NextResponse.json(blog)
     }

