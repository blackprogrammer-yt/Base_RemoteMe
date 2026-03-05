import { Fragment, useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Columns3,
    Eye,
    Filter,
    LayoutGrid,
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const employeePayments = [
    {
        id: 1,
        organization: "Orion Enterprize",
        cycle: "Jun 1979",
        payableMasked: true,
        payableAmount: 1700,
        receivableMasked: false,
        receivableNote: "Cycle is not completed yet.",
        receivableAmount: null,
        cycleStatus: "pending",
        invoiceStatus: "na",
        hasReceipt: false,
    },
    {
        id: 2,
        organization: "Logo&Design",
        cycle: "Jan 2026",
        payableMasked: true,
        payableAmount: 2200,
        receivableMasked: false,
        receivableNote: "Cycle is not completed yet.",
        receivableAmount: null,
        cycleStatus: "pending",
        invoiceStatus: "na",
        hasReceipt: false,
    },
    {
        id: 3,
        organization: "Kissan&Supplier",
        cycle: "Feb 2026",
        payableMasked: true,
        payableAmount: 1800,
        receivableMasked: true,
        receivableNote: "",
        receivableAmount: 1800,
        cycleStatus: "paid",
        invoiceStatus: "paid",
        hasReceipt: true,
    },
    {
        id: 4,
        organization: "Dhurandhar Casting Company",
        cycle: "Feb 2026",
        payableMasked: true,
        payableAmount: 2500,
        receivableMasked: true,
        receivableNote: "",
        receivableAmount: 2500,
        cycleStatus: "completed",
        invoiceStatus: "paid",
        hasReceipt: true,
    },
    {
        id: 5,
        organization: "Kissan&Supplier",
        cycle: "Jan 2025",
        payableMasked: true,
        payableAmount: 1600,
        receivableMasked: true,
        receivableNote: "",
        receivableAmount: 1600,
        cycleStatus: "completed",
        invoiceStatus: "paid",
        hasReceipt: true,
    },
    {
        id: 6,
        organization: "Shahab & Co",
        cycle: "Jan 2026",
        payableMasked: true,
        payableAmount: 1900,
        receivableMasked: true,
        receivableNote: "",
        receivableAmount: 1900,
        cycleStatus: "completed",
        invoiceStatus: "paid",
        hasReceipt: true,
    },
    {
        id: 7,
        organization: "Contoso AUS",
        cycle: "Jan 2026",
        payableMasked: true,
        payableAmount: 2100,
        receivableMasked: true,
        receivableNote: "",
        receivableAmount: 2100,
        cycleStatus: "completed",
        invoiceStatus: "pending",
        hasReceipt: true,
    },
    {
        id: 8,
        organization: "Dhurandhar Casting Company",
        cycle: "Dec 2025",
        payableMasked: true,
        payableAmount: 2000,
        receivableMasked: true,
        receivableNote: "",
        receivableAmount: 2000,
        cycleStatus: "completed",
        invoiceStatus: "paid",
        hasReceipt: true,
    },
    {
        id: 9,
        organization: "Toys R You",
        cycle: "Nov 2025",
        payableMasked: true,
        payableAmount: 1500,
        receivableMasked: true,
        receivableNote: "",
        receivableAmount: 1500,
        cycleStatus: "completed",
        invoiceStatus: "pending",
        hasReceipt: true,
    },
    {
        id: 10,
        organization: "Toys R You",
        cycle: "Dec 2025",
        payableMasked: true,
        payableAmount: 1550,
        receivableMasked: false,
        receivableNote: "Cycle is not completed yet.",
        receivableAmount: null,
        cycleStatus: "pending",
        invoiceStatus: "na",
        hasReceipt: false,
    },
];

const statusFilterOptions = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
];

