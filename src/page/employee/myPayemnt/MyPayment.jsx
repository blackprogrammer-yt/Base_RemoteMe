import { ArrowLeft, Calendar, Clock, PieChart, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyPayment = () => {
    const navigate = useNavigate();

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            {/* Header Section */}
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-auto items-center gap-2">
                        <Receipt className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            Statements & Activity
                        </h2>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Back</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Required Working Days Card */}
                <Card className="border shadow-sm rounded-lg overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/50">
                                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-semibold text-sm text-foreground">Required Working Days</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <Badge className="bg-slate-900 text-white hover:bg-slate-800 border-none text-xs px-3 py-1">
                                This Month
                            </Badge>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-foreground">0 Days</div>
                                <div className="text-xs text-muted-foreground font-medium mt-0.5">N/A</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Missing Timesheets Card */}
                <Card className="border shadow-sm rounded-lg overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-md bg-red-50 dark:bg-red-950/50">
                                <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                            <span className="font-semibold text-sm text-red-600 dark:text-red-400">Missing Timesheets</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <Badge className="bg-red-100 text-red-600 hover:bg-red-200 border-none text-xs px-3 py-1">
                                This Month
                            </Badge>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-foreground">0 Missing</div>
                                <div className="text-xs text-muted-foreground font-medium mt-0.5">N/A</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pay Summary Card */}
                <Card className="border shadow-sm rounded-lg overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/50">
                                <PieChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-semibold text-sm text-foreground">Pay Summary</span>
                        </div>
                        <div className="text-muted-foreground text-sm mt-6">
                            No payment summary available.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default MyPayment;
