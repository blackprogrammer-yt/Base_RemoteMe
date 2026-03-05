import { Fragment, useMemo, useState } from "react";
import {
    ArrowLeft,
    BriefcaseBusiness,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    CircleDollarSign,
    Columns3,
    Eye,
    FileText,
    Filter,
    Folder,
    LayoutGrid,
    List,
    MinusCircle,
    PlusCircle,
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const statusFilterOptions = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "created", label: "Created" },
    { key: "submitted", label: "Submitted" },
    { key: "partially paid", label: "Partially Paid" },
    { key: "paid", label: "Paid" },
    { key: "change requested", label: "Change Requested" },
    { key: "resolved", label: "Resolved" },
    { key: "voided", label: "Voided" },
];

const employees = [
    "Andy Arg",
    "Andy Robert",
    "Avatar Lina",
    "Big Man",
    "Christ Steve",
    "Christine Eman",
    "Daniel Dew",
    "Dare Devil",
    "Direct Emp",
    "Harold Steve",
    "Ken Adams",
    "Lina Stark",
    "Morgan Josh",
    "Nancy Joe",
    "Peter Kent",
    "Queen Aye",
    "Randy Ross",
];

const baseRows = employees.flatMap((employee, index) => {
    const statuses = [
        "Voided",
        "Submitted",
        "Submitted",
        "Partially Paid",
        "Paid",
        "Pending",
        "Created",
        "Resolved",
        "Change Requested",
    ];
    const status = statuses[index % statuses.length];

    return [
        {
            id: index * 2 + 1,
            employee,
            country: "United States",
            contractAmount: "*****",
            addition: "*****",
            deduction: "*****",
            invoiceAmount: "*****",
            paidAmount: "*****",
            remainingAmount: "*****",
            status,
        },
        {
            id: index * 2 + 2,
            employee: `${employee} Jr`,
            country: "United States",
            contractAmount: "*****",
            addition: "*****",
            deduction: "*****",
            invoiceAmount: "*****",
            paidAmount: "*****",
            remainingAmount: "*****",
            status: index % 3 === 0 ? "Voided" : "Submitted",
        },
    ];
});

const payrollRows = [
    ...baseRows,
    {
        id: 35,
        employee: "Tony Lane",
        country: "United States",
        contractAmount: "*****",
        addition: "*****",
        deduction: "*****",
        invoiceAmount: "*****",
        paidAmount: "*****",
        remainingAmount: "*****",
        status: "Submitted",
    },
];

const columnDefinitions = [
    { key: "employee", label: "Employee Name" },
    { key: "country", label: "Country" },
    { key: "contractAmount", label: "Contract Amount" },
    { key: "addition", label: "Addition" },
    { key: "deduction", label: "Deduction" },
    { key: "invoiceAmount", label: "Invoice Amount" },
    { key: "paidAmount", label: "Paid Amount" },
    { key: "remainingAmount", label: "Remaining Amount" },
    { key: "status", label: "Status" },
];

