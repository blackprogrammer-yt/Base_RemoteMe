import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Columns3,
	GripVertical,
	LayoutGrid,
	Plus,
	Search,
	SlidersHorizontal,
	Users,
	X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const OrganizationAdmin = () => {
	const navigate = useNavigate();

	const admins = [
		{
			id: 1,
			name: "Kirti Shaw",
			email: "khan.shahab02729+kirti@gmail.com",
			contactNumber: "--",
			loginStatus: true,
		},
		{
			id: 2,
			name: "John Doe",
			email: "john.doe@gmail.com",
			contactNumber: "+1-555-0100",
			loginStatus: true,
		},
		{
			id: 3,
			name: "Jane Smith",
			email: "jane.smith@gmail.com",
			contactNumber: "+1-555-0101",
			loginStatus: false,
		},
		{
			id: 4,
			name: "Michael Brown",
			email: "michael.brown@gmail.com",
			contactNumber: "+1-555-0102",
			loginStatus: true,
		},
		{
			id: 5,
			name: "Sarah Johnson",
			email: "sarah.johnson@gmail.com",
			contactNumber: "+1-555-0103",
			loginStatus: true,
		},
	];

	const [searchQuery, setSearchQuery] = useState("");
	const [density, setDensity] = useState("compact");
	const [viewMode, setViewMode] = useState("table");
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const [visibleColumns, setVisibleColumns] = useState({
		name: true,
		email: true,
		contactNumber: true,
		loginStatus: true,
	});

	const [columnOrder, setColumnOrder] = useState([
		"name",
		"email",
		"contactNumber",
		"loginStatus",
	]);
	const [draggedColumn, setDraggedColumn] = useState(null);

	const columnDefinitions = [
		{ key: "name", label: "Name" },
		{ key: "email", label: "Email" },
		{ key: "contactNumber", label: "Contact Number" },
		{ key: "loginStatus", label: "Login Status" },
	];

	const columnLabelMap = columnDefinitions.reduce((acc, column) => {
		acc[column.key] = column.label;
		return acc;
	}, {});

	const filteredAdmins = admins.filter((admin) => {
		const normalizedQuery = searchQuery.trim().toLowerCase();

		if (!normalizedQuery) {
			return true;
		}

		return (
			admin.name.toLowerCase().includes(normalizedQuery) ||
			admin.email.toLowerCase().includes(normalizedQuery) ||
			admin.contactNumber.toLowerCase().includes(normalizedQuery)
		);
	});

	// Pagination logic
	const totalCount = filteredAdmins.length;
	const pageCount = Math.ceil(totalCount / pageSize);

	if (currentPage > pageCount && pageCount > 0) {
		setCurrentPage(pageCount);
	}

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalCount);
	const paginatedAdmins = filteredAdmins.slice(startIndex, endIndex);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handlePageSizeChange = (newSize) => {
		setPageSize(newSize);
		setCurrentPage(1);
	};

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

	const renderCell = (admin, key) => {
		if (key === "name") {
			return (
				<TableCell className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
					{admin.name}
				</TableCell>
			);
		}

		if (key === "email") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{admin.email}
				</TableCell>
			);
		}

		if (key === "contactNumber") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{admin.contactNumber}
				</TableCell>
			);
		}

		if (key === "loginStatus") {
			return (
				<TableCell className={`px-4 ${rowPaddingClass}`}>
					<Badge
						className={`inline-flex items-center rounded-sm border-0 px-2 py-1 text-xs font-semibold uppercase ${admin.loginStatus
								? "bg-emerald-500/10 text-emerald-700"
								: "bg-gray-500/10 text-gray-700"
							}`}
					>
						{admin.loginStatus ? "Active" : "Inactive"}
					</Badge>
				</TableCell>
			);
		}

		return null;
	};

	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex flex-auto flex-col py-2">
				<div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-auto items-center gap-2">
						<Users className="h-5 w-5 text-muted-foreground" />
						<h2 className="text-2xl font-bold tracking-tight">Organization Admin Users</h2>
					</div>
					<Button
						size="sm"
						className="gap-2 bg-black hover:bg-gray-900 text-white"
						onClick={() => navigate(PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_MANAGE_ADMIN_ADD)}
					>
						<Plus className="h-4 w-4" />
						Add Admin
					</Button>
				</div>
			</div>

			<Card className="shadow-sm">
				<CardContent className="space-y-4 p-5">
					<div className="flex items-center justify-end gap-3">
						<div className="relative w-[300px]">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search admins..."
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

						<div className="flex items-center gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										aria-label="Density"
									>
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

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										aria-label="View"
									>
										<LayoutGrid className="h-4 w-4" />
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
										<Columns3 className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-48">
									{columnDefinitions.map((column) => (
										<DropdownMenuCheckboxItem
											key={column.key}
											checked={visibleColumns[column.key]}
											onCheckedChange={(checked) =>
												setVisibleColumns((prev) => ({
													...prev,
													[column.key]: checked,
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
														<GripVertical className="h-3 w-3 text-muted-foreground/70" />
														{columnLabelMap[key]}
													</span>
												</TableHead>
											))}
										</TableRow>
									</TableHeader>
									<TableBody>
										{paginatedAdmins.map((admin, idx) => (
											<TableRow
												key={admin.id}
												className={`hover:bg-muted/30 ${idx % 2 === 0 ? "" : "bg-muted/30"
													}`}
											>
												{visibleColumnOrder.map((key) => (
													<Fragment key={key}>
														{renderCell(admin, key)}
													</Fragment>
												))}
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						) : (
							<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
								{paginatedAdmins.map((admin) => (
									<div key={admin.id} className="rounded-lg border bg-card p-4 shadow-sm">
										<div className="flex items-start justify-between gap-3">
											<div>
												{visibleColumns.name && (
													<p className="text-sm font-semibold">{admin.name}</p>
												)}
												{visibleColumns.loginStatus && (
													<div className="mt-2">
														<Badge
															className={`inline-flex items-center rounded-sm border-0 px-2 py-1 text-xs font-semibold uppercase ${admin.loginStatus
																	? "bg-emerald-500/10 text-emerald-700"
																	: "bg-gray-500/10 text-gray-700"
																}`}
														>
															{admin.loginStatus ? "Active" : "Inactive"}
														</Badge>
													</div>
												)}
											</div>
										</div>

										<div className="mt-4 space-y-3">
											{visibleColumns.email && (
												<div>
													<p className="text-xs text-muted-foreground">Email</p>
													<p className="text-sm font-medium">{admin.email}</p>
												</div>
											)}

											{visibleColumns.contactNumber && (
												<div>
													<p className="text-xs text-muted-foreground">
														Contact Number
													</p>
													<p className="text-sm font-medium">{admin.contactNumber}</p>
												</div>
											)}
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
										onClick={() =>
											handlePageChange(Math.max(1, currentPage - 1))
										}
										disabled={currentPage === 1}
									>
										<span className="sr-only">Go to previous page</span>
										<ChevronLeft className="h-4 w-4" />
										Previous
									</Button>

									<Button
										variant="outline"
										onClick={() =>
											handlePageChange(Math.min(pageCount, currentPage + 1))
										}
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
				</CardContent>
			</Card>
		</main>
	);
};

export default OrganizationAdmin;
