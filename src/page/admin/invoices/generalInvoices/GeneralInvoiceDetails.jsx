import {
    FileText,
    ArrowLeft,
    Download,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const GeneralInvoiceDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Simulation of invoice data based on Image 2
    const invoiceData = {
        invoiceNo: "R00000022",
        vatNo: "1234567890",
        terms: "Net 30",
        status: "invoiced",
        invoiceDate: "Jan, 20 2026",
        currency: "AED",
        billedBy: {
            name: "Hunter Downs",
            tagline: "Consectetur rerum es",
            email: "payments@remoteme.com",
            phone: "+1234567890"
        },
        billedTo: {
            organization: "Dhurandhar Casting Company",
            contactPerson: "Miller Mark",
            email: "khan.shahab02729+miller@gmail.com"
        },
        items: [
            { id: 1, description: "QA and AI work", amount: 1200 }
        ],
        paymentMethod: {
            bank: "Hillary Figueroa",
            iban: "12345678909876",
            accountTitle: "RemoteMe",
            swiftCode: "12345",
            bankAddress: "Quidem aliquip facil",
            bankPhone: "+1 (804) 459-2995"
        },
        notes: "Please make payments within 30 days of the invoice date. Bank transfer details are provided below. Thank you for your business!"
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            {/* Header */}
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                            General Invoice Details
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="outline" 
                            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-md flex items-center gap-2 h-9"
                        >
                            <Download className="h-4 w-4" />
                            Download Invoice
                        </Button>
                        <Button 
                            onClick={() => navigate(-1)}
                            className="bg-slate-900 hover:bg-slate-800 text-white border-none rounded-md flex items-center gap-2 px-4 h-9"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </div>

            {/* Invoice Card */}
            <Card className="rounded-xl border bg-card shadow-sm max-w-5xl mx-auto w-full overflow-hidden">
                <CardContent className="p-12 text-slate-600">
                    {/* Top Section: Logo and Invoice Info */}
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 overflow-hidden border">
                                <img src="/logo-placeholder.png" alt="Logo" className="w-10 h-10 object-contain opacity-50" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{invoiceData.billedBy.name}</h3>
                            <p className="text-sm text-slate-500 italic">{invoiceData.billedBy.tagline}</p>
                        </div>
                        <div className="text-right">
                            <h1 className="text-4xl font-bold text-slate-900 mb-1 uppercase tracking-tight">Invoice</h1>
                            <p className="font-medium text-slate-700">#{invoiceData.invoiceNo}</p>
                            <div className="text-sm mt-2 space-y-0.5">
                                <p><span className="text-slate-400">VAT #:</span> {invoiceData.vatNo}</p>
                                <p><span className="text-slate-400">Terms:</span> {invoiceData.terms}</p>
                            </div>
                            <div className="mt-4">
                                <Badge className="bg-sky-500/10 text-sky-700 border-0 uppercase text-[10px] font-bold px-3 py-1">
                                    {invoiceData.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 mb-10"></div>

                    {/* Billed By / To Section */}
                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Billed By:</h4>
                            <div className="space-y-1">
                                <p className="font-bold text-slate-900">{invoiceData.billedBy.name}</p>
                                <p className="text-sm"><span className="text-slate-400">Email:</span> {invoiceData.billedBy.email}</p>
                                <p className="text-sm"><span className="text-slate-400">Phone:</span> {invoiceData.billedBy.phone}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Billed To:</h4>
                            <div className="space-y-1">
                                <p className="font-bold text-slate-900">{invoiceData.billedTo.organization}</p>
                                <p className="text-sm text-slate-500">{invoiceData.billedTo.contactPerson}</p>
                                <p className="text-sm"><span className="text-slate-400">Email:</span> {invoiceData.billedTo.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Date and Currency Section */}
                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1">Invoice Date:</h4>
                            <p className="text-sm text-slate-500">{invoiceData.invoiceDate}</p>
                        </div>
                        <div className="text-right">
                            <h4 className="text-sm font-bold text-slate-900 mb-1">Currency:</h4>
                            <p className="text-sm text-slate-500 font-medium">{invoiceData.currency}</p>
                        </div>
                    </div>

                    {/* Invoice Items Table */}
                    <div className="mb-12">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Invoice Items:</h4>
                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-500 hover:bg-slate-500 border-none">
                                        <TableHead className="w-[60px] text-white font-semibold text-xs uppercase py-3">#</TableHead>
                                        <TableHead className="text-white font-semibold text-xs uppercase py-3 text-left">Description</TableHead>
                                        <TableHead className="w-[150px] text-white font-semibold text-xs uppercase py-3 text-right pr-6">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoiceData.items.map((item, index) => (
                                        <TableRow key={item.id} className="bg-slate-50/50">
                                            <TableCell className="text-sm font-medium text-slate-700 py-4">{index + 1}</TableCell>
                                            <TableCell className="text-sm font-medium text-slate-900 py-4">{item.description}</TableCell>
                                            <TableCell className="text-sm font-bold text-slate-900 py-4 text-right pr-6">
                                                د.إ{item.amount.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Footer Section: Notes and Total */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Notes:</h4>
                            <p className="text-[13px] text-slate-500 leading-relaxed mb-6 italic">
                                {invoiceData.notes}
                            </p>
                            
                            <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Payment Method:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
                                <p><span className="text-slate-400">Bank:</span> {invoiceData.paymentMethod.bank}</p>
                                <p><span className="text-slate-400">IBAN #:</span> {invoiceData.paymentMethod.iban}</p>
                                <p><span className="text-slate-400">Account Title:</span> {invoiceData.paymentMethod.accountTitle}</p>
                                <p><span className="text-slate-400">SWIFT Code:</span> {invoiceData.paymentMethod.swiftCode}</p>
                                <p className="col-span-full"><span className="text-slate-400">Bank Address:</span> {invoiceData.paymentMethod.bankAddress}</p>
                                <p><span className="text-slate-400">Bank Phone:</span> {invoiceData.paymentMethod.bankPhone}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-start pt-4">
                            <div className="flex items-center gap-12 border-b-2 border-slate-900 pb-2 mb-2">
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Total Invoice Amount:</h4>
                                <span className="text-xl font-black text-slate-900">
                                    د.إ{invoiceData.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

export default GeneralInvoiceDetails;
