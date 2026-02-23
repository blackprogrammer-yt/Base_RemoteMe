import { Fragment, useMemo, useState } from "react";
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
    SquarePen,
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
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const users = [
    {
        id: 1,
        fullName: "Terminate Contract",
        email: "khan.shahab02729+terminate@gmail.com",
        contactNumber: "03310272729",
        role: "Employee",
        organizations: ["Orion Enterprize"],
        loginStatus: "active",
        createdAt: "18-Feb-2026 04:19 PM",
    },
    {
        id: 2,
        fullName: "Ding Dong",
        email: "khan.shahab02729+ding@gmail.com",
        contactNumber: "--",
        role: "Employee",
        organizations: ["Orion Enterprize", "ABC February 15"],
        loginStatus: "active",
        createdAt: "18-Feb-2026 03:49 PM",
    },
    {
        id: 3,
        fullName: "Hot Mail",
        email: "khan.shahab02729+mail@gmail.com",
        contactNumber: "12351515151",
        role: "Employee",
        organizations: ["Orion Enterprize", "Logo&Design"],
        loginStatus: "active",
        createdAt: "18-Feb-2026 03:37 PM",
    },
    {
        id: 4,
        fullName: "Snap Chat",
        email: "khan.shahab02729+snap@gmail.com",
        contactNumber: "12343212344",
        role: "Employee",
        organizations: ["ABC February 15", "Orion Enterprize"],
        loginStatus: "active",
        createdAt: "18-Feb-2026 03:22 PM",
    },
    {
        id: 5,
        fullName: "Tik Tok",
        email: "khan.shahab02729+tok@gmail.com",
        contactNumber: "12344445544",
        role: "Employee",
        organizations: ["ABC February 15", "Logo&Design"],
        loginStatus: "active",
        createdAt: "18-Feb-2026 03:10 PM",
    },
    {
        id: 6,
        fullName: "Mobile Phone",
        email: "khan.shahab02729+phone@gmail.com",
        contactNumber: "--",
        role: "Employee",
        organizations: ["ABC February 15"],
        loginStatus: "active",
        createdAt: "17-Feb-2026 04:30 PM",
    },
    {
        id: 7,
        fullName: "Desk Top",
        email: "khan.shahab02729+desk@gmail.com",
        contactNumber: "12121212121",
        role: "Employee",
        organizations: ["ABC February 15", "Logo&Design"],
        loginStatus: "active",
        createdAt: "17-Feb-2026 04:27 PM",
    },
    {
        id: 8,
        fullName: "Key Board",
        email: "khan.shahab02729+key@gmail.com",
        contactNumber: "--",
        role: "Employee",
        organizations: ["ABC February 15"],
        loginStatus: "active",
        createdAt: "17-Feb-2026 04:24 PM",
    },
    {
        id: 9,
        fullName: "Copy Book",
        email: "khan.shahab02729+copy@gmail.com",
        contactNumber: "--",
        role: "Employee",
        organizations: ["Orion Enterprize"],
        loginStatus: "active",
        createdAt: "17-Feb-2026 04:18 PM",
    },
    {
        id: 10,
        fullName: "Ink Pot",
        email: "khan.shahab02729+ink@gmail.com",
        contactNumber: "--",
        role: "Employee",
        organizations: ["Orion Enterprize"],
        loginStatus: "active",
        createdAt: "17-Feb-2026 04:16 PM",
    },
];

