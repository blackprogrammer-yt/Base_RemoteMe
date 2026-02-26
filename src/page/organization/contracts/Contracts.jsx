import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Download,
	GripVertical,
	LayoutGrid,
	Search,
	SlidersHorizontal,
	Users,
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
import { Card, CardContent } from "@/components/ui/card";

const CONTRACTS = [
	{
		id: 1,
		name: "Carly Ray",
		email: "fopiwerasi@mailinator.com",
		jobTitle: "Rem occaecat quibusd",
		startDate: "15-Dec-2010",
		endDate: "30-Dec-2030",
		invitationStatus: "Accepted",
		accountStatus: "Pending",
	},
	{
		id: 2,
		name: "Empty Field",
		email: "khan.shahab02729+empty@gmail.com",
		jobTitle: "Blockchain Developer",
		startDate: "1-Jan-2023",
		endDate: "26-Feb-2028",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
	{
		id: 3,
		name: "Kannada Kely",
		email: "khan.shahab02729+kannada@gmail.com",
		jobTitle: "Blockchain Developer",
		startDate: "1-Jan-2021",
		endDate: "1-Jan-2027",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
	{
		id: 4,
		name: "Khatril Millan",
		email: "khan.shahab02729+khatri@gmail.com",
		jobTitle: "Blockchain Developer",
		startDate: "1-Jan-2021",
		endDate: "4-Apr-2026",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
	{
		id: 5,
		name: "Kevan Roger",
		email: "khan.shahab02729+kevan@gmail.com",
		jobTitle: "AI Engineer",
		startDate: "1-Jan-2023",
		endDate: "1-Jan-2026",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
	{
		id: 6,
		name: "Andy Robert",
		email: "khan.shahab02729+robert@gmail.com",
		jobTitle: "Designer",
		startDate: "1-Jan-2023",
		endDate: "1-Jan-2026",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
	{
		id: 7,
		name: "Kely Arman",
		email: "khan.shahab02729+arman@gmail.com",
		jobTitle: "QA Engineer",
		startDate: "1-Jan-2023",
		endDate: "1-Jan-2026",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
	{
		id: 8,
		name: "Hulk Huge",
		email: "khan.shahab02729+hulk@gmail.com",
		jobTitle: "AI Engineer",
		startDate: "1-Jan-2023",
		endDate: "13-Mar-2027",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
	{
		id: 9,
		name: "Direct Emp",
		email: "khan.shahab02729+emp@gmail.com",
		jobTitle: "AI Engineer",
		startDate: "1-Jan-2023",
		endDate: "1-Jan-2026",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
	{
		id: 10,
		name: "Reena Angular",
		email: "khan.shahab02729+reena@gmail.com",
		jobTitle: "Blockchain Developer",
		startDate: "1-Jan-2023",
		endDate: "1-Jan-2026",
		invitationStatus: "Accepted",
		accountStatus: "Approved",
	},
];

const Contracts = () => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [density, setDensity] = useState("compact");
	const [viewMode, setViewMode] = useState("table");
	const [columnOrder, setColumnOrder] = useState([
		"name",
		"email",
		"jobTitle",
		"startDate",
		"endDate",
		"invitationStatus",
		"accountStatus",
	]);
	const [draggedColumn, setDraggedColumn] = useState(null);

	const densityClasses = {
		compact: "py-2",
		standard: "py-3",
		comfortable: "py-4",
	};

	const rowPaddingClass = densityClasses[density] || densityClasses.compact;

	const filteredContracts = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			return CONTRACTS;
		}

		return CONTRACTS.filter((contract) =>
			[
				contract.name,
				contract.email,
				contract.jobTitle,
				contract.startDate,
				contract.endDate,
			].some((value) => value.toLowerCase().includes(query))
		);
	}, [searchQuery]);

	const totalCount = filteredContracts.length;
	const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
	const safeCurrentPage =
		totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
	const startIndex = totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
	const endIndex =
		totalCount === 0
			? 0
			: Math.min(startIndex + pageSize, totalCount);
	const paginatedContracts =
		totalCount === 0
			? []
			: filteredContracts.slice(startIndex, endIndex);

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

	const getStatusBadge = (status, tone) => {
		if (!status) {
			return null;
		}

		if (tone === "pending") {
			return (
				<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
					<span>{status}</span>
				</Badge>
			);
		}

		return (
			<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
				<span>{status}</span>
			</Badge>
		);
	};

	const columns = [
		{
			id: "name",
			label: "Name",
			align: "left",
			render: (contract) => (
				<span className="font-medium">{contract.name}</span>
			),
		},
		{
			id: "email",
			label: "Email",
			align: "left",
			render: (contract) => contract.email,
		},
		{
			id: "jobTitle",
			label: "Job Title",
			align: "left",
			render: (contract) => contract.jobTitle,
		},
		{
			id: "startDate",
			label: "Start Date",
			align: "left",
			render: (contract) => contract.startDate,
		},
		{
			id: "endDate",
			label: "End Date",
			align: "left",
			render: (contract) => contract.endDate,
		},
		{
			id: "invitationStatus",
			label: "Invitation Status",
			align: "center",
			render: (contract) =>
				getStatusBadge(contract.invitationStatus, "accepted"),
		},
		{
			id: "accountStatus",
			label: "Account Status",
			align: "center",
			render: (contract) =>
				getStatusBadge(
					contract.accountStatus,
					contract.accountStatus === "Pending" ? "pending" : "approved",
				),
		},
	];

	const columnsById = columns.reduce((accumulator, column) => {
		accumulator[column.id] = column;
		return accumulator;
	}, {});

	const orderedColumns = columnOrder
		.map((columnId) => columnsById[columnId])
		.filter(Boolean);

	const moveColumn = (sourceId, targetId) => {
		if (!sourceId || sourceId === targetId) {
			return;
		}

		setColumnOrder((prev) => {
			const next = [...prev];
			const fromIndex = next.indexOf(sourceId);
			const toIndex = next.indexOf(targetId);
			if (fromIndex === -1 || toIndex === -1) {
				return prev;
			}
			next.splice(fromIndex, 1);
			next.splice(toIndex, 0, sourceId);
			return next;
		});
	};

	const handleColumnDragStart = (event, columnId) => {
		event.dataTransfer.setData("text/plain", columnId);
		event.dataTransfer.effectAllowed = "move";
		setDraggedColumn(columnId);
	};

	const handleColumnDragOver = (event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	};

	const handleColumnDrop = (event, columnId) => {
		event.preventDefault();
		const sourceId = event.dataTransfer.getData("text/plain") || draggedColumn;
		moveColumn(sourceId, columnId);
		setDraggedColumn(null);
	};

	const handleColumnDragEnd = () => {
		setDraggedColumn(null);
	};

	const handleRowClick = (contract) => {
		navigate(`/organization/contracts/${contract.id}`, {
			state: { contract },
		});
	};

	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex flex-auto flex-col py-2">
				<div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center">
					<div className="flex flex-auto items-center gap-2">
						<Users className="h-5 w-5 text-muted-foreground" />
						<h2 className="text-2xl font-bold tracking-tight">Contracts</h2>
					</div>
				</div>
			</div>

			<Card className="shadow-sm">
				<CardContent className="space-y-4 p-5">
					<div className="flex w-full flex-wrap items-center justify-start gap-2 md:justify-between">
						<div className="relative w-full md:w-[260px]">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search"
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								className="h-9 w-full pl-9 pr-8"
							/>
						</div>

						<div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
							<Button className="w-full gap-2 md:w-auto">
								<Download className="h-4 w-4" />
								Export to Excel
							</Button>

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
						</div>
					</div>

					<div className="mt-4">
						{viewMode === "table" ? (
							<div className="overflow-hidden rounded-lg border bg-card shadow-sm">
								<Table>
									<TableHeader>
										<TableRow className="border-b bg-muted/40">
											{orderedColumns.map((column) => (
												<TableHead
													key={column.id}
													draggable
													onDragStart={(event) =>
														handleColumnDragStart(event, column.id)
													}
													onDragOver={handleColumnDragOver}
													onDrop={(event) =>
														handleColumnDrop(event, column.id)
													}
													onDragEnd={handleColumnDragEnd}
													className={`px-4 text-xs font-semibold uppercase text-muted-foreground ${
														column.align === "center" ? "text-center" : "text-left"
													}`}
													title="Drag to reorder"
												>
													<div
														className={`flex items-center gap-2 ${
															column.align === "center"
																? "justify-center"
																: "justify-start"
														}`}
													>
														<GripVertical className="h-3 w-3 text-muted-foreground/70" />
														<span>{column.label}</span>
													</div>
												</TableHead>
											))}
										</TableRow>
									</TableHeader>
									<TableBody>
										{paginatedContracts.length > 0 ? (
											paginatedContracts.map((contract) => (
												<TableRow
													key={contract.id}
													className="cursor-pointer hover:bg-muted/30"
													onClick={() => handleRowClick(contract)}
												>
													{orderedColumns.map((column) => (
														<TableCell
															key={`${contract.id}-${column.id}`}
															className={`px-4 text-sm ${rowPaddingClass} ${
																column.align === "center"
																	? "text-center"
																	: "text-left"
															}`}
														>
															{column.render(contract)}
														</TableCell>
													))}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan={orderedColumns.length}
													className="px-4 py-6 text-center text-sm text-muted-foreground"
												>
													No contracts found.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
						) : (
							<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
								{paginatedContracts.length > 0 ? (
									paginatedContracts.map((contract) => (
										<div
											key={contract.id}
											role="button"
											tabIndex={0}
											className="cursor-pointer rounded-lg border bg-card p-4 shadow-sm transition hover:border-primary/30 hover:shadow-md"
											onClick={() => handleRowClick(contract)}
											onKeyDown={(event) => {
												if (event.key === "Enter" || event.key === " ") {
													event.preventDefault();
													handleRowClick(contract);
												}
											}}
										>
											<div className="flex items-start justify-between gap-3">
												<div>
													<p className="text-sm font-semibold">{contract.name}</p>
													<p className="mt-1 text-xs text-muted-foreground">
														{contract.email}
													</p>
												</div>
												<div className="flex flex-col items-end gap-2">
													{getStatusBadge(contract.invitationStatus, "accepted")}
													{getStatusBadge(
														contract.accountStatus,
														contract.accountStatus === "Pending"
															? "pending"
															: "approved",
													)}
												</div>
											</div>

										<div className="mt-4 grid gap-3 text-sm">
											<div>
												<p className="text-xs text-muted-foreground">Job Title</p>
												<p className="font-medium">{contract.jobTitle}</p>
											</div>
											<div className="grid gap-3 sm:grid-cols-2">
												<div>
													<p className="text-xs text-muted-foreground">Start Date</p>
													<p className="font-medium">{contract.startDate}</p>
												</div>
												<div>
													<p className="text-xs text-muted-foreground">End Date</p>
													<p className="font-medium">{contract.endDate}</p>
												</div>
											</div>
										</div>
									</div>
									))
								) : (
									<div className="col-span-full flex items-center justify-center py-12">
										<p className="text-center text-sm text-muted-foreground">
											No contracts found.
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
										onClick={() =>
											handlePageChange(safeCurrentPage - 1)
										}
										disabled={safeCurrentPage === 1 || totalCount === 0}
									>
										<span className="sr-only">Go to previous page</span>
										<ChevronLeft className="h-4 w-4" />
										Previous
									</Button>

									<Button
										variant="outline"
										onClick={() =>
											handlePageChange(safeCurrentPage + 1)
										}
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
				</CardContent>
			</Card>
		</main>
	);
};

export default Contracts;
