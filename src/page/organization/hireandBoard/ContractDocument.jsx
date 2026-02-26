import React from "react";
import { 
    Info, 
    FileText, 
    Eye, 
    Plus, 
    Trash2,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContractDocument = ({ onNext, onBack }) => {
    return (
        <div className="mt-0 space-y-6">
            <div className="space-y-4">
                {/* Header Info */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-foreground">Upload Contract</h3>
                    
                    <div className="space-y-2">
                        <div className="flex items-start gap-2 text-[11px] text-muted-foreground">
                            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            <p>The contract you upload must be the final contract which will be signed by the employee and approved by the Company.</p>
                        </div>
                        <div className="flex items-start gap-2 text-[11px] text-muted-foreground">
                            <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            <p>Only PDF files are allowed. File size must not exceed 5MB</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-7 w-7 border-blue-200 text-blue-500 hover:bg-blue-50">
                        <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7 border-blue-200 text-blue-500 hover:bg-blue-50">
                        <Plus className="h-3.5 w-3.5" />
                    </Button>
                </div>

                {/* Upload Row */}
                <div className="rounded-lg border border-dashed border-muted-foreground/20 p-6">
                    <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-1.5">
                            <Label className="text-xs font-medium">
                                Title <span className="text-destructive">*</span>
                            </Label>
                            <Input 
                                defaultValue="Untitled" 
                                className="h-9 focus-visible:ring-primary" 
                            />
                        </div>

                        <div className="flex-[2] space-y-1.5">
                            <Label className="text-xs font-medium">
                                File <span className="text-destructive">*</span>
                            </Label>
                            <div className="flex h-9 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium">
                                <label className="flex h-full items-center border-r px-3 text-xs font-medium cursor-pointer hover:bg-muted/50 transition-colors">
                                    Choose File
                                    <input type="file" className="hidden" accept=".pdf" />
                                </label>
                                <div className="flex h-full flex-1 items-center px-3 text-xs text-muted-foreground italic">
                                    No file chosen
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" size="icon" className="h-9 w-9 border-destructive/20 text-destructive hover:bg-destructive/5 hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
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

export default ContractDocument;
