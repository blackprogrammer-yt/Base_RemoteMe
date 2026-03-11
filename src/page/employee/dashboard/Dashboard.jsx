import React, { Fragment, useMemo, useState } from "react";
import {
    Download,
    FileEdit,
    Search,
    Filter,
    SlidersHorizontal,
    LayoutGrid,
    Columns3,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    FileText,
    SquarePen,
    User,
    Briefcase,
    Building2,
    Banknote,
    Eye,
    Users,
    X
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
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SignDocument from "./SignDocument";

const baseDocuments = [
    { id: 1, document: "Employee Contract", signStatus: "Unsigned", signedAt: "-" },
    { id: 2, document: "HR - Work Ethics", signStatus: "No Sign Needed", signedAt: "-" },
    { id: 3, document: "Admin Document 1", signStatus: "Unsigned", signedAt: "-" },
    { id: 4, document: "Admin Document 2", signStatus: "No Sign Needed", signedAt: "-" },
    { id: 5, document: "Signature not needed", signStatus: "No Sign Needed", signedAt: "-" },
    { id: 6, document: "Initial Contract copy 2", signStatus: "Unsigned", signedAt: "-" },
    { id: 7, document: "Employee Contract for 2026", signStatus: "Unsigned", signedAt: "-" },
    { id: 8, document: "Employee Contract Empty Field", signStatus: "Unsigned", signedAt: "-" },
    { id: 9, document: "Employee Services Document", signStatus: "No Sign Needed", signedAt: "-" },
];

const columnDefinitions = [
    { key: "document", label: "Document" },
    { key: "download", label: "Download" },
    { key: "signStatus", label: "Sign Status" },
    { key: "signedAt", label: "Signed At" },
    { key: "action", label: "Action" },
];

const Dashboard = () => {
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("table");
    const [density, setDensity] = useState("compact");
    const [activeStatus, setActiveStatus] = useState("all");
    const [showSalary, setShowSalary] = useState(false);
    const [isSignModalOpen, setIsSignModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [columnOrder, setColumnOrder] = useState([
        "document",
        "download",
        "signStatus",
        "signedAt",
        "action",
    ]);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const [visibleColumns, setVisibleColumns] = useState({
        document: true,
        download: true,
        signStatus: true,
        signedAt: true,
        action: true,
    });

    const allDocuments = useMemo(() => {
        return Array.from({ length: 40 }, (_, index) => {
            const source = baseDocuments[index % baseDocuments.length];
            const serial = index + 1;

            return {
                ...source,
                id: serial,
                document:
                    index < baseDocuments.length
                        ? source.document
                        : `${source.document} ${Math.floor(index / baseDocuments.length) + 1}`,
                signStatus: serial % 5 === 0 ? "Unsigned" : (serial % 3 === 0 ? "No Sign Needed" : source.signStatus),
            };
        });
    }, []);

    // Filter logic
    const filteredData = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return allDocuments.filter((item) => {
            const matchesStatus = activeStatus === "all" || item.signStatus.toLowerCase().replace(/ /g, "") === activeStatus.toLowerCase().replace(/ /g, "");

            if (!normalizedQuery) {
                return matchesStatus;
            }

            const matchesSearch = [item.document, item.signStatus]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery);

            return matchesStatus && matchesSearch;
        });
    }, [allDocuments, searchQuery, activeStatus]);

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

    const totalCount = filteredData.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage = totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex = totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex = totalCount === 0 ? 0 : Math.min(startIndex + pageSize, totalCount);
    const paginatedData = totalCount === 0 ? [] : filteredData.slice(startIndex, endIndex);

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
        if (status === "Unsigned") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-rose-500/10 px-2 py-1 text-xs font-semibold uppercase text-rose-700">
                    <span>{status}</span>
                </Badge>
            );
        }
        if (status === "No Sign Needed") {
            return (
                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                    <span>{status}</span>
                </Badge>
            );
        }
        return (
            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-slate-500/10 px-2 py-1 text-xs font-semibold uppercase text-slate-700">
                <span>{status}</span>
            </Badge>
        );
    };

    const renderCell = (item, key) => {
        if (key === "document") {
            return (
                <TableCell className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
                    {item.document}
                </TableCell>
            );
        }

        if (key === "download") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        className="gap-2 px-3 text-xs"
                    >
                        <Download className="h-3.5 w-3.5" />
                        Download
                    </Button>
                </TableCell>
            );
        }

        if (key === "signStatus") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {getStatusBadge(item.signStatus)}
                </TableCell>
            );
        }

        if (key === "signedAt") {
            return (
                <TableCell className={`px-4 text-sm text-muted-foreground ${rowPaddingClass}`}>
                    {item.signedAt}
                </TableCell>
            );
        }

        if (key === "action") {
            return (
                <TableCell className={`px-4 ${rowPaddingClass}`}>
                    {item.signStatus === "Unsigned" ? (
                        <Button 
                            type="button"
                            variant="outline" 
                            size="sm"
                            className="gap-2 px-3 text-xs"
                            onClick={() => setIsSignModalOpen(true)}
                        >
                            <SquarePen className="h-3.5 w-3.5" />
                            <span>Sign Document</span>
                        </Button>
                    ) : (
                        <span className="text-muted-foreground text-xs ml-4">No Action</span>
                    )}
                </TableCell>
            );
        }

        return null;
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            {/* Top Section: Greeting & Cards */}
            <div className="space-y-4">
                <h2 className="text-foreground text-sm font-medium">Here's what's happening today</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Profile Status Card */}
                    <div className="relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                                <User className="w-10 h-10 text-white" fill="currentColor" />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-foreground font-medium text-sm">Software Engineer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-foreground font-medium text-sm">Dhurandhar Casting Company</span>
                                </div>
                            </div>
                        </div>
                        <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                            <span>Approved</span>
                        </Badge>
                    </div>

                    {/* Current Pay Card */}
                    <div className="relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm space-y-3">
                        <div className="flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-muted-foreground" />
                            <span className="text-foreground font-bold text-base">Current Pay</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <Badge variant="outline" className="bg-muted text-foreground border-border px-3 py-1 text-xs font-medium rounded-md">
                                Salary
                            </Badge>
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold text-lg">
                                    {showSalary ? "฿50,000.00" : "*****"}
                                </span>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-slate-600 hover:text-slate-700"
                                    onClick={() => setShowSalary(!showSalary)}
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents Overview Section */}
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex flex-auto items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">Documents Overview</h2>
                    </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Review the list of documents below along with their current signing status.
                </p>
            </div>

            <div className="w-full rounded-lg border bg-card px-2 py-2 md:px-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Space for filter buttons if needed */}
                    </div>
                    <div className="flex w-full flex-wrap items-center justify-start gap-2 md:w-auto md:justify-end">
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" aria-label="Filter">
                                    <Filter />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                    <DropdownMenuCheckboxItem
                                        checked={activeStatus === "all"}
                                        onCheckedChange={() => {
                                            setActiveStatus("all");
                                            setCurrentPage(1);
                                        }}
                                    >
                                        All
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={activeStatus === "unsigned"}
                                        onCheckedChange={() => {
                                            setActiveStatus("unsigned");
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Unsigned
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={activeStatus === "nosignneeded"}
                                        onCheckedChange={() => {
                                            setActiveStatus("nosignneeded");
                                            setCurrentPage(1);
                                        }}
                                    >
                                        No Sign Needed
                                    </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" aria-label="Density">
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
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((item) => (
                                            <TableRow key={item.id} className="hover:bg-muted/30">
                                                {visibleColumnOrder.map((key) => (
                                                    <Fragment key={key}>
                                                        {renderCell(item, key)}
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
                                                No documents found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-lg border bg-card p-4 shadow-sm"
                                    >
                                        <div className="space-y-3">
                                            {visibleColumns.document && (
                                                <p className="text-sm font-semibold">{item.document}</p>
                                            )}
                                            
                                            {visibleColumns.signStatus && (
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Status</p>
                                                    <div className="mt-1">
                                                        {getStatusBadge(item.signStatus)}
                                                    </div>
                                                </div>
                                            )}

                                            {visibleColumns.download && (
                                                <Button 
                                                    type="button"
                                                    variant="outline" 
                                                    size="sm"
                                                    className="w-full gap-2 px-3 text-xs"
                                                >
                                                    <Download className="h-3.5 w-3.5" />
                                                    Download
                                                </Button>
                                            )}

                                            {visibleColumns.action && item.signStatus === "Unsigned" && (
                                                <Button 
                                                    type="button"
                                                    variant="outline" 
                                                    size="sm"
                                                    className="w-full gap-2 px-3 text-xs"
                                                    onClick={() => setIsSignModalOpen(true)}
                                                >
                                                    <SquarePen className="h-3.5 w-3.5" />
                                                    <span>Sign Document</span>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full flex items-center justify-center py-12">
                                    <p className="text-center text-sm text-muted-foreground">
                                        No documents found.
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
            <SignDocument open={isSignModalOpen} onOpenChange={setIsSignModalOpen} />
        </main>
    );
};

export default Dashboard;
