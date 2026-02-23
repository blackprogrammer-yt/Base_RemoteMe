import { useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Columns3,
    Filter,
    LayoutGrid,
    Search,
    SlidersHorizontal,
    Users,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const signUpRequests = [
    {
        id: 1,
        organizationName: "Logo&Design",
        firstName: "Terminate",
        lastName: "Contract",
        email: "khan.shahab02729+terminate@gmail.com",
        status: "Pending",
    },
    {
        id: 2,
        organizationName: "ABC February 15",
        firstName: "Ding",
        lastName: "Dong",
        email: "khan.shahab02729+ding@gmail.com",
        status: "Pending",
    },
    {
        id: 3,
        organizationName: "Orion Enterprize",
        firstName: "Hot",
        lastName: "Mail",
        email: "khan.shahab02729+mail@gmail.com",
        status: "Pending",
    },
    {
        id: 4,
        organizationName: "Logo&Design",
        firstName: "Snap",
        lastName: "Chat",
        email: "khan.shahab02729+snap@gmail.com",
        status: "Pending",
    },
    {
        id: 5,
        organizationName: "Orion Enterprize",
        firstName: "Tik",
        lastName: "Tok",
        email: "khan.shahab02729+tok@gmail.com",
        status: "Pending",
    },
    {
        id: 6,
        organizationName: "ABC February 15",
        firstName: "Pen",
        lastName: "Pencil",
        email: "khan.shahab02729+pen@gmail.com",
        status: "Pending",
    },
    {
        id: 7,
        organizationName: "Logo&Design",
        firstName: "Desk",
        lastName: "Top",
        email: "khan.shahab02729+desk@gmail.com",
        status: "Pending",
    },
    {
        id: 8,
        organizationName: "Orion Enterprize",
        firstName: "Almond",
        lastName: "Raisin",
        email: "khan.shahab02729+almond@gmail.com",
        status: "Pending",
    },
    {
        id: 9,
        organizationName: "ABC February 15",
        firstName: "Copy",
        lastName: "Book",
        email: "khan.shahab02729+copy@gmail.com",
        status: "Pending",
    },
    {
        id: 10,
        organizationName: "Orion Enterprize",
        firstName: "Ink",
        lastName: "Pot",
        email: "khan.shahab02729+ink@gmail.com",
        status: "Pending",
    },
];

const SignUpRequest = () => {
    const statusFilterOptions = [
        { key: "all", label: "All" },
        { key: "Pending", label: "Pending" },
        { key: "Approved", label: "Approved" },
        { key: "Rejected", label: "Rejected" },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [visibleColumns, setVisibleColumns] = useState({
        organizationName: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        action: true,
    });

    const [columnOrder, setColumnOrder] = useState([
        "organizationName",
        "firstName",
        "lastName",
        "email",
        "status",
        "action",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const columnDefinitions = [
        { key: "organizationName", label: "Organization Name" },
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
        { key: "action", label: "Action" },
    ];

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

    const filteredRequests = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        const statusMatchedRequests =
            selectedStatus === "all"
                ? signUpRequests
                : signUpRequests.filter(
                    (request) => request.status === selectedStatus,
                );

        if (!normalizedQuery) {
            return statusMatchedRequests;
        }

        return statusMatchedRequests.filter((request) => {
            const searchable = [
                request.organizationName,
                request.firstName,
                request.lastName,
                request.email,
                request.status,
            ]
                .join(" ")
                .toLowerCase();

            return searchable.includes(normalizedQuery);
        });
    }, [searchQuery, selectedStatus]);

    const totalCount = filteredRequests.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage =
        totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex =
        totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex =
        totalCount === 0
            ? 0
            : Math.min(startIndex + pageSize, totalCount);
    const paginatedRequests =
        totalCount === 0
            ? []
            : filteredRequests.slice(startIndex, endIndex);

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

        if (status.toLowerCase() === "pending") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
                    <span>{status}</span>
                </Badge>
            );
        }

        if (status.toLowerCase() === "approved") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>{status}</span>
                </Badge>
            );
        }

        if (status.toLowerCase() === "rejected") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-red-500/10 px-2 py-1 text-xs font-semibold uppercase text-red-700">
                    <span>{status}</span>
                </Badge>
            );
        }

        return (
            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-slate-400/10 px-2 py-1 text-xs font-semibold uppercase text-slate-700">
                <span>{status}</span>
            </Badge>
        );
    };

    const renderCell = (request, key) => {
        if (key === "organizationName") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {request.organizationName}
                </TableCell>
            );
        }

        if (key === "firstName") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {request.firstName}
                </TableCell>
            );
        }

        if (key === "lastName") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {request.lastName}
                </TableCell>
            );
        }

        if (key === "email") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {request.email}
                </TableCell>
            );
        }

        if (key === "status") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getStatusBadge(request.status)}
                </TableCell>
            );
        }

        if (key === "action") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="px-3 text-xs"
                        >
                            Approve
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="px-3 text-xs"
                        >
                            Reject
                        </Button>
                    </div>
                </TableCell>
            );
        }

        return null;
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex flex-auto items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            SignUp Request List
                        </h2>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-lg border bg-card px-2 py-3 md:px-3">
                <div className="flex w-full flex-wrap items-center justify-start gap-2 md:justify-end">
                    <div className="relative w-full md:w-[260px]">
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

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Filter">
                                <Filter />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {statusFilterOptions.map((status) => (
                                <DropdownMenuCheckboxItem
                                    key={status.key}
                                    checked={selectedStatus === status.key}
                                    onCheckedChange={() => setSelectedStatus(status.key)}
                                >
                                    {status.label}
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
                                    {paginatedRequests.length > 0 ? (
                                        paginatedRequests.map((request) => (
                                            <TableRow
                                                key={request.id}
                                                className="hover:bg-muted/30"
                                            >
                                                {visibleColumnOrder.map((key) =>
                                                    renderCell(request, key),
                                                )}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={visibleColumnOrder.length}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                No pending request available.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedRequests.length > 0 ? (
                                paginatedRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="rounded-lg border bg-card p-4 shadow-sm"
                                    >
                                        {visibleColumns.organizationName && (
                                            <p className="text-sm font-semibold">
                                                {request.organizationName}
                                            </p>
                                        )}

                                        {(visibleColumns.firstName ||
                                            visibleColumns.lastName) && (
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {[request.firstName, request.lastName]
                                                        .filter(Boolean)
                                                        .join(" ")}
                                                </p>
                                            )}

                                        {visibleColumns.email && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Email</p>
                                                <p className="text-sm font-medium">{request.email}</p>
                                            </div>
                                        )}

                                        {visibleColumns.status && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Status</p>
                                                <div className="mt-1">{getStatusBadge(request.status)}</div>
                                            </div>
                                        )}

                                        {visibleColumns.action && (
                                            <div className="mt-4 flex gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 px-3 text-xs"
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1 px-3 text-xs"
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full flex items-center justify-center py-12">
                                    <p className="text-center text-sm text-muted-foreground">
                                        No pending request available.
                                    </p>
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
            </div>
        </main>
    );
};

export default SignUpRequest;