const UserList = () => {
    const navigate = useNavigate();

    const organizationFilterOptions = useMemo(() => {
        const set = new Set();

        users.forEach((user) => {
            user.organizations.forEach((org) => set.add(org));
        });

        return ["all", ...Array.from(set)];
    }, []);

    const roleFilterOptions = [
        { key: "all", label: "Role" },
        { key: "Employee", label: "Employee" },
        { key: "Manager", label: "Manager" },
        { key: "Admin", label: "Admin" },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrganization, setSelectedOrganization] = useState("all");
    const [selectedRole, setSelectedRole] = useState("all");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [visibleColumns, setVisibleColumns] = useState({
        fullName: true,
        email: true,
        contactNumber: true,
        role: true,
        organizations: true,
        loginStatus: true,
        createdAt: true,
        action: true,
    });

    const [columnOrder, setColumnOrder] = useState([
        "fullName",
        "email",
        "contactNumber",
        "role",
        "organizations",
        "loginStatus",
        "createdAt",
        "action",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const columnDefinitions = [
        { key: "fullName", label: "Full Name" },
        { key: "email", label: "Email" },
        { key: "contactNumber", label: "Contact Number" },
        { key: "role", label: "Role" },
        { key: "organizations", label: "Organization" },
        { key: "loginStatus", label: "Login Status" },
        { key: "createdAt", label: "Created At" },
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

    const filteredUsers = users.filter((user) => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const matchesOrganization =
            selectedOrganization === "all" ||
            user.organizations.includes(selectedOrganization);

        const matchesRole =
            selectedRole === "all" || user.role === selectedRole;

        if (!normalizedQuery) {
            return matchesOrganization && matchesRole;
        }

        const matchesSearch = [
            user.fullName,
            user.email,
            user.contactNumber,
            user.role,
            user.organizations.join(" "),
        ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesOrganization && matchesRole && matchesSearch;
    });

    const totalCount = filteredUsers.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage =
        totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex =
        totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex =
        totalCount === 0
            ? 0
            : Math.min(startIndex + pageSize, totalCount);
    const paginatedUsers =
        totalCount === 0 ? [] : filteredUsers.slice(startIndex, endIndex);

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

    const getLoginStatusBadge = (status) => {
        if (status === "active") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Active</span>
                </Badge>
            );
        }

        if (status === "inactive") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-slate-400/10 px-2 py-1 text-xs font-semibold uppercase text-slate-700">
                    <span>Inactive</span>
                </Badge>
            );
        }

        return null;
    };

    const renderCell = (user, key) => {
        if (key === "fullName") {
            return (
                <TableCell className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
                    {user.fullName}
                </TableCell>
            );
        }

        if (key === "email") {
            return (
                <TableCell
                    className={`px-4 text-sm text-muted-foreground ${rowPaddingClass}`}
                >
                    {user.email}
                </TableCell>
            );
        }

        if (key === "contactNumber") {
            return (
                <TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
                    {user.contactNumber}
                </TableCell>
            );
        }

        if (key === "role") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getRoleBadge(user.role)}
                </TableCell>
            );
        }

        if (key === "organizations") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    <div className="flex flex-wrap gap-1">
                        {user.organizations.map((org) => (
                            <span
                                key={org}
                                className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                            >
                                {org}
                            </span>
                        ))}
                    </div>
                </TableCell>
            );
        }

        if (key === "loginStatus") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getLoginStatusBadge(user.loginStatus)}
                </TableCell>
            );
        }

        if (key === "createdAt") {
            return (
                <TableCell className={`px-4 text-sm text-muted-foreground ${rowPaddingClass}`}>
                    {user.createdAt}
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
                        className="gap-2 px-3 text-xs"
                        onClick={() => navigate(PROTECTED_ROUTES.ADMIN_USER_EDIT)}
                    >
                        <SquarePen className="h-3.5 w-3.5" />
                        <span>Edit</span>
                    </Button>
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
                            User List
                        </h2>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-lg border bg-card px-2 py-2 md:px-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {roleFilterOptions.map((role) => (
                            <Button
                                key={role.key}
                                type="button"
                                variant={
                                    selectedRole === role.key ? "default" : "outline"
                                }
                                size="sm"
                                className="h-9 border-dashed px-3 text-xs font-medium"
                                onClick={() => setSelectedRole(role.key)}
                            >
                                {role.label}
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
                                {roleFilterOptions.map((role) => (
                                    <DropdownMenuCheckboxItem
                                        key={role.key}
                                        className="capitalize"
                                        checked={selectedRole === role.key}
                                        onCheckedChange={() =>
                                            setSelectedRole(role.key)
                                        }
                                    >
                                        {role.label}
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
                                    {paginatedUsers.length > 0 ? (
                                        paginatedUsers.map((user) => (
                                            <TableRow
                                                key={user.id}
                                                className="hover:bg-muted/30"
                                            >
                                                {visibleColumnOrder.map((key) => (
                                                    <Fragment key={key}>
                                                        {renderCell(user, key)}
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
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="rounded-lg border bg-card p-4 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                {visibleColumns.fullName && (
                                                    <p className="text-sm font-semibold">
                                                        {user.fullName}
                                                    </p>
                                                )}
                                                {visibleColumns.email && (
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                )}
                                            </div>
                                            {visibleColumns.role
                                                ? getRoleBadge(user.role)
                                                : null}
                                        </div>

                                        {visibleColumns.contactNumber && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">
                                                    Contact Number
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {user.contactNumber}
                                                </p>
                                            </div>
                                        )}

                                        {visibleColumns.organizations && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">
                                                    Organizations
                                                </p>
                                                <div className="mt-1 flex flex-wrap gap-1">
                                                    {user.organizations.map((org) => (
                                                        <span
                                                            key={org}
                                                            className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                                                        >
                                                            {org}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {visibleColumns.loginStatus && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">
                                                    Login Status
                                                </p>
                                                <div className="mt-1">
                                                    {getLoginStatusBadge(user.loginStatus)}
                                                </div>
                                            </div>
                                        )}

                                        {visibleColumns.createdAt && (
                                            <div className="mt-3">
                                                <p className="text-xs text-muted-foreground">
                                                    Created At
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {user.createdAt}
                                                </p>
                                            </div>
                                        )}

                                        {visibleColumns.action && (
                                            <div className="mt-4">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-full gap-2 px-3 text-xs"
                                                    onClick={() =>
                                                        navigate(
                                                            PROTECTED_ROUTES.ADMIN_USER_EDIT,
                                                        )
                                                    }
                                                >
                                                    <SquarePen className="h-3.5 w-3.5" />
                                                    <span>Edit</span>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full flex items-center justify-center py-12">
                                    <p className="text-center text-sm text-muted-foreground">
                                        No users found.
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

export default UserList;

