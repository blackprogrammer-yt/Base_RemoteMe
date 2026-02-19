import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PermissionsGuard from "@/components/resuable/permission-guard";
import { Permissions } from "@/constant";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getProjectByIdQueryFn } from "@/lib/api";
import CreateTaskDialog from "../task/create-task-dialog";
import EditProjectDialog from "./edit-project-dialog";

const ProjectHeader = () => {
    const param = useParams();
    const projectId = param.projectId;
    const workspaceId = useWorkspaceId();

    const { data, isPending, isError } = useQuery({
        queryKey: ["singleProject", projectId],
        queryFn: () =>
            getProjectByIdQueryFn({
                workspaceId,
                projectId,
            }),
        staleTime: Infinity,
        enabled: !!projectId,
        placeholderData: keepPreviousData,
    });

    const project = data?.project;
    const projectEmoji = project?.emoji || "📊";
    const projectName = project?.name || "Untitled project";

    const renderContent = () => {
        if (isPending) return <span>Loading...</span>;
        if (isError) return <span>Error occured</span>;

        return (
            <>
                <span>{projectEmoji}</span>
                {projectName}
            </>
        );
    };

    return (
        <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center gap-2">
                <h2 className="truncate tracking-tight flex items-center gap-3 text-xl font-medium">
                    {renderContent()}
                </h2>

                <PermissionsGuard requiredPermission={Permissions.EDIT_PROJECT}>
                    <EditProjectDialog project={project} />
                </PermissionsGuard>
            </div>

            <CreateTaskDialog projectId={projectId} />
        </div>
    );
};

export default ProjectHeader;
