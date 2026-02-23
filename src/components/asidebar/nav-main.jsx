"use client";
import {
    CheckCircle,
    KeyRound,
    LayoutDashboard,
    LogIn,
    Settings,
    ShieldCheck,
    UserPlus,
    Users,
} from "lucide-react";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";
import { Permissions } from "@/constant";

export function NavMain() {
    const { hasPermission } = useAuthContext();
    const canManageSettings = hasPermission(
        Permissions.MANAGE_WORKSPACE_SETTINGS,
    );
    const workspaceId = useWorkspaceId();
    const { pathname } = useLocation();

    const workspaceItems = [
        {
            title: "Dashboard",
            url: `/workspace/${workspaceId}`,
            icon: LayoutDashboard,
        },
        {
            title: "Tasks",
            url: `/workspace/${workspaceId}/tasks`,
            icon: CheckCircle,
        },
        {
            title: "Members",
            url: `/workspace/${workspaceId}/members`,
            icon: Users,
        },
        ...(canManageSettings
            ? [
                {
                    title: "Settings",
                    url: `/workspace/${workspaceId}/settings`,
                    icon: Settings,
                },
            ]
            : []),
    ];

    const pageItems = [
        {
            title: "Admin Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Organizations",
            url: "/admin/organizations",
            icon: Users,
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: Users,
        },
        {
            title: "Contract",
            url: "/admin/contract",
            icon: Users,
        },
        {
            title: "SignUp Request",
            url: "/admin/signup-request",
            icon: Users,
        },
        {
            title: "Login",
            url: "/",
            icon: LogIn,
        },
        {
            title: "Sign up",
            url: "/sign-up",
            icon: UserPlus,
        },
        {
            title: "Forgot Password",
            url: "/forgot-password",
            icon: KeyRound,
        },
        {
            title: "OTP",
            url: "/otp",
            icon: ShieldCheck,
        },
    ];

    return (
        <SidebarGroup>
            <SidebarMenu>
                {workspaceItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton isActive={item.url === pathname} asChild>
                            <Link to={item.url} className="!text-[15px]">
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}

                <SidebarMenuItem>
                    <div className="px-2 pt-3 text-xs font-medium text-muted-foreground">
                        Pages
                    </div>
                </SidebarMenuItem>

                {pageItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton isActive={item.url === pathname} asChild>
                            <Link to={item.url} className="!text-[15px]">
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
