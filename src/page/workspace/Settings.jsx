import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";
import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";
import WorkspaceHeader from "@/components/workspace/common/workspace-header";
import { Separator } from "@/components/ui/separator";
import { Permissions } from "@/constant";
import withPermission from "@/hoc/with-permission";

const Settings = () => {

    return (
        <div className="h-auto w-full py-2">
            <WorkspaceHeader />
            <Separator className="my-4 " />

            <main>
                <div className="mx-auto w-full max-w-3xl py-3">
                    <h2 className="mb-3 text-[20px] font-semibold leading-[30px]">
                        Workspace settings
                    </h2>

                    <div className="flex flex-col px-0 pt-0.5 ">
                        <div className="pt-2">
                            <EditWorkspaceForm />
                        </div>

                        <div className="pt-2">
                            <DeleteWorkspaceCard />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SettingsWithPermission = withPermission(Settings, Permissions.MANAGE_WORKSPACE_SETTINGS);

export default SettingsWithPermission;