const EmployeePayments = () => {
    const navigate = useNavigate();
    const [selectedOrganization, setSelectedOrganization] = useState("all");
    const [activeStatus, setActiveStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visiblePayable, setVisiblePayable] = useState({});
    const [visibleReceivable, setVisibleReceivable] = useState({});

    const [searchQuery, setSearchQuery] = useState("");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [visibleColumns, setVisibleColumns] = useState({
        organization: true,
        cycle: true,
        payable: true,
        receivable: true,
        cycleStatus: true,
        invoiceStatus: true,
        action: true,
    });

    const columnDefinitions = [
        { key: "organization", label: "Organization" },
        { key: "cycle", label: "Cycle" },
        { key: "payable", label: "Payable To Employees" },
        { key: "receivable", label: "Receivable From Org" },
        { key: "cycleStatus", label: "Cycle Status" },
        { key: "invoiceStatus", label: "Org Invoice Status" },
        { key: "action", label: "Action" },
    ];

    const densityClasses = {
        compact: "py-2",
        standard: "py-3",
        comfortable: "py-4",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.compact;

    const visibleColumnKeys = columnDefinitions
        .filter((col) => visibleColumns[col.key])
        .map((col) => col.key);

    const organizationOptions = useMemo(() => {
        const unique = new Set(
            employeePayments.map((payment) => payment.organization),
        );
        return Array.from(unique);
    }, []);

    const filteredPayments = employeePayments.filter((payment) => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const matchesOrganization =
            selectedOrganization === "all" ||
            payment.organization === selectedOrganization;

        const matchesStatus =
            activeStatus === "all" || 
            (activeStatus === "pending" && payment.cycleStatus === "pending") ||
            (activeStatus === "approved" && (payment.cycleStatus === "completed" || payment.cycleStatus === "paid")) ||
            (activeStatus === "rejected" && payment.cycleStatus === "rejected");

        if (!normalizedQuery) {
            return matchesOrganization && matchesStatus;
        }

        const matchesSearch = [
            payment.organization,
            payment.cycle,
            payment.receivableNote || "",
        ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesOrganization && matchesStatus && matchesSearch;
    });

    const totalCount = filteredPayments.length;
    const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
    const safeCurrentPage = Math.min(Math.max(currentPage, 1), pageCount);

    const startIndex = totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex =
        totalCount === 0
            ? 0
            : Math.min(startIndex + pageSize, totalCount);

    const paginatedPayments =
        totalCount === 0 ? [] : filteredPayments.slice(startIndex, endIndex);

    const formatAmount = (value) => {
        if (value == null) {
            return "-";
        }
        return `฿${value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const togglePayableVisibility = (id) => {
        setVisiblePayable((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
    };

    const toggleReceivableVisibility = (id) => {
        setVisibleReceivable((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pageCount) {
            return;
        }
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const renderCell = (payment, key) => {
        if (key === "organization") {
            return (
                <TableCell
                    className={`px-4 text-sm font-medium ${rowPaddingClass}`}
                >
                    {payment.organization}
                </TableCell>
            );
        }

        if (key === "cycle") {
            return (
                <TableCell
                    className={`px-4 text-sm text-muted-foreground ${rowPaddingClass}`}
                >
                    {payment.cycle}
                </TableCell>
            );
        }

        if (key === "payable") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                            {visiblePayable[payment.id] &&
                            payment.payableAmount != null
                                ? formatAmount(payment.payableAmount)
                                : "*****"}
                        </span>
                        <button
                            type="button"
                            onClick={() => togglePayableVisibility(payment.id)}
                            className="rounded-sm p-1 hover:bg-muted"
                            aria-label="Toggle payable visibility"
                        >
                            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                    </div>
                </TableCell>
            );
        }

        if (key === "receivable") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {payment.receivableMasked ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                                {visibleReceivable[payment.id] &&
                                payment.receivableAmount != null
                                    ? formatAmount(payment.receivableAmount)
                                    : "*****"}
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    toggleReceivableVisibility(payment.id)
                                }
                                className="rounded-sm p-1 hover:bg-muted"
                                aria-label="Toggle receivable visibility"
                            >
                                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                        </div>
                    ) : (
                        <span className="text-sm text-muted-foreground">
                            {payment.receivableNote}
                        </span>
                    )}
                </TableCell>
            );
        }

        if (key === "cycleStatus") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getCycleStatusBadge(payment.cycleStatus)}
                </TableCell>
            );
        }

        if (key === "invoiceStatus") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    <div className="flex items-center gap-2">
                        {getInvoiceStatusBadge(payment.invoiceStatus)}
                        {payment.hasReceipt &&
                        payment.invoiceStatus === "paid" ? (
                            <button
                                type="button"
                                className="text-xs font-medium text-primary hover:underline"
                            >
                                View Receipt
                            </button>
                        ) : null}
                    </div>
                </TableCell>
            );
        }

        if (key === "action") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="px-3 text-xs"
                        onClick={() =>
                            navigate(
                                PROTECTED_ROUTES.ADMIN_EMPLOYEE_PAYMENTS_DETAIL,
                            )
                        }
                    >
                        Show Invoices
                    </Button>
                </TableCell>
            );
        }

        return null;
    };

    const getCycleStatusBadge = (status) => {
        if (status === "completed") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Completed</span>
                </Badge>
            );
        }

        if (status === "paid") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Paid</span>
                </Badge>
            );
        }

        if (status === "pending") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
                    <span>Pending</span>
                </Badge>
            );
        }

        return null;
    };

    const getInvoiceStatusBadge = (status) => {
        if (status === "paid") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Paid</span>
                </Badge>
            );
        }

        if (status === "pending") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
                    <span>Pending</span>
                </Badge>
            );
        }

        if (status === "na") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-muted px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
                    <span>N/A</span>
                </Badge>
            );
        }

        return null;
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex flex-auto items-center gap-2">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Employee Payments
                        </h2>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-lg border bg-card px-2 py-3 md:px-3">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: Organization Dropdown */}
                    <div className="w-full lg:w-[240px]">
                        <Select
                            value={selectedOrganization}
                            onValueChange={setSelectedOrganization}
                        >
                            <SelectTrigger className="h-9 w-full">
                                <SelectValue placeholder="-- All Organizations --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    -- All Organizations --
                                </SelectItem>
                                {organizationOptions.map((org) => (
                                    <SelectItem key={org} value={org}>
                                        {org}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Right: Search + Action Buttons */}
                    <div className="flex flex-wrap items-center justify-end gap-2">
                        <div className="relative w-full sm:w-[240px]">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(event.target.value)
                                }
                                className="h-9 w-full pl-9 pr-8"
                            />
                            {searchQuery ? (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-muted"
                                    aria-label="Clear search"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            ) : null}
                        </div>

                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        aria-label="Filter"
                                        className="h-9 w-9"
                                    >
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 bg-white">
                                    <DropdownMenuCheckboxItem
                                        checked={activeStatus === "all"}
                                        onCheckedChange={() => setActiveStatus("all")}
                                        className="text-sm cursor-pointer"
                                    >
                                        All
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={activeStatus === "pending"}
                                        onCheckedChange={() => setActiveStatus("pending")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Pending
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={activeStatus === "approved"}
                                        onCheckedChange={() => setActiveStatus("approved")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Approved
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={activeStatus === "rejected"}
                                        onCheckedChange={() => setActiveStatus("rejected")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Rejected
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        aria-label="Density"
                                        className="h-9 w-9"
                                    >
                                        <SlidersHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {["compact", "standard", "comfortable"].map(
                                        (option) => (
                                            <DropdownMenuCheckboxItem
                                                key={option}
                                                className="capitalize"
                                                checked={density === option}
                                                onCheckedChange={() =>
                                                    setDensity(option)
                                                }
                                            >
                                                {option}
                                            </DropdownMenuCheckboxItem>
                                        ),
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        aria-label="View"
                                        className="h-9 w-9"
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {["table", "cards"].map((option) => (
                                        <DropdownMenuCheckboxItem
                                            key={option}
                                            className="capitalize"
                                            checked={viewMode === option}
                                            onCheckedChange={() =>
                                                setViewMode(option)
                                            }
                                        >
                                            {option}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        aria-label="Columns"
                                        className="h-9 w-9"
                                    >
                                        <Columns3 className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {columnDefinitions.map((column) => (
                                        <DropdownMenuCheckboxItem
                                            key={column.key}
                                            className="capitalize"
                                            checked={visibleColumns[column.key]}
                                            onCheckedChange={(value) =>
                                                setVisibleColumns((prev) => ({
                                                    ...prev,
                                                    [column.key]: !!value,
                                                }))
                                            }
                                        >
                                            {column.label}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    {viewMode === "table" ? (
                        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b bg-muted/40">
                                        {columnDefinitions
                                            .filter((col) => visibleColumns[col.key])
                                            .map((column) => (
                                                <TableHead
                                                    key={column.key}
                                                    className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground"
                                                >
                                                    {column.label}
                                                </TableHead>
                                            ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedPayments.length > 0 ? (
                                        paginatedPayments.map((payment) => (
                                            <TableRow
                                                key={payment.id}
                                                className="hover:bg-muted/30"
                                            >
                                                {visibleColumnKeys.map((key) => (
                                                    <Fragment key={key}>
                                                        {renderCell(payment, key)}
                                                    </Fragment>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={visibleColumnKeys.length}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                No employee payments found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {paginatedPayments.map((payment) => (
                                <Card key={payment.id} className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Organization</p>
                                                <p className="font-bold text-slate-900">{payment.organization}</p>
                                            </div>
                                            <Badge className={`rounded-sm border-0 px-2 py-1 text-[10px] font-bold uppercase ${
                                                payment.cycleStatus === "paid" || payment.cycleStatus === "completed"
                                                    ? "bg-emerald-500/10 text-emerald-700"
                                                    : "bg-amber-500/10 text-amber-700"
                                            }`}>
                                                {payment.cycleStatus}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium">Cycle</p>
                                                <p className="text-sm font-semibold text-slate-700">{payment.cycle}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium">Payable</p>
                                                <p className="text-sm font-black text-slate-900">
                                                    {visiblePayable[payment.id] ? formatAmount(payment.payableAmount) : "*****"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                            <Button 
                                                variant="outline" 
                                                className="flex-1 h-9 text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                                                onClick={() => togglePayableVisibility(payment.id)}
                                            >
                                                {visiblePayable[payment.id] ? "Hide Amount" : "View Amount"}
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="icon"
                                                className="h-9 w-9 border-slate-200 text-slate-600 hover:bg-slate-50"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {paginatedPayments.length === 0 && (
                                <div className="col-span-full h-32 flex items-center justify-center text-muted-foreground bg-white border border-dashed rounded-lg">
                                    No employee payments found.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-4 flex flex-col justify-between gap-4 px-2 lg:flex-row lg:items-center">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {totalCount === 0 ? 0 : startIndex + 1}-
                        {endIndex} of {totalCount}
                    </div>

                    <div className="flex flex-col space-y-2 text-sm lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Rows per page</span>
                            <Select
                                value={`${pageSize}`}
                                onValueChange={(value) =>
                                    handlePageSizeChange(Number(value))
                                }
                            >
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
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => handlePageChange(1)}
                                    disabled={safeCurrentPage === 1 || totalCount === 0}
                                >
                                    <span className="sr-only">Go to first page</span>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                                    disabled={safeCurrentPage === 1 || totalCount === 0}
                                >
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                                    disabled={
                                        safeCurrentPage >= pageCount || totalCount === 0
                                    }
                                >
                                    <span className="sr-only">Go to next page</span>
                                    Next <ChevronRight className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => handlePageChange(pageCount)}
                                    disabled={
                                        safeCurrentPage >= pageCount || totalCount === 0
                                    }
                                >
                                    <span className="sr-only">Go to last page</span>
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

export default EmployeePayments;
