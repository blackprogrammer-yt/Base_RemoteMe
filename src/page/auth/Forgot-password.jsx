import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import { toast } from "@/hooks/use-toast";

const ForgotPassword = () => {
    const formSchema = z.object({
        email: z.string().trim().email("Invalid email address").min(1, {
            message: "Email is required",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values) => {
        toast({
            title: "Check your email",
            description: `We sent a reset link to ${values.email}.`,
        });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link to="/" className="flex items-center gap-2 self-center font-medium">
                    <Logo />
                    Ultimate Work
                </Link>

                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Forgot password</CardTitle>
                            <CardDescription>
                                Enter your email and we will send a reset link
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                                            Email
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="m@example.com"
                                                                className="!h-[48px]"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit" className="w-full">
                                                Send reset link
                                            </Button>
                                        </div>

                                        <div className="text-center text-sm">
                                            Remembered your password?{" "}
                                            <Link
                                                to="/"
                                                className="underline underline-offset-4"
                                            >
                                                Sign in
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                        Need help? <a href="#">Contact support</a>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
