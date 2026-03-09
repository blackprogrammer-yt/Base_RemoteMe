import { 
    ArrowLeft, 
    Info,
    FileText, 
    Banknote,
    Download,
    Eye,
    EyeOff,
    BadgeInfo,
    User,
    Mail,
    Users,
    Briefcase,
    CheckCircle2,
    ShieldCheck,
    Heart,
    Calendar,
    CreditCard,
    Building2,
    Phone,
    MapPin,
    UserCircle,
    Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getDocumentStatusClassName = (status) => {
    if (status.toLowerCase().includes("unsigned")) {
        return "text-xs font-semibold text-destructive";
    }

    if (status.toLowerCase().includes("no sign")) {
        return "text-xs font-semibold text-emerald-600";
    }

    return "text-xs font-semibold text-muted-foreground";
};

const MyContract = () => {
    const navigate = useNavigate();
    const [showSalary, setShowSalary] = useState(false);

    const basicInfo = [
        { label: "Name", value: "Hamza Shahab" },
        { label: "Email", value: "hamzashahab490@gmail.com" },
        { label: "Manager", value: "Azeem Haider" },
        { label: "Position", value: "Software Engineer" },
    ];

    const contractDetails = [
        { label: "Contract Start", value: "3/1/2026" },
        { label: "Contract End", value: "4/11/2026" },
        { label: "Login Status", value: "Active", isBadge: true, badgeVariant: "success" },
        { label: "Account Status", value: "Approved", isBadge: true, badgeVariant: "success" },
        { 
            label: "Current Salary", 
            value: showSalary ? "$5,000" : "*****", 
            hasAction: true, 
            actionIcon: showSalary ? EyeOff : Eye,
            onAction: () => setShowSalary(!showSalary)
        },
        { label: "Benefits", value: "Life Insurance", isBadge: true, badgeVariant: "info" },
        { label: "Project Name", value: "RemoteMe" },
        { label: "Identification Number", value: "42101-3657571-3" },
    ];

    const bankDetails = [
        { label: "Bank Name", value: "" },
        { label: "IBAN", value: "" },
        { label: "SWIFT Code", value: "" },
        { label: "Bank Phone Number", value: "" },
        { label: "Bank Address", value: "" },
        { label: "Beneficiary Name", value: "" },
        { label: "Beneficiary Address", value: "" },
    ];

    const ultimateLimitedDocuments = [
        { name: "Employee Contract", status: "(Unsigned)" },
        { name: "HR - Work Ethics", status: "(No sign needed)" },
        { name: "Admin Document 1", status: "(Unsigned)" },
        { name: "Admin Document 2", status: "(No sign needed)" },
        { name: "Signature not needed", status: "(No sign needed)" },
        { name: "Initial Contract copy 2", status: "(Unsigned)" },
        { name: "Employee Contract for 2026", status: "(Unsigned)" },
        { name: "Employee Contract Empty Field", status: "(Unsigned)" },
        { name: "Employee Services Document", status: "(No sign needed)" },
        { name: "Ultimate Services", status: "(Unsigned)" },
    ];

    const organizationDocuments = [
        { name: "HR - Work Ethics", status: "(Unsigned)" },
        { name: "Employee Contract Document", status: "(No sign needed)" },
        { name: "Organization Rules & Regulations", status: "(No sign needed)" },
        { name: "Word Document", status: "(Unsigned)" },
        { name: "Empty Field Organization Document", status: "(Unsigned)" },
    ];

    const employeeContractDocuments = [
        { name: "Engineer", status: "(No sign needed)" },
    ];

    const renderBadge = (value, variant) => {
        return (
            <Badge className={`
                ${variant === 'success' ? 'bg-emerald-500/10 text-emerald-700 border-0' : 'bg-cyan-500/10 text-cyan-700 border-0'} 
                px-2 py-1 rounded text-xs font-semibold
            `}>
                {value}
            </Badge>
        );
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-auto items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            My Contract
                        </h2>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Back</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card px-3 py-4 shadow-sm md:px-4">
                {/* Basic Information Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <Info className="h-4 w-4 text-primary" />
                        <span>Basic Information</span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {basicInfo.map((info, index) => (
                            <div key={index} className="space-y-1">
                                <div className="text-xs font-medium text-muted-foreground">
                                    {info.label}
                                </div>
                                <div className="text-sm font-semibold">
                                    {info.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="my-6 border-t" />

                {/* Contract Details Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Contract Details</span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {contractDetails.map((detail, index) => (
                            <div key={index} className="space-y-1">
                                <div className="text-xs font-medium text-muted-foreground">
                                    {detail.label}
                                </div>
                                <div>
                                    {detail.isBadge ? (
                                        renderBadge(detail.value, detail.badgeVariant)
                                    ) : detail.hasAction ? (
                                        <div className="flex items-center gap-2 text-sm font-semibold">
                                            <span>{detail.value}</span>
                                            <detail.actionIcon 
                                                className="h-3.5 w-3.5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
                                                onClick={detail.onAction}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-sm font-semibold">
                                            {detail.value}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="my-6 border-t" />

                {/* Bank Details Section */}
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
                        {bankDetails.map((detail, index) => (
                            <div key={index} className="space-y-1">
                                <div className="text-xs font-medium text-muted-foreground">
                                    {detail.label}
                                </div>
                                <div className="text-sm font-semibold">
                                    {detail.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="my-6 border-t" />

                {/* Documents Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <BadgeInfo className="h-4 w-4 text-primary" />
                        <span>Ultimate Limited Documents</span>
                    </div>

                    <div className="space-y-2">
                        {ultimateLimitedDocuments.map((document, idx) => (
                            <Button
                                key={idx}
                                type="button"
                                variant="outline"
                                className="w-full justify-between gap-3 border-primary/40 bg-primary/5 text-sm text-primary md:w-auto md:min-w-[320px]"
                            >
                                <span className="truncate">
                                    {document.name}
                                </span>
                                <span
                                    className={getDocumentStatusClassName(
                                        document.status,
                                    )}
                                >
                                    {document.status}
                                </span>
                                <Download className="h-3.5 w-3.5" />
                            </Button>
                        ))}
                    </div>
                </section>

                <div className="my-6 border-t" />

                {/* Organization Documents Section */}
                <section className="space-y-3">
                    <div className="text-sm font-semibold">
                        Organization Documents
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {organizationDocuments.map((document, idx) => (
                            <Button
                                key={idx}
                                type="button"
                                variant="outline"
                                className="justify-between gap-2 border-primary/40 bg-primary/5 text-xs text-primary"
                            >
                                <span className="truncate">
                                    {document.name}
                                </span>
                                <span
                                    className={getDocumentStatusClassName(
                                        document.status,
                                    )}
                                >
                                    {document.status}
                                </span>
                                <Download className="h-3 w-3" />
                            </Button>
                        ))}
                    </div>
                </section>

                <div className="my-4 border-t" />

                {/* Employee Contract Documents Section */}
                <section className="space-y-3">
                    <div className="text-sm font-semibold">
                        Employee Contract Documents
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {employeeContractDocuments.map((document, idx) => (
                            <Button
                                key={idx}
                                type="button"
                                variant="outline"
                                className="justify-between gap-2 border-primary/40 bg-primary/5 text-xs text-primary"
                            >
                                <span className="truncate">
                                    {document.name}
                                </span>
                                <span
                                    className={getDocumentStatusClassName(
                                        document.status,
                                    )}
                                >
                                    {document.status}
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

export default MyContract;
