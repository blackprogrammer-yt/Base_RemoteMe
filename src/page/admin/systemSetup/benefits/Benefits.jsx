import { useMemo, useState } from "react";
import {
    Filter,
    Search,
    SlidersHorizontal,
    Pencil,
    SquarePen,
    Columns3,
    LayoutGrid,
    Gift,
    Plus,
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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        description: true,
        status: true,
        toggle: true,
        action: true,
    });

    const filteredBenefits = useMemo(() => {
        const normalized = searchQuery.trim().toLowerCase();
        return benefits.filter((item) => {
            const matchesStatus =
                activeStatus === "all" ||
                (activeStatus === "active" && item.active) ||
                (activeStatus === "inactive" && !item.active);

            if (!normalized) return matchesStatus;
            const text = [item.name, item.description].join(" ").toLowerCase();
            return matchesStatus && text.includes(normalized);
        });
    }, [benefits, searchQuery, activeStatus]);

    const totalCount = filteredBenefits.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage = totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex = totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex = totalCount === 0 ? 0 : Math.min(startIndex + pageSize, totalCount);
    const paginatedBenefits = filteredBenefits.slice(startIndex, endIndex);

    const rowPaddingClass =
        density === "compact" ? "py-2.5" : density === "comfortable" ? "py-3.5" : "py-4";

    const getStatusBadge = (isActive) => {
        if (isActive) {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>Active</span>
                </Badge>
            );
        }
        return (
            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-slate-400/10 px-2 py-1 text-xs font-semibold uppercase text-slate-700">
                <span>Inactive</span>
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

    const handlePageChange = (page) => {
        if (page < 1) return;
        const last = pageCount;
        setCurrentPage(Math.min(page, last));
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Gift className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                            Benefits
                        </h2>
                    </div>
                    <Button
                        onClick={() => navigate(PROTECTED_ROUTES.ADMIN_ADD_BENEFIT)}
                        className="h-9 gap-2 bg-slate-900 hover:bg-slate-800 text-white"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Create Benefit</span>
                    </Button>
                </div>
            </div>

            <div className="rounded-lg border bg-white">
                <div className="flex flex-col gap-3 p-3 md:flex-row md:items-center md:justify-between border-b">
                    <div className="flex items-center gap-2 w-full">
                        <Select value="all">
                            <SelectTrigger className="w-full md:w-64 h-9 bg-slate-50/50">
                                <SelectValue placeholder="-- All Benefits --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">-- All Benefits --</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="ml-auto flex items-center gap-2">
                            <div className="relative w-[260px]">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-9 w-full pl-9 pr-8"
                                />
                                {searchQuery ? (
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        ×
                                    </button>
                                ) : null}
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-md"
                                    >
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 bg-white">
                                    {statusFilterOptions.map((option) => (
                                        <DropdownMenuCheckboxItem
                                            key={option.key}
                                            checked={activeStatus === option.key}
                                            onCheckedChange={() => setActiveStatus(option.key)}
                                            className="text-sm cursor-pointer"
                                        >
                                            {option.label}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-md"
                                    >
                                        <SlidersHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 bg-white">
                                    <DropdownMenuCheckboxItem
                                        checked={density === "compact"}
                                        onCheckedChange={() => setDensity("compact")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Compact
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={density === "comfortable"}
                                        onCheckedChange={() => setDensity("comfortable")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Comfortable
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={density === "spacious"}
                                        onCheckedChange={() => setDensity("spacious")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Spacious
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-md"
                                    >
                                        <Columns3 className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32 bg-white">
                                    <DropdownMenuCheckboxItem checked className="text-sm cursor-pointer">
                                        Table
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem className="text-sm cursor-pointer">
                                        Cards
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-md"
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white">
                                    {Object.keys(visibleColumns).map((col) => (
                                        <DropdownMenuCheckboxItem
                                            key={col}
                                            checked={visibleColumns[col]}
                                            onCheckedChange={(v) =>
                                                setVisibleColumns((p) => ({ ...p, [col]: v }))
                                            }
                                            className="text-sm cursor-pointer capitalize"
                                        >
                                            {col.replace(/([A-Z])/g, " $1").trim()}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="px-3 py-3">
                    <div className="rounded-lg border bg-white overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                    {visibleColumns.name && (
                                        <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">
                                            Name
                                        </TableHead>
                                    )}
                                    {visibleColumns.description && (
                                        <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">
                                            Description
                                        </TableHead>
                                    )}
                                    {visibleColumns.status && (
                                        <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider text-center">
                                            Status
                                        </TableHead>
                                    )}
                                    {visibleColumns.toggle && (
                                        <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider text-center">
                                            Toggle Status
                                        </TableHead>
                                    )}
                                    {visibleColumns.action && (
                                        <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider text-center">
                                            Action
                                        </TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedBenefits.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-slate-50/50">
                                        {visibleColumns.name && (
                                            <TableCell className={`font-medium text-slate-900 ${rowPaddingClass}`}>
                                                {item.name}
                                            </TableCell>
                                        )}
                                        {visibleColumns.description && (
                                            <TableCell className={`text-slate-600 ${rowPaddingClass}`}>
                                                {item.description}
                                            </TableCell>
                                        )}
                                        {visibleColumns.status && (
                                            <TableCell className={`text-center ${rowPaddingClass}`}>
                                                {getStatusBadge(item.active)}
                                            </TableCell>
                                        )}
                                        {visibleColumns.toggle && (
                                            <TableCell className={`text-center ${rowPaddingClass}`}>
                                                <div className="flex items-center justify-center">
                                                    <Switch
                                                        checked={item.active}
                                                        onCheckedChange={() => handleToggleActive(item.id)}
                                                    />
                                                </div>
                                            </TableCell>
                                        )}
                                        {visibleColumns.action && (
                                            <TableCell className={`text-center ${rowPaddingClass}`}>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
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
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                                {paginatedBenefits.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="h-32 text-center text-muted-foreground"
                                        >
                                            No benefits found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="mt-auto border-t p-3">
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                        <div className="flex-1 text-sm text-muted-foreground">
                            Showing {totalCount === 0 ? 0 : startIndex + 1}-{endIndex} of {totalCount}
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
                                        className="h-8 w-8 p-0"
                                        onClick={() => handlePageChange(1)}
                                        disabled={safeCurrentPage === 1 || totalCount === 0}
                                    >
                                        <span className="sr-only">Go to first page</span>
                                        {"<<"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 px-3"
                                        onClick={() => handlePageChange(safeCurrentPage - 1)}
                                        disabled={safeCurrentPage === 1 || totalCount === 0}
                                    >
                                        <span className="sr-only">Go to previous page</span>
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 px-3"
                                        onClick={() => handlePageChange(safeCurrentPage + 1)}
                                        disabled={safeCurrentPage >= pageCount || totalCount === 0}
                                    >
                                        <span className="sr-only">Go to next page</span>
                                        Next
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handlePageChange(pageCount)}
                                        disabled={safeCurrentPage >= pageCount || totalCount === 0}
                                    >
                                        <span className="sr-only">Go to last page</span>
                                        {">>"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Benefits;
