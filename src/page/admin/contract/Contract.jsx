import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const contracts = [
    {
        id: 1,
        name: "Terminate Contract",
        email: "khan.shahab02729+terminate@gmail.com",
        role: "Employee",
        organization: "Logo&Design",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 2,
        name: "Hot Mail",
        email: "khan.shahab02729+mail@gmail.com",
        role: "Employee",
        organization: "Logo&Design",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 3,
        name: "Desk Top",
        email: "khan.shahab02729+desk@gmail.com",
        role: "Employee",
        organization: "Logo&Design",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 4,
        name: "Tik Tok",
        email: "khan.shahab02729+tok@gmail.com",
        role: "Employee",
        organization: "Logo&Design",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 5,
        name: "Pen Pencil",
        email: "khan.shahab02729+pen@gmail.com",
        role: "Employee",
        organization: "Logo&Design",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 6,
        name: "Pen Pencil",
        email: "khan.shahab02729+pen@gmail.com",
        role: "Employee",
        organization: "ABC February 15",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 7,
        name: "Ding Dong",
        email: "khan.shahab02729+ding@gmail.com",
        role: "Employee",
        organization: "ABC February 15",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 8,
        name: "Snap Chat",
        email: "khan.shahab02729+snap@gmail.com",
        role: "Employee",
        organization: "Orion Enterprize",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 9,
        name: "Almond Raisin",
        email: "khan.shahab02729+almond@gmail.com",
        role: "Employee",
        organization: "Orion Enterprize",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Approved",
    },
    {
        id: 10,
        name: "Terminate Contract",
        email: "khan.shahab02729+terminate@gmail.com",
        role: "Employee",
        organization: "Orion Enterprize",
        invitationStatus: "Accepted",
        loginStatus: "Active",
        orgApproval: "Approved",
        adminApproval: "Terminated",
    },
];

const Contract = () => {
    const navigate = useNavigate();

    const organizationFilterOptions = useMemo(() => {
        const set = new Set();

        contracts.forEach((contract) => {
            set.add(contract.organization);
        });

        return ["all", ...Array.from(set)];
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrganization, setSelectedOrganization] = useState("all");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        email: true,
        role: true,
        organization: true,
        invitationStatus: true,
        loginStatus: true,
        orgApproval: true,
        adminApproval: true,
    });

    const [columnOrder, setColumnOrder] = useState([
        "name",
        "email",
        "role",
        "organization",
        "invitationStatus",
        "loginStatus",
        "orgApproval",
        "adminApproval",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const columnDefinitions = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "organization", label: "Organization" },
        { key: "invitationStatus", label: "Invitation Status" },
        { key: "loginStatus", label: "Login Status" },
        { key: "orgApproval", label: "Org Approval" },
        { key: "adminApproval", label: "Admin Approval" },
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

    const filteredContracts = contracts.filter((contract) => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const matchesOrganization =
            selectedOrganization === "all" ||
            contract.organization === selectedOrganization;

        if (!normalizedQuery) {
            return matchesOrganization;
        }

        const matchesSearch = [
            contract.name,
            contract.email,
            contract.role,
            contract.organization,
            contract.invitationStatus,
            contract.loginStatus,
            contract.orgApproval,
            contract.adminApproval,
        ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesOrganization && matchesSearch;
    });

    const totalCount = filteredContracts.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage =
        totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex =
        totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex =
        totalCount === 0
            ? 0
            : Math.min(startIndex + pageSize, totalCount);
    const paginatedContracts =
        totalCount === 0
            ? []
            : filteredContracts.slice(startIndex, endIndex);

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

    const handleRowClick = (contract) => {
        navigate(`/admin/contract/${contract.id}`, { state: { contract } });
    };

    const getRoleBadge = (role) => {
        if (!role) {
            return null;
        }

        return (
            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-sky-500/10 px-2 py-1 text-xs font-semibold uppercase text-sky-700">
                <span>{role}</span>
            </Badge>
        );
    };

    const getStatusBadge = (status, type) => {
        if (!status) {
            return null;
        }

        if (status.toLowerCase() === "accepted") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>{status}</span>
                </Badge>
            );
        }

        if (status.toLowerCase() === "active") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
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

        if (status.toLowerCase() === "terminated" && type === "admin") {
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

    const renderCell = (contract, key) => {
        if (key === "name") {
            return (
                <TableCell className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
                    {contract.name}
                </TableCell>
            );
        }

        if (key === "email") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {contract.email}
                </TableCell>
            );
        }

        if (key === "role") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getRoleBadge(contract.role)}
                </TableCell>
            );
        }

        if (key === "organization") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {contract.organization}
                </TableCell>
            );
        }

        if (key === "invitationStatus") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getStatusBadge(contract.invitationStatus, "invitation")}
                </TableCell>
            );
        }

        if (key === "loginStatus") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getStatusBadge(contract.loginStatus, "login")}
                </TableCell>
            );
        }

        if (key === "orgApproval") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getStatusBadge(contract.orgApproval, "org")}
                </TableCell>
            );
        }

        if (key === "adminApproval") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getStatusBadge(contract.adminApproval, "admin")}
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
                            Contract List
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
                            {organizationFilterOptions.map((org) => (
                                <DropdownMenuCheckboxItem
                                    key={org}
                                    checked={selectedOrganization === org}
                                    onCheckedChange={() => setSelectedOrganization(org)}
                                >
                                    {org === "all" ? "All Organizations" : org}
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
                                    {paginatedContracts.length > 0 ? (
                                        paginatedContracts.map((contract) => (
                                            <TableRow
                                                key={contract.id}
                                                className="hover:bg-muted/30 cursor-pointer"
                                                onClick={() => handleRowClick(contract)}
                                            >
                                                {visibleColumnOrder.map((key) =>
                                                    renderCell(contract, key),
                                                )}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={visibleColumnOrder.length}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                No contracts found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedContracts.length > 0 ? (
                                paginatedContracts.map((contract) => (
                                    <div
                                        key={contract.id}
                                        className="rounded-lg border bg-card p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                        onClick={() => handleRowClick(contract)}
                                    >
                                        {visibleColumns.name && (
                                            <p className="text-sm font-semibold">
                                                {contract.name}
                                            </p>
                                        )}
                                        {visibleColumns.email && (
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {contract.email}
                                            </p>
                                        )}

                                        {visibleColumns.role && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Role</p>
                                                <div className="mt-1">{getRoleBadge(contract.role)}</div>
                                            </div>
                                        )}

                                        {visibleColumns.organization && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Organization</p>
                                                <p className="text-sm font-medium">{contract.organization}</p>
                                            </div>
                                        )}

                                        {visibleColumns.invitationStatus && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Invitation Status</p>
                                                <div className="mt-1">
                                                    {getStatusBadge(contract.invitationStatus, "invitation")}
                                                </div>
                                            </div>
                                        )}

                                        {visibleColumns.loginStatus && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Login Status</p>
                                                <div className="mt-1">
                                                    {getStatusBadge(contract.loginStatus, "login")}
                                                </div>
                                            </div>
                                        )}

                                        {visibleColumns.orgApproval && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Org Approval</p>
                                                <div className="mt-1">
                                                    {getStatusBadge(contract.orgApproval, "org")}
                                                </div>
                                            </div>
                                        )}

                                        {visibleColumns.adminApproval && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">Admin Approval</p>
                                                <div className="mt-1">
                                                    {getStatusBadge(contract.adminApproval, "admin")}
                                                </div>
                                            </div>
                                        )}
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

export default Contract;
