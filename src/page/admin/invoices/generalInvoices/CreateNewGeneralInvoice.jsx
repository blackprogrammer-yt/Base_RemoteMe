import { useState } from "react";
import {
    FileText,
    ArrowLeft,
    Plus,
    Trash2,
    AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CreateNewGeneralInvoice = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [organization, setOrganization] = useState("");
    const [currency, setCurrency] = useState("AED");
    const [items, setItems] = useState([
        { id: Date.now(), description: "", amount: 0 }
    ]);
    const [errors, setErrors] = useState({});

    const handleAddItem = () => {
        setItems([...items, { id: Date.now() + Math.random(), description: "", amount: 0 }]);
    };

    const handleRemoveItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
            // Clear errors for the removed item if any
            const newErrors = { ...errors };
            delete newErrors[`description_${id}`];
            setErrors(newErrors);
            toast({
                title: "Item removed",
                description: "The item has been removed from the invoice.",
            });
        } else {
            toast({
                title: "Cannot remove item",
                description: "At least one item is required for the invoice.",
                variant: "destructive",
            });
        }
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
        // Clear error when user types
        if (field === "description" && value.trim()) {
            const newErrors = { ...errors };
            delete newErrors[`description_${id}`];
            setErrors(newErrors);
        }
    };

    const handleGenerateInvoice = () => {
        const newErrors = {};
        
        if (!organization) {
            newErrors.organization = "Organization should not be empty";
        }

        items.forEach(item => {
            if (!item.description.trim()) {
                newErrors[`description_${item.id}`] = "Description should not be empty";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        toast({
            title: "Success",
            description: "Invoice has been generated successfully.",
        });
        
        setTimeout(() => {
            navigate("/admin/general-invoices");
        }, 1000);
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            {/* Header */}
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                            Create New General Invoice
                        </h2>
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={() => navigate(-1)}
                        className="bg-slate-900 hover:bg-slate-800 text-white border-none rounded-md flex items-center gap-2 px-4 h-9"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>
            </div>

            {/* Form Card */}
            <Card className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Organization</Label>
                            <Select 
                                value={organization} 
                                onValueChange={(v) => {
                                    setOrganization(v);
                                    if (v) setErrors(prev => {
                                        const newErrs = {...prev};
                                        delete newErrs.organization;
                                        return newErrs;
                                    });
                                }}
                            >
                                <SelectTrigger className={`w-full bg-slate-50/50 ${errors.organization ? "border-red-500 focus:ring-red-500" : ""}`}>
                                    <SelectValue placeholder="Select Organization" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="org1">Orion Enterprize</SelectItem>
                                    <SelectItem value="org2">Logo&Design</SelectItem>
                                    <SelectItem value="org3">Kissan&Supplier</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.organization && (
                                <p className="text-xs text-red-500 mt-1">{errors.organization}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Currency</Label>
                            <Select value={currency} onValueChange={setCurrency}>
                                <SelectTrigger className="w-full bg-slate-50/50">
                                    <SelectValue placeholder="Select Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AED">
                                        <div className="flex items-center gap-2">
                                            <span className="w-5 h-4 bg-red-600 inline-block relative overflow-hidden rounded-[1px]">
                                                <span className="absolute left-0 top-0 bottom-0 w-1/3 bg-emerald-600"></span>
                                                <span className="absolute left-1/3 right-0 top-0 h-1/2 bg-white"></span>
                                            </span>
                                            AED
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="THB">฿ THB</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Invoice Items Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">Invoice Items</h3>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={handleAddItem}
                                className="h-8 w-8 rounded-md border-slate-200 text-slate-900 hover:bg-slate-50"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-900 hover:bg-slate-800 border-none">
                                        <TableHead className="w-[60px] text-white font-semibold text-xs uppercase py-2.5">#</TableHead>
                                        <TableHead className="text-white font-semibold text-xs uppercase py-2.5">Description</TableHead>
                                        <TableHead className="w-[200px] text-white font-semibold text-xs uppercase py-2.5">Amount</TableHead>
                                        <TableHead className="w-[100px] text-white font-semibold text-xs uppercase py-2.5 text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/30 border-b last:border-none">
                                            <TableCell className="text-sm font-medium text-slate-700 py-3">{index + 1}</TableCell>
                                            <TableCell className="py-2">
                                                <div className="space-y-1">
                                                    <div className="relative">
                                                        <Input 
                                                            placeholder="Description" 
                                                            className={`bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 h-9 ${
                                                                errors[`description_${item.id}`] ? "border-red-500 focus-visible:ring-red-500 pr-10" : ""
                                                            }`}
                                                            value={item.description}
                                                            onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                                                        />
                                                        {errors[`description_${item.id}`] && (
                                                            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                                                        )}
                                                    </div>
                                                    {errors[`description_${item.id}`] && (
                                                        <p className="text-[11px] text-red-500 font-medium">{errors[`description_${item.id}`]}</p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                                                        {currency === "THB" ? "฿" : currency === "AED" ? "د.إ" : "$"}
                                                    </span>
                                                    <Input 
                                                        type="number"
                                                        className="pl-8 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 h-9"
                                                        value={item.amount}
                                                        onChange={(e) => handleItemChange(item.id, "amount", parseFloat(e.target.value) || 0)}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-2 text-center">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-md border border-rose-100"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 mt-8">
                        <Button 
                            variant="outline" 
                            className="px-6 h-9 text-slate-600 hover:bg-slate-50 border-slate-200"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleGenerateInvoice}
                            className="px-6 h-9 bg-slate-900 hover:bg-slate-800 text-white border-none shadow-sm"
                        >
                            Generate Invoice
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

export default CreateNewGeneralInvoice;
