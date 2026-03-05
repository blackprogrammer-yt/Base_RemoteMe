import { ArrowLeft, Calendar, Clock, PieChart, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyPayment = () => {
    const navigate = useNavigate();

    return (
        <main className="flex flex-1 flex-col gap-8 p-6 md:p-8 bg-slate-50/50 min-h-screen">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                        <Receipt className="h-6 w-6 text-black" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-700">
                        Statements & Activity
                    </h2>
                </div>
                <Button 
                    variant="default" 
                    className="bg-black hover:bg-black/80 text-white flex items-center gap-2 px-6 h-10 rounded-lg shadow-md transition-all active:scale-95"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Required Working Days Card */}
                <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] bg-white rounded-xl overflow-hidden transition-all hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 rounded-md bg-blue-50">
                                <Calendar className="h-5 w-5 text-black" />
                            </div>
                            <span className="font-bold text-black tracking-tight">Required Working Days</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <Badge className="bg-black/80 text-white hover:bg-black border-none font-semibold px-4 py-1.5 rounded-md text-sm">
                                This Month
                            </Badge>
                            <div className="text-right">
                                <div className="text-4xl font-black text-slate-700 leading-none">0 Days</div>
                                <div className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-wider">N/A</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Missing Timesheets Card */}
                <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] bg-white rounded-xl overflow-hidden transition-all hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 rounded-md bg-red-50">
                                <Clock className="h-5 w-5 text-red-500" />
                            </div>
                            <span className="font-bold text-red-500 tracking-tight">Missing Timesheets</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <Badge className="bg-red-100/80 text-red-600 hover:bg-red-100 border-none font-semibold px-4 py-1.5 rounded-md text-sm">
                                This Month
                            </Badge>
                            <div className="text-right">
                                <div className="text-4xl font-black text-slate-700 leading-none">0 Missing</div>
                                <div className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-wider">N/A</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pay Summary Card */}
                <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] bg-white rounded-xl overflow-hidden transition-all hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 rounded-md bg-blue-50">
                                <PieChart className="h-5 w-5 text-black" />
                            </div>
                            <span className="font-bold text-black tracking-tight">Pay Summary</span>
                        </div>
                        <div className="text-slate-400 font-bold text-sm mt-8">
                            No payment summary available.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default MyPayment;
