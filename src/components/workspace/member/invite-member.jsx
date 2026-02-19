import { useState } from "react";
import { CheckIcon, CopyIcon, Loader } from "lucide-react";

import PermissionsGuard from "@/components/resuable/permission-guard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Permissions } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import { toast } from "@/hooks/use-toast";
import { BASE_ROUTE } from "@/routes/common/routePaths";

const InviteMember = () => {
    const { workspace, workspaceLoading } = useAuthContext();
    const [copied, setCopied] = useState(false);

    const inviteUrl = workspace
        ? `${window.location.origin}${BASE_ROUTE.INVITE_URL.replace(":inviteCode", workspace.inviteCode)}`
        : "";

    const handleCopy = () => {
        if (inviteUrl) {
            navigator.clipboard.writeText(inviteUrl).then(() => {
                setCopied(true);
                toast({
                    title: "Copied",
                    description: "Invite url copied to clipboard",
                    variant: "success",
                });
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <div className="flex flex-col px-0 pt-0.5">
            <h5 className="mb-1 text-lg font-semibold leading-[30px]">
                Invite members to join you
            </h5>
            <p className="text-sm leading-tight text-muted-foreground">
                Anyone with an invite link can join this free Workspace. You can also
                disable and create a new invite link for this Workspace at any time.
            </p>

            <PermissionsGuard showMessage requiredPermission={Permissions.ADD_MEMBER}>
                {workspaceLoading ? (
                    <Loader className="flex h-8 w-8 place-self-center animate-spin" />
                ) : (
                    <div className="flex gap-2 py-3">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            disabled
                            className="disabled:pointer-events-none disabled:opacity-100"
                            value={inviteUrl}
                            readOnly
                        />
                        <Button
                            disabled={false}
                            className="shrink-0"
                            size="icon"
                            onClick={handleCopy}
                        >
                            {copied ? <CheckIcon /> : <CopyIcon />}
                        </Button>
                    </div>
                )}
            </PermissionsGuard>
        </div>
    );
};

export default InviteMember;
