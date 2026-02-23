import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
    ArrowLeft,
    BadgeInfo,
    Banknote,
    Download,
    Eye,
    FileText,
    Info,
    Upload,
    Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ultimateLimitedDocuments = [
    {
        id: 1,
        title: "Employee Contract",
        status: "Unsigned",
        statusTone: "destructive",
    },
    {
        id: 2,
        title: "HR - Work Ethics",
        status: "No sign needed",
        statusTone: "muted",
    },
    {
        id: 3,
        title: "Admin Document 1",
        status: "Unsigned",
        statusTone: "destructive",
    },
    {
        id: 4,
        title: "Admin Document 2",
        status: "No sign needed",
        statusTone: "muted",
    },
    {
        id: 5,
        title: "Signature not needed",
        status: "No sign needed",
        statusTone: "muted",
    },
    {
        id: 6,
        title: "Initial Contract copy 2",
        status: "Unsigned",
        statusTone: "destructive",
    },
    {
        id: 7,
        title: "Employee Contract for 2026",
        status: "Unsigned",
        statusTone: "destructive",
    },
    {
        id: 8,
        title: "Employee Contract Empty Field",
        status: "Unsigned",
        statusTone: "destructive",
    },
    {
        id: 9,
        title: "Employee Services Document",
        status: "No sign needed",
        statusTone: "muted",
    },
    {
        id: 10,
        title: "Ultimate Services",
        status: "Unsigned",
        statusTone: "destructive",
    },
];

const logoDesignDocuments = [
    {
        id: 11,
        title: "HR Org Document1",
        status: "Unsigned",
        statusTone: "destructive",
    },
    {
        id: 12,
        title: "Organization Rules",
        status: "Unsigned",
        statusTone: "destructive",
    },
];

const employeeContractDocuments = [
    {
        id: 13,
        title: "Contract",
        status: "No sign needed",
        statusTone: "muted",
    },
];

