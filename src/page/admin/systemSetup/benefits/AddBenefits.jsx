import { useState } from "react";
import {
    ArrowLeft,
    Gift,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const AddBenefits = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        if (!name.trim()) {
            toast({
                title: "Validation Error",
                description: "Benefit name is required.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Success",
            description: "New benefit has been created successfully.",
        });
        navigate(PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_BENEFITS);
    };

    const handleBack = () => {
        navigate(PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_BENEFITS);
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Gift className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                            Add New Benefit
                        </h2>
                    </div>
                    <Button
                        variant="outline"
                        className="h-9 gap-2 bg-slate-900 hover:bg-slate-800 text-white border-none"
                        onClick={handleBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>
                </div>
            </div>

            <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
                <div className="p-6">
                    <Card className="border-slate-200 shadow-none">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter benefit name"
                                    className="h-10 border-slate-200 focus:border-primary focus:ring-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter benefit description"
                                    className="min-h-[100px] border-slate-200 focus:border-primary focus:ring-primary/20 resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={handleBack}
                                    className="h-10 gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
                                >
                                    <X className="h-4 w-4" />
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    className="h-10 gap-2 bg-slate-900 hover:bg-slate-800 text-white"
                                >
                                    <span>Create Benefit</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default AddBenefits;
