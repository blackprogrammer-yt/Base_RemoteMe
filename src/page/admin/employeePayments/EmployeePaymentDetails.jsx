import { useMemo, useState } from "react";
import {
    ArrowLeft,
    Banknote,
    CalendarDays,
    Eye,
    FileText,
    Search,
    XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const invoices = [
    {
        id: 1,
        employeeName: "Ding Dong",
        country: "United States",
        contractAmount: 1700,
        additionAmount: 0,
        deductionAmount: 0,
        invoiceAmount: 1700,
        takeHomeAmount: 1700,
        paidAmount: 0,
        remainingAmount: 1700,
        status: "pending",
    },
];

const invoiceStatusFilters = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "created", label: "Created" },
    { key: "submitted", label: "Submitted" },
    { key: "partially-paid", label: "Partially Paid" },
    { key: "paid", label: "Paid" },
    { key: "change-requested", label: "Change Requested" },
    { key: "resolved", label: "Resolved" },
    { key: "voided", label: "Voided" },
];

const EmployeePaymentDetails = () => {
    const navigate = useNavigate();
    const [activeStatus, setActiveStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visibleFields, setVisibleFields] = useState({});

    const filteredInvoices = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return invoices.filter((invoice) => {
            const matchesStatus =
                activeStatus === "all" || invoice.status === activeStatus;

            if (!normalizedQuery) {
                return matchesStatus;
            }

            const matchesSearch = [invoice.employeeName, invoice.country]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery);

            return matchesStatus && matchesSearch;
        });
    }, [activeStatus, searchQuery]);

    const totalCount = filteredInvoices.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage =
        totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex =
        totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex =
        totalCount === 0
            ? 0
            : Math.min(startIndex + pageSize, totalCount);
    const paginatedInvoices =
        totalCount === 0 ? [] : filteredInvoices.slice(startIndex, endIndex);

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

    const getStatusBadge = (status) => {
        if (status === "paid") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Paid</span>
                </Badge>
            );
        }

        if (status === "partially-paid") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Partially Paid</span>
                </Badge>
            );
        }

        if (status === "submitted" || status === "created") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-sky-500/10 px-2 py-1 text-xs font-semibold uppercase text-sky-700">
                    <span>{status === "submitted" ? "Submitted" : "Created"}</span>
                </Badge>
            );
        }

        if (status === "change-requested") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
                    <span>Change Requested</span>
                </Badge>
            );
        }

        if (status === "resolved") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Resolved</span>
                </Badge>
            );
        }

        if (status === "voided") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-destructive/10 px-2 py-1 text-xs font-semibold uppercase text-destructive">
                    <span>Voided</span>
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

    const formatAmount = (value) => {
        if (value == null) {
            return "-";
        }
        return `฿${value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const toggleFieldVisibility = (invoiceId, fieldKey) => {
        const key = `${invoiceId}-${fieldKey}`;
        setVisibleFields((previous) => ({
            ...previous,
            [key]: !previous[key],
        }));
    };

    const renderMaskedAmount = (invoice, fieldKey, value, textClassName = "") => {
        const key = `${invoice.id}-${fieldKey}`;
        const isVisible = visibleFields[key];

        return (
            <div className="flex items-center gap-2">
                <span className={textClassName}>
                    {isVisible && value != null ? formatAmount(value) : "*****"}
                </span>
                <button
                    type="button"
                    onClick={() => toggleFieldVisibility(invoice.id, fieldKey)}
                    className="rounded-sm p-1 hover:bg-muted"
                    aria-label="Toggle amount visibility"
                >
                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
            </div>
        );
    };

    const allInvoicesPaid = filteredInvoices.every(
        (invoice) => invoice.status === "paid",
    );

    const overallStatus = allInvoicesPaid ? "paid" : "pending";

    const handleMarkAsPaid = () => {
        if (!allInvoicesPaid) {
            toast({
                description: (
                    <div className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-white" />
                        <span className="font-medium">
                            Please pay all employee invoices before marking the
                            cycle as paid
                        </span>
                    </div>
                ),
                action: (
                    <ToastAction
                        altText="Dismiss"
                        className="border-yellow-400 bg-transparent text-yellow-400 hover:bg-yellow-400 hover:text-red-600 font-semibold"
                    >
                        Dismiss
                    </ToastAction>
                ),
                variant: "destructive",
            });
            return;
        }
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-auto items-center gap-2">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Employee Payment Details
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            className="flex items-center gap-2"
                            onClick={handleMarkAsPaid}
                        >
                            Mark as Paid
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() =>
                                navigate(PROTECTED_ROUTES.ADMIN_EMPLOYEE_PAYMENTS)
                            }
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </div>

            <section className="grid gap-4 lg:grid-cols-[2fr,1.4fr]">
                <Card className="border-0 bg-muted/40 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <CardTitle className="text-base font-semibold">
                                Breakdown
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <span>Status:</span>
                            {getStatusBadge(overallStatus)}
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        <div className="space-y-1 rounded-lg border bg-card px-3 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <Banknote className="h-3.5 w-3.5 text-primary" />
                                <span>Total Contract Amount</span>
                            </div>
                            <div className="text-lg font-semibold">฿1,700.00</div>
                        </div>

                        <div className="space-y-1 rounded-lg border bg-card px-3 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <Banknote className="h-3.5 w-3.5 text-emerald-600" />
                                <span>Total Invoice Amount</span>
                            </div>
                            <div className="text-lg font-semibold text-emerald-600">
                                ฿1,700.00
                            </div>
                        </div>

                        <div className="space-y-1 rounded-lg border bg-card px-3 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <Banknote className="h-3.5 w-3.5 text-emerald-600" />
                                <span>Total Additions</span>
                            </div>
                            <div className="text-lg font-semibold text-emerald-600">
                                ฿0.00
                            </div>
                        </div>

                        <div className="space-y-1 rounded-lg border bg-card px-3 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <Banknote className="h-3.5 w-3.5 text-destructive" />
                                <span>Total Deductions</span>
                            </div>
                            <div className="text-lg font-semibold text-destructive">
                                ฿0.00
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-muted/40 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-base font-semibold">
                                Overview
                            </CardTitle>
                        </div>
                        <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
                            <span>Jun 1979 Cycle</span>
                        </Badge>
                    </CardHeader>
                    <CardContent className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1 rounded-lg border bg-card px-3 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <Banknote className="h-3.5 w-3.5 text-primary" />
                                <span>Total Invoice Amount</span>
                            </div>
                            <div className="text-lg font-semibold text-emerald-600">
                                ฿1,700.00
                            </div>
                        </div>

                        <div className="space-y-1 rounded-lg border bg-card px-3 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <FileText className="h-3.5 w-3.5 text-primary" />
                                <span>Invoices</span>
                            </div>
                            <div className="text-lg font-semibold">1</div>
                        </div>

                        <div className="space-y-1 rounded-lg border bg-card px-3 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                                <span>Start Date</span>
                            </div>
                            <div className="text-sm font-semibold">Jun 1, 1979</div>
                        </div>

                        <div className="space-y-1 rounded-lg border bg-card px-3 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                                <span>End Date</span>
                            </div>
                            <div className="text-sm font-semibold">Jun 30, 1979</div>
                        </div>
                    </CardContent>
                    <CardDescription className="px-6 pb-4 text-xs text-muted-foreground">
                        Cycle status is currently pending. Update the status once all
                        invoices are processed.
                    </CardDescription>
                </Card>
            </section>

            <section className="w-full rounded-lg border bg-card px-2 py-3 md:px-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="space-y-1">
                        <h3 className="text-base font-semibold">Invoices</h3>
                    </div>
                </div>

                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {invoiceStatusFilters.map((status) => (
                            <Button
                                key={status.key}
                                type="button"
                                variant={
                                    activeStatus === status.key ? "default" : "outline"
                                }
                                size="sm"
                                className="h-8 border-dashed px-3 text-xs font-medium"
                                onClick={() => {
                                    setActiveStatus(status.key);
                                    setCurrentPage(1);
                                }}
                            >
                                {status.label}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-[260px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search employees..."
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
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
                                <span className="sr-only">Clear search</span>
                            </button>
                        ) : null}
                    </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b bg-muted/40">
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Employee Name
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Country
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Contract Amount
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Addition
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Deduction
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Invoice Amount
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Take Home
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Paid Amount
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Remaining Amount
                                </TableHead>
                                <TableHead className="px-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedInvoices.length > 0 ? (
                                paginatedInvoices.map((invoice) => (
                                    <TableRow
                                        key={invoice.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <TableCell className="px-4 py-2 text-sm font-medium">
                                            {invoice.employeeName}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-sm text-muted-foreground">
                                            {invoice.country}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-sm">
                                            {renderMaskedAmount(
                                                invoice,
                                                "contractAmount",
                                                invoice.contractAmount,
                                                "text-sm font-medium",
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-sm">
                                            {renderMaskedAmount(
                                                invoice,
                                                "additionAmount",
                                                invoice.additionAmount,
                                                "text-sm font-medium text-emerald-600",
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-sm">
                                            {renderMaskedAmount(
                                                invoice,
                                                "deductionAmount",
                                                invoice.deductionAmount,
                                                "text-sm font-medium text-destructive",
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-sm">
                                            {renderMaskedAmount(
                                                invoice,
                                                "invoiceAmount",
                                                invoice.invoiceAmount,
                                                "text-sm font-medium",
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-sm">
                                            {renderMaskedAmount(
                                                invoice,
                                                "takeHomeAmount",
                                                invoice.takeHomeAmount,
                                                "text-sm font-medium",
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-sm">
                                            {renderMaskedAmount(
                                                invoice,
                                                "paidAmount",
                                                invoice.paidAmount,
                                                "text-sm font-medium",
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-sm">
                                            {renderMaskedAmount(
                                                invoice,
                                                "remainingAmount",
                                                invoice.remainingAmount,
                                                "text-sm font-medium",
                                            )}
                                        </TableCell>
                                        <TableCell className="px-4 py-2">
                                            {getStatusBadge(invoice.status)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="px-4 py-6 text-center text-sm text-muted-foreground"
                                    >
                                        No invoices found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4 flex flex-col justify-between gap-4 px-2 lg:flex-row lg:items-center">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {totalCount === 0 ? 0 : startIndex + 1}-{endIndex} of{" "}
                        {totalCount}
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
                                Page {totalCount === 0 ? 0 : safeCurrentPage} of{" "}
                                {pageCount}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => handlePageChange(1)}
                                    disabled={safeCurrentPage === 1 || totalCount === 0}
                                >
                                    <span className="sr-only">Go to first page</span>
                                    {"<<"}
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                                    disabled={safeCurrentPage === 1 || totalCount === 0}
                                >
                                    <span className="sr-only">Go to previous page</span>
                                    Prev
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                                    disabled={
                                        safeCurrentPage >= pageCount || totalCount === 0
                                    }
                                >
                                    <span className="sr-only">Go to next page</span>
                                    Next
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
                                    {">>"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EmployeePaymentDetails;
