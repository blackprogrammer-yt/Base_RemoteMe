import { Outlet } from "react-router-dom";

import Asidebar from "@/components/asidebar/asidebar";
import Header from "@/components/header";
import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";
import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/auth-provider";

const AppLayout = () => {
    return (
        <AuthProvider>
            <SidebarProvider>
                <Asidebar />
                <SidebarInset className="overflow-x-hidden">
                    <div className="w-full">
                        <Header />
                        <div className="px-3 py-3 lg:px-20">
                            <Outlet />
                        </div>
                        <CreateWorkspaceDialog />
                        <CreateProjectDialog />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthProvider>
    );
};

export default AppLayout;
