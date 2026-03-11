import { useState } from "react";
import {
    ArrowLeft,
    Download,
    Save,
    Plus,
    Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const EditDocument = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [title, setTitle] = useState("Organization Rules and Regulations");
    const [documentFor, setDocumentFor] = useState("organization");
    const [fileName, setFileName] = useState("");

    const [fields, setFields] = useState([
        { id: 1, type: "signature", x: 100, y: 100, w: 150, h: 40, page: 1 },
        { id: 2, type: "input", x: 100, y: 150, w: 200, h: 35, page: 1 },
    ]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setFileName(file ? file.name : "");
    };

    const handleAddField = (type) => {
        const id = Date.now();
        setFields((prev) => [
            ...prev,
            { id, type, x: 0, y: 0, w: 150, h: 40, page: 1 },
        ]);
    };

    const handleRemoveField = (id) => {
        setFields((prev) => prev.filter((f) => f.id !== id));
    };

    const handleSave = () => {
        toast({ title: "Document saved" });
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Edit Document
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
                            <Save className="h-4 w-4" />
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() =>
                                navigate(PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_DOCUMENTS)
                            }
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card shadow-sm dark:border dark:border-border/50">
                <div className="p-4 grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Document For</Label>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={documentFor === "organization" ? "default" : "outline"}
                                    size="sm"
                                    className="h-8 px-3"
                                    onClick={() => setDocumentFor("organization")}
                                >
                                    Organization
                                </Button>
                                <Button
                                    variant={documentFor === "employee" ? "default" : "outline"}
                                    size="sm"
                                    className="h-8 px-3"
                                    onClick={() => setDocumentFor("employee")}
                                >
                                    Employee
                                </Button>
                                <Button
                                    variant={documentFor === "both" ? "default" : "outline"}
                                    size="sm"
                                    className="h-8 px-3"
                                    onClick={() => setDocumentFor("both")}
                                >
                                    Both
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Document File (PDF only for signature placement)</Label>
                            <div className="flex items-center gap-2">
                                <label className="relative inline-flex">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <span className="inline-flex h-9 cursor-pointer items-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-muted">
                                        Choose File
                                    </span>
                                </label>
                                <span className="text-sm text-muted-foreground">
                                    {fileName || "No file chosen"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Current Document:
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs"
                            >
                                <Download className="mr-1.5 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="text-sm font-semibold">Place Signatures:</div>
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            PDF Preview & Field Placement
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Select a page and add signature or input field placeholders. Drag them to position where signers should sign or enter information.
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                            <div className="lg:col-span-3 space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant="outline"
                                        className="h-9 justify-center gap-2"
                                        onClick={() => handleAddField("signature")}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Signature
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-9 justify-center gap-2"
                                        onClick={() => handleAddField("input")}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Input Field
                                    </Button>
                                </div>

                                <Card className="dark:border dark:border-border/50">
                                    <CardContent className="p-3">
                                        <div className="text-sm font-semibold mb-2">
                                            Page Navigation
                                        </div>
                                        <div className="text-xs text-muted-foreground mb-2">
                                            Total Pages: 1
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="outline" className="h-7 px-3">
                                                Page 1
                                            </Button>
                                            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase text-emerald-700 dark:text-emerald-400">
                                                1
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="dark:border dark:border-border/50">
                                    <CardContent className="p-3">
                                        <div className="text-sm font-semibold mb-2">
                                            Fields on Page 1
                                        </div>
                                        <div className="space-y-2">
                                            {fields.map((f) => (
                                                <div
                                                    key={f.id}
                                                    className="flex items-start justify-between rounded-md border px-3 py-2"
                                                >
                                                    <div className="text-xs">
                                                        <div className="font-semibold">
                                                            {f.type === "signature" ? "Sign Here" : "Input Field"}
                                                        </div>
                                                        <div className="text-muted-foreground">
                                                            X: {f.x}, Y: {f.y}
                                                        </div>
                                                        <div className="text-muted-foreground">
                                                            W: {f.w}, H: {f.h}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="h-7 w-7"
                                                        onClick={() => handleRemoveField(f.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-rose-600" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="lg:col-span-9">
                                <Card className="dark:border dark:border-border/50">
                                    <CardContent className="p-0">
                                        <div className="h-[640px] w-full overflow-auto border-t bg-muted/20">
                                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                                PDF preview placeholder
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditDocument;
