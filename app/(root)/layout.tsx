import Sidebar from "@/components/sidebar";
import Navbar from "../../components/navbar";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0"><Sidebar /></div>
            <main className="md:pl-20 pt-16 h-full">{children}
                <Toaster />
            </main>

        </div>
    )
}


export default RootLayout
