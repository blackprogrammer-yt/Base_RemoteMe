import { useMemo, useState } from "react";
import {
    Download,
    Filter,
    Search,
    SlidersHorizontal,
    Pencil,
    SquarePen,
    Columns3,
    LayoutGrid,
    FileText,
    ClipboardCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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

const initialDocuments = [
    {
        id: 1,
        title: "Organization Rules and Regulations",
        documentFor: "Organization",
        signatures: 1,
        inputs: 1,
        active: true,
    },
    {
        id: 2,
        title: "Employee Contract",
        documentFor: "Employee",
        signatures: 1,
        inputs: 0,
        active: true,
    },
    {
        id: 3,
        title: "HR - Work Ethics",
        documentFor: "Both",
        signatures: 0,
        inputs: 0,
        active: true,
    },
    {
        id: 4,
        title: "Non Disclosure Agreement",
        documentFor: "Organization",
        signatures: 1,
        inputs: 0,
        active: true,
    },
    {
        id: 5,
        title: "Admin Document 1",
        documentFor: "Both",
        signatures: 1,
        inputs: 0,
        active: true,
    },
    {
        id: 6,
        title: "Admin Document 2",
        documentFor: "Employee",
        signatures: 0,
        inputs: 0,
        active: true,
    },
    {
        id: 7,
        title: "Signature not needed",
        documentFor: "Employee",
        signatures: 0,
        inputs: 0,
        active: true,
    },
    {
        id: 8,
        title: "Initial Contract copy 2",
        documentFor: "Both",
        signatures: 5,
        inputs: 0,
        active: true,
    },
    {
        id: 9,
        title: "Employee Contract for 2026",
        documentFor: "Both",
        signatures: 6,
        inputs: 6,
        active: true,
    },
    {
        id: 10,
        title: "Employee Contract Empty Field",
        documentFor: "Employee",
        signatures: 1,
        inputs: 4,
        active: true,
    },
];

const statusFilterOptions = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
];

