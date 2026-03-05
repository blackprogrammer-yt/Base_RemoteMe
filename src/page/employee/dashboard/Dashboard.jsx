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
    const [density, setDensity] = useState("standard");
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
        compact: "py-2 px-6",
        standard: "py-3 px-6",
        comfortable: "py-5 px-6",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.standard;

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
                <Badge variant="secondary" className="bg-rose-500/10 text-rose-700 border-0 rounded-sm px-2">
                    {status}
                </Badge>
            );
        }
        if (status === "No Sign Needed") {
            return (
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-0 rounded-sm px-2">
                    {status}
                </Badge>
            );
        }
        return (
            <Badge variant="secondary" className="bg-slate-500/10 text-slate-700 border-0 rounded-sm px-2">
                {status}
            </Badge>
        );
    };

    const renderCell = (item, key) => {
        if (key === "document") {
            return (
                <TableCell className={`${rowPaddingClass} font-medium text-slate-700 text-[14px]`}>
                    {item.document}
                </TableCell>
            );
        }

        if (key === "download") {
            return (
                <TableCell className={`${rowPaddingClass}`}>
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
                <TableCell className={`${rowPaddingClass}`}>
                    {getStatusBadge(item.signStatus)}
                </TableCell>
            );
        }

        if (key === "signedAt") {
            return (
                <TableCell className={`${rowPaddingClass} text-slate-400 text-[14px]`}>
                    {item.signedAt}
                </TableCell>
            );
        }

        if (key === "action") {
            return (
                <TableCell className={`${rowPaddingClass}`}>
                    {item.signStatus === "Unsigned" ? (
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs px-3 rounded-md flex items-center gap-1.5"
                            onClick={() => setIsSignModalOpen(true)}
                        >
                            <SquarePen className="w-3.5 h-3.5" />
                            Sign Document
                        </Button>
                    ) : (
                        <span className="text-slate-400 text-xs ml-4">No Action</span>
                    )}
                </TableCell>
            );
        }

        return null;
    };

    return (
        <div className="p-4 sm:p-6 space-y-8 bg-white/50 min-h-screen">
            {/* Top Section: Greeting & Cards */}
            <div className="space-y-4">
                <h2 className="text-slate-800 text-sm font-medium">Here's what's happening today</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Profile Status Card */}
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                                <User className="w-10 h-10 text-white" fill="currentColor" />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-slate-600" />
                                    <span className="text-slate-700 font-medium text-sm">Software Engineer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-slate-600" />
                                    <span className="text-slate-700 font-medium text-sm">Dhurandhar Casting Company</span>
                                </div>
                            </div>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-0 rounded-sm px-3">
                            Approved
                        </Badge>
                    </div>

                    {/* Current Pay Card */}
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4 relative">
                        <div className="flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-slate-600" />
                            <span className="text-slate-800 font-bold text-base">Current Pay</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 px-3 py-1 text-xs font-medium rounded-md">
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
            <div className="space-y-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-black" />
                        <h1 className="text-lg font-bold text-slate-800">Documents Overview</h1>
                    </div>
                    <p className="text-sm text-slate-500">
                        Review the list of documents below along with their current signing status.
                    </p>
                </div>

                {/* Main Container Card for Table */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header: Filter Toolbar */}
                    <div className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
                                    <Button variant="outline" size="icon" className="h-9 w-9 text-slate-500 border-slate-300 hover:bg-slate-50">
                                        <Filter className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 bg-white">
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
                                    <Button variant="outline" size="icon" className="h-9 w-9 text-slate-500 border-slate-300 hover:bg-slate-50">
                                        <SlidersHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 bg-white">
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
                                    <Button variant="outline" size="icon" className="h-9 w-9 text-slate-500 border-slate-300 hover:bg-slate-50">
                                        <LayoutGrid className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 bg-white">
                                    <DropdownMenuCheckboxItem
                                        checked={viewMode === "table"}
                                        onCheckedChange={() => setViewMode("table")}
                                    >
                                        Table
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={viewMode === "grid"}
                                        onCheckedChange={() => setViewMode("grid")}
                                    >
                                        Cards
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-9 w-9 text-slate-500 border-slate-300 hover:bg-slate-50">
                                        <Columns3 className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white">
                                    {columnDefinitions.map((col) => (
                                        <DropdownMenuCheckboxItem
                                            key={col.key}
                                            checked={visibleColumns[col.key]}
                                            onCheckedChange={(val) =>
                                                setVisibleColumns((prev) => ({
                                                    ...prev,
                                                    [col.key]: !!val,
                                                }))
                                            }
                                            className="capitalize"
                                        >
                                            {col.label}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Table or Cards Content */}
                    <div className="mt-1 border-t border-slate-200">
                        {viewMode === "table" ? (
                            <div className="overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/50 border-b border-slate-200">
                                            {visibleColumnOrder.map((key) => (
                                                <TableHead
                                                    key={key}
                                                    draggable
                                                    onDragStart={() => handleDragStart(key)}
                                                    onDragOver={(event) => event.preventDefault()}
                                                    onDrop={() => handleDrop(key)}
                                                    className={`cursor-move select-none px-4 font-semibold text-slate-600 text-xs uppercase tracking-wider h-12`}
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
                                                <TableRow key={item.id} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
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
                                                    className="py-8 text-center text-sm text-slate-400 font-medium"
                                                >
                                                    No documents found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="p-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((item) => (
                                            <div
                                                key={item.id}
                                                className="rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 transition-colors"
                                            >
                                                <div className="space-y-3">
                                                    {visibleColumns.document && (
                                                        <p className="text-sm font-semibold text-slate-700">{item.document}</p>
                                                    )}
                                                    
                                                    {visibleColumns.signStatus && (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-slate-500">Status</span>
                                                            {getStatusBadge(item.signStatus)}
                                                        </div>
                                                    )}

                                                    {visibleColumns.download && (
                                                        <Button 
                                                            type="button"
                                                            variant="outline" 
                                                            size="sm"
                                                            className="gap-2 px-3 text-xs"
                                                        >
                                                            <Download className="h-3.5 w-3.5" />
                                                            Download
                                                        </Button>
                                                    )}

                                                    {visibleColumns.action && item.signStatus === "Unsigned" && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className="h-8 w-full border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs px-3 rounded-md flex items-center justify-center gap-1.5"
                                                            onClick={() => setIsSignModalOpen(true)}
                                                        >
                                                            <SquarePen className="w-3.5 h-3.5" />
                                                            Sign Document
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full flex items-center justify-center py-12">
                                            <p className="text-center text-sm text-slate-400 font-medium">
                                                No documents found
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer: Pagination */}
                    <div className="mt-4 flex flex-col justify-between gap-4 px-4 py-4 lg:flex-row lg:items-center border-t border-slate-200">
                        <div className="flex-1 text-sm text-slate-500 font-medium">
                            Showing {totalCount === 0 ? 0 : startIndex + 1}-{endIndex} of {totalCount}
                        </div>

                        <div className="flex flex-col space-y-2 text-sm lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-slate-600">Rows per page</span>
                                <Select
                                    value={`${pageSize}`}
                                    onValueChange={(value) =>
                                        handlePageSizeChange(Number(value))
                                    }
                                >
                                    <SelectTrigger className="h-8 w-[70px] bg-white border-slate-300">
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
                                <div className="flex items-center justify-center font-medium lg:w-[100px] text-slate-600">
                                    Page {totalCount === 0 ? 0 : safeCurrentPage} of {pageCount}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        className="hidden h-8 w-8 p-0 lg:flex border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                        onClick={() => handlePageChange(1)}
                                        disabled={safeCurrentPage === 1 || totalCount === 0}
                                    >
                                        <span className="sr-only">Go to first page</span>
                                        <ChevronsLeft className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="h-8 border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-700 px-2"
                                        onClick={() => handlePageChange(safeCurrentPage - 1)}
                                        disabled={safeCurrentPage === 1 || totalCount === 0}
                                    >
                                        <span className="sr-only">Go to previous page</span>
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="h-8 border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-700 px-2"
                                        onClick={() => handlePageChange(safeCurrentPage + 1)}
                                        disabled={safeCurrentPage >= pageCount || totalCount === 0}
                                    >
                                        <span className="sr-only">Go to next page</span>
                                        Next <ChevronRight className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="hidden h-8 w-8 p-0 lg:flex border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
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
            </div>
            <SignDocument open={isSignModalOpen} onOpenChange={setIsSignModalOpen} />
        </div>
    );
};

export default Dashboard;
