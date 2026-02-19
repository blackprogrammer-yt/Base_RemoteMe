import AllMembers from "@/components/workspace/member/all-members";
import InviteMember from "@/components/workspace/member/invite-member";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import { Separator } from "@/components/ui/separator";

export default function Members() {
    return (
        <div className="h-auto w-full pt-2">
            <WorkspaceHeader />
            <Separator className="my-4 " />

            <main>
                <div className="mx-auto w-full max-w-3xl pt-3">
                    <div>
                        <h2 className="mb-1 text-lg font-semibold leading-[30px]">
                            Workspace members
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Workspace members can view and join all Workspace project,
                            tasks and create new task in the Workspace.
                        </p>
                    </div>

                    <Separator className="my-4" />
                    <InviteMember />
                    <Separator className="my-4 !h-[0.5px]" />
                    <AllMembers />
                </div>
            </main>
        </div>
    );
}