const Documents = () => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState(initialDocuments);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeStatus, setActiveStatus] = useState("all");
    const [density, setDensity] = useState("compact");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [docTypeFilter, setDocTypeFilter] = useState("all");
    const [visibleColumns, setVisibleColumns] = useState({
        title: true,
        documentFor: true,
        document: true,
        signatures: true,
        inputs: true,
        status: true,
        toggle: true,
        action: true,
    });

    const filteredDocuments = useMemo(() => {
        const normalized = searchQuery.trim().toLowerCase();
        return documents.filter((doc) => {
            const matchesStatus =
                activeStatus === "all" ||
                (activeStatus === "active" && doc.active) ||
                (activeStatus === "inactive" && !doc.active);
            const matchesType =
                docTypeFilter === "all" ||
                doc.documentFor.toLowerCase() === docTypeFilter;

            if (!normalized) return matchesStatus && matchesType;
            const text = [doc.title, doc.documentFor].join(" ").toLowerCase();
            return matchesStatus && matchesType && text.includes(normalized);
        });
    }, [documents, searchQuery, activeStatus, docTypeFilter]);

    const totalCount = filteredDocuments.length;
    const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
    const safeCurrentPage = totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
    const startIndex = totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
    const endIndex = totalCount === 0 ? 0 : Math.min(startIndex + pageSize, totalCount);
    const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

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
        setDocuments((prev) =>
            prev.map((doc) =>
                doc.id === id ? { ...doc, active: !doc.active } : doc,
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
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                            Documents
                        </h2>
                    </div>
                    <Button
                        onClick={() => navigate(PROTECTED_ROUTES.ADMIN_ADD_DOCUMENT)}
                        className="h-9 gap-2 bg-slate-900 hover:bg-slate-800 text-white"
                    >
                        <ClipboardCheck className="h-4 w-4" />
                        <span>Add Document</span>
                    </Button>
                </div>
            </div>

            <div className="rounded-lg border bg-white">
                <div className="flex flex-col gap-3 p-3 md:flex-row md:items-center md:justify-between border-b">
                    <div className="flex items-center gap-2 w-full">
                        <Select value={docTypeFilter} onValueChange={setDocTypeFilter}>
                            <SelectTrigger className="w-full md:w-64 h-9 bg-slate-50/50">
                                <SelectValue placeholder="-- All Documents --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">-- All Documents --</SelectItem>
                                <SelectItem value="organization">Organization</SelectItem>
                                <SelectItem value="employee">Employee</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
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
                                    <DropdownMenuCheckboxItem
                                        checked={viewMode === "table"}
                                        onCheckedChange={() => setViewMode("table")}
                                        className="text-sm cursor-pointer"
                                    >
                                        Table
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={viewMode === "cards"}
                                        onCheckedChange={() => setViewMode("cards")}
                                        className="text-sm cursor-pointer"
                                    >
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
                        {viewMode === "table" ? (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                        {visibleColumns.title && (
                                            <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">
                                                Title
                                            </TableHead>
                                        )}
                                        {visibleColumns.documentFor && (
                                            <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">
                                                Document For
                                            </TableHead>
                                        )}
                                        {visibleColumns.document && (
                                            <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider text-center">
                                                Document
                                            </TableHead>
                                        )}
                                        {visibleColumns.signatures && (
                                            <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider text-center">
                                                Signature Count
                                            </TableHead>
                                        )}
                                        {visibleColumns.inputs && (
                                            <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider text-center">
                                                Input Count
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
                                    {paginatedDocuments.map((doc) => (
                                        <TableRow key={doc.id} className="hover:bg-slate-50/50">
                                            {visibleColumns.title && (
                                                <TableCell className={`font-medium text-slate-900 ${rowPaddingClass}`}>
                                                    {doc.title}
                                                </TableCell>
                                            )}
                                            {visibleColumns.documentFor && (
                                                <TableCell className={`text-slate-600 ${rowPaddingClass}`}>
                                                    {doc.documentFor}
                                                </TableCell>
                                            )}
                                            {visibleColumns.document && (
                                                <TableCell className={`text-center ${rowPaddingClass}`}>
                                                    <div className="flex items-center justify-center">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-2 px-3 text-xs"
                                                        >
                                                            <Download className="h-3.5 w-3.5" />
                                                            Download
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            )}
                                            {visibleColumns.signatures && (
                                                <TableCell className={`text-center ${rowPaddingClass}`}>
                                                    {doc.signatures}
                                                </TableCell>
                                            )}
                                            {visibleColumns.inputs && (
                                                <TableCell className={`text-center ${rowPaddingClass}`}>
                                                    {doc.inputs}
                                                </TableCell>
                                            )}
                                            {visibleColumns.status && (
                                                <TableCell className={`text-center ${rowPaddingClass}`}>
                                                    {getStatusBadge(doc.active)}
                                                </TableCell>
                                            )}
                                            {visibleColumns.toggle && (
                                                <TableCell className={`text-center ${rowPaddingClass}`}>
                                                    <div className="flex items-center justify-center">
                                                        <Switch
                                                            checked={doc.active}
                                                            onCheckedChange={() => handleToggleActive(doc.id)}
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
                                                                    PROTECTED_ROUTES.ADMIN_EDIT_DOCUMENT.replace(
                                                                        ":id",
                                                                        String(doc.id),
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
                                    {paginatedDocuments.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={Object.values(visibleColumns).filter(Boolean).length}
                                                className="h-32 text-center text-muted-foreground"
                                            >
                                                No documents found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/30">
                                {paginatedDocuments.map((doc) => (
                                    <Card key={doc.id} className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Title</p>
                                                    <p className="font-bold text-slate-900">{doc.title}</p>
                                                </div>
                                                {getStatusBadge(doc.active)}
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                                                <div>
                                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Document For</p>
                                                    <p>{doc.documentFor}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Signatures</p>
                                                    <p>{doc.signatures}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inputs</p>
                                                    <p>{doc.inputs}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" className="gap-2 px-3 text-xs">
                                                        <Download className="h-3.5 w-3.5" />
                                                        Download
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2 px-3 text-xs"
                                                        onClick={() =>
                                                            navigate(
                                                                PROTECTED_ROUTES.ADMIN_EDIT_DOCUMENT.replace(
                                                                    ":id",
                                                                    String(doc.id),
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        <SquarePen className="h-3.5 w-3.5" />
                                                        <span>Edit</span>
                                                    </Button>
                                                </div>
                                                <Switch checked={doc.active} onCheckedChange={() => handleToggleActive(doc.id)} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                {paginatedDocuments.length === 0 ? (
                                    <div className="col-span-full h-32 flex items-center justify-center text-muted-foreground">
                                        No documents found.
                                    </div>
                                ) : null}
                            </div>
                        )}
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

export default Documents;
