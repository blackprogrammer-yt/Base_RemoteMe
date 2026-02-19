import {
    Building2,
    Mail,
    RefreshCw,
    UserPlus,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AdminDashboard = () => {
    const stats = [
        {
            label: "Approved Organizations",
            value: 32,
            icon: Building2,
        },
        {
            label: "Online User",
            value: 1,
            helperText: "Within 5 minutes",
            icon: Users,
        },
        {
            label: "Signup Request",
            value: 0,
            icon: UserPlus,
        },
        {
            label: "Pending Invitation",
            value: 1,
            icon: Mail,
        },
    ];

    const quickActions = [
        {
            label: "Review Signup Requests",
            variant: "outline",
        },
        {
            label: "View Invitations",
            variant: "outline",
        },
        {
            label: "Manage Organizations",
            variant: "outline",
        },
        {
            label: "Invite Organization",
            variant: "default",
        },
    ];

    return (
        <main className="flex flex-1 flex-col py-4 md:pt-3">
            <section className="mb-6 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">
                    Welcome, <span className="text-primary">Master Admin!</span>
                </h2>
                <p className="text-muted-foreground">
                    Here&apos;s your admin dashboard overview
                </p>
            </section>

            <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Card
                            key={item.label}
                            className="border-0 bg-muted/40 shadow-none"
                        >
                            <CardContent className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            {item.label}
                                        </p>
                                        {item.helperText ? (
                                            <p className="text-xs text-muted-foreground">
                                                {item.helperText}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>

                                <p className="text-2xl font-semibold">{item.value}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>

            <section className="mb-6">
                <Card className="border-0 bg-muted/40 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle className="text-base font-semibold">
                                Quick Actions
                            </CardTitle>
                            <CardDescription>
                                Jump into the most common admin tasks
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {quickActions.map((action) => (
                            <Button
                                key={action.label}
                                variant={action.variant}
                                className="h-11 justify-center"
                                size="lg"
                            >
                                {action.label}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <section>
                <Card className="shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
                            <CardTitle>System Overview</CardTitle>
                            <CardDescription>
                                Summary of organizations and employees in the system
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg bg-muted/60 p-4">
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Organizations
                            </p>
                            <p className="mt-2 text-2xl font-bold">47</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                organizations registered
                            </p>
                        </div>
                        <div className="rounded-lg bg-muted/60 p-4">
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Employees
                            </p>
                            <p className="mt-2 text-2xl font-bold">121</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                employees in system
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
};

export default AdminDashboard;
