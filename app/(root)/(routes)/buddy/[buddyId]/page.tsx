import { Categories } from "@/components/categories"
import prismadb from "@/lib/prismadb"
import BuddyForm from "./components/buddy-form"

interface BuddyIdPageProps {
    params: {
        buddyId: string,
    }
}

const BuddyIdPage = async ({params}: BuddyIdPageProps) => {
    //TODO: check subscription

    const buddy = await prismadb.buddy.findUnique({
        where: {
            id: params.buddyId
        }
    })

    const categories = await prismadb.category.findMany()

    return (
        <div>
      <BuddyForm
      initialData={buddy}
      categories={categories}
      />
        </div>
    )
}

export default BuddyIdPage
