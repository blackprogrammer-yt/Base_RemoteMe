import { useState, useMemo } from "react";
import {
    FileText,
    Search,
    Eye,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    SlidersHorizontal,
    Columns3,
    LayoutGrid,
    Edit,
    SquarePen,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const INITIAL_PAYROLL_DATA = [
    { id: 1, invoiceNo: "UW-00000025", to: "Dhurandhar Casting Company", cycle: "Feb 2026", amount: 2207.69, payable: 2210.69, status: "paid" },
    { id: 2, invoiceNo: "UW-00000024", to: "Kissan&Supplier", cycle: "Feb 2026", amount: 556.01, payable: 560.01, status: "paid" },
    { id: 3, invoiceNo: "UW-00000020", to: "Kissan&Supplier", cycle: "Jan 2025", amount: 402.02, payable: 410.10, status: "paid" },
    { id: 4, invoiceNo: "UW-00000019", to: "Shahab & Co", cycle: "Jan 2026", amount: 149.90, payable: 159.90, status: "paid" },
    { id: 5, invoiceNo: "UW-00000018", to: "Contoso AUS", cycle: "Jan 2026", amount: 4797.57, payable: 5797.57, status: "paid" },
    { id: 6, invoiceNo: "UW-00000017", to: "Dhurandhar Casting Company", cycle: "Dec 2025", amount: 13912.58, payable: 14113.00, status: "paid" },
    { id: 7, invoiceNo: "R00000016", to: "Toys R You", cycle: "Nov 2025", amount: 3000.00, payable: 3200.00, status: "pending" },
    { id: 8, invoiceNo: "R00000008", to: "Rare Earth Mineral", cycle: "Jun 2025", amount: 4919.60, payable: 5000.00, status: "paid" },
    { id: 9, invoiceNo: "R00000002", to: "Rare Earth Minerals Company", cycle: "Jan 2025", amount: 2627.42, payable: 2627.42, status: "paid" },
    { id: 10, invoiceNo: "R00000001", to: "Rare Earth Mineral", cycle: "Jan 2025", amount: 1463.07, payable: 1476.70, status: "paid" },
];

const statusFilterOptions = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
];

