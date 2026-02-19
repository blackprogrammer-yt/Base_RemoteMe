import { useEffect } from "react";
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
import { Permissions } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import { toast } from "@/hooks/use-toast";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { editWorkspaceMutationFn } from "@/lib/api";

export default function EditWorkspaceForm() {
    const { workspace, hasPermission } = useAuthContext();
    const canEditWorkspace = hasPermission(Permissions.EDIT_WORKSPACE);
    const queryClient = useQueryClient();
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useMutation({
        mutationFn: editWorkspaceMutationFn,
    });

    const formSchema = z.object({
        name: z.string().trim().min(1, {
            message: "Workspace name is required",
        }),
        description: z.string().trim(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        if (workspace) {
            form.setValue("name", workspace.name);
            form.setValue("description", workspace?.description || "");
        }
    }, [form, workspace]);

    const onSubmit = (values) => {
        if (isPending) return;

        const payload = {
            workspaceId,
            data: { ...values },
        };

        mutate(payload, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["workspace"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["userWorkspaces"],
                });
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
                <div className="mb-5 border-b">
                    <h1 className="mb-1.5 text-center text-[17px] font-semibold tracking-[-0.16px] dark:text-[#fcfdffef] sm:text-left">
                        Edit Workspace
                    </h1>
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
                                            Workspace name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Taco's Co."
                                                className="!h-[48px] disabled:pointer-events-none disabled:opacity-90"
                                                disabled={!canEditWorkspace}
                                                {...field}
                                            />
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
                                            Workspace description
                                            <span className="ml-2 text-xs font-extralight">
                                                Optional
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={6}
                                                disabled={!canEditWorkspace}
                                                className="disabled:pointer-events-none disabled:opacity-90"
                                                placeholder="Our team organizes marketing projects and tasks here."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {canEditWorkspace ? (
                            <Button
                                className="flex h-[40px] place-self-end font-semibold text-white"
                                disabled={isPending}
                                type="submit"
                            >
                                {isPending && <Loader className="animate-spin" />}
                                Update Workspace
                            </Button>
                        ) : null}
                    </form>
                </Form>
            </div>
        </div>
    );
}
