import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Clock,
	Columns3,
	Eye,
	Filter,
	LayoutGrid,
	Search,
	SlidersHorizontal,
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

const TIMESHEETS = [
	{
		id: 1,
		status: "Missing",
		name: "Empty Field",
		placement: "109",
		jobTitle: "Blockchain Developer",
		client: "Dhurandhar Casting Company",
		startDate: "Feb 02, 2026",
		endDate: "Feb 08, 2026",
	},
	{
		id: 2,
		status: "Approved",
		name: "Hulk Huge",
		placement: "100",
		jobTitle: "AI Engineer",
		client: "Dhurandhar Casting Company",
		startDate: "Feb 02, 2026",
		endDate: "Feb 08, 2026",
	},
	{
		id: 3,
		status: "Missing",
		name: "Kannada Kely",
		placement: "106",
		jobTitle: "Blockchain Developer",
		client: "Dhurandhar Casting Company",
		startDate: "Feb 02, 2026",
		endDate: "Feb 08, 2026",
	},
	{
		id: 4,
		status: "Missing",
		name: "Khatril Millan",
		placement: "105",
		jobTitle: "Blockchain Developer",
		client: "Dhurandhar Casting Company",
		startDate: "Feb 02, 2026",
		endDate: "Feb 08, 2026",
	},
	{
		id: 5,
		status: "Missing",
		name: "Kannada Kely",
		placement: "106",
		jobTitle: "Blockchain Developer",
		client: "Dhurandhar Casting Company",
		startDate: "Jan 26, 2026",
		endDate: "Feb 01, 2026",
	},
	{
		id: 6,
		status: "Missing",
		name: "Khatril Millan",
		placement: "105",
		jobTitle: "Blockchain Developer",
		client: "Dhurandhar Casting Company",
		startDate: "Jan 26, 2026",
		endDate: "Feb 01, 2026",
	},
	{
		id: 7,
		status: "Missing",
		name: "Carly Ray",
		placement: "110",
		jobTitle: "Rem occaecat quibusd",
		client: "Dhurandhar Casting Company",
		startDate: "Jan 26, 2026",
		endDate: "Feb 01, 2026",
	},
	{
		id: 8,
		status: "Missing",
		name: "Kannada Kely",
		placement: "106",
		jobTitle: "Blockchain Developer",
		client: "Dhurandhar Casting Company",
		startDate: "Jan 19, 2026",
		endDate: "Jan 25, 2026",
	},
	{
		id: 9,
		status: "Missing",
		name: "Khatril Millan",
		placement: "105",
		jobTitle: "Blockchain Developer",
		client: "Dhurandhar Casting Company",
		startDate: "Jan 19, 2026",
		endDate: "Jan 25, 2026",
	},
	{
		id: 10,
		status: "Missing",
		name: "Carly Ray",
		placement: "110",
		jobTitle: "Rem occaecat quibusd",
		client: "Dhurandhar Casting Company",
		startDate: "Jan 19, 2026",
		endDate: "Jan 25, 2026",
	},
];

const statusTabs = [
	{ key: "all", label: "All" },
	{ key: "missing", label: "Missing" },
	{ key: "draft", label: "Draft" },
	{ key: "submitted", label: "Submitted" },
	{ key: "approved", label: "Approved" },
	{ key: "declined", label: "Declined" },
];

