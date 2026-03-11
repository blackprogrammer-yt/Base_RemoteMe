import { useState, useEffect } from "react";
import {
    ArrowLeft,
    Banknote,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

// Mock data to simulate fetching an existing currency
const initialCurrencies = [
    {
        id: 1,
        name: "Indian Rupee",
        code: "INR",
        code2: "in",
        subUnitName: "Paisa",
        symbol: "₹",
        exchangeRate: "1",
    },
    {
        id: 2,
        name: "Canadian Dollar",
        code: "CAD",
        code2: "ca",
        subUnitName: "Cent",
        symbol: "$",
        exchangeRate: "1",
    },
    {
        id: 3,
        name: "Saudi Riyal",
        code: "SAR",
        code2: "sa",
        subUnitName: "Halala",
        symbol: "﷼",
        exchangeRate: "1",
    },
    {
        id: 4,
        name: "Qatari Riyal",
        code: "QAR",
        code2: "qa",
        subUnitName: "Dirham",
        symbol: "ر.ق",
        exchangeRate: "1",
    },
    {
        id: 5,
        name: "Euro",
        code: "EUR",
        code2: "eu",
        subUnitName: "Cent",
        symbol: "€",
        exchangeRate: "1",
    },
    {
        id: 6,
        name: "UAE Dirham",
        code: "AED",
        code2: "ae",
        subUnitName: "Fils",
        symbol: "د.إ",
        exchangeRate: "1",
    },
    {
        id: 7,
        name: "Pakistani Rupee",
        code: "PKR",
        code2: "pk",
        subUnitName: "Paisa",
        symbol: "Rs",
        exchangeRate: "0.013",
    },
    {
        id: 8,
        name: "US Dollar",
        code: "USD",
        code2: "us",
        subUnitName: "Cent",
        symbol: "$",
        exchangeRate: "3.669",
    },
];

const EditCurrency = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        code2: "",
        symbol: "",
        subUnitName: "",
        exchangeRate: "",
    });

    useEffect(() => {
        if (id) {
            const currency = initialCurrencies.find((c) => c.id === Number(id));
            if (currency) {
                setFormData({
                    name: currency.name,
                    code: currency.code,
                    code2: currency.code2,
                    symbol: currency.symbol,
                    subUnitName: currency.subUnitName,
                    exchangeRate: currency.exchangeRate,
                });
            }
        }
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleUpdate = () => {
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
            description: "Currency has been updated successfully.",
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
                            Edit Currency
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
                            onClick={handleUpdate}
                            className="h-10 px-8 bg-primary hover:bg-primary/90"
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditCurrency;
