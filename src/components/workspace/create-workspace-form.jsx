import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createWorkspaceMutationFn } from "@/lib/api";

export default function CreateWorkspaceForm({ onClose }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createWorkspaceMutationFn,
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

    const onSubmit = (values) => {
        if (isPending) return;

        mutate(values, {
            onSuccess: (data) => {
                queryClient.resetQueries({
                    queryKey: ["userWorkspaces"],
                });
                const workspace = data.workspace;
                onClose();
                navigate(`/workspace/${workspace._id}`);
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
        <main className="flex h-auto min-h-[590px] w-full max-w-full flex-row">
            <div className="h-full flex-1 px-10 py-10">
                <div className="mb-5">
                    <h1 className="mb-1.5 text-center text-2xl font-semibold tracking-[-0.16px] dark:text-[#fcfdffef] sm:text-left">
                        Let's build a Workspace
                    </h1>
                    <p className="text-lg leading-tight text-muted-foreground">
                        Optimize workflow by ensuring every project is available from one
                        central spot.
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
                                            Workspace name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Guru's Co."
                                                className="!h-[48px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is the name of your company, team or
                                            organization.
                                        </FormDescription>
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
                                                placeholder="where our team manages all marketing projects and tasks."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            - Invite your team to join by sharing a quick
                                            note about your Workspace.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={isPending}
                            className="h-[40px] w-full font-semibold text-white"
                            type="submit"
                        >
                            {isPending && <Loader className="animate-spin" />}
                            Create Workspace
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="relative hidden h-full shrink-0 flex-1 bg-muted bg-[url('/images/workspace.jpg')] bg-cover bg-center md:block" />
        </main>
    );
}
