"use client";
import {
    Briefcase,
    ChevronDown,
    Banknote,
    ClipboardList,
    FileText,
    Gift,
    KeyRound,
    LayoutDashboard,
    LogIn,
    Receipt,
    Settings,
    ShieldCheck,
    UserCog,
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
import { useState } from "react";

export function NavMain() {
    const { pathname } = useLocation();
    const [openMenus, setOpenMenus] = useState({ Invoices: true });

    const toggleMenu = (title) => {
        setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
    };



    const organizationItems = [
        {
            title: "Dashboard",
            url: "/organization/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Hire and Board",
            url: "/organization/hire-and-board",
            icon: UserPlus,
        },
        {
            title: "Timesheets",
            url: "/organization/timesheets",
            icon: ClipboardList,
        },
        {
            title: "Invoices",
            icon: Receipt,
            items: [
                {
                    title: "My Invoices",
                    url: "/organization/invoices/my-invoices",
                    icon: FileText,
                },
                {
                    title: "General Invoices",
                    url: "/organization/invoices/general-invoices",
                    icon: FileText,
                },
            ],
        },
        {
            title: "Payroll Payments",
            url: "/organization/payroll-payments",
            icon: Banknote,
        },
        {
            title: "System Setup",
            icon: Settings,
            items: [
                {
                    title: "Documents",
                    url: "/organization/system-setup/documents",
                    icon: FileText,
                },
                {
                    title: "Earning & Deduction",
                    url: "/organization/system-setup/earning-and-deduction",
                    icon: Banknote,
                },
                {
                    title: "Manage Admin",
                    url: "/organization/system-setup/manage-admin",
                    icon: UserCog,
                },
            ],
        },
        {
            title: "Contracts",
            url: "/organization/contracts",
            icon: Briefcase,
        },
    ];

    const employeeItems = [
        {
            title: "Dashboard",
            url: "/employee/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Timesheets",
            url: "/employee/timesheets",
            icon: ClipboardList,
        },
        {
            title: "My Contract",
            url: "/employee/my-contract",
            icon: FileText,
        },
        {
            title: "My Payment",
            url: "/employee/my-payment",
            icon: Banknote,
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
            title: "Employee Payments",
            url: "/admin/employee-payments",
            icon: Users,
        },
        {
            title: "Invoices",
            icon: Receipt,
            items: [
                {
                    title: "General Invoices",
                    url: "/admin/general-invoices",
                    icon: FileText,
                },
                {
                    title: "Organization Invoices",
                    url: "/admin/organization-invoices",
                    icon: Users,
                },
            ],
        },
        {
            title: "System Setup",
            icon: Settings,
            items: [
                {
                    title: "Documents",
                    url: "/admin/system-setup/documents",
                    icon: FileText,
                },
                {
                    title: "Benefits",
                    url: "/admin/system-setup/benefits",
                    icon: Gift,
                },
                {
                    title: "Currencies",
                    url: "/admin/system-setup/currencies",
                    icon: Banknote,
                },
                {
                    title: "Settings",
                    url: "/admin/system-setup/setting",
                    icon: Settings,
                },
            ],
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
                <SidebarMenuItem>
                    <div className="px-2 pt-3 text-xs font-medium text-muted-foreground">
                        Organization
                    </div>
                </SidebarMenuItem>

                {organizationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {item.items ? (
                            <>
                                <SidebarMenuButton
                                    onClick={() => toggleMenu(item.title)}
                                    className="!text-[15px]"
                                >
                                    <item.icon />
                                    <span>{item.title}</span>
                                    <ChevronDown
                                        className={`ml-auto transition-transform duration-200 ${openMenus[item.title] ? "rotate-180" : ""
                                            }`}
                                    />
                                </SidebarMenuButton>
                                {openMenus[item.title] && (
                                    <SidebarMenuSub>
                                        {item.items.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton
                                                    isActive={subItem.url === pathname}
                                                    asChild
                                                >
                                                    <Link
                                                        to={subItem.url}
                                                        className="flex items-center gap-2 !text-[14px]"
                                                    >
                                                        <subItem.icon className="h-4 w-4" />
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                )}
                            </>
                        ) : (
                            <SidebarMenuButton isActive={item.url === pathname} asChild>
                                <Link to={item.url} className="!text-[15px]">
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}

                <SidebarMenuItem>
                    <div className="px-2 pt-3 text-xs font-medium text-muted-foreground">
                        Employee
                    </div>
                </SidebarMenuItem>

                {employeeItems.map((item) => (
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
                        {item.items ? (
                            <>
                                <SidebarMenuButton
                                    onClick={() => toggleMenu(item.title)}
                                    className="!text-[15px]"
                                >
                                    <item.icon />
                                    <span>{item.title}</span>
                                    <ChevronDown
                                        className={`ml-auto transition-transform duration-200 ${openMenus[item.title] ? "rotate-180" : ""
                                            }`}
                                    />
                                </SidebarMenuButton>
                                {openMenus[item.title] && (
                                    <SidebarMenuSub>
                                        {item.items.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton
                                                    isActive={subItem.url === pathname}
                                                    asChild
                                                >
                                                    <Link
                                                        to={subItem.url}
                                                        className="flex items-center gap-2 !text-[14px]"
                                                    >
                                                        <subItem.icon className="h-4 w-4" />
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}                                    </SidebarMenuSub>
                                )}
                            </>
                        ) : (
                            <SidebarMenuButton isActive={item.url === pathname} asChild>
                                <Link to={item.url} className="!text-[15px]">
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