const Timesheets = () => {
	const navigate = useNavigate();
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [selectedEmployee, setSelectedEmployee] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [startDate, setStartDate] = useState("");
	const [density, setDensity] = useState("compact");
	const [viewMode, setViewMode] = useState("table");
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [visibleColumns, setVisibleColumns] = useState({
		status: true,
		name: true,
		placement: true,
		jobTitle: true,
		client: true,
		startDate: true,
		endDate: true,
		action: true,
	});
	const [columnOrder, setColumnOrder] = useState([
		"status",
		"name",
		"placement",
		"jobTitle",
		"client",
		"startDate",
		"endDate",
		"action",
	]);
	const [draggedColumn, setDraggedColumn] = useState(null);

	const columnDefinitions = [
		{ key: "status", label: "Status" },
		{ key: "name", label: "Name" },
		{ key: "placement", label: "Placement" },
		{ key: "jobTitle", label: "Job Title" },
		{ key: "client", label: "Client" },
		{ key: "startDate", label: "Start Date" },
		{ key: "endDate", label: "End Date" },
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
		(key) => visibleColumns[key]
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

	const employeeOptions = useMemo(() => {
		const set = new Set(TIMESHEETS.map((row) => row.name));
		return ["all", ...Array.from(set)];
	}, []);

	const filteredTimesheets = useMemo(() => {
		return TIMESHEETS.filter((row) => {
			const normalizedQuery = searchQuery.trim().toLowerCase();
			const matchesStatus =
				selectedStatus === "all" ||
				row.status.toLowerCase() === selectedStatus;
			const matchesEmployee =
				selectedEmployee === "all" || row.name === selectedEmployee;

			if (!normalizedQuery) {
				return matchesStatus && matchesEmployee;
			}

			const matchesSearch = [
				row.name,
				row.placement,
				row.jobTitle,
				row.client,
				row.startDate,
				row.endDate,
			]
				.join(" ")
				.toLowerCase()
				.includes(normalizedQuery);

			return matchesStatus && matchesEmployee && matchesSearch;
		});
	}, [searchQuery, selectedStatus, selectedEmployee]);

	const totalCount = filteredTimesheets.length;
	const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
	const safeCurrentPage =
		totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
	const startIndex =
		totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
	const endIndex =
		totalCount === 0
			? 0
			: Math.min(startIndex + pageSize, totalCount);
	const paginatedTimesheets =
		totalCount === 0
			? []
			: filteredTimesheets.slice(startIndex, endIndex);

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
		if (!status) {
			return null;
		}

		const normalized = status.toLowerCase();
		if (normalized === "missing") {
			return (
				<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
					<span>{status}</span>
				</Badge>
			);
		}

		if (normalized === "approved") {
			return (
				<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
					<span>{status}</span>
				</Badge>
			);
		}

		if (normalized === "submitted") {
			return (
				<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-sky-500/10 px-2 py-1 text-xs font-semibold uppercase text-sky-700">
					<span>{status}</span>
				</Badge>
			);
		}

		if (normalized === "declined") {
			return (
				<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-rose-500/10 px-2 py-1 text-xs font-semibold uppercase text-rose-700">
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

	const renderCell = (row, key) => {
		if (key === "status") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{getStatusBadge(row.status)}
				</TableCell>
			);
		}

		if (key === "name") {
			return (
				<TableCell className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
					{row.name}
				</TableCell>
			);
		}

		if (key === "placement") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{row.placement}
				</TableCell>
			);
		}

		if (key === "jobTitle") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{row.jobTitle}
				</TableCell>
			);
		}

		if (key === "client") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{row.client}
				</TableCell>
			);
		}

		if (key === "startDate") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{row.startDate}
				</TableCell>
			);
		}

		if (key === "endDate") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{row.endDate}
				</TableCell>
			);
		}

		if (key === "action") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="h-7 gap-2 px-2.5 text-xs text-primary"
						onClick={() =>
							navigate(`/organization/timesheets/${row.id}`, {
								state: { timesheet: row },
							})
						}
					>
						<Eye className="h-3.5 w-3.5" />
						View
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
						<Clock className="h-5 w-5 text-muted-foreground" />
						<h2 className="text-2xl font-bold tracking-tight">Timesheets</h2>
					</div>
				</div>
			</div>

			<div className="w-full rounded-lg border bg-card px-2 py-2 md:px-3">
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div className="flex flex-wrap items-center gap-2">
						{statusTabs.map((tab) => (
							<Button
								key={tab.key}
								type="button"
								variant={
									selectedStatus === tab.key ? "default" : "outline"
								}
								size="sm"
								className="h-9 border-dashed px-3 text-xs font-medium"
								onClick={() => setSelectedStatus(tab.key)}
							>
								{tab.label}
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
								<Button variant="outline" size="icon" aria-label="Filter">
									<Filter />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{statusTabs.map((tab) => (
									<DropdownMenuCheckboxItem
										key={tab.key}
										className="capitalize"
										checked={selectedStatus === tab.key}
										onCheckedChange={() => setSelectedStatus(tab.key)}
									>
										{tab.label}
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
				</div>

				<div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div className="w-full md:w-[240px]">
						<Select
							value={selectedEmployee}
							onValueChange={setSelectedEmployee}
						>
							<SelectTrigger className="h-9">
								<SelectValue placeholder="All Employees" />
							</SelectTrigger>
							<SelectContent>
								{employeeOptions.map((employee) => (
									<SelectItem key={employee} value={employee}>
										{employee === "all" ? "All Employees" : employee}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-wrap items-center justify-end gap-2">
						<span className="text-sm font-medium text-muted-foreground">
							Start Date:
						</span>
						<Input
							type="date"
							value={startDate}
							onChange={(event) => setStartDate(event.target.value)}
							className="h-9 w-[180px]"
						/>
						<Button className="h-9">Initiate Timesheet</Button>
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
									{paginatedTimesheets.length > 0 ? (
										paginatedTimesheets.map((row) => (
											<TableRow
												key={row.id}
												className="hover:bg-muted/30"
											>
												{visibleColumnOrder.map((key) => (
													<Fragment key={key}>
														{renderCell(row, key)}
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
												No timesheets found.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					) : (
						<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
							{paginatedTimesheets.length > 0 ? (
								paginatedTimesheets.map((row) => (
									<div
										key={row.id}
										className="rounded-lg border bg-card p-4 shadow-sm"
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												{visibleColumns.name && (
													<p className="text-sm font-semibold">
														{row.name}
													</p>
												)}
												{visibleColumns.jobTitle && (
													<p className="mt-1 text-xs text-muted-foreground">
														{row.jobTitle}
													</p>
												)}
											</div>
											{visibleColumns.status
												? getStatusBadge(row.status)
												: null}
										</div>

										{visibleColumns.client && (
											<div className="mt-3">
												<p className="text-xs text-muted-foreground">Client</p>
												<p className="text-sm font-medium">{row.client}</p>
											</div>
										)}

										{visibleColumns.placement && (
											<div className="mt-3">
												<p className="text-xs text-muted-foreground">Placement</p>
												<p className="text-sm font-medium">{row.placement}</p>
											</div>
										)}

										{(visibleColumns.startDate || visibleColumns.endDate) && (
											<div className="mt-3 grid gap-2 sm:grid-cols-2">
												{visibleColumns.startDate && (
													<div>
														<p className="text-xs text-muted-foreground">Start Date</p>
														<p className="text-sm font-medium">{row.startDate}</p>
													</div>
												)}
												{visibleColumns.endDate && (
													<div>
														<p className="text-xs text-muted-foreground">End Date</p>
														<p className="text-sm font-medium">{row.endDate}</p>
													</div>
												)}
											</div>
										)}

										{visibleColumns.action && (
											<div className="mt-4">
												<Button
													type="button"
													variant="outline"
													size="sm"
													className="w-full gap-2 px-3 text-xs"
													onClick={() =>
														navigate(`/organization/timesheets/${row.id}`, {
															state: { timesheet: row },
														})
													}
												>
													<Eye className="h-3.5 w-3.5" />
													View
												</Button>
											</div>
										)}
									</div>
								))
							) : (
								<div className="col-span-full flex items-center justify-center py-12">
									<p className="text-center text-sm text-muted-foreground">
										No timesheets found.
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

export default Timesheets;
