import { useState } from "react";
import {
	ArrowLeft,
	Download,
	FileText,
	Plus,
	SquarePen,
	Trash2,
	X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const DOCUMENT = {
	title: "HR - Work Ethics",
	fileName: "HR - Work Ethics.pdf",
	uploadDate: "Feb 12, 2026",
	status: "Active",
	currentDocument: "HR - Work Ethics",
	pages: [{ page: 1, fields: 1 }],
	fields: [
		{ id: 1, name: "Sign Here (1)", type: "Signature" },
	],
};

const EditDocument = () => {
	const [title, setTitle] = useState(DOCUMENT.title);
	const [fileName, setFileName] = useState(DOCUMENT.fileName);
	const [uploadedFile, setUploadedFile] = useState(DOCUMENT.fileName);

	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileName(file.name);
			setUploadedFile(file.name);
		}
	};

	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
						<FileText className="h-4 w-4" />
					</div>
					<h2 className="text-lg font-semibold">Edit Organization Document</h2>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					<Button
						variant="default"
						size="sm"
						className="gap-2 bg-emerald-600 hover:bg-emerald-700"
					>
						<SquarePen className="h-4 w-4" />
						Save
					</Button>
					<Button variant="outline" size="sm" className="gap-2">
						<ArrowLeft className="h-4 w-4" />
						Back
					</Button>
				</div>
			</div>

			<Card className="shadow-sm">
				<CardContent className="space-y-6 p-5">
					{/* Title Section */}
					<div className="space-y-2">
						<Label htmlFor="title" className="text-xs font-semibold uppercase text-muted-foreground">
							Title
						</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="h-9"
						/>
					</div>

					{/* Document File Section */}
					<div className="space-y-2">
						<Label className="text-xs font-semibold uppercase text-muted-foreground">
							Document File (PDF only for signature placement)
						</Label>
						<div className="flex gap-2">
							<label className="flex-1">
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="w-full gap-2 px-3 text-xs"
									asChild
								>
									<span className="cursor-pointer">
										<Plus className="h-3.5 w-3.5" />
										Choose File
									</span>
								</Button>
								<input
									type="file"
									accept=".pdf"
									onChange={handleFileChange}
									className="hidden"
								/>
							</label>
							{uploadedFile && (
								<div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
									<span>No file chosen</span>
								</div>
							)}
						</div>
					</div>

					{/* Current Document Section */}
					<div className="space-y-2">
						<Label className="text-xs font-semibold uppercase text-muted-foreground">
							Current Document
						</Label>
						<div className="flex items-center justify-between rounded-md border bg-muted/30 px-4 py-3">
							<span className="text-sm text-muted-foreground">{uploadedFile}</span>
							<Button
								variant="outline"
								size="sm"
								className="gap-2 px-3 text-xs"
							>
								<Download className="h-3.5 w-3.5" />
								Download
							</Button>
						</div>
					</div>

					{/* Place Signatures Section */}
					<div className="space-y-2">
						<Label className="text-xs font-semibold uppercase text-muted-foreground">
							Place Signatures:
						</Label>
						<p className="text-xs text-muted-foreground">
							Select a page and field signature or input field placeholders. Drag them to position where signers should sign or enter information.
						</p>

						<div className="grid gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
							{/* Left Sidebar - Page Navigation */}
							<div className="space-y-2">
								<p className="text-xs font-semibold uppercase text-muted-foreground">
									Page Navigation
								</p>
								<div className="space-y-1">
									<Button
										variant="outline"
										size="sm"
										className="w-full justify-start gap-2 px-3 text-xs"
									>
										<span>Page 1</span>
										<Badge className="ml-auto inline-flex rounded-sm border-0 bg-primary text-[10px] font-semibold text-white">
											1
										</Badge>
									</Button>
								</div>

								<div className="mt-4 space-y-2">
									<p className="text-xs font-semibold uppercase text-muted-foreground">
										Fields on Page 1
									</p>
									<div className="overflow-hidden rounded-md border">
										<Table className="text-xs">
											<TableBody>
												{DOCUMENT.fields.map((field) => (
													<TableRow key={field.id}>
														<TableCell className="px-3 py-2">
															<span className="font-medium text-muted-foreground">
																{field.name}
															</span>
														</TableCell>
														<TableCell className="px-3 py-2 text-right">
															<button className="rounded-sm p-1 hover:bg-muted">
																<SquarePen className="h-3 w-3 text-muted-foreground" />
															</button>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
									<Button
										variant="outline"
										size="sm"
										className="w-full gap-2 px-3 text-xs"
									>
										<Plus className="h-3.5 w-3.5" />
										Add Field
									</Button>
								</div>
							</div>

							{/* Right Side - Document Preview */}
							<div className="flex items-center justify-center rounded-lg border bg-muted/20 py-12">
								<div className="text-center">
									<FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
									<p className="text-sm text-muted-foreground">
										PDF Preview & Field Placement
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										Upload a PDF to add signatures and fields
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-end gap-2 border-t pt-4">
						<Button
							variant="outline"
							size="sm"
							className="gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							Back
						</Button>
						<Button
							variant="default"
							size="sm"
							className="gap-2 bg-emerald-600 hover:bg-emerald-700"
						>
							<SquarePen className="h-4 w-4" />
							Save
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
};

export default EditDocument;
