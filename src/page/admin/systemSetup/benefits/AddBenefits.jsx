import { useState } from "react";
import {
    ArrowLeft,
    Gift,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-auto items-center gap-2">
                        <Gift className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            Add New Benefit
                        </h2>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Back</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card px-3 py-4 shadow-sm md:px-4">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSave(); }}
                    className="space-y-6"
                    noValidate
                >
                    <div className="grid gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-xs font-medium">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter benefit name"
                                className="h-9"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="description" className="text-xs font-medium">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter benefit description"
                                className="min-h-[100px] resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" className="px-6">
                            Create Benefit
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddBenefits;
