import { Fragment, useState } from "react";
import {
    Columns3,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
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
import Invitation from "./Invitation";
import SendInvite from "./SendInvite";

const OrganizationList = () => {
    const [activeStatus, setActiveStatus] = useState("all");

    const organizations = [
        {
            name: "Orion Enterprize",
            country: "United States",
            admin: "Orion Enterprize",
            status: "approved",
            loginEnabled: true,
        },
        {
            name: "Logo&Design",
            country: "United States",
            admin: "Design Logo",
            status: "approved",
            loginEnabled: true,
        },
        {
            name: "ABC February 15",
            country: "United States",
            admin: "ABC February",
            status: "approved",
            loginEnabled: true,
        },
        {
            name: "Hashim & Co",
            country: "United States",
            admin: "Syed Azeem",
            status: "approved",
            loginEnabled: true,
        },
        {
            name: "Template&Email",
            country: "United States",
            admin: "Email Template",
            status: "pending",
            loginEnabled: true,
        },
        {
            name: "Thompson Peck Inc",
            country: "United States",
            admin: "Clementine Cobb",
            status: "pending",
            loginEnabled: true,
        },
        {
            name: "ABC&Sign",
            country: "United States",
            admin: "Sign Need",
            status: "pending",
            loginEnabled: true,
        },
        {
            name: "Kissan&Supplier",
            country: "United States",
            admin: "Kishan Admire",
            status: "approved",
            loginEnabled: true,
        },
        {
            name: "Shahab & Co",
            country: "United States",
            admin: "Shab Ahmed",
            status: "approved",
            loginEnabled: true,
        },
        {
            name: "Contoso AUS",
            country: "Australia",
            admin: "John Aus",
            status: "approved",
            loginEnabled: true,
        },
    ];

    const statusFilterOptions = [
        { key: "all", label: "Status" },
        { key: "approved", label: "Approved" },
        { key: "declined", label: "Declined" },
        { key: "pending", label: "Pending" },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filteredOrganizations = organizations.filter((org) => {
        const matchesStatus =
            activeStatus === "all" || org.status === activeStatus;
        const normalizedQuery = searchQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            return matchesStatus;
        }

        const matchesSearch = [org.name, org.country, org.admin]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesStatus && matchesSearch;
    });

    // Pagination logic
    const totalCount = filteredOrganizations.length;
    const pageCount = Math.ceil(totalCount / pageSize);

    // Ensure current page is valid
    if (currentPage > pageCount && pageCount > 0) {
        setCurrentPage(pageCount);
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    const paginatedOrganizations = filteredOrganizations.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const getStatusBadge = (status) => {
        if (status === "approved") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Approved</span>
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

    const totalRecords = organizations.length;

    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        country: true,
        admin: true,
        status: true,
        login: true,
    });

    const [columnOrder, setColumnOrder] = useState([
        "name",
        "country",
        "admin",
        "status",
        "login",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const columnDefinitions = [
        { key: "name", label: "Organization Name" },
        { key: "country", label: "Country" },
        { key: "admin", label: "Admin" },
        { key: "status", label: "Account Status" },
        { key: "login", label: "Toggle Login Status" },
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

    const renderCell = (org, key) => {
        if (key === "name") {
            return (
                <TableCell className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
                    {org.name}
                </TableCell>
            );
        }

        if (key === "country") {
            return (
                <TableCell
                    className={`px-4 text-sm text-muted-foreground ${rowPaddingClass}`}
                >
                    {org.country}
                </TableCell>
            );
        }

        if (key === "admin") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {org.admin}
                </TableCell>
            );
        }

        if (key === "status") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getStatusBadge(org.status)}
                </TableCell>
            );
        }

        if (key === "login") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    <Switch
                        checked={org.loginEnabled}
                        disabled
                        className="data-[state=checked]:bg-emerald-500"
                    />
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
                        <h2 className="text-2xl font-bold tracking-tight">
                            Organization List
                        </h2>
                    </div>
                </div>
            </div>

            <div>
                <Tabs
                    defaultValue="organizations"
                    className="w-full rounded-lg border bg-card px-2 py-2 md:px-3"
                >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <TabsList className="h-10 w-full justify-start rounded-md bg-muted/50 px-1">
                            <TabsTrigger
                                value="organizations"
                                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                Organizations
                            </TabsTrigger>
                            <TabsTrigger
                                value="invitations"
                                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                Invitations
                            </TabsTrigger>
                            <TabsTrigger
                                value="send-invite"
                                className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                Send Invite
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="organizations" className="mt-4 space-y-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                                {statusFilterOptions.map((status) => (
                                    <Button
                                        key={status.key}
                                        type="button"
                                        variant={
                                            activeStatus === status.key ? "default" : "outline"
                                        }
                                        size="sm"
                                        className="h-9 border-dashed px-3 text-xs font-medium"
                                        onClick={() => setActiveStatus(status.key)}
                                    >
                                        {status.label}
                                    </Button>
                                ))}
                            </div>

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
                                            aria-label="Filter"
                                        >
                                            <Filter />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {statusFilterOptions.map((status) => (
                                            <DropdownMenuCheckboxItem
                                                key={status.key}
                                                className="capitalize"
                                                checked={activeStatus === status.key}
                                                onCheckedChange={() =>
                                                    setActiveStatus(status.key)
                                                }
                                            >
                                                {status.label}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

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
                                                    onCheckedChange={() => setDensity(option)}
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
                                                onCheckedChange={() => setViewMode(option)}
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
                                        {paginatedOrganizations.map((org) => (
                                            <TableRow
                                                key={org.name}
                                                className="hover:bg-muted/30"
                                            >
                                                {visibleColumnOrder.map((key) => (
                                                    <Fragment key={key}>
                                                        {renderCell(org, key)}
                                                    </Fragment>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {paginatedOrganizations.map((org) => (
                                    <div
                                        key={org.name}
                                        className="rounded-lg border bg-card p-4 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                {visibleColumns.name && (
                                                    <p className="text-sm font-semibold">
                                                        {org.name}
                                                    </p>
                                                )}
                                                {visibleColumns.country && (
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {org.country}
                                                    </p>
                                                )}
                                            </div>
                                            {visibleColumns.status
                                                ? getStatusBadge(org.status)
                                                : null}
                                        </div>

                                        {visibleColumns.admin && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">
                                                    Admin
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {org.admin}
                                                </p>
                                            </div>
                                        )}

                                        {visibleColumns.login && (
                                            <div className="mt-4 flex items-center justify-between">
                                                <p className="text-xs text-muted-foreground">
                                                    Login Status
                                                </p>
                                                <Switch
                                                    checked={org.loginEnabled}
                                                    disabled
                                                    className="data-[state=checked]:bg-emerald-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

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
                                        Page {totalCount === 0 ? 0 : currentPage} of {pageCount}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            className="hidden h-8 w-8 p-0 lg:flex"
                                            onClick={() => handlePageChange(1)}
                                            disabled={currentPage === 1}
                                        >
                                            <span className="sr-only">Go to first page</span>
                                            <ChevronsLeft className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <span className="sr-only">Go to previous page</span>
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </Button>

                                        <Button
                                            variant="outline"
                                            onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
                                            disabled={currentPage >= pageCount}
                                        >
                                            <span className="sr-only">Go to next page</span>
                                            Next <ChevronRight className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="hidden h-8 w-8 p-0 lg:flex"
                                            onClick={() => handlePageChange(pageCount)}
                                            disabled={currentPage >= pageCount}
                                        >
                                            <span className="sr-only">Go to last page</span>
                                            <ChevronsRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="invitations" className="mt-4">
                        <Invitation />
                    </TabsContent>

                    <TabsContent value="send-invite" className="mt-4">
                        <SendInvite />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
};

export default OrganizationList;
