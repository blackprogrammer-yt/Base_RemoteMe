import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { editProjectMutationFn } from "@/lib/api";

export default function EditProjectForm(props) {
    const { project, onClose } = props;
    const workspaceId = useWorkspaceId();
    const queryClient = useQueryClient();
    const [emoji, setEmoji] = useState("📊");
    const projectId = project?._id;

    const formSchema = z.object({
        name: z.string().trim().min(1, {
            message: "Project title is required",
        }),
        description: z.string().trim(),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: editProjectMutationFn,
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        if (project) {
            setEmoji(project.emoji);
            form.setValue("name", project.name);
            form.setValue("description", project.description);
        }
    }, [form, project]);

    const onSubmit = (values) => {
        if (isPending) return;

        const payload = {
            projectId,
            workspaceId,
            data: { emoji, ...values },
        };

        mutate(payload, {
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ["singleProject", projectId],
                });
                queryClient.invalidateQueries({
                    queryKey: ["allprojects", workspaceId],
                });
                toast({
                    title: "Success",
                    description: data.message,
                    variant: "success",
                });
                setTimeout(() => onClose(), 100);
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
                    <h1 className="mb-1 text-center text-xl font-semibold tracking-[-0.16px] dark:text-[#fcfdffef] sm:text-left">
                        Edit Project
                    </h1>
                    <p className="text-sm leading-tight text-muted-foreground">
                        Update the project details to refine task management
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                                            Project title
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" className="!h-[48px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                                            Project description
                                            <span className="ml-2 text-xs font-extralight">
                                                Optional
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={4}
                                                placeholder="Projects description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={isPending}
                            className="flex h-[40px] place-self-end font-semibold text-white"
                            type="submit"
                        >
                            {isPending && <Loader className="animate-spin" />}
                            Update
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
