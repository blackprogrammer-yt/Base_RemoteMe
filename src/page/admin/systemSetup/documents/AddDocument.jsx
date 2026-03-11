import { useState } from "react";
import {
    ArrowLeft,
    Save,
    FileText,
    ClipboardCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const AddDocument = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [title, setTitle] = useState("");
    const [documentFor, setDocumentFor] = useState("organization");
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setFileName(file ? file.name : "");
    };

    const handleSave = () => {
        if (!title.trim()) {
            toast({
                title: "Validation Error",
                description: "Title is required.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Success",
            description: "New document has been created successfully.",
        });
        navigate(PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_DOCUMENTS);
    };

    const handleBack = () => {
        navigate(PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_DOCUMENTS);
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            {/* Header section with box layout */}
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Add New Document
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={handleSave}
                            className="h-9 gap-2 bg-primary hover:bg-primary/90"
                        >
                            <ClipboardCheck className="h-4 w-4" />
                            <span>Save</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-9 gap-2"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main content box */}
            <div className="rounded-lg border bg-card overflow-hidden dark:border dark:border-border/50">
                <div className="p-6">
                    <Card className="shadow-none border-0">
                        <CardContent className="p-6 space-y-6">
                            {/* Title Field */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-semibold text-foreground">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter document title"
                                    className="h-10"
                                />
                            </div>

                            {/* Document For Field */}
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-foreground">
                                    Document For
                                </Label>
                                <div className="flex items-center gap-6 pt-1">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="documentFor"
                                                value="organization"
                                                checked={documentFor === "organization"}
                                                onChange={() => setDocumentFor("organization")}
                                                className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border checked:border-primary checked:bg-primary transition-all"
                                            />
                                            <div className="absolute h-1.5 w-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                                        </div>
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground">Organization</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="documentFor"
                                                value="employee"
                                                checked={documentFor === "employee"}
                                                onChange={() => setDocumentFor("employee")}
                                                className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border checked:border-primary checked:bg-primary transition-all"
                                            />
                                            <div className="absolute h-1.5 w-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                                        </div>
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground">Employee</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="documentFor"
                                                value="both"
                                                checked={documentFor === "both"}
                                                onChange={() => setDocumentFor("both")}
                                                className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border checked:border-primary checked:bg-primary transition-all"
                                            />
                                            <div className="absolute h-1.5 w-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                                        </div>
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground">Both</span>
                                    </label>
                                </div>
                            </div>

                            {/* File Upload Field */}
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-foreground">
                                    Document File (PDF only for signature placement)
                                </Label>
                                <div className="flex items-center overflow-hidden rounded-md border">
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <span className="inline-flex h-10 items-center bg-muted px-4 text-sm font-medium text-foreground hover:bg-muted/80 border-r">
                                            Choose File
                                        </span>
                                    </label>
                                    <span className="flex-1 px-4 text-sm text-muted-foreground truncate">
                                        {fileName || "No file chosen"}
                                    </span>
                                </div>
                            </div>

                            {/* Footer save button inside card area */}
                            <div className="flex justify-end pt-4 border-t mt-6">
                                <Button
                                    onClick={handleSave}
                                    className="h-10 gap-2 bg-primary hover:bg-primary/90"
                                >
                                    <ClipboardCheck className="h-4 w-4" />
                                    <span>Save</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default AddDocument;
