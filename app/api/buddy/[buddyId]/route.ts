import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { buddyId: string } }) {
    try {
        const body = await req.json()
        const user = await currentUser()

        if (!params.buddyId) {
            return new NextResponse("Buddy ID is required", { status: 400 })
        }
        const { src, name, description, instructions, seed, categoryId } = body

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        // TODO : check for surbscriptions

        const buddy = await prismadb.buddy.update({
            where: {
                id: params.buddyId
            },
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
        console.log("[COMPANION_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}