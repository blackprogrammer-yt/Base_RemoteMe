import React from "react";
import { 
    ChevronLeft, 
    ChevronRight, 
    DollarSign 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const Compensation = ({ onNext, onBack }) => {
    return (
        <div className="mt-0 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Employment Type */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        Employment type <span className="text-destructive">*</span>
                    </Label>
                    <Select defaultValue="full-time">
                        <SelectTrigger className="h-9 focus:ring-primary">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Contract Duration */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        Contract Duration <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="fixed-term" 
                                name="duration" 
                                defaultChecked 
                                className="h-4 w-4 border-primary text-primary focus:ring-primary"
                            />
                            <Label htmlFor="fixed-term" className="text-xs font-normal cursor-pointer">Fixed-term</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="indefinite" 
                                name="duration" 
                                className="h-4 w-4 border-primary text-primary focus:ring-primary"
                            />
                            <Label htmlFor="indefinite" className="text-xs font-normal cursor-pointer">Indefinite</Label>
                        </div>
                    </div>
                </div>

                {/* Salary */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        Salary <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-0">
                        <Select defaultValue="aed">
                            <SelectTrigger className="h-9 w-[100px] rounded-r-none border-r-0 focus:ring-0">
                                <div className="flex items-center gap-2">
                                    <span>🇦🇪</span>
                                    <span>AED</span>
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="aed">🇦🇪 AED</SelectItem>
                                <SelectItem value="usd">🇺🇸 USD</SelectItem>
                                <SelectItem value="inr">🇮🇳 INR</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-medium">د.إ</span>
                            <Input 
                                placeholder="9,500" 
                                className="h-9 rounded-l-none pl-10 focus-visible:ring-primary" 
                            />
                        </div>
                    </div>
                </div>

                {/* Annual Bonus */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        Annual Bonus (%) <span className="text-destructive">*</span>
                    </Label>
                    <Input placeholder="In Percentage" className="h-9 focus-visible:ring-primary" />
                </div>

                {/* Benefits */}
                <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-xs font-medium">
                        Benefits <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-6 pt-1">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="gym" />
                            <Label htmlFor="gym" className="text-xs font-normal cursor-pointer">Gym Benefits</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="life" />
                            <Label htmlFor="life" className="text-xs font-normal cursor-pointer">Life Insurance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="tada" />
                            <Label htmlFor="tada" className="text-xs font-normal cursor-pointer">TA/DA</Label>
                        </div>
                    </div>
                </div>

                {/* Holidays */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        Holidays <span className="text-destructive">*</span>
                    </Label>
                    <Select defaultValue="company-standard">
                        <SelectTrigger className="h-9 focus:ring-primary">
                            <SelectValue placeholder="Select holiday type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="company-standard">Company Standard</SelectItem>
                            <SelectItem value="public-holidays">Public Holidays</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Annual Vacations */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">
                        Annual Vacations
                    </Label>
                    <Input defaultValue="20 Days" className="h-9 bg-muted/30 focus-visible:ring-primary" />
                </div>

                {/* Reporting Manager */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        Reporting Manager <span className="text-destructive">*</span>
                    </Label>
                    <Input placeholder="" className="h-9 focus-visible:ring-primary" />
                </div>

                {/* Notice Period */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">
                        Notice Period
                    </Label>
                    <Input defaultValue="30 Days" className="h-9 bg-muted/30 focus-visible:ring-primary" />
                </div>
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
                    onClick={onNext}
                    className="h-9 px-8 text-xs font-medium bg-[#18181b] hover:bg-[#18181b]/90 text-white rounded-md"
                >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default Compensation;
