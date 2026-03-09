import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, KeyRound, LogOut, User, UserCircle2 } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AvatarMenu = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdateProfile = () => {
        setIsOpen(false);
        navigate("/avatar/update-profile");
    };

    const handleChangePassword = () => {
        setIsOpen(false);
        navigate("/avatar/change-password");
    };

    const handleLogout = () => {
        setIsOpen(false);
        // Handle logout logic here
        console.log("Logout clicked");
    };

    return (
        <div className="flex items-center gap-2">
            <p className="hidden text-[14px] font-medium text-[#3f3f46] md:block">
                Welcome, <span className="font-semibold text-[#4f6dff]">Master Admin</span>
            </p>

            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        aria-label="Open profile menu"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1599c9] text-white transition hover:bg-[#1189b6]"
                    >
                        <User className="h-5 w-5" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-[260px] rounded-xl border border-[#e5e7eb] bg-white p-0 shadow-xl"
                >
                    <div className="flex flex-col items-center border-b border-[#eceff3] px-4 pb-5 pt-4">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1599c9] text-white">
                            <UserCircle2 className="h-14 w-14" />
                        </div>
                        <p className="mt-3 text-[16px] font-semibold leading-none text-[#2e3138]">Master Admin</p>
                        <p className="mt-2 text-[12px] text-[#7a7f87]">from.shahabkhan@gmail.com</p>
                    </div>

                    <div className="py-1">
                        <DropdownMenuItem 
                            className="h-12 cursor-pointer gap-3 rounded-none px-4 text-[14px] font-semibold text-[#69727d] focus:bg-[#eceff3]"
                            onClick={handleUpdateProfile}
                        >
                            <UserCircle2 className="h-5 w-5" />
                            <span>Update Profile</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="h-12 cursor-pointer gap-3 rounded-none bg-[#eceff3] px-4 text-[14px] font-semibold text-[#52565d] focus:bg-[#eceff3]">
                            <Eye className="h-5 w-5" />
                            <span>Show Salary</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                            className="h-12 cursor-pointer gap-3 rounded-none px-4 text-[14px] font-semibold text-[#69727d] focus:bg-[#eceff3]"
                            onClick={handleChangePassword}
                        >
                            <KeyRound className="h-5 w-5" />
                            <span>Change Password</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                            className="h-12 cursor-pointer gap-3 rounded-none px-4 text-[14px] font-semibold text-[#69727d] focus:bg-[#eceff3]"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default AvatarMenu;
