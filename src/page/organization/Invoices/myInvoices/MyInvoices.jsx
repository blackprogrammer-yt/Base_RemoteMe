import { Fragment, useMemo, useState } from "react";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Columns3,
	Eye,
	FileText,
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
import { useNavigate } from "react-router-dom";

const INVOICES = [
	{
		id: 1,
		invoiceNo: "UW-00000025",
		cycle: "Feb 2026",
		amount: "$2210.69",
		status: "Paid",
	},
	{
		id: 2,
		invoiceNo: "UW-00000017",
		cycle: "Dec 2025",
		amount: "$14113.00",
		status: "Paid",
	},
];

const statusTabs = [
	{ key: "all", label: "All" },
	{ key: "invoiced", label: "Invoiced" },
	{ key: "paid", label: "Paid" },
];

const MyInvoices = () => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [density, setDensity] = useState("compact");
	const [viewMode, setViewMode] = useState("table");
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [visibleColumns, setVisibleColumns] = useState({
		invoiceNo: true,
		cycle: true,
		amount: true,
		status: true,
		action: true,
	});
	const [columnOrder, setColumnOrder] = useState([
		"invoiceNo",
		"cycle",
		"amount",
		"status",
		"action",
	]);
	const [draggedColumn, setDraggedColumn] = useState(null);

	const columnDefinitions = [
		{ key: "invoiceNo", label: "Invoice #" },
		{ key: "cycle", label: "Cycle" },
		{ key: "amount", label: "Invoice Amount" },
		{ key: "status", label: "Status" },
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

	const filteredInvoices = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase();
		return INVOICES.filter((invoice) => {
			const matchesStatus =
				selectedStatus === "all" ||
				invoice.status.toLowerCase() === selectedStatus;

			if (!normalizedQuery) {
				return matchesStatus;
			}

			const matchesSearch = [
				invoice.invoiceNo,
				invoice.cycle,
				invoice.amount,
				invoice.status,
			]
				.join(" ")
				.toLowerCase()
				.includes(normalizedQuery);

			return matchesStatus && matchesSearch;
		});
	}, [searchQuery, selectedStatus]);

	const totalCount = filteredInvoices.length;
	const pageCount = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);
	const safeCurrentPage =
		totalCount === 0 ? 1 : Math.min(currentPage, pageCount);
	const startIndex =
		totalCount === 0 ? 0 : (safeCurrentPage - 1) * pageSize;
	const endIndex =
		totalCount === 0 ? 0 : Math.min(startIndex + pageSize, totalCount);
	const paginatedInvoices =
		totalCount === 0
			? []
			: filteredInvoices.slice(startIndex, endIndex);

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

		if (status.toLowerCase() === "paid") {
			return (
				<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
					<span>{status}</span>
				</Badge>
			);
		}

		return (
			<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-sky-500/10 px-2 py-1 text-xs font-semibold uppercase text-sky-700">
				<span>{status}</span>
			</Badge>
		);
	};

	const renderCell = (invoice, key) => {
		if (key === "invoiceNo") {
			return (
				<TableCell className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
					{invoice.invoiceNo}
				</TableCell>
			);
		}

		if (key === "cycle") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{invoice.cycle}
				</TableCell>
			);
		}

		if (key === "amount") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
					{invoice.amount}
				</TableCell>
			);
		}

		if (key === "status") {
			return (
				<TableCell className={`px-4 ${rowPaddingClass}`}>
					{getStatusBadge(invoice.status)}
				</TableCell>
			);
		}

		if (key === "action") {
			return (
				<TableCell className={`px-4 ${rowPaddingClass}`}>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="gap-2 px-3 text-xs"
						onClick={() =>
							navigate(`/organization/invoices/my-invoices/${invoice.id}`)
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
						<FileText className="h-5 w-5 text-muted-foreground" />
						<h2 className="text-2xl font-bold tracking-tight">My Invoices</h2>
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
								placeholder="Search invoices..."
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
									{paginatedInvoices.length > 0 ? (
										paginatedInvoices.map((invoice) => (
											<TableRow
												key={invoice.id}
												className="hover:bg-muted/30"
											>
												{visibleColumnOrder.map((key) => (
													<Fragment key={key}>
														{renderCell(invoice, key)}
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
												No invoices found.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					) : (
						<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
							{paginatedInvoices.length > 0 ? (
								paginatedInvoices.map((invoice) => (
									<div
										key={invoice.id}
										className="rounded-lg border bg-card p-4 shadow-sm"
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												{visibleColumns.invoiceNo && (
													<p className="text-sm font-semibold">
														{invoice.invoiceNo}
													</p>
												)}
												{visibleColumns.cycle && (
													<p className="mt-1 text-xs text-muted-foreground">
														{invoice.cycle}
													</p>
												)}
											</div>
											{visibleColumns.status
												? getStatusBadge(invoice.status)
												: null}
										</div>

										{visibleColumns.amount && (
											<div className="mt-3">
												<p className="text-xs text-muted-foreground">Invoice Amount</p>
												<p className="text-sm font-medium">{invoice.amount}</p>
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
														navigate(`/organization/invoices/my-invoices/${invoice.id}`)
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
										No invoices found.
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
		</main>
	);
};

export default MyInvoices;
