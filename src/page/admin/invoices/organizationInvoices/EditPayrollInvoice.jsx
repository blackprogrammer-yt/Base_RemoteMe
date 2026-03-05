import { useState } from "react";
import {
    FileText,
    ArrowLeft,
    Plus,
    Trash2,
    Save,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const EditPayrollInvoice = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Simulation of initial data based on the provided image
    const [invoiceData, setInvoiceData] = useState({
        organizationName: "Toys R You",
        cycle: "Nov 2025",
        status: "pending",
        items: [
            { id: 1, description: "November 2025 Cycle", amount: 3000 },
            { id: 2, description: "Extra Amount", amount: 200 }
        ],
        markAsInvoiced: false
    });

    const handleAddItem = () => {
        const newItem = {
            id: Date.now(),
            description: "",
            amount: 0
        };
        setInvoiceData(prev => ({
            ...prev,
            items: [...prev.items, newItem]
        }));
    };

    const handleRemoveItem = (id) => {
        setInvoiceData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const handleItemChange = (id, field, value) => {
        setInvoiceData(prev => ({
            ...prev,
            items: prev.items.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const totalAmount = invoiceData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3 bg-slate-50/30 min-h-screen">
            {/* Header */}
            <div className="flex flex-auto flex-col py-2 px-4 md:px-6">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-slate-900" />
                        <h2 className="text-xl font-semibold tracking-tight text-slate-800">
                            Edit Payroll Invoice
                        </h2>
                    </div>
                    <Button 
                        onClick={() => navigate(-1)}
                        className="bg-[#0f172a] hover:bg-[#1e293b] text-white border-none rounded-md flex items-center gap-2 px-4 h-9 text-xs font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>
            </div>

            <div className="px-4 md:px-6 max-w-[1400px] mx-auto w-full pb-12">
                <Card className="rounded-xl border bg-card shadow-sm w-full overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                        {/* Info Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-400">Organization Name:</span>
                                <span className="text-sm font-semibold text-slate-700">{invoiceData.organizationName}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0">
                                <span className="text-sm font-medium text-slate-400">Cycle:</span>
                                <span className="text-sm font-semibold text-slate-700">{invoiceData.cycle}</span>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">INVOICE ITEMS:</h4>
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    onClick={handleAddItem}
                                    className="h-8 w-8 rounded-md border-slate-200 text-slate-900 hover:bg-slate-50"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="rounded-md border border-slate-200 overflow-hidden shadow-sm">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-[#0f172a] hover:bg-[#0f172a] border-none">
                                            <TableHead className="w-[60px] text-white font-bold text-[11px] uppercase py-4 text-center tracking-widest">#</TableHead>
                                            <TableHead className="text-white font-bold text-[11px] uppercase py-4 text-left tracking-widest">Description</TableHead>
                                            <TableHead className="w-[200px] text-white font-bold text-[11px] uppercase py-4 text-left tracking-widest">Amount</TableHead>
                                            <TableHead className="w-[60px] text-white font-bold text-[11px] uppercase py-4 text-center tracking-widest"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoiceData.items.map((item, index) => (
                                            <TableRow key={item.id} className="hover:bg-slate-50/50">
                                                <TableCell className="text-sm font-bold text-slate-500 py-4 text-center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <Input 
                                                        value={item.description}
                                                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                                                        placeholder="Enter description"
                                                        className="h-10 bg-white border-slate-200 focus:border-slate-400 focus:ring-slate-400/20"
                                                    />
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">฿</span>
                                                        <Input 
                                                            type="number"
                                                            value={item.amount}
                                                            onChange={(e) => handleItemChange(item.id, "amount", e.target.value)}
                                                            className="h-10 pl-8 bg-white border-slate-200 focus:border-slate-400 focus:ring-slate-400/20"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 text-center">
                                                    {invoiceData.items.length > 1 && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="icon" 
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            className="h-8 w-8 rounded-md border-rose-200 text-rose-600 hover:bg-rose-50"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {/* Total Section */}
                        <div className="flex justify-end items-center gap-4 mb-8">
                            <span className="text-sm font-medium text-slate-400">Total:</span>
                            <span className="text-xl font-black text-slate-900 tracking-tight">
                                ฿{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        {/* Action Footer */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="markAsInvoiced" 
                                    checked={invoiceData.markAsInvoiced}
                                    onCheckedChange={(checked) => setInvoiceData(prev => ({ ...prev, markAsInvoiced: checked }))}
                                    className="border-slate-300 data-[state=checked]:bg-[#0f172a] data-[state=checked]:border-[#0f172a]"
                                />
                                <label
                                    htmlFor="markAsInvoiced"
                                    className="text-sm font-bold text-slate-700 cursor-pointer select-none"
                                >
                                    Mark as Invoiced
                                </label>
                            </div>
                            <Button 
                                className="w-full sm:w-auto bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-md flex items-center gap-2 px-6 h-10 text-xs font-bold uppercase tracking-widest shadow-sm transition-all"
                            >
                                <Save className="h-4 w-4" />
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default EditPayrollInvoice;