const getStatusBadge = (status, type) => {
    if (!status) {
        return null;
    }

    if (status.toLowerCase() === "accepted") {
        return (
            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                <span>{status}</span>
            </Badge>
        );
    }

    if (status.toLowerCase() === "active") {
        return (
            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                <span>{status}</span>
            </Badge>
        );
    }

    if (status.toLowerCase() === "approved") {
        return (
            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
                <span>{status}</span>
            </Badge>
        );
    }

    if (status.toLowerCase() === "terminated" && type === "admin") {
        return (
            <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-red-500/10 px-2 py-1 text-xs font-semibold uppercase text-red-700">
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

const getDocumentStatusClassName = (tone) => {
    if (tone === "destructive") {
        return "text-xs font-semibold text-destructive";
    }

    if (tone === "muted") {
        return "text-xs font-semibold text-emerald-600";
    }

    return "text-xs font-semibold text-muted-foreground";
};

const UserDetail = () => {
    const navigate = useNavigate();
    const { contractId } = useParams();
    const location = useLocation();
    const contract = location.state?.contract;

    const handleBack = () => {
        navigate("/admin/contract");
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-auto items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            User Details
                        </h2>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Back</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card px-3 py-4 shadow-sm md:px-4">
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <Info className="h-4 w-4 text-primary" />
                        <span>Basic Information</span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Organization
                            </div>
                            <div className="text-sm font-semibold">
                                Logo&Design
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Name
                            </div>
                            <div className="text-sm font-semibold">
                                Terminate Contract
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Email
                            </div>
                            <div className="text-sm font-semibold">
                                khan.shahab02729+terminate@gmail.com
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Contact
                            </div>
                            <div className="text-sm font-semibold">
                                03310272729
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                User Type
                            </div>
                            <div>
                                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-sky-500/10 px-2 py-1 text-xs font-semibold uppercase text-sky-700">
                                    <span>Employee</span>
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Job Title
                            </div>
                            <div className="text-sm font-semibold">
                                Lead Tester
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2 lg:col-span-4">
                            <div className="text-xs font-medium text-muted-foreground">
                                Job Description
                            </div>
                            <div className="text-sm">
                                Tester
                            </div>
                        </div>
                    </div>
                </section>

                <div className="my-6 border-t" />

                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Contract Details</span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Start Date
                            </div>
                            <div className="text-sm font-semibold">
                                1/1/2021
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                End Date
                            </div>
                            <div className="text-sm font-semibold">
                                1/1/2030
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Duration
                            </div>
                            <div className="text-sm font-semibold">
                                Fixed-Term
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Employment Type
                            </div>
                            <div className="text-sm font-semibold">
                                Full-Time
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Salary
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <span>*****</span>
                                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Annual Bonus
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <span>*****</span>
                                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Annual Vacation
                            </div>
                            <div className="text-sm font-semibold">
                                20
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Notice Period
                            </div>
                            <div className="text-sm font-semibold">
                                30 days
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Reporting Manager
                            </div>
                            <div className="text-sm font-semibold">
                                Bruce
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Project Name
                            </div>
                            <div className="text-sm font-semibold">
                                Tingo Project
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Identification Number
                            </div>
                            <div className="text-sm font-semibold">
                                12312312344
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Identification Document
                            </div>
                            <button
                                type="button"
                                className="text-sm font-semibold text-primary hover:underline"
                            >
                                View Document
                            </button>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Holidays
                            </div>
                            <div className="text-sm font-semibold">
                                Company Standard
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Job Title
                            </div>
                            <div className="text-sm font-semibold">
                                Lead Tester
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Benefits
                            </div>
                            <div>
                                <Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-sky-500/10 px-2 py-1 text-xs font-semibold text-sky-700">
                                    <span>Life Insurance</span>
                                </Badge>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="my-6 border-t" />

                <section className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <Banknote className="h-4 w-4 text-primary" />
                            <span>Bank Details</span>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            <span>Edit</span>
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Bank Name
                            </div>
                            <div className="text-sm font-semibold">
                                HBL
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Bank Phone
                            </div>
                            <div className="text-sm font-semibold">
                                12312312344
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                IBAN
                            </div>
                            <div className="text-sm font-semibold">
                                PK123
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                SWIFT Code
                            </div>
                            <div className="text-sm font-semibold">
                                123
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2 lg:col-span-2">
                            <div className="text-xs font-medium text-muted-foreground">
                                Bank Address
                            </div>
                            <div className="text-sm font-semibold">
                                123 Cheel Chowk Liyari
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Beneficiary Name
                            </div>
                            <div className="text-sm font-semibold">
                                Gumman Shah
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2 lg:col-span-2">
                            <div className="text-xs font-medium text-muted-foreground">
                                Beneficiary Address
                            </div>
                            <div className="text-sm font-semibold">
                                House# 129 Cheel Chowk Liyari
                            </div>
                        </div>
                    </div>
                </section>

                <div className="my-6 border-t" />

                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <BadgeInfo className="h-4 w-4 text-primary" />
                        <span>Status</span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Invitation Status
                            </div>
                            <div>{getStatusBadge("Accepted", "invitation")}</div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Login Status
                            </div>
                            <div>{getStatusBadge("Active", "login")}</div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Organization Approval Status
                            </div>
                            <div>{getStatusBadge("Approved", "org")}</div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                                Admin Approval Status
                            </div>
                            <div>{getStatusBadge("Approved", "admin")}</div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div className="text-sm font-semibold">
                            Ultimate Limited Documents
                        </div>

                        <div className="space-y-2">
                            {ultimateLimitedDocuments.map((document) => (
                                <div
                                    key={document.id}
                                    className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                                >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 justify-between gap-3 border-primary/40 bg-primary/5 text-sm text-primary md:flex-none md:min-w-[320px]"
                                    >
                                        <span className="truncate">
                                            {document.title}
                                        </span>
                                        <span
                                            className={getDocumentStatusClassName(
                                                document.statusTone,
                                            )}
                                        >
                                            ({document.status})
                                        </span>
                                        <Download className="h-3.5 w-3.5" />
                                    </Button>

                                    <div className="flex w-full items-center gap-2 md:w-auto">
                                        <input
                                            type="file"
                                            className="block w-full text-xs text-muted-foreground"
                                        />
                                        <BadgeInfo className="h-3.5 w-3.5 text-muted-foreground" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2">
                            <Button
                                type="button"
                                size="lg"
                                className="w-full gap-2 md:w-auto"
                            >
                                <Upload className="h-4 w-4" />
                                <span>Upload</span>
                            </Button>
                        </div>
                    </div>
                </section>

                <div className="my-6 border-t" />

                <section className="space-y-3">
                    <div className="text-sm font-semibold">
                        Logo&Design Documents
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {logoDesignDocuments.map((document) => (
                            <Button
                                key={document.id}
                                type="button"
                                variant="outline"
                                className="justify-between gap-2 border-primary/40 bg-primary/5 text-xs text-primary"
                            >
                                <span className="truncate">
                                    {document.title}
                                </span>
                                <span
                                    className={getDocumentStatusClassName(
                                        document.statusTone,
                                    )}
                                >
                                    ({document.status})
                                </span>
                                <Download className="h-3 w-3" />
                            </Button>
                        ))}
                    </div>
                </section>

                <div className="my-4 border-t" />

                <section className="space-y-3">
                    <div className="text-sm font-semibold">
                        Employee Contract Document
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {employeeContractDocuments.map((document) => (
                            <Button
                                key={document.id}
                                type="button"
                                variant="outline"
                                className="justify-between gap-2 border-primary/40 bg-primary/5 text-xs text-primary"
                            >
                                <span className="truncate">
                                    {document.title}
                                </span>
                                <span
                                    className={getDocumentStatusClassName(
                                        document.statusTone,
                                    )}
                                >
                                    ({document.status})
                                </span>
                                <Download className="h-3 w-3" />
                            </Button>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default UserDetail;
