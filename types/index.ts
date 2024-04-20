import {Blog, User} from "@prisma/client";

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {   
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null
} 
export type safeBlogs = Omit<Blog, "createdAt"> & {
    createdAt: string;
    
}