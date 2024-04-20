 import prisma from "../lib/prismadb"

 interface IParams{
    blogId:string;
 }

 export default async function getBlogsById(
    params:IParams
 )
 {
    try {
        const {blogId} = params;
        const blog = await prisma.blog.findUnique({
            where:{
                id:blogId
            },
            include : {
              USER : true
            }
        })
        if (!blog) {
            return null
        }
        return {
            ...blog,
            createdAt: blog.createdAt.toString(),
            USER : {
                ...blog.USER,
                createdAt: blog.USER.createdAt.toString(),
                updatedAt: blog.USER.updatedAt.toString(),
                emailVerified: blog.USER.emailVerified?.toString() || null
            }
        }
        
    } catch (err:any) {
        throw new Error(err)
         
    }
 }