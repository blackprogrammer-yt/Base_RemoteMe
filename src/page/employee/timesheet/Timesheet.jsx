import React, { useState } from "react";
import {
    Clock,
    Search,
    Filter,
    SlidersHorizontal,
    LayoutGrid,
    Columns3,
    Eye,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

const Timesheet = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [pageSize, setPageSize] = useState("10");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrg, setSelectedOrg] = useState("all");
    const [viewMode, setViewMode] = useState("table");
    const [density, setDensity] = useState("standard");

    const [visibleColumns, setVisibleColumns] = useState({
        status: true,
        placement: true,
        jobTitle: true,
        client: true,
        startDate: true,
        endDate: true,
        action: true,
    });

    const initialTimesheetData = [
        {
            id: 1,
            status: "DRAFT",
            placement: "Software Engineer",
            jobTitle: "Senior Developer",
            client: "Orion Enterprize",
            startDate: "01/06/2026",
            endDate: "30/06/2026",
        },
        {
            id: 2,
            status: "MISSING",
            placement: "Graphic Designer",
            jobTitle: "UI Designer",
            client: "Logo&Design",
            startDate: "01/01/2026",
            endDate: "31/01/2026",
        },
        {
            id: 3,
            status: "SUBMITTED",
            placement: "Data Analyst",
            jobTitle: "Business Analyst",
            client: "Kissan&Supplier",
            startDate: "01/02/2026",
            endDate: "28/02/2026",
        },
        {
            id: 4,
            status: "APPROVED",
            placement: "Backend Developer",
            jobTitle: "Node.js Expert",
            client: "Orion Enterprize",
            startDate: "15/02/2026",
            endDate: "28/02/2026",
        },
        {
            id: 5,
            status: "DECLINED",
            placement: "Frontend Dev",
            jobTitle: "React Specialist",
            client: "Logo&Design",
            startDate: "01/03/2026",
            endDate: "15/03/2026",
        },
    ];

    // Filter logic
    const filteredData = initialTimesheetData.filter((item) => {
        const matchesStatus = activeTab === "all" || item.status.toLowerCase() === activeTab.toLowerCase();
        const matchesOrg = selectedOrg === "all" || item.client === selectedOrg;
        const matchesSearch = 
            item.placement.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.client.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesStatus && matchesOrg && matchesSearch;
    });

    const organizations = [...new Set(initialTimesheetData.map(item => item.client))];

    const densityClasses = {
        compact: "py-2 px-6",
        standard: "py-5 px-6",
        comfortable: "py-8 px-6",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.standard;

    const getStatusBadge = (status) => {
        if (status === "DRAFT") {
            return (
                <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none px-3 py-1 text-[10px] font-bold">
                    DRAFT
                </Badge>
            );
        }
        if (status === "MISSING") {
            return (
                <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-none px-3 py-1 text-[10px] font-bold">
                    MISSING
                </Badge>
            );
        }
        if (status === "SUBMITTED") {
            return (
                <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-none px-3 py-1 text-[10px] font-bold">
                    SUBMITTED
                </Badge>
            );
        }
        if (status === "APPROVED") {
            return (
                <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100 border-none px-3 py-1 text-[10px] font-bold">
                    APPROVED
                </Badge>
            );
        }
        if (status === "DECLINED") {
            return (
                <Badge className="bg-rose-100 text-rose-600 hover:bg-rose-100 border-none px-3 py-1 text-[10px] font-bold">
                    DECLINED
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className="text-slate-400 border-slate-200 px-3 py-1 text-[10px] font-bold">
                {status}
            </Badge>
        );
    };

    return (
        <div className="p-4 sm:p-6 space-y-6 bg-slate-50/50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 rounded-md">
                        <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <h1 className="text-xl font-semibold text-slate-800">Timesheets</h1>
                </div>
            </div>

            {/* Main Container Card */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
                {/* Header: Filter Toolbar */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
                        <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                            <SelectTrigger className="w-full md:w-[240px] h-10 border-slate-200">
                                <SelectValue placeholder="-- All Client --" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">-- All Client --</SelectItem>
                                {organizations.map((org) => (
                                    <SelectItem key={org} value={org}>{org}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <div className="relative flex-1 md:w-[300px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                                placeholder="Search" 
                                className="pl-9 h-10 border-slate-200 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-10 w-10 border-slate-200">
                                    <Filter className="w-4 h-4 text-slate-600" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuCheckboxItem
                                    checked={activeTab === "all"}
                                    onCheckedChange={() => setActiveTab("all")}
                                >
                                    All
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={activeTab === "draft"}
                                    onCheckedChange={() => setActiveTab("draft")}
                                >
                                    Draft
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={activeTab === "missing"}
                                    onCheckedChange={() => setActiveTab("missing")}
                                >
                                    Missing
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={activeTab === "submitted"}
                                    onCheckedChange={() => setActiveTab("submitted")}
                                >
                                    Submitted
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={activeTab === "approved"}
                                    onCheckedChange={() => setActiveTab("approved")}
                                >
                                    Approved
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={activeTab === "declined"}
                                    onCheckedChange={() => setActiveTab("declined")}
                                >
                                    Declined
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-10 w-10 border-slate-200">
                                    <SlidersHorizontal className="w-4 h-4 text-slate-600" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={() => setDensity("compact")} className="flex items-center gap-2">
                                    {density === "compact" && <span>✓</span>}
                                    <span>Compact</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDensity("standard")} className="flex items-center gap-2">
                                    {density === "standard" && <span>✓</span>}
                                    <span>Standard</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDensity("comfortable")} className="flex items-center gap-2">
                                    {density === "comfortable" && <span>✓</span>}
                                    <span>Comfortable</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-10 w-10 border-slate-200">
                                    <Columns3 className="w-4 h-4 text-slate-600" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuCheckboxItem
                                    checked={visibleColumns.status}
                                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, status: checked }))}
                                >
                                    Status
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={visibleColumns.placement}
                                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, placement: checked }))}
                                >
                                    Placement
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={visibleColumns.jobTitle}
                                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, jobTitle: checked }))}
                                >
                                    Job Title
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={visibleColumns.client}
                                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, client: checked }))}
                                >
                                    Client
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={visibleColumns.startDate}
                                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, startDate: checked }))}
                                >
                                    Start Date
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={visibleColumns.endDate}
                                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, endDate: checked }))}
                                >
                                    End Date
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={visibleColumns.action}
                                    onCheckedChange={(checked) => setVisibleColumns(prev => ({ ...prev, action: checked }))}
                                >
                                    Action
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-10 w-10 border-slate-200">
                                    <LayoutGrid className="w-4 h-4 text-slate-600" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                                <DropdownMenuItem onClick={() => setViewMode("table")} className="flex items-center gap-2">
                                    {viewMode === "table" && <span>✓</span>}
                                    <span>Table</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setViewMode("cards")} className="flex items-center gap-2">
                                    {viewMode === "cards" && <span>✓</span>}
                                    <span>Cards</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Body: Content Section in separate box */}
                <div className="px-4 py-2 flex-1">
                    <div className="rounded-lg border bg-white overflow-hidden">
                        {viewMode === "table" ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                            {visibleColumns.status && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider py-4 px-6">Status</TableHead>}
                                            {visibleColumns.placement && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider py-4 px-6">Placement</TableHead>}
                                            {visibleColumns.jobTitle && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider py-4 px-6">Job Title</TableHead>}
                                            {visibleColumns.client && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider py-4 px-6">Client</TableHead>}
                                            {visibleColumns.startDate && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider py-4 px-6">Start Date</TableHead>}
                                            {visibleColumns.endDate && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider py-4 px-6">End Date</TableHead>}
                                            {visibleColumns.action && <TableHead className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider py-4 px-6">Action</TableHead>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((row) => (
                                                <TableRow key={row.id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0">
                                                    {visibleColumns.status && <TableCell className={rowPaddingClass}>{getStatusBadge(row.status)}</TableCell>}
                                                    {visibleColumns.placement && <TableCell className={`${rowPaddingClass} font-semibold text-slate-700`}>{row.placement}</TableCell>}
                                                    {visibleColumns.jobTitle && <TableCell className={`${rowPaddingClass} text-slate-600 font-medium`}>{row.jobTitle}</TableCell>}
                                                    {visibleColumns.client && <TableCell className={`${rowPaddingClass} text-slate-600 font-medium`}>{row.client}</TableCell>}
                                                    {visibleColumns.startDate && <TableCell className={`${rowPaddingClass} text-slate-500`}>{row.startDate}</TableCell>}
                                                    {visibleColumns.endDate && <TableCell className={`${rowPaddingClass} text-slate-500`}>{row.endDate}</TableCell>}
                                                    {visibleColumns.action && (
                                                        <TableCell className={rowPaddingClass}>
                                                            <Button variant="outline" className="text-slate-700 border-slate-200 hover:bg-slate-50 h-9 px-4 text-sm font-medium">
                                                                Action
                                                            </Button>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length} className="h-32 text-center text-slate-500 bg-slate-50/30">
                                                    No timesheets found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/30 min-h-[200px]">
                                {filteredData.length > 0 ? (
                                    filteredData.map((row) => (
                                        <Card key={row.id} className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow bg-white">
                                            <CardContent className="p-5 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client</p>
                                                        <p className="font-bold text-slate-900 text-base">{row.client}</p>
                                                    </div>
                                                    {getStatusBadge(row.status)}
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement</p>
                                                        <p className="text-xs font-semibold text-slate-700">{row.placement}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job Title</p>
                                                        <p className="text-xs font-semibold text-slate-700">{row.jobTitle}</p>
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                                                        <p className="text-[11px] text-slate-500 font-medium">{row.startDate} - {row.endDate}</p>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-slate-200">
                                                        Action
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                                        <p className="text-lg font-medium">No timesheets found.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer: Pagination Section */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex-1 text-sm text-slate-500 font-medium">
                        Showing 1-{filteredData.length} of {filteredData.length}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">Rows per page</span>
                            <Select value={pageSize} onValueChange={setPageSize}>
                                <SelectTrigger className="w-[70px] h-9 border-slate-200 bg-white">
                                    <SelectValue placeholder="10" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="text-sm text-slate-600 font-medium">
                            Page 1 of 1
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200" disabled>
                                <ChevronsLeft className="w-4 h-4 text-slate-400" />
                            </Button>
                            
                            <Button variant="outline" className="h-9 gap-1 px-3 border-slate-200 text-slate-400" disabled>
                                <ChevronLeft className="w-4 h-4" />
                                <span className="text-sm font-medium">Previous</span>
                            </Button>

                            <Button variant="outline" className="h-9 gap-1 px-3 border-slate-200 text-slate-600 hover:bg-slate-50">
                                <span className="text-sm font-medium">Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </Button>

                            <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200">
                                <ChevronsRight className="w-4 h-4 text-slate-600" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timesheet;
