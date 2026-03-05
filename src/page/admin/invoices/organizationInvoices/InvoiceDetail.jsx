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

const InvoiceDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Simulation of invoice data based on Image 1 & 2
    const invoiceData = {
        invoiceNo: "UW-00000025",
        vatNo: "1234567890",
        terms: "Net 30",
        status: "paid",
        invoiceDate: "Feb, 12 2026",
        currency: "USD",
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
            { id: 1, description: "Feb 2026 payment cycle", amount: 2207.69 },
            { id: 2, description: "QA Extra Work", amount: 3.00 }
        ],
        paymentMethod: {
            bank: "Hillary Figueroa",
            iban: "12345678909876",
            accountTitle: "RemoteMe",
            swiftCode: "12345",
            bankAddress: "Quidem aliquip facil",
            bankPhone: "+1 (804) 459-2995"
        },
        paymentDetails: {
            description: "N/A",
            receiptAvailable: true
        },
        notes: "Please make payments within 30 days of the invoice date. Bank transfer details are provided below. Thank you for your business!"
    };

    const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3 bg-slate-50/30 min-h-screen">
            {/* Header */}
            <div className="flex flex-auto flex-col py-2 px-4 md:px-6">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-semibold tracking-tight text-slate-800">
                            Invoice Detail
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="outline" 
                            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-md flex items-center gap-2 h-9 text-xs font-medium"
                        >
                            <Download className="h-4 w-4" />
                            Download Invoice
                        </Button>
                        <Button 
                            onClick={() => navigate(-1)}
                            className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-md flex items-center gap-2 px-4 h-9 text-xs font-medium"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-6 max-w-[1400px] mx-auto w-full pb-12">
                {/* Main Invoice Card */}
                <div className="flex-1 min-w-0">
                    <Card className="rounded-xl border bg-card shadow-sm w-full overflow-hidden">
                        <CardContent className="p-8 md:p-12 text-slate-600">
                            {/* Top Section: Logo and Invoice Info */}
                            <div className="flex justify-between items-start mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-20 bg-slate-50 rounded-md flex items-center justify-center overflow-hidden border border-slate-100">
                                        <img src="/logo-placeholder.png" alt="Logo" className="w-14 h-14 object-contain opacity-80" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 leading-tight">{invoiceData.billedBy.name}</h3>
                                        <p className="text-sm text-slate-500 mt-1 italic">{invoiceData.billedBy.tagline}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h1 className="text-4xl font-black text-slate-900 mb-1 uppercase tracking-tighter">Invoice</h1>
                                    <p className="font-bold text-slate-500 text-sm tracking-wider">#{invoiceData.invoiceNo}</p>
                                    <div className="text-xs mt-3 space-y-1 font-medium">
                                        <p><span className="text-slate-400 uppercase">VAT #:</span> {invoiceData.vatNo}</p>
                                        <p><span className="text-slate-400 uppercase">Terms:</span> {invoiceData.terms}</p>
                                    </div>
                                    <div className="mt-5">
                                        <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white border-0 uppercase text-[10px] font-black px-3 py-1.5 rounded-sm tracking-widest shadow-sm">
                                            {invoiceData.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 mb-10"></div>

                            {/* Billed By / To Section */}
                            <div className="grid grid-cols-2 gap-12 mb-12">
                                <div>
                                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-5 border-b border-slate-900 w-fit pb-1">BILLED BY:</h4>
                                    <div className="space-y-1.5">
                                        <p className="font-bold text-slate-900 text-base">{invoiceData.billedBy.name}</p>
                                        <p className="text-sm font-medium"><span className="text-slate-400">Email:</span> {invoiceData.billedBy.email}</p>
                                        <p className="text-sm font-medium"><span className="text-slate-400">Phone:</span> {invoiceData.billedBy.phone}</p>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-5 border-b border-slate-900 w-fit pb-1">BILLED TO:</h4>
                                    <div className="space-y-1.5">
                                        <p className="font-bold text-slate-900 text-base">{invoiceData.billedTo.organization}</p>
                                        <p className="text-sm font-semibold text-slate-600">{invoiceData.billedTo.contactPerson}</p>
                                        <p className="text-sm font-medium"><span className="text-slate-400">Email:</span> {invoiceData.billedTo.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Date and Currency Section */}
                            <div className="grid grid-cols-2 gap-8 mb-12 bg-slate-50/50 p-6 rounded-lg border border-slate-100">
                                <div>
                                    <h4 className="text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">Invoice Date:</h4>
                                    <p className="text-sm font-semibold text-slate-600">{invoiceData.invoiceDate}</p>
                                </div>
                                <div className="text-right">
                                    <h4 className="text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">Currency:</h4>
                                    <p className="text-sm font-bold text-slate-900 tracking-widest">{invoiceData.currency}</p>
                                </div>
                            </div>

                            {/* Invoice Items Table */}
                            <div className="mb-12">
                                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-5">INVOICE ITEMS:</h4>
                                <div className="rounded-md border border-slate-200 overflow-hidden shadow-sm">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-slate-500 hover:bg-slate-500 border-none">
                                                <TableHead className="w-[60px] text-white font-bold text-[11px] uppercase py-4 text-center tracking-widest">#</TableHead>
                                                <TableHead className="text-white font-bold text-[11px] uppercase py-4 text-left tracking-widest">Description</TableHead>
                                                <TableHead className="w-[180px] text-white font-bold text-[11px] uppercase py-4 text-right pr-8 tracking-widest">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {invoiceData.items.map((item, index) => (
                                                <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/30"}>
                                                    <TableCell className="text-sm font-bold text-slate-500 py-5 text-center">{index + 1}</TableCell>
                                                    <TableCell className="text-sm font-semibold text-slate-800 py-5">{item.description}</TableCell>
                                                    <TableCell className="text-sm font-black text-slate-900 py-5 text-right pr-8">
                                                        ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Footer Section: Notes and Total */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-slate-100">
                                <div>
                                    <h4 className="text-xs font-black text-slate-900 mb-4 uppercase tracking-[0.2em]">NOTES:</h4>
                                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8">
                                        {invoiceData.notes}
                                    </p>
                                    
                                    <h4 className="text-xs font-black text-slate-900 mb-4 uppercase tracking-[0.2em]">PAYMENT METHOD:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs font-medium">
                                        <p><span className="text-slate-400 uppercase tracking-tighter mr-1">Bank:</span> {invoiceData.paymentMethod.bank}</p>
                                        <p><span className="text-slate-400 uppercase tracking-tighter mr-1">IBAN #:</span> {invoiceData.paymentMethod.iban}</p>
                                        <p><span className="text-slate-400 uppercase tracking-tighter mr-1">Account Title:</span> {invoiceData.paymentMethod.accountTitle}</p>
                                        <p><span className="text-slate-400 uppercase tracking-tighter mr-1">SWIFT Code:</span> {invoiceData.paymentMethod.swiftCode}</p>
                                        <p className="col-span-full"><span className="text-slate-400 uppercase tracking-tighter mr-1">Bank Address:</span> {invoiceData.paymentMethod.bankAddress}</p>
                                        <p><span className="text-slate-400 uppercase tracking-tighter mr-1">Bank Phone:</span> {invoiceData.paymentMethod.bankPhone}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-start">
                                    <div className="flex items-center gap-16 border-b-2 border-slate-900 pb-3 mb-2 w-full justify-between md:justify-end">
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">TOTAL INVOICE AMOUNT:</h4>
                                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                                            ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar: Payment Details */}
                <div className="w-full lg:w-80 shrink-0">
                    <div className="sticky top-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3">Payment Details</h3>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Payment Description:</h4>
                                <p className="text-sm text-slate-900 font-bold leading-relaxed">{invoiceData.paymentDetails.description}</p>
                            </div>
                            <div className="pt-6 border-t border-slate-100">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Payment Receipt:</h4>
                                <Button 
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full h-10 text-xs font-bold uppercase tracking-widest shadow-sm transition-all"
                                >
                                    View Receipt
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default InvoiceDetail;
