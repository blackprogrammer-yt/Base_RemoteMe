import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import { toast } from "@/hooks/use-toast";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { editTaskMutationFn } from "@/lib/api";

export default function EditTaskForm({ task, onClose }) {
    const queryClient = useQueryClient();
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useMutation({
        mutationFn: editTaskMutationFn,
    });

    const { data: memberData } = useGetWorkspaceMembers(workspaceId);
    const members = memberData?.members || [];

    const membersOptions = members.map((member) => ({
        label: member.userId?.name || "Unknown",
        value: member.userId?._id || "",
    }));

    const statusOptions = Object.values(TaskStatusEnum).map((status) => ({
        label: status.charAt(0) + status.slice(1).toLowerCase(),
        value: status,
    }));

    const priorityOptions = Object.values(TaskPriorityEnum).map((priority) => ({
        label: priority.charAt(0) + priority.slice(1).toLowerCase(),
        value: priority,
    }));

    const formSchema = z.object({
        title: z.string().trim().min(1, { message: "Title is required" }),
        description: z.string().trim(),
        status: z.enum(Object.values(TaskStatusEnum)),
        priority: z.enum(Object.values(TaskPriorityEnum)),
        assignedTo: z.string().trim().min(1, { message: "AssignedTo is required" }),
        dueDate: z.date({ required_error: "A due date is required." }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: task?.title ?? "",
            description: task?.description ?? "",
            status: task?.status ?? "TODO",
            priority: task?.priority ?? "MEDIUM",
            assignedTo: task.assignedTo?._id ?? "",
            dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(),
        },
    });

    const onSubmit = (values) => {
        if (isPending) return;

        const payload = {
            workspaceId,
            projectId: task.project?._id ?? "",
            taskId: task._id,
            data: {
                ...values,
                dueDate: values.dueDate.toISOString(),
            },
        };

        mutate(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["all-tasks", workspaceId],
                });
                toast({
                    title: "Success",
                    description: "Task updated successfully",
                    variant: "success",
                });
                onClose();
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
        <div className="h-auto w-full max-w-full">
            <div className="h-full">
                <div className="mb-5 border-b pb-2">
                    <h1 className="text-center text-xl font-semibold sm:text-left">
                        Edit Task
                    </h1>
                </div>

                <Form {...form}>
                    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Task title" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={2} placeholder="Description" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="assignedTo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assigned To</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an assignee" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <div className="scrollbar max-h-[200px] w-full overflow-y-auto">
                                                {membersOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </div>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline">
                                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {statusOptions.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {priorityOptions.map((priority) => (
                                                <SelectItem
                                                    key={priority.value}
                                                    value={priority.value}
                                                >
                                                    {priority.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending && <Loader className="animate-spin" />}
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
