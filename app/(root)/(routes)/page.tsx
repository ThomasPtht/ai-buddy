import Buddies from "@/components/buddies"
import { Categories } from "@/components/categories"
import SearchInput from "@/components/search-input"
import prismadb from "@/lib/prismadb"
import { UserButton } from "@clerk/nextjs"

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  }
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.buddy.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })



  const categories = await prismadb.category.findMany()

  console.log(categories)


  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Buddies data={data}/>
    </div>
  )
}

export default RootPage
