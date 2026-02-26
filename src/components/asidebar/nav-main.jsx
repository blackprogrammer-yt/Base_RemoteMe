"use client";
import {
    CheckCircle,
    ChevronDown,
    Clock,
    FileText,
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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useAuthContext } from "@/context/auth-provider";
import { Permissions } from "@/constant";
import { useState } from "react";

export function NavMain() {
    const { hasPermission } = useAuthContext();
    const canManageSettings = hasPermission(
        Permissions.MANAGE_WORKSPACE_SETTINGS,
    );
    const workspaceId = useWorkspaceId();
    const { pathname } = useLocation();
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(
        pathname.startsWith("/organization/invoices"),
    );
    const [isSystemSetupOpen, setIsSystemSetupOpen] = useState(
        pathname.startsWith("/organization/system-setup"),
    );

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

    const organizationItems = [
        {
            title: "Dashboard",
            url: "/organization/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Hire & Board",
            url: "/organization/hire-and-board",
            icon: UserPlus,
        },
        {
            title: "Contracts",
            url: "/organization/contracts",
            icon: Users,
        },
        {
            title: "Timesheets",
            url: "/organization/timesheets",
            icon: Clock,
        },
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
                        Organization
                    </div>
                </SidebarMenuItem>

                {organizationItems.map((item) => (
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
                    <SidebarMenuButton
                        type="button"
                        onClick={() => setIsInvoiceOpen((prev) => !prev)}
                        className="!text-[15px]"
                        isActive={pathname.startsWith("/organization/invoices")}
                    >
                        <FileText />
                        <span>Invoices</span>
                        <ChevronDown
                            className={`ml-auto transition-transform ${isInvoiceOpen ? "rotate-180" : ""}`}
                        />
                    </SidebarMenuButton>

                    {isInvoiceOpen ? (
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === "/organization/invoices/my-invoices"}
                                >
                                    <Link to="/organization/invoices/my-invoices">
                                        <span>My Invoices</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === "/organization/invoices/general-invoices"}
                                >
                                    <Link to="/organization/invoices/general-invoices">
                                        <span>General Invoices</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    ) : null}
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton
                        type="button"
                        onClick={() => setIsSystemSetupOpen((prev) => !prev)}
                        className="!text-[15px]"
                        isActive={pathname.startsWith("/organization/system-setup")}
                    >
                        <Settings />
                        <span>System Setup</span>
                        <ChevronDown
                            className={`ml-auto transition-transform ${isSystemSetupOpen ? "rotate-180" : ""}`}
                        />
                    </SidebarMenuButton>

                    {isSystemSetupOpen ? (
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === "/organization/system-setup/documents"}
                                >
                                    <Link to="/organization/system-setup/documents">
                                        <span>Documents</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === "/organization/system-setup/earning-and-deduction"}
                                >
                                    <Link to="/organization/system-setup/earning-and-deduction">
                                        <span>Earning & Deduction</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === "/organization/system-setup/manage-admin"}
                                >
                                    <Link to="/organization/system-setup/manage-admin">
                                        <span>Organization Admin</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    ) : null}
                </SidebarMenuItem>

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
