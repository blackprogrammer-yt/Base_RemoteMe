import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAllTasksQueryFn } from "@/lib/api";
import {
    getAvatarColor,
    getAvatarFallbackText,
    transformStatusEnum,
} from "@/lib/helper";

const RecentTasks = () => {
    const workspaceId = useWorkspaceId();

    const { data, isLoading } = useQuery({
        queryKey: ["all-tasks", workspaceId],
        queryFn: () =>
            getAllTasksQueryFn({
                workspaceId,
            }),
        staleTime: 0,
        enabled: !!workspaceId,
    });

    const tasks = data?.tasks || [];

    return (
        <div className="flex flex-col space-y-6">
            {isLoading ? (
                <Loader className="flex h-8 w-8 place-self-center animate-spin" />
            ) : null}

            {tasks?.length === 0 ? (
                <div className="py-5 text-center text-sm font-semibold text-muted-foreground">
                    No Task created yet
                </div>
            ) : null}

            <ul role="list" className="divide-y divide-gray-200">
                {tasks.map((task) => {
                    const name = task?.assignedTo?.name || "";
                    const initials = getAvatarFallbackText(name);
                    const avatarColor = getAvatarColor(name);

                    return (
                        <li
                            key={task._id}
                            className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                        >
                            <div className="flex flex-grow flex-col space-y-1">
                                <span className="text-sm font-medium capitalize text-gray-600">
                                    {task.taskCode}
                                </span>
                                <p className="text-md truncate font-semibold text-gray-800">
                                    {task.title}
                                </p>
                                <span className="text-sm text-gray-500">
                                    Due: {task.dueDate ? format(task.dueDate, "PPP") : null}
                                </span>
                            </div>

                            <div className="text-sm font-medium">
                                <Badge
                                    variant={TaskStatusEnum[task.status]}
                                    className="flex w-auto gap-1 border-0 p-1 px-2 font-medium uppercase shadow-sm"
                                >
                                    <span>{transformStatusEnum(task.status)}</span>
                                </Badge>
                            </div>

                            <div className="ml-2 text-sm">
                                <Badge
                                    variant={TaskPriorityEnum[task.priority]}
                                    className="flex w-auto gap-1 border-0 p-1 px-2 font-medium uppercase shadow-sm"
                                >
                                    <span>{transformStatusEnum(task.priority)}</span>
                                </Badge>
                            </div>

                            <div className="ml-2 flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={task.assignedTo?.profilePicture || ""}
                                        alt={task.assignedTo?.name}
                                    />
                                    <AvatarFallback className={avatarColor}>
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RecentTasks;
