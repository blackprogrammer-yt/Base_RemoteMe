import { Fragment, useMemo, useState } from "react";
import {
    Columns3,
    Search,
    Download,
    Users,
    Clock,
    FileText,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    LayoutGrid,
    SlidersHorizontal,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const baseNewHires = [
    {
        id: 1,
        name: "Carly Ray",
        initials: "CR",
        email: "fopiwerasi@mailinator.com",
        invitationStatus: "Accepted",
        accountStatus: "Pending",
    },
    {
        id: 2,
        name: "Empty Field",
        initials: "EF",
        email: "khan.shahab02729+empty@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
    {
        id: 3,
        name: "Kannada Kely",
        initials: "KK",
        email: "khan.shahab02729+kannada@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
    {
        id: 4,
        name: "Khatril Millan",
        initials: "KM",
        email: "khan.shahab02729+khatri@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
    {
        id: 5,
        name: "Kevan Roger",
        initials: "KR",
        email: "khan.shahab02729+kevan@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
    {
        id: 6,
        name: "Andy Robert",
        initials: "AR",
        email: "khan.shahab02729+robert@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
    {
        id: 7,
        name: "Kely Arman",
        initials: "KA",
        email: "khan.shahab02729+arman@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
    {
        id: 8,
        name: "Hulk Huge",
        initials: "HH",
        email: "khan.shahab02729+hulk@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
    {
        id: 9,
        name: "Direct Emp",
        initials: "DE",
        email: "khan.shahab02729+emp@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
    {
        id: 10,
        name: "Reena Angular",
        initials: "RA",
        email: "khan.shahab02729+reena@gmail.com",
        invitationStatus: "Accepted",
        accountStatus: "Approved",
    },
];

const accountStatusFilterOptions = [
    { key: "all", label: "All" },
    { key: "approved", label: "Approved" },
    { key: "pending", label: "Pending" },
];

const columnDefinitions = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "invitationStatus", label: "Invitation Status" },
    { key: "accountStatus", label: "Account Status" },
    { key: "action", label: "Action" },
];

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAccountStatus, setSelectedAccountStatus] = useState("all");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        email: true,
        invitationStatus: true,
        accountStatus: true,
        action: true,
    });
    const [columnOrder, setColumnOrder] = useState([
        "name",
        "email",
        "invitationStatus",
        "accountStatus",
        "action",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const newHires = useMemo(() => {
        return Array.from({ length: 40 }, (_, index) => {
            const source = baseNewHires[index % baseNewHires.length];
            const serial = index + 1;

            return {
                ...source,
                id: serial,
                name:
                    index < baseNewHires.length
                        ? source.name
                        : `${source.name} ${Math.floor(index / baseNewHires.length) + 1}`,
                email: source.email.replace("@", `+${serial}@`),
                accountStatus: serial % 7 === 0 ? "Pending" : source.accountStatus,
            };
        });
    }, []);

    const documents = [
        {
            id: 1,
            name: "Organization Rules and Regulations",
            signStatus: "Signed",
            signedAt: "17-Dec-2025 06:35 AM",
        },
        {
            id: 2,
            name: "Non Disclosure Agreement",
            signStatus: "Signed",
            signedAt: "17-Dec-2025 06:35 AM",
        },
        {
            id: 3,
            name: "Admin Document 1",
            signStatus: "Signed",
            signedAt: "17-Dec-2025 06:43 AM",
        },
    ];

    const densityClasses = {
        compact: "py-2",
        standard: "py-3",
        comfortable: "py-4",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.compact;

    const columnLabelMap = columnDefinitions.reduce((acc, column) => {
        acc[column.key] = column.label;
        return acc;
    }, {});

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

    const filteredNewHires = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return newHires.filter((hire) => {
            const matchesStatus =
                selectedAccountStatus === "all" ||
                hire.accountStatus.toLowerCase() === selectedAccountStatus;

            if (!normalizedQuery) {
                return matchesStatus;
            }

            const matchesSearch = [
                hire.name,
                hire.email,
                hire.invitationStatus,
                hire.accountStatus,
            ]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery);

            return matchesStatus && matchesSearch;
        });
    }, [newHires, searchQuery, selectedAccountStatus]);

    const totalCount = filteredNewHires.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage =
        totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex =
        totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex =
        totalCount === 0 ? 0 : Math.min(startIndex + pageSize, totalCount);
    const paginatedNewHires =
        totalCount === 0
            ? []
            : filteredNewHires.slice(startIndex, endIndex);

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

    const getInvitationBadge = (status) => {
        return (
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-0 rounded-sm px-2">
                {status}
            </Badge>
        );
    };

    const getAccountStatusBadge = (status) => {
        return (
            <Badge
                variant="secondary"
                className={`${status === "Pending" ? "bg-amber-500/10 text-amber-700" : "bg-emerald-500/10 text-emerald-700"} border-0 rounded-sm px-2`}
            >
                {status}
            </Badge>
        );
    };

    const renderCell = (hire, key) => {
        if (key === "name") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {hire.initials}
                        </div>
                        <span className="font-medium">{hire.name}</span>
                    </div>
                </TableCell>
            );
        }

        if (key === "email") {
            return (
                <TableCell className={`px-4 text-muted-foreground ${rowPaddingClass}`}>
                    {hire.email}
                </TableCell>
            );
        }

        if (key === "invitationStatus") {
            return (
                <TableCell className={`px-4 text-center ${rowPaddingClass}`}>
                    {getInvitationBadge(hire.invitationStatus)}
                </TableCell>
            );
        }

        if (key === "accountStatus") {
            return (
                <TableCell className={`px-4 text-center ${rowPaddingClass}`}>
                    {getAccountStatusBadge(hire.accountStatus)}
                </TableCell>
            );
        }

        if (key === "action") {
            return (
                <TableCell className={`px-4 text-right ${rowPaddingClass}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 h-8 px-3">
                        View
                    </Button>
                </TableCell>
            );
        }

        return null;
    };

    return (
        <main className="flex flex-1 flex-col py-4 md:pt-3">
            <section className="mb-6 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">
                    Welcome, <span className="text-primary">Miller Mark!</span>
                </h2>
                <p className="text-muted-foreground">
                    Here's what's happening today
                </p>
            </section>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    <Card className="shadow-none border-0 bg-muted/40">
                        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Users className="h-4 w-4" />
                            </div>
                            <CardTitle className="text-base font-semibold">New Hires</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4 p-4 pt-0">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="relative w-full md:w-[260px]">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search"
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

                                <div className="flex w-full flex-wrap items-center justify-start gap-2 md:w-auto md:justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="icon" aria-label="Filter">
                                                <Filter className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {accountStatusFilterOptions.map((option) => (
                                                <DropdownMenuCheckboxItem
                                                    key={option.key}
                                                    className="capitalize"
                                                    checked={selectedAccountStatus === option.key}
                                                    onCheckedChange={() => {
                                                        setSelectedAccountStatus(option.key);
                                                        setCurrentPage(1);
                                                    }}
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
                                                <LayoutGrid className="h-4 w-4" />
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

                            <div className="mt-1">
                                {viewMode === "table" ? (
                                    <div className="overflow-hidden rounded-lg border bg-background">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-muted/50">
                                                    {visibleColumnOrder.map((key) => (
                                                        <TableHead
                                                            key={key}
                                                            draggable
                                                            onDragStart={() => handleDragStart(key)}
                                                            onDragOver={(event) => event.preventDefault()}
                                                            onDrop={() => handleDrop(key)}
                                                            className={`cursor-move select-none px-4 font-semibold ${key === "invitationStatus" || key === "accountStatus" ? "text-center" : ""} ${key === "action" ? "text-right" : ""}`}
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
                                                {paginatedNewHires.length > 0 ? (
                                                    paginatedNewHires.map((hire) => (
                                                        <TableRow key={hire.id} className="hover:bg-muted/30">
                                                            {visibleColumnOrder.map((key) => (
                                                                <Fragment key={key}>
                                                                    {renderCell(hire, key)}
                                                                </Fragment>
                                                            ))}
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={visibleColumnOrder.length}
                                                            className="py-8 text-center text-sm text-muted-foreground"
                                                        >
                                                            No contracts found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                ) : (
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {paginatedNewHires.length > 0 ? (
                                            paginatedNewHires.map((hire) => (
                                                <div
                                                    key={hire.id}
                                                    className="rounded-lg border bg-background p-4"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                                {hire.initials}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">{hire.name}</p>
                                                                <p className="text-xs text-muted-foreground">{hire.email}</p>
                                                            </div>
                                                        </div>
                                                        {getAccountStatusBadge(hire.accountStatus)}
                                                    </div>

                                                    <div className="mt-3 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs text-muted-foreground">Invitation</span>
                                                            {getInvitationBadge(hire.invitationStatus)}
                                                        </div>
                                                        <Button variant="ghost" size="sm" className="h-8 px-3 text-primary hover:text-primary hover:bg-primary/10">
                                                            View
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full flex items-center justify-center py-12">
                                                <p className="text-center text-sm text-muted-foreground">
                                                    No contracts found.
                                                </p>
                                            </div>
                                        )}
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
                                        <Select
                                            value={`${pageSize}`}
                                            onValueChange={(value) =>
                                                handlePageSizeChange(Number(value))
                                            }
                                        >
                                            <SelectTrigger className="h-8 w-[70px] bg-background">
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
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card className="relative overflow-hidden rounded-xl border-0 bg-card shadow-sm dark:border dark:border-border/50">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-muted-foreground">Your Team</p>
                                    <p className="text-xs text-muted-foreground">Total Employees</p>
                                </div>
                            </div>
                            <p className="text-2xl font-semibold">37</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden rounded-xl border-0 bg-card shadow-sm dark:border dark:border-border/50">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-muted-foreground">Timesheets</p>
                                    <p className="text-xs text-muted-foreground">Awaited for Approval</p>
                                </div>
                            </div>
                            <p className="text-2xl font-semibold">1</p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden rounded-xl border-0 bg-card shadow-sm dark:border dark:border-border/50">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-muted-foreground">Invoices</p>
                                    <p className="text-xs text-muted-foreground">Awaited for Approval</p>
                                </div>
                            </div>
                            <p className="text-2xl font-semibold">31</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-6">
                <Card className="shadow-none">
                    <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <FileText className="h-4 w-4" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold">Documents Overview</CardTitle>
                            <CardDescription>
                                Review the list of documents below along with their current signing status.
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="font-semibold">Document</TableHead>
                                        <TableHead className="text-center font-semibold">Download</TableHead>
                                        <TableHead className="text-center font-semibold">Sign Status</TableHead>
                                        <TableHead className="text-center font-semibold">Signed At</TableHead>
                                        <TableHead className="text-right font-semibold">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documents.map((doc) => (
                                        <TableRow key={doc.id} className="hover:bg-muted/30">
                                            <TableCell className="py-3 font-medium">
                                                {doc.name}
                                            </TableCell>
                                            <TableCell className="py-3 text-center">
                                                <Button variant="outline" size="sm" className="h-8 gap-2 border-primary/20 text-primary hover:bg-primary/10">
                                                    <Download className="h-3.5 w-3.5" />
                                                    Download
                                                </Button>
                                            </TableCell>
                                            <TableCell className="py-3 text-center">
                                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-0 rounded-sm px-2">
                                                    {doc.signStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="py-3 text-center text-sm text-muted-foreground">
                                                {doc.signedAt}
                                            </TableCell>
                                            <TableCell className="py-3 text-right text-sm text-muted-foreground">
                                                No Action
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default Dashboard;
