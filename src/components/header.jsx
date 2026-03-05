import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";

const Header = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const getPageLabel = (currentPathname) => {
        if (currentPathname.includes("/project/")) return "Project";
        return null;
    };

    const pageHeading = getPageLabel(pathname);

    return (
        <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center border-b bg-white">
            <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden text-[15px] md:block">
                            {pageHeading ? (
                                <BreadcrumbLink asChild>
                                    <span>Dashboard</span>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage className="line-clamp-1">
                                    Dashboard
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>

                        {pageHeading ? (
                            <>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem className="text-[15px]">
                                    <BreadcrumbPage className="line-clamp-1">
                                        {pageHeading}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        ) : null}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
};

export default Header;
