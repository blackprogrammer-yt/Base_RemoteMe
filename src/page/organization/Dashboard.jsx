import { useState } from "react";
import {
    Search,
    Download,
    Users,
    Clock,
    FileText,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    SlidersHorizontal,
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [density, setDensity] = useState("compact");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const newHires = [
        {
            id: 1,
            name: "Carly Ray",
            initials: "CR",
            email: "fopiwerasi@mailinator.com",
            invitationStatus: "Accepted",
            accountStatus: "Pending",
        },
        {
            id: 2,
            name: "Empty Field",
            initials: "EF",
            email: "khan.shahab02729+empty@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
        {
            id: 3,
            name: "Kannada Kely",
            initials: "KK",
            email: "khan.shahab02729+kannada@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
        {
            id: 4,
            name: "Khatril Millan",
            initials: "KM",
            email: "khan.shahab02729+khatri@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
        {
            id: 5,
            name: "Kevan Roger",
            initials: "KR",
            email: "khan.shahab02729+kevan@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
        {
            id: 6,
            name: "Andy Robert",
            initials: "AR",
            email: "khan.shahab02729+robert@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
        {
            id: 7,
            name: "Kely Arman",
            initials: "KA",
            email: "khan.shahab02729+arman@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
        {
            id: 8,
            name: "Hulk Huge",
            initials: "HH",
            email: "khan.shahab02729+hulk@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
        {
            id: 9,
            name: "Direct Emp",
            initials: "DE",
            email: "khan.shahab02729+emp@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
        {
            id: 10,
            name: "Reena Angular",
            initials: "RA",
            email: "khan.shahab02729+reena@gmail.com",
            invitationStatus: "Accepted",
            accountStatus: "Approved",
        },
    ];

    const documents = [
        {
            id: 1,
            name: "Organization Rules and Regulations",
            signStatus: "Signed",
            signedAt: "17-Dec-2025 06:35 AM",
        },
        {
            id: 2,
            name: "Non Disclosure Agreement",
            signStatus: "Signed",
            signedAt: "17-Dec-2025 06:35 AM",
        },
        {
            id: 3,
            name: "Admin Document 1",
            signStatus: "Signed",
            signedAt: "17-Dec-2025 06:43 AM",
        },
    ];

    const densityClasses = {
        compact: "py-2",
        standard: "py-3",
        comfortable: "py-4",
    };

    const rowPaddingClass = densityClasses[density] || densityClasses.compact;

    return (
        <main className="flex flex-1 flex-col py-4 md:pt-3">
            {/* Header */}
            <section className="mb-6 space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">
                    Welcome, <span className="text-primary">Miller Mark!</span>
                </h2>
                <p className="text-muted-foreground">
                    Here's what's happening today
                </p>
            </section>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Side: New Hires Table */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="shadow-none border-0 bg-muted/40">
                        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Users className="h-4 w-4" />
                            </div>
                            <CardTitle className="text-base font-semibold">New Hires</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4 p-4 pt-0">
                            {/* Controls */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search contracts..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="h-9 pl-9"
                                    />
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>
                                        Showing 1 - 10 of 40 records
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={pageSize.toString()}
                                            onValueChange={(v) => setPageSize(Number(v))}
                                        >
                                            <SelectTrigger className="h-8 w-[70px] bg-background">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[10, 20, 30, 40, 50].map((size) => (
                                                    <SelectItem key={size} value={size.toString()}>
                                                        {size}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon" className="h-8 w-8 bg-background">
                                                    <SlidersHorizontal className="h-4 w-4" />
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
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-hidden rounded-lg border bg-background">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="font-semibold">Name</TableHead>
                                            <TableHead className="font-semibold">Email</TableHead>
                                            <TableHead className="text-center font-semibold">Invitation Status</TableHead>
                                            <TableHead className="text-center font-semibold">Account Status</TableHead>
                                            <TableHead className="text-right font-semibold">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {newHires.map((hire) => (
                                            <TableRow key={hire.id} className="hover:bg-muted/30">
                                                <TableCell className={`${rowPaddingClass}`}>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                            {hire.initials}
                                                        </div>
                                                        <span className="font-medium">{hire.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className={`${rowPaddingClass} text-muted-foreground`}>
                                                    {hire.email}
                                                </TableCell>
                                                <TableCell className={`${rowPaddingClass} text-center`}>
                                                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-0 rounded-sm px-2">
                                                        {hire.invitationStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className={`${rowPaddingClass} text-center`}>
                                                    <Badge 
                                                        variant="secondary" 
                                                        className={`${hire.accountStatus === 'Pending' ? 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20'} border-0 rounded-sm px-2`}
                                                    >
                                                        {hire.accountStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className={`${rowPaddingClass} text-right`}>
                                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 h-8 px-3">
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-center gap-1 py-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-muted-foreground/20 hover:bg-muted">
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-muted-foreground/20 hover:bg-muted">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button className="h-8 w-8 rounded-md bg-primary text-primary-foreground">
                                    1
                                </Button>
                                <Button variant="outline" className="h-8 w-8 rounded-md border-muted-foreground/20 hover:bg-muted">
                                    2
                                </Button>
                                <Button variant="outline" className="h-8 w-8 rounded-md border-muted-foreground/20 hover:bg-muted">
                                    3
                                </Button>
                                <Button variant="outline" className="h-8 w-8 rounded-md border-muted-foreground/20 hover:bg-muted">
                                    4
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-muted-foreground/20 hover:bg-muted">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-muted-foreground/20 hover:bg-muted">
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side Cards */}
                <div className="space-y-4">
                    {/* Your Team Card */}
                    <Card className="border-0 bg-muted/40 shadow-none">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-muted-foreground">Your Team</p>
                                    <p className="text-xs text-muted-foreground">Total Employees</p>
                                </div>
                            </div>
                            <p className="text-2xl font-semibold">37</p>
                        </CardContent>
                    </Card>

                    {/* Timesheets Card */}
                    <Card className="border-0 bg-muted/40 shadow-none">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-muted-foreground">Timesheets</p>
                                    <p className="text-xs text-muted-foreground">Awaited for Approval</p>
                                </div>
                            </div>
                            <p className="text-2xl font-semibold">1</p>
                        </CardContent>
                    </Card>

                    {/* Invoices Card */}
                    <Card className="border-0 bg-muted/40 shadow-none">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium text-muted-foreground">Invoices</p>
                                    <p className="text-xs text-muted-foreground">Awaited for Approval</p>
                                </div>
                            </div>
                            <p className="text-2xl font-semibold">31</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom Section: Documents Overview */}
            <div className="mt-6">
                <Card className="shadow-none">
                    <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <FileText className="h-4 w-4" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold">Documents Overview</CardTitle>
                            <CardDescription>
                                Review the list of documents below along with their current signing status.
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="font-semibold">Document</TableHead>
                                        <TableHead className="text-center font-semibold">Download</TableHead>
                                        <TableHead className="text-center font-semibold">Sign Status</TableHead>
                                        <TableHead className="text-center font-semibold">Signed At</TableHead>
                                        <TableHead className="text-right font-semibold">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documents.map((doc) => (
                                        <TableRow key={doc.id} className="hover:bg-muted/30">
                                            <TableCell className="py-3 font-medium">
                                                {doc.name}
                                            </TableCell>
                                            <TableCell className="py-3 text-center">
                                                <Button variant="outline" size="sm" className="h-8 gap-2 border-primary/20 text-primary hover:bg-primary/10">
                                                    <Download className="h-3.5 w-3.5" />
                                                    Download
                                                </Button>
                                            </TableCell>
                                            <TableCell className="py-3 text-center">
                                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-0 rounded-sm px-2">
                                                    {doc.signStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="py-3 text-center text-sm text-muted-foreground">
                                                {doc.signedAt}
                                            </TableCell>
                                            <TableCell className="py-3 text-right text-sm text-muted-foreground">
                                                No Action
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default Dashboard;
