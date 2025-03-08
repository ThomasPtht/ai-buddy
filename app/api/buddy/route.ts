import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const user = await currentUser()
        const { src, name, description, instructions, seed, categoryId } = body

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        // TODO : check for surbscriptions

        const buddy = await prismadb.buddy.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed
            }
        })
        return NextResponse.json(buddy)

    } catch (error) {
        console.log("[COMPANION_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}