const PayrollInvoices = () => {
    const navigate = useNavigate();
    const [invoicesData, setInvoicesData] = useState(INITIAL_PAYROLL_DATA);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrganization, setSelectedOrganization] = useState(undefined);
    const [activeStatus, setActiveStatus] = useState("all");
    const [viewMode, setViewMode] = useState("table");
    const [density, setDensity] = useState("standard");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visibleColumns, setVisibleColumns] = useState({
        invoiceNo: true,
        to: true,
        cycle: true,
        amount: true,
        payable: true,
        status: true,
        action: true,
    });

    const organizationOptions = useMemo(() => {
        const unique = new Set(invoicesData.map((inv) => inv.to));
        return Array.from(unique);
    }, [invoicesData]);

    const filteredInvoices = useMemo(() => {
        return invoicesData.filter((inv) => {
            const matchesOrg = !selectedOrganization || selectedOrganization === "all" || inv.to === selectedOrganization;
            const matchesStatus = activeStatus === "all" || 
                                 (activeStatus === "pending" && inv.status === "pending") ||
                                 (activeStatus === "approved" && inv.status === "paid") ||
                                 (activeStatus === "rejected" && inv.status === "voided");
            const matchesSearch = inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 inv.to.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesOrg && matchesStatus && matchesSearch;
        });
    }, [invoicesData, selectedOrganization, activeStatus, searchQuery]);

    const handleViewDetails = (id) => {
        navigate(`/admin/organization-invoice-details/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/admin/organization-invoices/edit/${id}`);
    };

    const totalCount = filteredInvoices.length;
    const pageCount = Math.ceil(totalCount / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + pageSize);

    const densityClasses = {
        compact: "py-1.5",
        standard: "py-3",
        comfortable: "py-5",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.standard;

    const handleVoid = (id) => {
        setInvoicesData(prev => prev.map(inv => 
            inv.id === id ? { ...inv, status: "voided" } : inv
        ));
    };

    const handleInvoiced = (id) => {
        setInvoicesData(prev => prev.map(inv => 
            inv.id === id ? { ...inv, status: "pending" } : inv
        ));
    };

    const formatAmount = (amount) => {
        return `$${amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "paid":
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-[#167d4c] px-2 py-1 text-[10px] font-bold uppercase text-white shadow-sm">
                            Paid
                        </Badge>
                        <a 
                            href="about:blank" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-xs text-slate-400 underline cursor-pointer hover:text-slate-600 transition-colors"
                        >
                            View Receipt
                        </a>
                    </div>
                );
            case "pending":
                return (
                    <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-[10px] font-bold uppercase text-amber-700">
                        Pending
                    </Badge>
                );
            case "voided":
                return (
                    <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-rose-600 px-2 py-1 text-[10px] font-bold uppercase text-white shadow-sm">
                        Voided
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                            Payroll Invoices
                        </h2>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm">
                <div className="p-4 flex flex-col gap-4 md:flex-row md:items-center justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                        <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                            <SelectTrigger className="w-full md:w-56 h-9 bg-slate-50/50">
                                <SelectValue placeholder="Select Organization" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Organizations</SelectItem>
                                {organizationOptions.map((org) => (
                                    <SelectItem key={org} value={org}>
                                        {org}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative w-full md:w-56">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search invoices..."
                                className="pl-9 h-9 bg-slate-50/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-1 border rounded-md p-1 bg-slate-50/50">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 bg-white">
                                    {statusFilterOptions.map((option) => (
                                        <DropdownMenuCheckboxItem
                                            key={option.key}
                                            checked={activeStatus === option.key}
                                            onCheckedChange={() => setActiveStatus(option.key)}
                                            className="text-sm cursor-pointer"
                                        >
                                            {option.label}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0">
                                        <SlidersHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32 bg-white">
                                    <DropdownMenuCheckboxItem
                                        checked={density === "compact"}
                                        onCheckedChange={() => setDensity("compact")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Compact
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={density === "standard"}
                                        onCheckedChange={() => setDensity("standard")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Standard
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={density === "comfortable"}
                                        onCheckedChange={() => setDensity("comfortable")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Comfortable
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0">
                                        <Columns3 className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32 bg-white">
                                    <DropdownMenuCheckboxItem
                                        checked={viewMode === "table"}
                                        onCheckedChange={() => setViewMode("table")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Table
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={viewMode === "cards"}
                                        onCheckedChange={() => setViewMode("cards")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Cards
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0">
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white">
                                    {Object.keys(visibleColumns).map((col) => (
                                        <DropdownMenuCheckboxItem
                                            key={col}
                                            checked={visibleColumns[col]}
                                            onCheckedChange={(v) => setVisibleColumns(prev => ({ ...prev, [col]: v }))}
                                            className="text-sm cursor-pointer capitalize"
                                        >
                                            {col.replace(/([A-Z])/g, ' $1').trim()}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="border-t">
                    {viewMode === "table" ? (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                    {visibleColumns.invoiceNo && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">Invoice #</TableHead>}
                                    {visibleColumns.to && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">To</TableHead>}
                                    {visibleColumns.cycle && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">Cycle</TableHead>}
                                    {visibleColumns.amount && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">Invoice Amount</TableHead>}
                                    {visibleColumns.payable && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">Payable Amount</TableHead>}
                                    {visibleColumns.status && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider text-center">Status</TableHead>}
                                    {visibleColumns.action && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider text-center">Action</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedInvoices.map((inv) => (
                                    <TableRow key={inv.id} className="hover:bg-slate-50/50">
                                        {visibleColumns.invoiceNo && <TableCell className={`font-medium text-slate-900 ${rowPaddingClass}`}>{inv.invoiceNo}</TableCell>}
                                        {visibleColumns.to && <TableCell className={`text-slate-600 ${rowPaddingClass}`}>{inv.to}</TableCell>}
                                        {visibleColumns.cycle && <TableCell className={`text-slate-600 ${rowPaddingClass}`}>{inv.cycle}</TableCell>}
                                        {visibleColumns.amount && <TableCell className={`font-semibold text-slate-900 ${rowPaddingClass}`}>{formatAmount(inv.amount)}</TableCell>}
                                        {visibleColumns.payable && <TableCell className={`font-semibold text-slate-900 ${rowPaddingClass}`}>{formatAmount(inv.payable)}</TableCell>}
                                        {visibleColumns.status && <TableCell className={`text-center ${rowPaddingClass}`}>{getStatusBadge(inv.status)}</TableCell>}
                                        {visibleColumns.action && (
                                            <TableCell className={`text-center ${rowPaddingClass}`}>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="gap-2 px-3 text-xs"
                                                        onClick={() => handleViewDetails(inv.id)}
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span>View</span>
                                                    </Button>
                                                    {inv.status === "pending" && (
                                                        <>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm" 
                                                                className="gap-2 px-3 text-xs"
                                                                onClick={() => handleEdit(inv.id)}
                                                            >
                                                                <SquarePen className="h-3.5 w-3.5" />
                                                                <span>Edit</span>
                                                            </Button>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm" 
                                                                className="gap-2 px-3 text-xs"
                                                                onClick={() => handleVoid(inv.id)}
                                                            >
                                                                <X className="h-3.5 w-3.5" />
                                                                <span>Void</span>
                                                            </Button>
                                                        </>
                                                    )}
                                                    {inv.status === "voided" && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="gap-2 px-3 text-xs"
                                                            onClick={() => handleInvoiced(inv.id)}
                                                        >
                                                            <span>Invoiced</span>
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                                {paginatedInvoices.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length} className="h-32 text-center text-muted-foreground">
                                            No invoices found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/30">
                            {paginatedInvoices.map((inv) => (
                                <Card key={inv.id} className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Invoice #</p>
                                                <p className="font-bold text-slate-900">{inv.invoiceNo}</p>
                                            </div>
                                            {getStatusBadge(inv.status)}
                                        </div>
                                        <div className="space-y-3 mb-6">
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium">To</p>
                                                <p className="text-sm font-semibold text-slate-700">{inv.to}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <p className="text-xs text-slate-400 font-medium">Cycle</p>
                                                    <p className="text-sm font-semibold text-slate-700">{inv.cycle}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 font-medium">Payable</p>
                                                    <p className="text-sm font-black text-slate-900">{formatAmount(inv.payable)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                            <Button 
                                                variant="outline"
                                                size="sm"
                                                className="w-full gap-2 px-3 text-xs"
                                                onClick={() => handleViewDetails(inv.id)}
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                                <span>View</span>
                                            </Button>
                                            {inv.status === "pending" && (
                                                <>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="gap-2 px-3 text-xs"
                                                        onClick={() => handleEdit(inv.id)}
                                                    >
                                                        <SquarePen className="h-3.5 w-3.5" />
                                                        <span>Edit</span>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="gap-2 px-3 text-xs"
                                                        onClick={() => handleVoid(inv.id)}
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                        <span>Void</span>
                                                    </Button>
                                                </>
                                            )}
                                            {inv.status === "voided" && (
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="w-full gap-2 px-3 text-xs"
                                                    onClick={() => handleInvoiced(inv.id)}
                                                >
                                                    <span>Invoiced</span>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span>Showing {startIndex + 1}-{Math.min(startIndex + pageSize, totalCount)} of {totalCount}</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span>Rows per page</span>
                            <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
                                <SelectTrigger className="w-16 h-8 bg-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-4">
                            <span>Page {currentPage} of {pageCount}</span>
                            <div className="flex items-center gap-1">
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-md" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="h-8 px-3 rounded-md text-xs flex items-center gap-1" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <Button variant="outline" className="h-8 px-3 rounded-md text-xs flex items-center gap-1" onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))} disabled={currentPage === pageCount}>
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-md" onClick={() => setCurrentPage(pageCount)} disabled={currentPage === pageCount}>
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PayrollInvoices;
