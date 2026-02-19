import { useState } from "react";
import { Download, Send, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const SendInvite = () => {
    const [organizationName, setOrganizationName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const documents = [
        {
            id: 1,
            title: "Organization Rules and Regulations",
            signatureCount: "0 signature",
            inputCount: "0 input",
        },
        {
            id: 2,
            title: "HR - Work Ethics",
            signatureCount: "0 signature",
            inputCount: "0 input",
        },
        {
            id: 3,
            title: "Non Disclosure Agreement",
            signatureCount: "1 signature",
            inputCount: "0 input",
        },
        {
            id: 4,
            title: "Admin Document 1",
            signatureCount: "1 signature",
            inputCount: "0 input",
        },
        {
            id: 5,
            title: "Initial Contract copy 2",
            signatureCount: "5 signatures",
            inputCount: "0 input",
        },
        {
            id: 6,
            title: "Employee Contract for 2026",
            signatureCount: "6 signatures",
            inputCount: "6 inputs",
        },
        {
            id: 7,
            title: "Employee Services Document",
            signatureCount: "0 signature",
            inputCount: "0 input",
        },
        {
            id: 8,
            title: "Ultimate Services",
            signatureCount: "2 signatures",
            inputCount: "8 inputs",
        },
        {
            id: 9,
            title: "Agreement",
            signatureCount: "1 signature",
            inputCount: "1 input",
        },
    ];

    const [selectedIds, setSelectedIds] = useState(() =>
        new Set(documents.map((doc) => doc.id)),
    );

    const allSelected = selectedIds.size === documents.length;
    const someSelected =
        selectedIds.size > 0 && selectedIds.size < documents.length;

    const toggleAll = () => {
        if (allSelected) {
            setSelectedIds(new Set());
            return;
        }

        setSelectedIds(new Set(documents.map((doc) => doc.id)));
    };

    const toggleOne = (id) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
                return next;
            }

            next.add(id);
            return next;
        });
    };

    const handleSend = () => { };

    return (
        <div className="rounded-lg border bg-card px-3 py-4 shadow-sm md:px-4">
            <div className="flex flex-col gap-3 border-b pb-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <SendHorizontal className="h-4 w-4 text-primary" />
                    <span>Send Invite</span>
                </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        Organization Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        value={organizationName}
                        onChange={(event) => setOrganizationName(event.target.value)}
                        placeholder="Enter organization name"
                        className="h-9"
                    />
                </div>

                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter email address"
                        className="h-9"
                    />
                </div>

                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">
                        First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Enter first name"
                        className="h-9"
                    />
                </div>

                <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Last Name</Label>
                    <Input
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Enter last name"
                        className="h-9"
                    />
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                    <Checkbox
                        className="h-3.5 w-3.5"
                        checked={allSelected}
                        onCheckedChange={toggleAll}
                        aria-checked={someSelected ? "mixed" : allSelected}
                    />
                    <span>Select Documents</span>
                </button>

                <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b bg-muted/40">
                                <TableHead className="w-[32px] px-4">
                                    <Checkbox
                                        checked={allSelected}
                                        onCheckedChange={toggleAll}
                                        aria-checked={someSelected ? "mixed" : allSelected}
                                    />
                                </TableHead>
                                <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                    Title
                                </TableHead>
                                <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                    Signature Count
                                </TableHead>
                                <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                    Input Count
                                </TableHead>
                                <TableHead className="px-4 text-xs font-semibold uppercase text-muted-foreground">
                                    Download
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((document) => {
                                const selected = selectedIds.has(document.id);

                                return (
                                    <TableRow
                                        key={document.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <TableCell className="w-[32px] px-4">
                                            <Checkbox
                                                checked={selected}
                                                onCheckedChange={() =>
                                                    toggleOne(document.id)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="px-4 text-sm">
                                            {document.title}
                                        </TableCell>
                                        <TableCell className="px-4 text-sm text-muted-foreground">
                                            {document.signatureCount}
                                        </TableCell>
                                        <TableCell className="px-4 text-sm text-muted-foreground">
                                            {document.inputCount}
                                        </TableCell>
                                        <TableCell className="px-4">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                className="px-3 text-xs"
                                            >
                                                <Download className="h-3.5 w-3.5" />
                                                <span>Download</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Button
                    type="button"
                    size="lg"
                    onClick={handleSend}
                    className="gap-2 px-6"
                >
                    <Send className="h-4 w-4" />
                    <span>Send Invitation</span>
                </Button>
            </div>
        </div>
    );
};

export default SendInvite;

