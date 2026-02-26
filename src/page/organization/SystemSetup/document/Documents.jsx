import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Columns3,
	Download,
	FileText,
	GripVertical,
	LayoutGrid,
	Plus,
	Search,
	SlidersHorizontal,
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

const Documents = () => {
	const navigate = useNavigate();

	const documents = [
		{
			id: 1,
			title: "HR - Work Ethics",
			signatureCount: 1,
			inputCount: 0,
			status: "Active",
			isEnabled: true,
		},
		{
			id: 2,
			title: "Employee Contract Document",
			signatureCount: 0,
			inputCount: 0,
			status: "Active",
			isEnabled: true,
		},
		{
			id: 3,
			title: "Organization Rules & Regulations",
			signatureCount: 0,
			inputCount: 0,
			status: "Active",
			isEnabled: true,
		},
		{
			id: 4,
			title: "Word Document",
			signatureCount: 1,
			inputCount: 0,
			status: "Active",
			isEnabled: true,
		},
		{
			id: 5,
			title: "Empty Field Organization Document",
			signatureCount: 2,
			inputCount: 2,
			status: "Active",
			isEnabled: true,
		},
	];

	const [searchQuery, setSearchQuery] = useState("");
	const [activeStatus, setActiveStatus] = useState("all");
	const [density, setDensity] = useState("compact");
	const [viewMode, setViewMode] = useState("table");
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const [visibleColumns, setVisibleColumns] = useState({
		title: true,
		document: true,
		signatureCount: true,
		inputCount: true,
		status: true,
		toggle: true,
		edit: true,
	});

	const [columnOrder, setColumnOrder] = useState([
		"title",
		"document",
		"signatureCount",
		"inputCount",
		"status",
		"toggle",
		"edit",
	]);
	const [draggedColumn, setDraggedColumn] = useState(null);

	const columnDefinitions = [
		{ key: "title", label: "Title" },
		{ key: "document", label: "Document" },
		{ key: "signatureCount", label: "Signature Count" },
		{ key: "inputCount", label: "Input Count" },
		{ key: "status", label: "Status" },
		{ key: "toggle", label: "Toggle Status" },
		{ key: "edit", label: "Edit" },
	];

	const columnLabelMap = columnDefinitions.reduce((acc, column) => {
		acc[column.key] = column.label;
		return acc;
	}, {});

	const statusFilterOptions = [
		{ key: "all", label: "Status" },
		{ key: "active", label: "Active" },
	];

	const filteredDocuments = documents.filter((doc) => {
		const matchesStatus = activeStatus === "all" || doc.status.toLowerCase() === activeStatus;
		const normalizedQuery = searchQuery.trim().toLowerCase();

		if (!normalizedQuery) {
			return matchesStatus;
		}

		return doc.title.toLowerCase().includes(normalizedQuery) && matchesStatus;
	});

	// Pagination logic
	const totalCount = filteredDocuments.length;
	const pageCount = Math.ceil(totalCount / pageSize);

	if (currentPage > pageCount && pageCount > 0) {
		setCurrentPage(pageCount);
	}

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalCount);
	const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

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

	const renderCell = (doc, key) => {
		if (key === "title") {
			return (
				<TableCell className={`px-4 text-sm font-medium ${rowPaddingClass}`}>
					{doc.title}
				</TableCell>
			);
		}

		if (key === "document") {
			return (
				<TableCell className={`px-4 text-sm ${rowPaddingClass}`}>
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

		if (key === "signatureCount") {
			return (
				<TableCell className={`px-4 text-center text-sm ${rowPaddingClass}`}>
					{doc.signatureCount}
				</TableCell>
			);
		}

		if (key === "inputCount") {
			return (
				<TableCell className={`px-4 text-center text-sm ${rowPaddingClass}`}>
					{doc.inputCount}
				</TableCell>
			);
		}

		if (key === "status") {
			return (
				<TableCell className={`px-4 ${rowPaddingClass}`}>
					<Badge className="inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
						{doc.status}
					</Badge>
				</TableCell>
			);
		}

		if (key === "toggle") {
			return (
				<TableCell className={`px-4 ${rowPaddingClass}`}>
					<Switch
						checked={doc.isEnabled}
						disabled
						className="data-[state=checked]:bg-primary"
					/>
				</TableCell>
			);
		}

		if (key === "edit") {
			return (
				<TableCell className={`px-4 ${rowPaddingClass}`}>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="gap-2 px-3 text-xs"
						onClick={() =>
							navigate(PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_DOCUMENT_EDIT)
						}
					>
						Edit
					</Button>
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
						<FileText className="h-5 w-5 text-muted-foreground" />
						<h2 className="text-2xl font-bold tracking-tight">Organization Documents</h2>
					</div>
					<Button
						size="sm"
						className="gap-2 bg-emerald-600 hover:bg-emerald-700"
					>
						<Plus className="h-4 w-4" />
						Add Document
					</Button>
				</div>
			</div>

			<Card className="shadow-sm">
				<CardContent className="space-y-4 p-5">
					<div className="flex items-center justify-end gap-3">
						<div className="relative w-[300px]">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search documents..."
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
										{paginatedDocuments.map((doc) => (
											<TableRow key={doc.id} className="hover:bg-muted/30">
												{visibleColumnOrder.map((key) => (
													<Fragment key={key}>
														{renderCell(doc, key)}
													</Fragment>
												))}
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						) : (
							<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
								{paginatedDocuments.map((doc) => (
									<div key={doc.id} className="rounded-lg border bg-card p-4 shadow-sm">
										<div className="flex items-start justify-between gap-3">
											<div>
												{visibleColumns.title && (
													<p className="text-sm font-semibold">{doc.title}</p>
												)}
												{visibleColumns.status && (
													<div className="mt-2">
														<Badge className="inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
															{doc.status}
														</Badge>
													</div>
												)}
											</div>
										</div>

										{visibleColumns.document && (
											<Button
												type="button"
												variant="outline"
												size="sm"
												className="mt-3 gap-2 px-3 text-xs"
											>
												<Download className="h-3.5 w-3.5" />
												Download
											</Button>
										)}

										<div className="mt-4 space-y-3">
											{visibleColumns.signatureCount && (
												<div>
													<p className="text-xs text-muted-foreground">
														Signature Count
													</p>
													<p className="text-sm font-medium">{doc.signatureCount}</p>
												</div>
											)}

											{visibleColumns.inputCount && (
												<div>
													<p className="text-xs text-muted-foreground">
														Input Count
													</p>
													<p className="text-sm font-medium">{doc.inputCount}</p>
												</div>
											)}
										</div>

										{(visibleColumns.toggle || visibleColumns.edit) && (
											<div className="mt-4 flex gap-2">
												{visibleColumns.toggle && (
													<Switch
														checked={doc.isEnabled}
														disabled
														className="data-[state=checked]:bg-primary"
													/>
												)}
												{visibleColumns.edit && (
													<Button
														type="button"
														variant="outline"
														size="sm"
														className="flex-1 gap-2 px-3 text-xs"
														onClick={() =>
															navigate(PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_DOCUMENT_EDIT)
														}
													>
														Edit
													</Button>
												)}
											</div>
										)}
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

export default Documents;
