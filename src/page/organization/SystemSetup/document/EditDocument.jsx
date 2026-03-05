import { useState, useRef, useEffect } from "react";
import {
	ArrowLeft,
	Download,
	FileText,
	Plus,
	SquarePen,
	Trash2,
	X,
	PenTool,
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

const DrawingOverlay = ({ isDrawing, drawBox, fieldType }) => {
	if (!isDrawing || !drawBox) return null;

	const width = Math.abs(drawBox.endX - drawBox.startX);
	const height = Math.abs(drawBox.endY - drawBox.startY);
	const left = Math.min(drawBox.startX, drawBox.endX);
	const top = Math.min(drawBox.startY, drawBox.endY);

	return (
		<div
			className="absolute border-2 border-dashed border-green-500 bg-green-100/30"
			style={{
				left: `${left}px`,
				top: `${top}px`,
				width: `${width}px`,
				height: `${height}px`,
				pointerEvents: "none",
			}}
		>
			<div className="text-xs font-semibold text-green-700 p-1">
				{fieldType === "signature" ? "Signature Field" : "Input Field"}
			</div>
		</div>
	);
};

const SignatureCanvas = ({ field, onSave, onClose }) => {
	const canvasRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
		}
	}, [field]);

	const startDrawing = (e) => {
		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(x, y);
		setIsDrawing(true);
	};

	const draw = (e) => {
		if (!isDrawing) return;

		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const ctx = canvas.getContext("2d");
		ctx.lineTo(x, y);
		ctx.stroke();
	};

	const stopDrawing = () => {
		setIsDrawing(false);
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};

	const saveSignature = () => {
		const canvas = canvasRef.current;
		const dataUrl = canvas.toDataURL();
		onSave(dataUrl);
	};

	return (
		<div
			className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
			onClick={onClose}
		>
			<div
				className="bg-white border-4 border-blue-600 rounded-lg shadow-2xl max-w-2xl w-96"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3">
					<span className="font-bold text-sm">{field.name}</span>
					<button 
						onClick={onClose} 
						className="hover:bg-blue-700 rounded p-1 transition"
						type="button"
					>
						<X className="h-4 w-4" />
					</button>
				</div>
				<div className="p-4">
					<p className="text-xs text-gray-600 mb-3">Sign in the box below:</p>
					<canvas
						ref={canvasRef}
						width={320}
						height={200}
						className="w-full border-2 border-gray-300 rounded cursor-crosshair bg-white"
						onMouseDown={startDrawing}
						onMouseMove={draw}
						onMouseUp={stopDrawing}
						onMouseLeave={stopDrawing}
					/>
					<div className="flex gap-2 mt-4">
						<Button
							onClick={clearCanvas}
							variant="outline"
							size="sm"
							className="flex-1"
							type="button"
						>
							Clear
						</Button>
						<Button
							onClick={saveSignature}
							size="sm"
							className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
							type="button"
						>
							Save Signature
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

const EditDocument = () => {
	const [title, setTitle] = useState(DOCUMENT.title);
	const [fileName, setFileName] = useState(DOCUMENT.fileName);
	const [uploadedFile, setUploadedFile] = useState(DOCUMENT.fileName);
	const [pdfPreview, setPdfPreview] = useState(null);
	const [drawMode, setDrawMode] = useState(null); // null, "signature", or "input"
	const [isDrawing, setIsDrawing] = useState(false);
	const [drawBox, setDrawBox] = useState(null);
	const [fields, setFields] = useState(DOCUMENT.fields);
	const [fieldCount, setFieldCount] = useState(2);
	const [editingFieldId, setEditingFieldId] = useState(null);
	const [editingFieldName, setEditingFieldName] = useState("");
	const [signingFieldId, setSigningFieldId] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileName(file.name);
			setUploadedFile(file.name);
			// Create a blob URL for PDF preview
			const blobUrl = URL.createObjectURL(file);
			setPdfPreview(blobUrl);
		}
	};

	const handleDrawModeClick = (type) => {
		setDrawMode(drawMode === type ? null : type);
		setIsDrawing(false);
		setDrawBox(null);
	};

	const handlePdfMouseDown = (e) => {
		if (!drawMode) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const startX = e.clientX - rect.left;
		const startY = e.clientY - rect.top;

		setIsDrawing(true);
		setDrawBox({ startX, startY, endX: startX, endY: startY });
	};

	const handlePdfMouseMove = (e) => {
		if (!isDrawing || !drawBox || !drawMode) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const endX = e.clientX - rect.left;
		const endY = e.clientY - rect.top;

		setDrawBox({ ...drawBox, endX, endY });
	};

	const handlePdfMouseUp = (e) => {
		if (!isDrawing || !drawBox || !drawMode) return;

		const width = Math.abs(drawBox.endX - drawBox.startX);
		const height = Math.abs(drawBox.endY - drawBox.startY);

		// Only create field if minimum size
		if (width > 50 && height > 30) {
			const newField = {
				id: fieldCount,
				name: drawMode === "signature" ? `Sign Here (${fieldCount})` : `Input Field (${fieldCount})`,
				type: drawMode === "signature" ? "Signature" : "Input",
				x: Math.min(drawBox.startX, drawBox.endX),
				y: Math.min(drawBox.startY, drawBox.endY),
				width: width,
				height: height,
			};
			setFields([...fields, newField]);
			setFieldCount(fieldCount + 1);
		}

		setIsDrawing(false);
		setDrawBox(null);
	};

	const handleEditField = (fieldId, currentName) => {
		setEditingFieldId(fieldId);
		setEditingFieldName(currentName);
	};

	const handleSaveFieldName = (fieldId) => {
		if (editingFieldName.trim()) {
			setFields(
				fields.map((f) =>
					f.id === fieldId ? { ...f, name: editingFieldName } : f
				)
			);
		}
		setEditingFieldId(null);
		setEditingFieldName("");
	};

	const handleCancelEdit = () => {
		setEditingFieldId(null);
		setEditingFieldName("");
	};

	const handleFieldClick = (field) => {
		if (!drawMode && field.type === "Signature") {
			setSigningFieldId(field.id);
		}
	};

	const handleSaveSignature = (fieldId, dataUrl) => {
		setFields(
			fields.map((f) =>
				f.id === fieldId ? { ...f, signatureData: dataUrl } : f
			)
		);
		setSigningFieldId(null);
	};

	const handleCloseSignature = () => {
		setSigningFieldId(null);
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
							<div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
								<span>{uploadedFile ? uploadedFile : "No file chosen"}</span>
							</div>
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
										Drawing Mode
									</p>
									<div className="flex flex-col gap-2">
										<Button
											onClick={() => handleDrawModeClick("signature")}
											variant={drawMode === "signature" ? "default" : "outline"}
											size="sm"
											className={`w-full gap-2 px-3 text-xs ${drawMode === "signature" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
										>
											<PenTool className="h-3.5 w-3.5" />
											Draw Signature
										</Button>
										<Button
											onClick={() => handleDrawModeClick("input")}
											variant={drawMode === "input" ? "default" : "outline"}
											size="sm"
											className={`w-full gap-2 px-3 text-xs ${drawMode === "input" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
										>
											<PenTool className="h-3.5 w-3.5" />
											Draw Input Field
										</Button>
										{drawMode && (
											<p className="text-xs text-blue-600 font-medium text-center">
												Click & drag on PDF to draw
											</p>
										)}
									</div>

									<p className="text-xs font-semibold uppercase text-muted-foreground mt-4">
										Fields on Page 1
									</p>
									<div className="overflow-hidden rounded-md border">
										<Table className="text-xs">
											<TableBody>
												{fields.map((field) => (
													<TableRow key={field.id}>
														<TableCell className="px-3 py-2 flex-1">
															{editingFieldId === field.id ? (
																<Input
																	type="text"
																	value={editingFieldName}
																	onChange={(e) => setEditingFieldName(e.target.value)}
																	className="h-7 px-2 text-xs"
																	autoFocus
																	onKeyDown={(e) => {
																		if (e.key === "Enter") handleSaveFieldName(field.id);
																		if (e.key === "Escape") handleCancelEdit();
																	}}
																/>
															) : (
																<span
																	className="font-medium text-muted-foreground cursor-pointer hover:text-blue-600"
																	onClick={() => handleEditField(field.id, field.name)}
																	title="Click to edit"
																>
																	{field.name}
																</span>
															)}
														</TableCell>
														<TableCell className="px-3 py-2 text-right whitespace-nowrap">
															{editingFieldId === field.id ? (
																<div className="flex gap-1 justify-end">
																	<button
																		onClick={() => handleSaveFieldName(field.id)}
																		className="rounded-sm p-1 hover:bg-green-100"
																		title="Save"
																	>
																		<SquarePen className="h-3 w-3 text-green-600" />
																	</button>
																	<button
																		onClick={handleCancelEdit}
																		className="rounded-sm p-1 hover:bg-gray-100"
																		title="Cancel"
																	>
																		<X className="h-3 w-3 text-gray-600" />
																	</button>
																</div>
															) : (
																<div className="flex gap-1 justify-end">
																	<button
																		onClick={() => handleEditField(field.id, field.name)}
																		className="rounded-sm p-1 hover:bg-blue-100"
																		title="Edit"
																	>
																		<SquarePen className="h-3 w-3 text-blue-500" />
																	</button>
																	<button
																		onClick={() => setFields(fields.filter(f => f.id !== field.id))}
																		className="rounded-sm p-1 hover:bg-red-100"
																		title="Delete"
																	>
																		<Trash2 className="h-3 w-3 text-red-500" />
																	</button>
																</div>
															)}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</div>
							</div>

							{/* Right Side - Document Preview */}
						{pdfPreview ? (
							<div
								className={`relative flex items-center justify-center rounded-lg border bg-muted/20 py-12 overflow-auto ${drawMode ? "cursor-crosshair" : ""}`}
								style={{ minHeight: "400px" }}
								onMouseDown={handlePdfMouseDown}
								onMouseMove={handlePdfMouseMove}
								onMouseUp={handlePdfMouseUp}
								onMouseLeave={handlePdfMouseUp}
							>
								<iframe
									src={pdfPreview}
									className="w-full h-96 rounded-lg border pointer-events-none"
									title="PDF Preview"
									style={{ pointerEvents: drawMode ? "none" : "auto" }}
								/>
								<DrawingOverlay
									isDrawing={isDrawing}
									drawBox={drawBox}
									fieldType={drawMode}
								/>
								{fields.map((field) => (
								<div key={field.id}>
									<div
										onClick={() => handleFieldClick(field)}
										className={`absolute border-2 rounded overflow-hidden ${
											field.type === "Signature"
												? "border-blue-400 bg-blue-50/50 cursor-pointer hover:bg-blue-100/70"
												: "border-green-400 bg-green-50/50"
										}`}
										style={{
											left: `${field.x}px`,
											top: `${field.y}px`,
											width: `${field.width}px`,
											height: `${field.height}px`,
											pointerEvents: drawMode ? "none" : "auto",
										}}
										title={field.type === "Signature" ? `Click to sign: ${field.name}` : field.name}
									>
										{field.signatureData && (
											<img
												src={field.signatureData}
												alt="Signature"
												className="w-full h-full object-contain"
											/>
										)}
										{!field.signatureData && field.type === "Signature" && (
											<div className="flex items-center justify-center h-full text-xs text-blue-600 font-medium">
												Click to Sign
											</div>
										)}
										{field.type === "Input" && (
											<input
												type="text"
												placeholder="Type here..."
												className="w-full h-full px-2 text-xs bg-transparent border-none focus:outline-none"
												onClick={(e) => e.stopPropagation()}
											/>
										)}
									</div>
									{signingFieldId === field.id && (
										<SignatureCanvas
											field={field}
											onSave={(dataUrl) => handleSaveSignature(field.id, dataUrl)}
											onClose={handleCloseSignature}
										/>
									)}
								</div>
								))}
							</div>
						) : (
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
						)}
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
