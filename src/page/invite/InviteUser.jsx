import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { invitedUserJoinWorkspaceMutationFn } from "@/lib/api";

const InviteUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const param = useParams();
    const inviteCode = param.inviteCode;
    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: invitedUserJoinWorkspaceMutationFn,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(inviteCode, {
            onSuccess: (data) => {
                queryClient.resetQueries({
                    queryKey: ["userWorkspaces"],
                });
                navigate(`/workspace/${data.workspaceId}`);
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
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link to="/" className="flex items-center gap-2 self-center font-medium">
                    <Logo />
                    Team Sync.
                </Link>

                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">
                                Hey there! You're invited to join a TeamSync Workspace!
                            </CardTitle>
                            <CardDescription>
                                Looks like you need to be logged into your TeamSync account to
                                join this Workspace.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="my-3 flex items-center justify-center">
                                <form onSubmit={handleSubmit}>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="!bg-green-500 !text-white text-[23px] !h-auto"
                                    >
                                        {isLoading && (
                                            <Loader className="!w-6 !h-6 animate-spin" />
                                        )}
                                        Join the Workspace
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default InviteUser;
