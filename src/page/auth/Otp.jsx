import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import Logo from "@/components/logo";
import { toast } from "@/hooks/use-toast";

const Otp = () => {
    const formSchema = z.object({
        code: z
            .string()
            .trim()
            .min(6, { message: "Enter the 6-digit code" })
            .max(6, { message: "Enter the 6-digit code" }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
    });

    const [codeDigits, setCodeDigits] = useState(Array.from({ length: 6 }, () => ""));
    const inputRefs = useRef([]);

    useEffect(() => {
        form.setValue("code", codeDigits.join(""));
    }, [codeDigits, form]);

    const onSubmit = (values) => {
        toast({
            title: "OTP verified",
            description: `Code ${values.code} verified successfully.`,
        });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link to="/" className="flex items-center gap-2 self-center font-medium">
                    <Logo />
                    Team Sync.
                </Link>

                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Verify OTP</CardTitle>
                            <CardDescription>
                                Enter the 6-digit code sent to your email
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="code"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                                            OTP code
                                                        </FormLabel>

                                                        <FormControl>
                                                            <div
                                                                className="flex items-center justify-between gap-2"
                                                                onPaste={(event) => {
                                                                    const pasted = event.clipboardData
                                                                        .getData("text")
                                                                        .replace(/\D/g, "")
                                                                        .slice(0, 6);

                                                                    if (!pasted) return;

                                                                    event.preventDefault();
                                                                    const next = Array.from(
                                                                        { length: 6 },
                                                                        (_, idx) =>
                                                                            pasted[idx]
                                                                                ? pasted[idx]
                                                                                : ""
                                                                    );
                                                                    setCodeDigits(next);

                                                                    const focusIndex = Math.min(
                                                                        pasted.length,
                                                                        inputRefs.current.length -
                                                                        1
                                                                    );
                                                                    inputRefs.current[
                                                                        focusIndex
                                                                    ]?.focus();
                                                                }}
                                                            >
                                                                {codeDigits.map(
                                                                    (value, index) => (
                                                                        <input
                                                                            key={index}
                                                                            ref={(element) => {
                                                                                inputRefs.current[
                                                                                    index
                                                                                ] =
                                                                                    element;
                                                                            }}
                                                                            type="text"
                                                                            inputMode="numeric"
                                                                            autoComplete="one-time-code"
                                                                            maxLength={1}
                                                                            className="h-10 w-10 rounded-md border border-input bg-background text-center text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                                            value={value}
                                                                            onChange={(
                                                                                event
                                                                            ) => {
                                                                                const nextValue =
                                                                                    event.target.value.replace(
                                                                                        /\D/g,
                                                                                        ""
                                                                                    );
                                                                                const digit =
                                                                                    nextValue.slice(
                                                                                        -1
                                                                                    );
                                                                                const next = [
                                                                                    ...codeDigits,
                                                                                ];
                                                                                next[index] =
                                                                                    digit ||
                                                                                    "";
                                                                                setCodeDigits(
                                                                                    next
                                                                                );

                                                                                if (
                                                                                    digit &&
                                                                                    index < 5
                                                                                ) {
                                                                                    inputRefs.current[
                                                                                        index +
                                                                                        1
                                                                                    ]?.focus();
                                                                                }

                                                                                if (!digit) {
                                                                                    inputRefs.current[
                                                                                        index
                                                                                    ]?.focus();
                                                                                }
                                                                            }}
                                                                            onKeyDown={(
                                                                                event
                                                                            ) => {
                                                                                if (
                                                                                    event.key !==
                                                                                    "Backspace"
                                                                                ) {
                                                                                    return;
                                                                                }

                                                                                if (
                                                                                    !codeDigits[
                                                                                    index
                                                                                    ] &&
                                                                                    index > 0
                                                                                ) {
                                                                                    const next = [
                                                                                        ...codeDigits,
                                                                                    ];
                                                                                    next[
                                                                                        index - 1
                                                                                    ] = "";
                                                                                    setCodeDigits(
                                                                                        next
                                                                                    );
                                                                                    inputRefs.current[
                                                                                        index - 1
                                                                                    ]?.focus();
                                                                                }
                                                                            }}
                                                                            aria-label={`OTP digit ${index + 1}`}
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                        </FormControl>

                                                        <input type="hidden" {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit" className="w-full">
                                                Verify
                                            </Button>
                                        </div>

                                        <div className="text-center text-sm">
                                            Didn't get the code?{" "}
                                            <Link
                                                to="/forgot-password"
                                                className="underline underline-offset-4"
                                            >
                                                Resend
                                            </Link>
                                        </div>

                                        <div className="text-center text-sm">
                                            Back to{" "}
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
                        By continuing, you agree to our <a href="#">Terms</a> and{" "}
                        <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Otp;
