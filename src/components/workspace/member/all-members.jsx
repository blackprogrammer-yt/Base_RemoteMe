import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Loader } from "lucide-react";

import { Permissions } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import { toast } from "@/hooks/use-toast";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { changeWorkspaceMemberRoleMutationFn } from "@/lib/api";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const AllMembers = () => {
    const { user, hasPermission } = useAuthContext();
    const canChangeMemberRole = hasPermission(Permissions.CHANGE_MEMBER_ROLE);
    const queryClient = useQueryClient();
    const workspaceId = useWorkspaceId();

    const { data, isPending } = useGetWorkspaceMembers(workspaceId);
    const members = data?.members || [];
    const roles = data?.roles || [];

    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: changeWorkspaceMemberRoleMutationFn,
    });

    const handleSelect = (roleId, memberId) => {
        if (!roleId || !memberId) return;

        const payload = {
            workspaceId,
            data: {
                roleId,
                memberId,
            },
        };

        mutate(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["members", workspaceId],
                });
                toast({
                    title: "Success",
                    description: "Member's role changed successfully",
                    variant: "success",
                });
            },
            onError: (error) => {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <div className="grid gap-6 pt-2">
            {isPending ? (
                <Loader className="flex h-8 w-8 place-self-center animate-spin" />
            ) : null}

            {members?.map((member) => {
                const name = member.userId?.name;
                const initials = getAvatarFallbackText(name);
                const avatarColor = getAvatarColor(name);

                return (
                    <div
                        key={member.userId?._id}
                        className="flex items-center justify-between space-x-4"
                    >
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={member.userId?.profilePicture || ""}
                                    alt="Image"
                                />
                                <AvatarFallback className={avatarColor}>
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="text-sm font-medium leading-none">{name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {member.userId.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="ml-auto min-w-24 capitalize disabled:pointer-events-none disabled:opacity-95"
                                        disabled={
                                            isLoading ||
                                            !canChangeMemberRole ||
                                            member.userId._id === user?._id
                                        }
                                    >
                                        {member.role.name?.toLowerCase()}{" "}
                                        {canChangeMemberRole &&
                                            member.userId._id !== user?._id ? (
                                            <ChevronDown className="text-muted-foreground" />
                                        ) : null}
                                    </Button>
                                </PopoverTrigger>

                                {canChangeMemberRole ? (
                                    <PopoverContent className="p-0" align="end">
                                        <Command>
                                            <CommandInput
                                                placeholder="Select new role..."
                                                disabled={isLoading}
                                                className="disabled:pointer-events-none"
                                            />

                                            <CommandList>
                                                {isLoading ? (
                                                    <Loader className="my-4 flex h-8 w-8 place-self-center animate-spin" />
                                                ) : (
                                                    <>
                                                        <CommandEmpty>
                                                            No roles found.
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {roles?.map((role) =>
                                                                role.name !== "OWNER" ? (
                                                                    <CommandItem
                                                                        key={role._id}
                                                                        disabled={isLoading}
                                                                        className="mb-1 flex cursor-pointer flex-col items-start gap-1 px-4 py-2 disabled:pointer-events-none"
                                                                        onSelect={() => {
                                                                            handleSelect(
                                                                                role._id,
                                                                                member.userId
                                                                                    ._id,
                                                                            );
                                                                        }}
                                                                    >
                                                                        <p className="capitalize">
                                                                            {role.name?.toLowerCase()}
                                                                        </p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            {role.name === "ADMIN"
                                                                                ? "Can view, create, edit tasks, project and manage settings ."
                                                                                : null}
                                                                            {role.name === "MEMBER"
                                                                                ? "Can view,edit only task created by."
                                                                                : null}
                                                                        </p>
                                                                    </CommandItem>
                                                                ) : null,
                                                            )}
                                                        </CommandGroup>
                                                    </>
                                                )}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                ) : null}
                            </Popover>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AllMembers;
