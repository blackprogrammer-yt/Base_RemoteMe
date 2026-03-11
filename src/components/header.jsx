import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AvatarMenu from "@/components/avatar/AvatarMenu";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-provider";
import { Button } from "@/components/ui/button";

const Header = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const getPageLabel = (currentPathname) => {
        if (currentPathname.includes("/project/")) return "Project";
        return null;
    };

    const pageHeading = getPageLabel(pathname);

    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center border-b bg-background">
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

            <div className="flex items-center gap-2 pr-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="h-8 w-8 rounded-full"
                >
                    {theme === "dark" ? (
                        <Sun className="h-[18px] w-[18px]" />
                    ) : (
                        <Moon className="h-[18px] w-[18px]" />
                    )}
                </Button>
                <NotificationPanel />
                <AvatarMenu />
            </div>
        </header>
    );
};

export default Header;
