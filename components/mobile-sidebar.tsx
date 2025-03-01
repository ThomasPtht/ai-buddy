import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import Sidebar from "@/components/sidebar"

const MobileSidebar = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger className="md:hidden pr-4">
                    <Menu />
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
                    <SheetTitle></SheetTitle>
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileSidebar
