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
            <section className="mb-8 space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Welcome, <span className="text-primary">Master Admin!</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                    Here&apos;s your admin dashboard overview
                </p>
            </section>

            <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Card
                            key={item.label}
                            className="relative flex flex-auto flex-col overflow-hidden rounded-xl border-0 bg-card shadow-sm dark:border dark:border-border/50"
                        >
                            <CardContent className="flex flex-col p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {item.label}
                                        </p>
                                        {item.helperText && (
                                            <p className="text-xs text-muted-foreground">
                                                {item.helperText}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <p className="text-3xl font-bold tracking-tight">{item.value}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </section>

            <section className="mb-8">
                <Card className="rounded-xl border-0 bg-card shadow-sm dark:border dark:border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
                        <div>
                            <CardTitle className="text-lg font-bold leading-6">
                                Quick Actions
                            </CardTitle>
                            <CardDescription className="text-sm">
                                Jump into the most common admin tasks
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-3 p-6 md:grid-cols-2 xl:grid-cols-4">
                        {quickActions.map((action) => (
                            <Button
                                key={action.label}
                                variant={action.variant}
                                className="h-11 justify-center rounded-lg text-sm font-medium"
                                size="lg"
                            >
                                {action.label}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <section>
                <Card className="rounded-xl border-0 bg-card shadow-sm dark:border dark:border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
                        <div>
                            <CardTitle className="text-lg font-bold leading-6">System Overview</CardTitle>
                            <CardDescription className="text-sm">
                                Summary of organizations and employees in the system
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </CardHeader>
                    <CardContent className="grid gap-4 p-6 md:grid-cols-2">
                        <div className="relative overflow-hidden rounded-xl bg-muted/50 p-6">
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Organizations
                            </p>
                            <p className="mt-3 text-3xl font-bold">47</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                organizations registered
                            </p>
                        </div>
                        <div className="relative overflow-hidden rounded-xl bg-muted/50 p-6">
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Employees
                            </p>
                            <p className="mt-3 text-3xl font-bold">121</p>
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
