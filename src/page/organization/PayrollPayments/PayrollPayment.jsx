import { useState } from "react";
import { Folder, Calendar as CalendarIcon, DollarSign, FileText } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const PayrollPayment = () => {
    const [date, setDate] = useState(null);
    const navigate = useNavigate();

    // Mock data for payment cycles
    const paymentCycles = [
        {
            id: 1,
            month: "February 2026",
            status: "Completed",
            startDate: "Feb 1, 2026",
            endDate: "Feb 28, 2026",
            contractAmount: {
                primary: "₱8,100.00",
                secondary: "$2,207.69",
            },
            invoiceAmount: {
                primary: "₱8,100.00",
                secondary: "$2,207.69",
            },
            bgColor: "bg-emerald-500",
            borderColor: "border-emerald-500",
        },
        {
            id: 2,
            month: "December 2025",
            status: "Completed",
            startDate: "Dec 1, 2025",
            endDate: "Dec 31, 2025",
            contractAmount: {
                primary: "₱50,601.00",
                secondary: "$13,791.50",
            },
            invoiceAmount: {
                primary: "₱51,218.75",
                secondary: "$13,959.87",
            },
            bgColor: "bg-blue-500",
            borderColor: "border-blue-500",
        },
    ];

    return (
        <main className="flex flex-1 flex-col py-4 md:pt-3">
            {/* Header */}
            <section className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <Folder className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Payroll Payments
                    </h2>
                </div>
                <Button className="h-9 gap-2">
                    Generate Payment Cycle
                </Button>
            </section>

            {/* Filter Section */}
            <section className="mb-6">
                <div className="flex items-center gap-3">
                    <Label className="text-base font-medium text-foreground">
                        Filter by Month:
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-[200px] justify-start text-left font-normal h-9",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "MMMM yyyy") : "--------- ----"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </section>

            {/* Payment Cycles Grid */}
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {paymentCycles.map((cycle) => (
                    <Card
                        key={cycle.id}
                        onClick={() =>
                            navigate(
                                PROTECTED_ROUTES.ORGANIZATION_PAYROLL_PAYMENT_DETAIL.replace(
                                    ":payrollId",
                                    String(cycle.id)
                                )
                            )
                        }
                        className={cn(
                            "overflow-hidden border-l-[6px] shadow-sm cursor-pointer transition-colors hover:bg-muted/30",
                            cycle.borderColor
                        )}
                    >
                        <CardContent className="p-6">
                            {/* Card Header */}
                            <div
                                className={cn(
                                    "mb-4 flex items-center justify-between rounded-lg px-4 py-3 text-white",
                                    cycle.bgColor
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <Folder className="h-5 w-5" />
                                    <span className="text-lg font-semibold">
                                        {cycle.month}
                                    </span>
                                </div>
                                <span className="text-sm font-medium">
                                    Status: {cycle.status}
                                </span>
                            </div>

                            {/* Cycle Details */}
                            <div className="space-y-4">
                                {/* Cycle Dates */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium text-muted-foreground">
                                            Cycle
                                        </span>
                                    </div>
                                    <div className="ml-6 space-y-1 text-sm">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                Start Date:
                                            </span>
                                            <span className="font-medium">
                                                {cycle.startDate}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                End Date:
                                            </span>
                                            <span className="font-medium">
                                                {cycle.endDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contract Amount */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium text-muted-foreground">
                                            Contract Amount
                                        </span>
                                    </div>
                                    <div className="ml-6 space-y-1">
                                        <div className="text-xl font-bold text-blue-600">
                                            {cycle.contractAmount.primary}
                                        </div>
                                        <div className="text-lg font-semibold text-blue-600">
                                            {cycle.contractAmount.secondary}
                                        </div>
                                    </div>
                                </div>

                                {/* Invoice Amount */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium text-muted-foreground">
                                            Invoice Amount
                                        </span>
                                    </div>
                                    <div className="ml-6 space-y-1">
                                        <div className="text-xl font-bold text-emerald-600">
                                            {cycle.invoiceAmount.primary}
                                        </div>
                                        <div className="text-lg font-semibold text-emerald-600">
                                            {cycle.invoiceAmount.secondary}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </main>
    );
};

export default PayrollPayment;
