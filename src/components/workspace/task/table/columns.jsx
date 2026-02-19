import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import {
    formatStatusToEnum,
    getAvatarColor,
    getAvatarFallbackText,
} from "@/lib/helper";
import { priorities, statuses } from "./data";
import { DataTableColumnHeader } from "./table-column-header";
import { DataTableRowActions } from "./table-row-actions";

export const getColumns = (projectId) => {
    const columns = [
        {
            id: "_id",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-[2px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Title" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex flex-wrap space-x-2">
                        <Badge variant="outline" className="h-[25px] shrink-0 capitalize">
                            {row.original.taskCode}
                        </Badge>
                        <span className="block max-w-[200px] font-medium lg:max-w-[220px]">
                            {row.original.title}
                        </span>
                    </div>
                );
            },
        },
        ...(projectId
            ? []
            : [
                {
                    accessorKey: "project",
                    header: ({ column }) => (
                        <DataTableColumnHeader column={column} title="Project" />
                    ),
                    cell: ({ row }) => {
                        const project = row.original.project;
                        if (!project) {
                            return null;
                        }

                        return (
                            <div className="flex items-center gap-1">
                                <span className="rounded-full border">{project.emoji}</span>
                                <span className="block w-[100px] truncate text-ellipsis capitalize">
                                    {project.name}
                                </span>
                            </div>
                        );
                    },
                },
            ]),
        {
            accessorKey: "assignedTo",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Assigned To" />
            ),
            cell: ({ row }) => {
                const assignee = row.original.assignedTo || null;
                const name = assignee?.name || "";
                const initials = getAvatarFallbackText(name);
                const avatarColor = getAvatarColor(name);

                return name ? (
                    <div className="flex items-center gap-1">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={assignee?.profilePicture || ""} alt={name} />
                            <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                        </Avatar>
                        <span className="block w-[100px] truncate text-ellipsis">
                            {assignee?.name}
                        </span>
                    </div>
                ) : null;
            },
        },
        {
            accessorKey: "dueDate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Due Date" />
            ),
            cell: ({ row }) => {
                return (
                    <span className="text-sm lg:max-w-[100px]">
                        {row.original.dueDate ? format(row.original.dueDate, "PPP") : null}
                    </span>
                );
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = statuses.find(
                    (statusItem) => statusItem.value === row.getValue("status"),
                );
                if (!status) {
                    return null;
                }

                const statusKey = formatStatusToEnum(status.value);
                const Icon = status.icon;
                if (!Icon) {
                    return null;
                }

                return (
                    <div className="flex items-center lg:w-[120px]">
                        <Badge
                            variant={TaskStatusEnum[statusKey]}
                            className="flex w-auto gap-1 border-0 p-1 px-2 font-medium uppercase shadow-sm"
                        >
                            <Icon className="h-4 w-4 rounded-full text-inherit" />
                            <span>{status.label}</span>
                        </Badge>
                    </div>
                );
            },
        },
        {
            accessorKey: "priority",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Priority" />
            ),
            cell: ({ row }) => {
                const priority = priorities.find(
                    (priorityItem) => priorityItem.value === row.getValue("priority"),
                );
                if (!priority) {
                    return null;
                }

                const statusKey = formatStatusToEnum(priority.value);
                const Icon = priority.icon;
                if (!Icon) {
                    return null;
                }

                return (
                    <div className="flex items-center">
                        <Badge
                            variant={TaskPriorityEnum[statusKey]}
                            className="flex gap-1 border-0 p-1 font-medium uppercase !bg-transparent !shadow-none lg:w-[110px]"
                        >
                            <Icon className="h-4 w-4 rounded-full text-inherit" />
                            <span>{priority.label}</span>
                        </Badge>
                    </div>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions row={row} />,
        },
    ];

    return columns;
};
