import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

import prisma from '../../lib/prismadb';


export async function POST(
    request: Request,
) {
    const body = await request.json();
    const {
        email,
        name,
        password,
    } = body;

    if (!email || typeof email !== 'string') {
        return new NextResponse('Email is required', { status: 400 });
    }

    if (!name || typeof name !== 'string') {
        return new NextResponse('Name is required', { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
        return new NextResponse('Password must be at least 8 characters', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    // Omit hashedPassword from the response to avoid leaking sensitive data
    const { hashedPassword: _hashedPassword, ...safeUser } = user;
    return NextResponse.json(safeUser);
}