const PayrollDetail = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [visibleColumns, setVisibleColumns] = useState({
        employee: true,
        country: true,
        contractAmount: true,
        addition: true,
        deduction: true,
        invoiceAmount: true,
        paidAmount: true,
        remainingAmount: true,
        status: true,
    });

    const [columnOrder, setColumnOrder] = useState([
        "employee",
        "country",
        "contractAmount",
        "addition",
        "deduction",
        "invoiceAmount",
        "paidAmount",
        "remainingAmount",
        "status",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const columnLabelMap = columnDefinitions.reduce((acc, column) => {
        acc[column.key] = column.label;
        return acc;
    }, {});

    const densityClasses = {
        compact: "py-2",
        standard: "py-3",
        comfortable: "py-4",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.compact;

    const visibleColumnOrder = columnOrder.filter((key) => visibleColumns[key]);

    const handleDragStart = (key) => {
        setDraggedColumn(key);
    };

    const handleDrop = (targetKey) => {
        if (!draggedColumn || draggedColumn === targetKey) {
            return;
        }

        const nextOrder = [...columnOrder];
        const fromIndex = nextOrder.indexOf(draggedColumn);
        const toIndex = nextOrder.indexOf(targetKey);

        if (fromIndex === -1 || toIndex === -1) {
            return;
        }

        nextOrder.splice(fromIndex, 1);
        nextOrder.splice(toIndex, 0, draggedColumn);
        setColumnOrder(nextOrder);
        setDraggedColumn(null);
    };

    const filteredRows = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return payrollRows.filter((row) => {
            const byStatus =
                selectedStatus === "all" ||
                row.status.toLowerCase() === selectedStatus;

            if (!query) {
                return byStatus;
            }

            const bySearch = [row.employee, row.country, row.status]
                .join(" ")
                .toLowerCase()
                .includes(query);

            return byStatus && bySearch;
        });
    }, [searchQuery, selectedStatus]);

    const totalCount = filteredRows.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage =
        totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex =
        totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex =
        totalCount === 0
            ? 0
            : Math.min(startIndex + pageSize, totalCount);
    const paginatedRows =
        totalCount === 0 ? [] : filteredRows.slice(startIndex, endIndex);

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

    const getStatusBadge = (status) => {
        if (!status) {
            return null;
        }

        const normalized = status.toLowerCase();

        if (normalized === "voided") {
            return (
                <Badge variant="secondary" className="bg-rose-500/10 text-rose-700 border-0 rounded-sm px-2">
                    {status}
                </Badge>
            );
        }

        if (normalized === "pending" || normalized === "change requested") {
            return (
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 border-0 rounded-sm px-2">
                    {status}
                </Badge>
            );
        }

        if (
            normalized === "submitted" ||
            normalized === "created" ||
            normalized === "resolved" ||
            normalized === "partially paid" ||
            normalized === "paid"
        ) {
            return (
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-0 rounded-sm px-2">
                    {status}
                </Badge>
            );
        }

        return (
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-0 rounded-sm px-2">
                {status}
            </Badge>
        );
    };

    const renderMaskedCell = (value, textClass) => (
        <div className={`inline-flex items-center gap-1 text-sm ${textClass}`}>
            {value}
            <Eye className="h-3.5 w-3.5" />
        </div>
    );

    const renderCell = (row, key) => {
        if (key === "employee") {
            return (
                <TableCell className={`px-4 text-sm font-semibold ${rowPaddingClass}`}>
                    {row.employee}
                </TableCell>
            );
        }

        if (key === "country") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {row.country}
                </TableCell>
            );
        }

        if (key === "contractAmount") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {renderMaskedCell(row.contractAmount, "text-blue-600")}
                </TableCell>
            );
        }

        if (key === "addition") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {renderMaskedCell(row.addition, "text-emerald-600")}
                </TableCell>
            );
        }

        if (key === "deduction") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {renderMaskedCell(row.deduction, "text-rose-600")}
                </TableCell>
            );
        }

        if (key === "invoiceAmount") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {renderMaskedCell(row.invoiceAmount, "text-emerald-700")}
                </TableCell>
            );
        }

        if (key === "paidAmount") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {renderMaskedCell(row.paidAmount, "text-blue-600")}
                </TableCell>
            );
        }

        if (key === "remainingAmount") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {renderMaskedCell(row.remainingAmount, "text-muted-foreground")}
                </TableCell>
            );
        }

        if (key === "status") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getStatusBadge(row.status)}
                </TableCell>
            );
        }

        return null;
    };

    return (
        <main className="flex flex-1 flex-col gap-6 py-4 md:pt-3">
            <section className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-2xl font-bold tracking-tight">Payroll Details</h2>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8" disabled>
                        Complete Cycle
                    </Button>
                    <Button size="sm" className="h-8 gap-1.5">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back
                    </Button>
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
                <Card className="overflow-hidden border">
                    <div className="flex items-center justify-between bg-blue-500 px-4 py-2 text-sm font-semibold text-white">
                        <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4" />
                            Breakdown
                        </div>
                        <span className="font-medium">Status: Completed</span>
                    </div>
                    <CardContent className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
                        <div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CircleDollarSign className="h-3.5 w-3.5" />
                                Total Contract Amount
                            </p>
                            <p className="text-xl font-bold">₱50,601.00</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CircleDollarSign className="h-3.5 w-3.5" />
                                Total Invoice Amount
                            </p>
                            <p className="text-xl font-bold text-emerald-600">₱51,119.50</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <PlusCircle className="h-3.5 w-3.5" />
                                Total Additions
                            </p>
                            <p className="text-xl font-bold text-emerald-600">₱1,267.25</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MinusCircle className="h-3.5 w-3.5" />
                                Total Deductions
                            </p>
                            <p className="text-xl font-bold text-rose-600">₱649.50</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden border">
                    <div className="flex items-center justify-between bg-amber-500 px-4 py-2 text-sm font-semibold text-white">
                        <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4" />
                            Overview
                        </div>
                        <span className="rounded bg-white/20 px-2 py-0.5 text-xs">Dec 2025 Cycle</span>
                    </div>
                    <CardContent className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
                        <div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CircleDollarSign className="h-3.5 w-3.5" />
                                Total Invoice Amount
                            </p>
                            <p className="text-xl font-bold text-emerald-600">₱51,119.50</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <List className="h-3.5 w-3.5" />
                                Invoices
                            </p>
                            <p className="text-xl font-bold">32</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CalendarDays className="h-3.5 w-3.5" />
                                Start Date
                            </p>
                            <p className="text-base font-semibold">Dec 1, 2025</p>
                        </div>
                        <div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <CalendarDays className="h-3.5 w-3.5" />
                                End Date
                            </p>
                            <p className="text-base font-semibold">Dec 31, 2025</p>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="w-full rounded-lg border bg-card px-2 py-2 md:px-3">
                <div className="flex items-center gap-2 pb-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-2xl font-bold tracking-tight">Invoices</h3>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {statusFilterOptions.map((statusOption) => (
                            <Button
                                key={statusOption.key}
                                type="button"
                                variant={
                                    selectedStatus === statusOption.key ? "default" : "outline"
                                }
                                size="sm"
                                className="h-9 border-dashed px-3 text-xs font-medium"
                                onClick={() => {
                                    setSelectedStatus(statusOption.key);
                                    setCurrentPage(1);
                                }}
                            >
                                {statusOption.label}
                            </Button>
                        ))}
                    </div>

                    <div className="flex w-full flex-wrap items-center justify-start gap-2 md:w-auto md:justify-end">
                        <div className="relative w-full md:w-[260px]">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={(event) => {
                                    setSearchQuery(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="h-9 w-full pl-9 pr-8"
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
                                    <Filter />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {statusFilterOptions.map((statusOption) => (
                                    <DropdownMenuCheckboxItem
                                        key={statusOption.key}
                                        className="capitalize"
                                        checked={selectedStatus === statusOption.key}
                                        onCheckedChange={() => {
                                            setSelectedStatus(statusOption.key);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {statusOption.label}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" aria-label="Density">
                                    <SlidersHorizontal />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {["compact", "standard", "comfortable"].map((option) => (
                                    <DropdownMenuCheckboxItem
                                        key={option}
                                        className="capitalize"
                                        checked={density === option}
                                        onCheckedChange={() => setDensity(option)}
                                    >
                                        {option}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" aria-label="View">
                                    <LayoutGrid />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {["table", "cards"].map((option) => (
                                    <DropdownMenuCheckboxItem
                                        key={option}
                                        className="capitalize"
                                        checked={viewMode === option}
                                        onCheckedChange={() => setViewMode(option)}
                                    >
                                        {option}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" aria-label="Columns">
                                    <Columns3 />
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

                <div className="mt-4">
                    {viewMode === "table" ? (
                        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b bg-muted/40">
                                        {visibleColumnOrder.map((key) => (
                                            <TableHead
                                                key={key}
                                                draggable
                                                onDragStart={() => handleDragStart(key)}
                                                onDragOver={(event) => event.preventDefault()}
                                                onDrop={() => handleDrop(key)}
                                                className="cursor-move select-none px-4 text-left text-xs font-semibold uppercase text-muted-foreground"
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    <span className="text-muted-foreground/70">::</span>
                                                    {columnLabelMap[key]}
                                                </span>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedRows.length > 0 ? (
                                        paginatedRows.map((row) => (
                                            <TableRow key={row.id} className="hover:bg-muted/30">
                                                {visibleColumnOrder.map((key) => (
                                                    <Fragment key={key}>
                                                        {renderCell(row, key)}
                                                    </Fragment>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={visibleColumnOrder.length}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                No invoices found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedRows.length > 0 ? (
                                paginatedRows.map((row) => (
                                    <div
                                        key={row.id}
                                        className="rounded-lg border bg-card p-4 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                {visibleColumns.employee && (
                                                    <p className="text-sm font-semibold">
                                                        {row.employee}
                                                    </p>
                                                )}
                                                {visibleColumns.country && (
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {row.country}
                                                    </p>
                                                )}
                                            </div>
                                            {visibleColumns.status
                                                ? getStatusBadge(row.status)
                                                : null}
                                        </div>

                                        {visibleColumns.contractAmount && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Contract Amount</p>
                                                {renderMaskedCell(row.contractAmount, "text-blue-600")}
                                            </div>
                                        )}

                                        {visibleColumns.addition && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Addition</p>
                                                {renderMaskedCell(row.addition, "text-emerald-600")}
                                            </div>
                                        )}

                                        {visibleColumns.deduction && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Deduction</p>
                                                {renderMaskedCell(row.deduction, "text-rose-600")}
                                            </div>
                                        )}

                                        {visibleColumns.invoiceAmount && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Invoice Amount</p>
                                                {renderMaskedCell(row.invoiceAmount, "text-emerald-700")}
                                            </div>
                                        )}

                                        {visibleColumns.paidAmount && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Paid Amount</p>
                                                {renderMaskedCell(row.paidAmount, "text-blue-600")}
                                            </div>
                                        )}

                                        {visibleColumns.remainingAmount && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Remaining Amount</p>
                                                {renderMaskedCell(row.remainingAmount, "text-muted-foreground")}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full flex items-center justify-center py-12">
                                    <p className="text-center text-sm text-muted-foreground">
                                        No invoices found.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-4 flex flex-col justify-between gap-4 px-2 lg:flex-row lg:items-center">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {totalCount === 0 ? 0 : startIndex + 1}-{endIndex} of {totalCount} records
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
                                    disabled={safeCurrentPage >= pageCount || totalCount === 0}
                                >
                                    <span className="sr-only">Go to next page</span>
                                    Next <ChevronRight className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => handlePageChange(pageCount)}
                                    disabled={safeCurrentPage >= pageCount || totalCount === 0}
                                >
                                    <span className="sr-only">Go to last page</span>
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PayrollDetail;
