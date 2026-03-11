import { useMemo, useState } from "react";
import {
    Filter,
    Search,
    SlidersHorizontal,
    SquarePen,
    Columns3,
    LayoutGrid,
    Gift,
    Plus,
    X,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const initialBenefits = [
    {
        id: 1,
        name: "Gym Benefits",
        description: "GYM Full Benefits",
        active: true,
    },
    {
        id: 2,
        name: "Life Insurance",
        description: "Full Coverage",
        active: true,
    },
    {
        id: 3,
        name: "TA/DA",
        description: "Commute",
        active: true,
    },
];

const statusFilterOptions = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
];

const Benefits = () => {
    const navigate = useNavigate();
    const [benefits, setBenefits] = useState(initialBenefits);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeStatus, setActiveStatus] = useState("all");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        description: true,
        status: true,
        toggle: true,
        action: true,
    });

    const [columnOrder, setColumnOrder] = useState([
        "name",
        "description",
        "status",
        "toggle",
        "action",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const columnDefinitions = [
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status" },
        { key: "toggle", label: "Toggle Status" },
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
        if (!draggedColumn || draggedColumn === targetKey) return;

        const newOrder = [...columnOrder];
        const draggedIdx = newOrder.indexOf(draggedColumn);
        const targetIdx = newOrder.indexOf(targetKey);

        newOrder.splice(draggedIdx, 1);
        newOrder.splice(targetIdx, 0, draggedColumn);

        setColumnOrder(newOrder);
        setDraggedColumn(null);
    };

    const filteredBenefits = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        
        return benefits.filter((item) => {
            const matchesStatus =
                activeStatus === "all" ||
                (activeStatus === "active" && item.active) ||
                (activeStatus === "inactive" && !item.active);

            if (!normalizedQuery) return matchesStatus;
            
            const searchable = [item.name, item.description]
                .join(" ")
                .toLowerCase();

            return matchesStatus && searchable.includes(normalizedQuery);
        });
    }, [benefits, searchQuery, activeStatus]);

    const totalCount = filteredBenefits.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage = totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex = totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex = totalCount === 0 ? 0 : Math.min(startIndex + pageSize, totalCount);
    const paginatedBenefits =
        totalCount === 0 ? [] : filteredBenefits.slice(startIndex, endIndex);

    const getStatusBadge = (isActive) => {
        if (isActive) {
            return (
                <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-0 text-xs font-semibold uppercase">
                    Active
                </Badge>
            );
        }
        return (
            <Badge className="bg-slate-400/10 text-slate-700 dark:text-slate-400 hover:bg-slate-400/20 border-0 text-xs font-semibold uppercase">
                Inactive
            </Badge>
        );
    };

    const handleToggleActive = (id) => {
        setBenefits((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, active: !item.active } : item,
            ),
        );
    };

    const handlePageChange = (newPage) => {
        if (totalCount === 0) return;
        const clampedPage = Math.max(1, Math.min(newPage, pageCount));
        setCurrentPage(clampedPage);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const renderCell = (item, key) => {
        if (key === "name") {
            return (
                <TableCell key={key} className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
                    {item.name}
                </TableCell>
            );
        }

        if (key === "description") {
            return (
                <TableCell key={key} className={`px-4 text-sm ${rowPaddingClass}`}>
                    {item.description}
                </TableCell>
            );
        }

        if (key === "status") {
            return (
                <TableCell key={key} className={`px-4 text-sm text-center ${rowPaddingClass}`}>
                    {getStatusBadge(item.active)}
                </TableCell>
            );
        }

        if (key === "toggle") {
            return (
                <TableCell key={key} className={`px-4 text-sm text-center ${rowPaddingClass}`}>
                    <div className="flex items-center justify-center">
                        <Switch
                            checked={item.active}
                            onCheckedChange={() => handleToggleActive(item.id)}
                        />
                    </div>
                </TableCell>
            );
        }

        if (key === "action") {
            return (
                <TableCell key={key} className={`px-4 text-sm ${rowPaddingClass}`}>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="gap-2 px-3 text-xs"
                        onClick={() =>
                            navigate(
                                PROTECTED_ROUTES.ADMIN_EDIT_BENEFIT.replace(
                                    ":id",
                                    String(item.id),
                                ),
                            )
                        }
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
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">Benefits</h2>
                    </div>
                    <Button 
                        onClick={() => navigate(PROTECTED_ROUTES.ADMIN_ADD_BENEFIT)}
                        className="bg-slate-900 hover:bg-slate-800 text-white"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Benefit
                    </Button>
                </div>
            </div>

            <div className="w-full rounded-lg border bg-card px-2 py-3 md:px-3">
                <div className="flex w-full flex-wrap items-center justify-start gap-2 md:justify-end">
                    <div className="relative w-full md:w-[260px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search benefits..."
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
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
                            <Button variant="outline" size="icon" aria-label="Status Filter">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {statusFilterOptions.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.key}
                                    checked={activeStatus === option.key}
                                    onCheckedChange={() => setActiveStatus(option.key)}
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
                            <DropdownMenuCheckboxItem
                                checked={density === "compact"}
                                onCheckedChange={() => setDensity("compact")}
                            >
                                Compact
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={density === "standard"}
                                onCheckedChange={() => setDensity("standard")}
                            >
                                Standard
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={density === "comfortable"}
                                onCheckedChange={() => setDensity("comfortable")}
                            >
                                Comfortable
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="View Mode">
                                {viewMode === "table" ? (
                                    <LayoutGrid className="h-4 w-4" />
                                ) : (
                                    <LayoutGrid className="h-4 w-4 text-primary" />
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem
                                checked={viewMode === "table"}
                                onCheckedChange={() => setViewMode("table")}
                            >
                                Table View
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={viewMode === "grid"}
                                onCheckedChange={() => setViewMode("grid")}
                            >
                                Grid View
                            </DropdownMenuCheckboxItem>
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
                                    {paginatedBenefits.length > 0 ? (
                                        paginatedBenefits.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                className="hover:bg-muted/30"
                                            >
                                                {visibleColumnOrder.map((key) =>
                                                    renderCell(item, key),
                                                )}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={visibleColumnOrder.length}
                                                className="px-4 py-6 text-center text-sm text-muted-foreground"
                                            >
                                                No benefits found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedBenefits.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-lg border bg-card p-4 shadow-sm"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-sm">
                                            {item.name}
                                        </h3>
                                        {getStatusBadge(item.active)}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-3">
                                        <div>
                                            <p className="font-medium text-muted-foreground/70">Description</p>
                                            <p className="text-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t flex justify-between items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="gap-2 px-3 text-xs flex-1"
                                            onClick={() =>
                                                navigate(
                                                    PROTECTED_ROUTES.ADMIN_EDIT_BENEFIT.replace(
                                                        ":id",
                                                        String(item.id),
                                                    ),
                                                )
                                            }
                                        >
                                            <SquarePen className="h-3.5 w-3.5" />
                                            <span>Edit</span>
                                        </Button>
                                        <Switch 
                                            checked={item.active} 
                                            onCheckedChange={() => handleToggleActive(item.id)} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-4 flex flex-col justify-between gap-4 px-2 lg:flex-row lg:items-center">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {totalCount === 0 ? 0 : startIndex + 1}-
                        {endIndex} of {totalCount} records
                    </div>

                    <div className="flex flex-col space-y-2 text-sm lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Rows per page</span>
                            <Select
                                value={`${pageSize}`}
                                onValueChange={(value) => handlePageSizeChange(Number(value))}
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
                                    className="h-8 w-8 p-0"
                                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                                    disabled={safeCurrentPage === 1 || totalCount === 0}
                                >
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                                    disabled={safeCurrentPage === pageCount || totalCount === 0}
                                >
                                    <span className="sr-only">Go to next page</span>
                                    <ChevronRight className="h-4 w-4" />
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

export default Benefits;
