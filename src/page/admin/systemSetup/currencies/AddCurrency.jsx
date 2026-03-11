import { useState } from "react";
import {
    ArrowLeft,
    Banknote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const AddCurrency = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        code2: "",
        symbol: "",
        subUnitName: "",
        exchangeRate: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        const requiredFields = ["name", "code", "code2", "symbol", "subUnitName", "exchangeRate"];
        const missingFields = requiredFields.filter((field) => !formData[field].trim());

        if (missingFields.length > 0) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Success",
            description: "New currency has been added successfully.",
        });
        navigate(PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_CURRENCIES);
    };

    const handleBack = () => {
        navigate(PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_CURRENCIES);
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Banknote className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Add Currency
                        </h2>
                    </div>
                    <Button
                        variant="default"
                        className="h-9 gap-2 bg-primary hover:bg-primary/90 border-none"
                        onClick={handleBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>
                </div>
            </div>

            <div className="rounded-lg border bg-card shadow-sm overflow-hidden dark:border dark:border-border/50">
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Row 1 */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="code" className="text-sm font-medium text-muted-foreground">
                                Code <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="h-10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Row 2 */}
                        <div className="space-y-2">
                            <Label htmlFor="code2" className="text-sm font-medium text-muted-foreground">
                                Code2 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="code2"
                                value={formData.code2}
                                onChange={handleChange}
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="symbol" className="text-sm font-medium text-muted-foreground">
                                Symbol <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="symbol"
                                value={formData.symbol}
                                onChange={handleChange}
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subUnitName" className="text-sm font-medium text-muted-foreground">
                                Sub Unit Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="subUnitName"
                                value={formData.subUnitName}
                                onChange={handleChange}
                                className="h-10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-8">
                        {/* Row 3 */}
                        <div className="space-y-2">
                            <Label htmlFor="exchangeRate" className="text-sm font-medium text-muted-foreground">
                                Exchange Rate <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="exchangeRate"
                                value={formData.exchangeRate}
                                onChange={handleChange}
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">Base Currency:</p>
                            <Badge className="bg-primary hover:bg-primary/90 font-normal px-3 py-1">
                                UAE Dirham (د.إ)
                            </Badge>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={handleSave}
                            className="h-10 px-8 bg-primary hover:bg-primary/90"
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AddCurrency;
