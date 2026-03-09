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
    const [density, setDensity] = useState("compact");
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
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage = totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex = totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex = totalCount === 0 ? 0 : Math.min(startIndex + pageSize, totalCount);
    const paginatedInvoices = totalCount === 0 ? [] : filteredInvoices.slice(startIndex, endIndex);

    const densityClasses = {
        compact: "py-1.5",
        standard: "py-3",
        comfortable: "py-5",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.standard;

    const handlePageChange = (newPage) => {
        if (totalCount === 0) {
            return;
        }

        const clampedPage = Math.max(1, Math.min(newPage, pageCount));
        setCurrentPage(clampedPage);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

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
                        <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
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
                    <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
                        Pending
                    </Badge>
                );
            case "voided":
                return (
                    <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-rose-600 px-2 py-1 text-xs font-semibold uppercase text-white shadow-sm">
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
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            Payroll Invoices
                        </h2>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-lg border bg-card px-2 py-2 md:px-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                            <SelectTrigger className="h-9 w-full md:w-[260px]">
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

                    <div className="flex w-full flex-wrap items-center justify-start gap-2 md:w-auto md:justify-end">
                        <div className="relative w-full md:w-[260px]">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                className="h-9 w-full pl-9 pr-8"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            {searchQuery ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setCurrentPage(1);
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-muted"
                                    aria-label="Clear search"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            ) : null}
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" aria-label="Filter">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 bg-white">
                                    {statusFilterOptions.map((option) => (
                                        <DropdownMenuCheckboxItem
                                            key={option.key}
                                            checked={activeStatus === option.key}
                                            onCheckedChange={() => {
                                                setActiveStatus(option.key);
                                                setCurrentPage(1);
                                            }}
                                            className="text-sm cursor-pointer"
                                        >
                                            {option.label}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" aria-label="Density">
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
                                <Button variant="outline" size="icon" aria-label="View">
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
                                <Button variant="outline" size="icon" aria-label="Columns">
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

                <div className="mt-4">
                    {viewMode === "table" ? (
                        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b bg-muted/40">
                                        {visibleColumns.invoiceNo && <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">Invoice #</TableHead>}
                                        {visibleColumns.to && <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">To</TableHead>}
                                        {visibleColumns.cycle && <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">Cycle</TableHead>}
                                        {visibleColumns.amount && <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">Invoice Amount</TableHead>}
                                        {visibleColumns.payable && <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">Payable Amount</TableHead>}
                                        {visibleColumns.status && <TableHead className="px-4 text-center text-xs font-semibold uppercase text-muted-foreground">Status</TableHead>}
                                        {visibleColumns.action && <TableHead className="px-4 text-center text-xs font-semibold uppercase text-muted-foreground">Action</TableHead>}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedInvoices.map((inv) => (
                                        <TableRow key={inv.id} className="hover:bg-muted/30">
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
                                            <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length} className="px-4 py-6 text-center text-sm text-muted-foreground">
                                                No invoices found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedInvoices.map((inv) => (
                                <Card key={inv.id} className="rounded-lg border bg-card shadow-sm">
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

                <div className="mt-4 flex flex-col justify-between gap-4 px-2 lg:flex-row lg:items-center">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {totalCount === 0 ? 0 : startIndex + 1}-{endIndex} of {totalCount}
                    </div>
                    
                    <div className="flex flex-col space-y-2 text-sm lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Rows per page</span>
                            <Select value={`${pageSize}`} onValueChange={(v) => handlePageSizeChange(Number(v))}>
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={`${pageSize}`} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((size) => (
                                        <SelectItem key={size} value={`${size}`}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center justify-center font-medium lg:w-[100px]">
                                Page {totalCount === 0 ? 0 : safeCurrentPage} of {pageCount}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => handlePageChange(1)} disabled={safeCurrentPage === 1 || totalCount === 0}>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" onClick={() => handlePageChange(safeCurrentPage - 1)} disabled={safeCurrentPage === 1 || totalCount === 0}>
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <Button variant="outline" onClick={() => handlePageChange(safeCurrentPage + 1)} disabled={safeCurrentPage >= pageCount || totalCount === 0}>
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => handlePageChange(pageCount)} disabled={safeCurrentPage >= pageCount || totalCount === 0}>
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
