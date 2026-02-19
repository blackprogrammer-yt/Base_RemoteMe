import { Loader } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth-provider";

const WorkspaceHeader = () => {
    const { workspaceLoading, workspace } = useAuthContext();

    return (
        <div className="mx-auto w-full max-w-3xl pb-2">
            {workspaceLoading ? (
                <Loader className="h-8 w-8 animate-spin" />
            ) : (
                <div className="flex items-center gap-4">
                    <Avatar className="size-[60px] rounded-lg font-bold">
                        <AvatarFallback className="rounded-lg bg-gradient-to-tl from-black to-black text-[35px] text-white">
                            {workspace?.name?.split(" ")?.[0]?.charAt(0) || "W"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="grid flex-1 text-left leading-tight">
                        <span className="truncate text-xl font-semibold">
                            {workspace?.name}
                        </span>
                        <span className="truncate text-sm">Free</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkspaceHeader;
