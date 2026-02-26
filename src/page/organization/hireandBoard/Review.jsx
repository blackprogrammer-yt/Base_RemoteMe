import React from "react";
import { ShieldCheck, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Review = ({ onBack }) => {
    const reviewData = [
        { label: "Name", value: "" },
        { label: "Email", value: "" },
        { label: "Country", value: "🇺🇸 United States" },
        { label: "Title", value: "" },
        { label: "Contract Start Date", value: "" },
        { label: "Contract End Date", value: "Indefinite" },
        { label: "Job Description", value: "N/A" },
        { label: "Employment Type", value: "Full-Time" },
        { label: "Contract Duration", value: "Fixed-Term" },
        { label: "Monthly Salary", value: "د.إ Per month" },
        { label: "Annual Bonus", value: "0% Performance Based" },
        { label: "Benefits", value: "No benefit selected.", isError: true },
        { label: "Holidays", value: "Company Standard" },
        { label: "Annual Vacations", value: "20 Days" },
        { label: "Notice Period", value: "30 Days" },
        { label: "Contract Documents", value: "Untitled", subValue: "0 MB No signature needed" },
    ];

    return (
        <div className="mt-0 space-y-6">
            <div className="rounded-lg border bg-card overflow-hidden">
                <table className="w-full text-sm">
                    <tbody>
                        {reviewData.map((item, index) => (
                            <tr 
                                key={index} 
                                className={`border-b last:border-0 ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}
                            >
                                <td className="py-3 px-4 font-bold text-foreground w-1/3 border-r">
                                    {item.label}
                                </td>
                                <td className="py-3 px-4 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <span className={item.isError ? "text-destructive" : ""}>
                                            {item.value}
                                        </span>
                                        {item.subValue && (
                                            <span className="text-[10px] text-muted-foreground/60 italic ml-2">
                                                {item.subValue}
                                            </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-center gap-3 pt-6 border-t mt-8">
                <Button 
                    variant="outline" 
                    onClick={onBack}
                    className="h-9 px-8 text-xs font-medium text-muted-foreground border-gray-200"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button 
                    className="h-9 px-8 text-xs font-medium bg-[#18181b] hover:bg-[#18181b]/90 text-white rounded-md"
                >
                    Send Invite
                    <ShieldCheck className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default Review;
