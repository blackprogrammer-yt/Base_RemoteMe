import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetProjectsInWorkspaceQuery from "@/hooks/api/use-get-projects";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import useTaskTableFilter from "@/hooks/use-task-table-filter";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { DataTableFacetedFilter } from "./table/table-faceted-filter";
import { priorities, statuses } from "./table/data";
import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";

const TaskTable = () => {
    const param = useParams();
    const projectId = param.projectId;

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useTaskTableFilter();

    const workspaceId = useWorkspaceId();
    const columns = getColumns(projectId);

    const { data, isLoading } = useQuery({
        queryKey: [
            "all-tasks",
            workspaceId,
            pageSize,
            pageNumber,
            filters,
            projectId,
        ],
        queryFn: () =>
            getAllTasksQueryFn({
                workspaceId,
                keyword: filters.keyword,
                priority: filters.priority,
                status: filters.status,
                projectId: projectId || filters.projectId,
                assignedTo: filters.assigneeId,
                pageNumber,
                pageSize,
            }),
        staleTime: 0,
    });

    const tasks = data?.tasks || [];
    const totalCount = data?.pagination.totalCount || 0;

    const handlePageChange = (page) => {
        setPageNumber(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
    };

    return (
        <div className="relative w-full">
            <DataTable
                isLoading={isLoading}
                data={tasks}
                columns={columns}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                pagination={{
                    totalCount,
                    pageNumber,
                    pageSize,
                }}
                filtersToolbar={
                    <DataTableFilterToolbar
                        isLoading={isLoading}
                        projectId={projectId}
                        filters={filters}
                        setFilters={setFilters}
                    />
                }
            />
        </div>
    );
};

const DataTableFilterToolbar = ({ isLoading, projectId, filters, setFilters }) => {
    const workspaceId = useWorkspaceId();

    const { data } = useGetProjectsInWorkspaceQuery({
        workspaceId,
    });

    const { data: memberData } = useGetWorkspaceMembers(workspaceId);

    const projects = data?.projects || [];
    const members = memberData?.members || [];

    const projectOptions = projects?.map((project) => {
        return {
            label: (
                <div className="flex items-center gap-1">
                    <span>{project.emoji}</span>
                    <span>{project.name}</span>
                </div>
            ),
            value: project._id,
        };
    });

    const assigneesOptions = members?.map((member) => {
        const name = member.userId?.name || "Unknown";
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);

        return {
            label: (
                <div className="flex items-center space-x-2">
                    <Avatar className="h-7 w-7">
                        <AvatarImage src={member.userId?.profilePicture || ""} alt={name} />
                        <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                    </Avatar>
                    <span>{name}</span>
                </div>
            ),
            value: member.userId._id,
        };
    });

    const handleFilterChange = (key, values) => {
        setFilters({
            ...filters,
            [key]: values.length > 0 ? values.join(",") : null,
        });
    };

    return (
        <div className="mb-2 flex w-full flex-col items-start space-y-2 lg:mb-0 lg:flex-row lg:space-x-2 lg:space-y-0">
            <Input
                placeholder="Filter tasks..."
                value={filters.keyword || ""}
                onChange={(e) =>
                    setFilters({
                        keyword: e.target.value,
                    })
                }
                className="h-8 w-full lg:w-[250px]"
            />

            <DataTableFacetedFilter
                title="Status"
                multiSelect
                options={statuses}
                disabled={isLoading}
                selectedValues={filters.status?.split(",") || []}
                onFilterChange={(values) => handleFilterChange("status", values)}
            />

            <DataTableFacetedFilter
                title="Priority"
                multiSelect
                options={priorities}
                disabled={isLoading}
                selectedValues={filters.priority?.split(",") || []}
                onFilterChange={(values) => handleFilterChange("priority", values)}
            />

            <DataTableFacetedFilter
                title="Assigned To"
                multiSelect
                options={assigneesOptions}
                disabled={isLoading}
                selectedValues={filters.assigneeId?.split(",") || []}
                onFilterChange={(values) => handleFilterChange("assigneeId", values)}
            />

            {!projectId ? (
                <DataTableFacetedFilter
                    title="Projects"
                    multiSelect={false}
                    options={projectOptions}
                    disabled={isLoading}
                    selectedValues={filters.projectId?.split(",") || []}
                    onFilterChange={(values) => handleFilterChange("projectId", values)}
                />
            ) : null}

            {Object.values(filters).some((value) => value !== null && value !== "") ? (
                <Button
                    disabled={isLoading}
                    variant="ghost"
                    className="h-8 px-2 lg:px-3"
                    onClick={() =>
                        setFilters({
                            keyword: null,
                            status: null,
                            priority: null,
                            projectId: null,
                            assigneeId: null,
                        })
                    }
                >
                    Reset
                    <X />
                </Button>
            ) : null}
        </div>
    );
};

export default TaskTable;
