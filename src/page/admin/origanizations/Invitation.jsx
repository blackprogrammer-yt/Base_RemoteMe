import { Fragment, useState } from "react";
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

const Invitation = () => {
    const invitations = [
        {
            orgName: "ABC February 15",
            firstName: "ABC",
            lastName: "February",
            email: "khan.shahab02729+february@gmail.com",
            status: "accepted",
        },
        {
            orgName: "Logo&Design",
            firstName: "Design",
            lastName: "Logo",
            email: "khan.shahab02729+design@gmail.com",
            status: "accepted",
        },
        {
            orgName: "Orion Enterprize",
            firstName: "Orion",
            lastName: "Enterprize",
            email: "khan.shahab02729+orion@gmail.com",
            status: "accepted",
        },
        {
            orgName: "Hashim & Co",
            firstName: "Syed",
            lastName: "Azeem",
            email: "hashim@mailinator.com",
            status: "accepted",
        },
        {
            orgName: "Thompson Peck Inc",
            firstName: "Clementine",
            lastName: "Cobb",
            email: "dukajyhon@mailinator.com",
            status: "accepted",
        },
        {
            orgName: "Template&Email",
            firstName: "Email",
            lastName: "Template",
            email: "khan.shahab02729+email@gmail.com",
            status: "accepted",
        },
        {
            orgName: "ABC&Sign",
            firstName: "Sign",
            lastName: "Need",
            email: "khan.shahab02729+need@gmail.com",
            status: "accepted",
        },
        {
            orgName: "Kissan&Supplier",
            firstName: "Kishan",
            lastName: "Admire",
            email: "khan.shahab02729+kissan@gmail.com",
            status: "accepted",
        },
        {
            orgName: "Shahab & Co",
            firstName: "Shab",
            lastName: "Ahmed",
            email: "azeemshah+shahab@gmail.com",
            status: "accepted",
        },
        {
            orgName: "Contoso AUS",
            firstName: "John",
            lastName: "Aus",
            email: "contoso@mailinator.com",
            status: "accepted",
        },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [visibleColumns, setVisibleColumns] = useState({
        orgName: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        action: true,
    });

    const [columnOrder, setColumnOrder] = useState([
        "orgName",
        "firstName",
        "lastName",
        "email",
        "status",
        "action",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const columnDefinitions = [
        { key: "orgName", label: "Org Name" },
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
        compact: "py-1.5",
        standard: "py-2",
        comfortable: "py-3",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.compact;

    const visibleColumnOrder = columnOrder.filter(
        (key) => visibleColumns[key],
    );

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

    const getStatusBadge = (status) => {
        if (status === "accepted") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Accepted</span>
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

        if (status === "declined") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-rose-500/10 px-2 py-1 text-xs font-semibold uppercase text-rose-700">
                    <span>Declined</span>
                </Badge>
            );
        }

        return null;
    };

    const filteredInvitations = invitations.filter((invitation) => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            return true;
        }

        const matchesSearch = [
            invitation.orgName,
            invitation.firstName,
            invitation.lastName,
            invitation.email,
        ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesSearch;
    });

    const totalCount = filteredInvitations.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage =
        totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex =
        totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex =
        totalCount === 0
            ? 0
            : Math.min(startIndex + pageSize, totalCount);
    const paginatedInvitations =
        totalCount === 0
            ? []
            : filteredInvitations.slice(startIndex, endIndex);

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

    const renderCell = (invitation, key) => {
        if (key === "orgName") {
            return (
                <TableCell className={`px-3 text-sm font-medium ${rowPaddingClass}`}>
                    {invitation.orgName}
                </TableCell>
            );
        }

        if (key === "firstName") {
            return (
                <TableCell className={`px-3 text-sm ${rowPaddingClass}`}>
                    {invitation.firstName}
                </TableCell>
            );
        }

        if (key === "lastName") {
            return (
                <TableCell className={`px-3 text-sm ${rowPaddingClass}`}>
                    {invitation.lastName}
                </TableCell>
            );
        }

        if (key === "email") {
            return (
                <TableCell className={`px-3 text-sm ${rowPaddingClass}`}>
                    {invitation.email}
                </TableCell>
            );
        }

        if (key === "status") {
            return (
                <TableCell className={`px-3 ${rowPaddingClass}`}>
                    {getStatusBadge(invitation.status)}
                </TableCell>
            );
        }

        if (key === "action") {
            return (
                <TableCell className={`px-3 ${rowPaddingClass}`}>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                    >
                        Resend
                    </Button>
                </TableCell>
            );
        }

        return null;
    };

    return (
        <main className="flex flex-1 flex-col ">
           

          
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end mb-4">
                    <div className="flex w-full flex-wrap items-center justify-start gap-2 md:w-auto md:justify-end">
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
                                <Button
                                    variant="outline"
                                    size="icon"
                                    aria-label="Density"
                                >
                                    <SlidersHorizontal />
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
                                >
                                    <LayoutGrid />
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
                                >
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

                {viewMode === "table" ? (
                    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b bg-muted/40">
                                    {visibleColumnOrder.map((key) => (
                                        <TableHead
                                            key={key}
                                            draggable
                                            onDragStart={() =>
                                                handleDragStart(key)
                                            }
                                            onDragOver={(event) =>
                                                event.preventDefault()
                                            }
                                            onDrop={() => handleDrop(key)}
                                            className="cursor-move select-none px-3 text-left text-xs font-semibold uppercase text-muted-foreground"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <span className="text-muted-foreground/70">
                                                    ::
                                                </span>
                                                {columnLabelMap[key]}
                                            </span>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedInvitations.length > 0 ? (
                                    paginatedInvitations.map((invitation) => (
                                        <TableRow
                                            key={`${invitation.orgName}-${invitation.email}`}
                                            className="hover:bg-muted/30"
                                        >
                                            {visibleColumnOrder.map((key) => (
                                                <Fragment key={key}>
                                                    {renderCell(invitation, key)}
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
                                            No invitations found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {paginatedInvitations.map((invitation) => (
                            <div
                                key={`${invitation.orgName}-${invitation.email}`}
                                className="rounded-lg border bg-card p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        {visibleColumns.orgName && (
                                            <p className="text-sm font-semibold">
                                                {invitation.orgName}
                                            </p>
                                        )}
                                        {visibleColumns.email && (
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {invitation.email}
                                            </p>
                                        )}
                                    </div>
                                    {visibleColumns.status
                                        ? getStatusBadge(invitation.status)
                                        : null}
                                </div>

                                {(visibleColumns.firstName ||
                                    visibleColumns.lastName) && (
                                        <div className="mt-3">
                                            <p className="text-xs text-muted-foreground">
                                                Name
                                            </p>
                                            <p className="text-sm font-medium">
                                                {visibleColumns.firstName &&
                                                    visibleColumns.lastName
                                                    ? `${invitation.firstName} ${invitation.lastName}`
                                                    : visibleColumns.firstName
                                                        ? invitation.firstName
                                                        : invitation.lastName}
                                            </p>
                                        </div>
                                    )}

                                {visibleColumns.action && (
                                    <div className="mt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            Resend
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

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
                                {totalCount === 0 ? 0 : pageCount}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => handlePageChange(1)}
                                    disabled={
                                        totalCount === 0 || safeCurrentPage === 1
                                    }
                                >
                                    <span className="sr-only">Go to first page</span>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        handlePageChange(safeCurrentPage - 1)
                                    }
                                    disabled={
                                        totalCount === 0 || safeCurrentPage === 1
                                    }
                                >
                                    <span className="sr-only">
                                        Go to previous page
                                    </span>
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        handlePageChange(safeCurrentPage + 1)
                                    }
                                    disabled={
                                        totalCount === 0 ||
                                        safeCurrentPage >= pageCount
                                    }
                                >
                                    <span className="sr-only">
                                        Go to next page
                                    </span>
                                    Next <ChevronRight className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => handlePageChange(pageCount)}
                                    disabled={
                                        totalCount === 0 ||
                                        safeCurrentPage >= pageCount
                                    }
                                >
                                    <span className="sr-only">Go to last page</span>
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
         
        </main>
    );
};

export default Invitation;
