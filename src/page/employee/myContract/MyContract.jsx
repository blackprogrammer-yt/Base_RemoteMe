import { 
    ArrowLeft, 
    User, 
    Users, 
    CheckCircle2, 
    Calendar, 
    CreditCard, 
    Briefcase, 
    FileText, 
    Mail, 
    ShieldCheck, 
    Heart, 
    Download, 
    Building2, 
    Phone, 
    MapPin, 
    UserCircle,
    Eye,
    EyeOff,
    Edit3,
    Contact,
    Wallet
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyContract = () => {
    const navigate = useNavigate();
    const [showSalary, setShowSalary] = useState(false);

    const employeeInfo = [
        { icon: User, label: "Name", value: "Hamza Shahab" },
        { icon: Mail, label: "Email", value: "hamzashahab490@gmail.com" },
        { icon: Users, label: "Manager", value: "Azeem Haider" },
        { icon: Briefcase, label: "Position", value: "Software Engineer" },
        { icon: CheckCircle2, label: "Login Status", value: "Active", isBadge: true, badgeVariant: "success" },
        { icon: ShieldCheck, label: "Account Status", value: "Approved", isBadge: true, badgeVariant: "success" },
        { icon: Calendar, label: "Contract Start", value: "3/1/2026" },
        { icon: Calendar, label: "Contract End", value: "4/11/2026" },
        { 
            icon: Wallet, 
            label: "Current Salary", 
            value: showSalary ? "$5,000" : "*****", 
            hasAction: true, 
            actionIcon: showSalary ? EyeOff : Eye,
            onAction: () => setShowSalary(!showSalary)
        },
        { icon: Heart, label: "Benefits", value: "Life Insurance", isBadge: true, badgeVariant: "info" },
        { icon: Briefcase, label: "Project Name", value: "RemoteMe" },
        { icon: FileText, label: "Identification Number", value: "42101-3657571-3" },
        { icon: FileText, label: "Identification Document", value: "View Document", isLink: true },
    ];

    const documents = [
        {
            title: "Ultimate Limited Documents:",
            items: [
                { name: "Employee Contract", status: "(Unsigned)", statusColor: "text-red-500" },
                { name: "HR - Work Ethics", status: "(No sign needed)", statusColor: "text-cyan-500" },
                { name: "Admin Document 1", status: "(Unsigned)", statusColor: "text-red-500" },
                { name: "Admin Document 2", status: "(No sign needed)", statusColor: "text-cyan-500" },
                { name: "Signature not needed", status: "(No sign needed)", statusColor: "text-cyan-500" },
                { name: "Initial Contract copy 2", status: "(Unsigned)", statusColor: "text-red-500" },
                { name: "Employee Contract for 2026", status: "(Unsigned)", statusColor: "text-red-500" },
                { name: "Employee Contract Empty Field", status: "(Unsigned)", statusColor: "text-red-500" },
                { name: "Employee Services Document", status: "(No sign needed)", statusColor: "text-cyan-500" },
                { name: "Ultimate Services", status: "(Unsigned)", statusColor: "text-red-500" },
            ]
        },
        {
            title: "Organization Documents:",
            items: [
                { name: "HR - Work Ethics", status: "(Unsigned)", statusColor: "text-red-500" },
                { name: "Employee Contract Document", status: "(No sign needed)", statusColor: "text-cyan-500" },
                { name: "Organization Rules & Regulations", status: "(No sign needed)", statusColor: "text-cyan-500" },
                { name: "Word Document", status: "(Unsigned)", statusColor: "text-red-500" },
                { name: "Empty Field Organization Document", status: "(Unsigned)", statusColor: "text-red-500" },
            ]
        },
        {
            title: "Employee Contract Documents:",
            items: [
                { name: "Engineer", status: "(No sign needed)", statusColor: "text-cyan-500" },
            ]
        }
    ];

    const bankDetails = [
        { icon: Building2, label: "Bank Name", value: "" },
        { icon: CreditCard, label: "IBAN", value: "" },
        { icon: CreditCard, label: "SWIFT Code", value: "" },
        { icon: Phone, label: "Bank Phone Number", value: "" },
        { icon: Building2, label: "Bank Address", value: "" },
        { icon: UserCircle, label: "Beneficiary Name", value: "" },
        { icon: MapPin, label: "Beneficiary Address", value: "" },
    ];

    return (
        <main className="flex flex-1 flex-col gap-6 p-6 md:p-8 bg-slate-50/50 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-black p-2 rounded-lg shadow-sm">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-700">
                        My Contract
                    </h2>
                </div>
                <Button 
                    variant="default" 
                    className="bg-black hover:bg-black/80 text-white flex items-center gap-2 px-6 h-10 rounded-lg shadow-md transition-all active:scale-95"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] bg-white rounded-xl overflow-hidden">
                <CardContent className="p-8">
                    {/* Employee Information Section */}
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
                            <Contact className="h-5 w-5 text-black" />
                            <h3 className="text-lg font-bold text-black uppercase tracking-wide">Employee Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {employeeInfo.map((info, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 min-w-[200px]">
                                        <info.icon className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm font-medium text-slate-500">{info.label}</span>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2 justify-start">
                                        {info.isBadge ? (
                                            <Badge className={`
                                                ${info.badgeVariant === 'success' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-cyan-500 hover:bg-cyan-600'} 
                                                text-white border-none px-3 py-0.5 rounded text-xs font-bold
                                            `}>
                                                {info.value}
                                            </Badge>
                                        ) : info.isLink ? (
                                            <button className="text-sm font-bold text-slate-400 hover:text-black underline decoration-slate-300 underline-offset-4 transition-colors">
                                                {info.value}
                                            </button>
                                        ) : (
                                            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                {info.value}
                                                {info.hasAction && (
                                                    <info.actionIcon 
                                                        className="h-3.5 w-3.5 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors" 
                                                        onClick={info.onAction}
                                                    />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Documents Sections */}
                        <div className="space-y-12">
                            {documents.map((section, idx) => (
                                <div key={idx}>
                                    <div className="flex items-center gap-2 mb-6">
                                        <FileText className="h-5 w-5 text-black" />
                                        <h3 className="text-md font-bold text-black tracking-wide">{section.title}</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {section.items.map((doc, i) => (
                                            <div key={i} className="flex items-center justify-between group">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-slate-600">{doc.name}</span>
                                                    <span className={`text-xs font-bold ${doc.statusColor}`}>{doc.status}</span>
                                                </div>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="h-8 border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-2 px-3 rounded-md font-bold text-xs"
                                                >
                                                    <Download className="h-3 w-3" />
                                                    Download
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bank Details Section */}
                        <div>
                            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-black" />
                                    <h3 className="text-lg font-bold text-black tracking-wide">Bank Details:</h3>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-8 border-black text-black hover:bg-slate-50 flex items-center gap-2 px-4 rounded-md font-bold text-xs"
                                >
                                    <Edit3 className="h-3 w-3" />
                                    Edit
                                </Button>
                            </div>
                            <div className="space-y-6">
                                {bankDetails.map((detail, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                                            <detail.icon className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-400">{detail.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

export default MyContract;
