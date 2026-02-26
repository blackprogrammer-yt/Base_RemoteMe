import { useState } from "react";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    User,
    DollarSign,
    FileText,
    ShieldCheck,
    UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Compansation from "./Compansation";
import ContractDocument from "./ContractDocument";
import Review from "./Review";

const HireAndBoard = () => {
    const [activeTab, setActiveTab] = useState("basic-details");

    const steps = [
        { id: "basic-details", label: "Basic Details", icon: User },
        { id: "compensation", label: "Compensation", icon: DollarSign },
        { id: "contract-document", label: "Contract Document", icon: FileText },
        { id: "review", label: "Review", icon: ShieldCheck },
    ];

    const handleNext = () => {
        const currentIndex = steps.findIndex((step) => step.id === activeTab);
        if (currentIndex < steps.length - 1) {
            setActiveTab(steps[currentIndex + 1].id);
        }
    };

    const handleBack = () => {
        const currentIndex = steps.findIndex((step) => step.id === activeTab);
        if (currentIndex > 0) {
            setActiveTab(steps[currentIndex - 1].id);
        }
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            {/* Page Header */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <UserPlus className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight">Invite Employee</h2>
                        <p className="text-xs text-muted-foreground">Onboard a new member to your organization</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1.5 border-primary/20 hover:bg-primary/5">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                </Button>
            </div>

            {/* Stepper and Form Container */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    {/* Custom Stepper Layout */}
                    <TabsList className="h-16 w-full justify-around rounded-none border-b bg-muted/30 p-0">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeTab === step.id;
                            const isPast = steps.findIndex(s => s.id === activeTab) > index;
                            
                            return (
                                <TabsTrigger
                                    key={step.id}
                                    value={step.id}
                                    className="relative flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-none border-b-2 border-transparent transition-all data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary"
                                >
                                    <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${isActive || isPast ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'}`}>
                                        {isPast ? <ShieldCheck className="h-3.5 w-3.5" /> : index + 1}
                                    </div>
                                    <span className="text-[11px] font-medium">{step.label}</span>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>

                    <div className="p-6">
                        <TabsContent value="basic-details" className="mt-0 space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold">Employee Details</h3>
                                <p className="text-xs text-muted-foreground">Setup your Employee basic information</p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        First Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input placeholder="Enter first name" className="h-9 focus-visible:ring-primary" />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Last Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input placeholder="Enter last name" className="h-9 focus-visible:ring-primary" />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Personal Email <span className="text-destructive">*</span>
                                    </Label>
                                    <Input type="email" placeholder="Email" className="h-9 focus-visible:ring-primary" />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Country of Employment <span className="text-destructive">*</span>
                                    </Label>
                                    <Select defaultValue="us">
                                        <SelectTrigger className="h-9 focus:ring-primary">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="us">🇺🇸 United States</SelectItem>
                                            <SelectItem value="ca">🇨🇦 Canada</SelectItem>
                                            <SelectItem value="gb">🇬🇧 United Kingdom</SelectItem>
                                            <SelectItem value="in">🇮🇳 India</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Job Title <span className="text-destructive">*</span>
                                    </Label>
                                    <Input placeholder="e.g: Software Engineer" className="h-9 focus-visible:ring-primary" />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Project Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input placeholder="e.g: Multi vendor eCommerce Portal" className="h-9 focus-visible:ring-primary" />
                                </div>

                                <div className="space-y-1.5 md:col-span-2">
                                    <Label className="text-xs font-medium">
                                        Job Description (Optional)
                                    </Label>
                                    <textarea
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                        placeholder="Describe the role and responsibilities..."
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Contract Start Date <span className="text-destructive">*</span>
                                    </Label>
                                    <Input type="date" className="h-9 focus-visible:ring-primary" />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium">
                                        Contract End Date <span className="text-destructive">*</span>
                                    </Label>
                                    <Input type="date" className="h-9 focus-visible:ring-primary" />
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex items-center justify-center gap-3 pt-6 border-t mt-8">
                                <Button 
                                    variant="outline" 
                                    disabled
                                    className="h-9 px-8 text-xs font-medium"
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                                <Button 
                                    onClick={handleNext}
                                    className="h-9 px-8 text-xs font-medium bg-primary hover:bg-primary/90"
                                >
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="compensation" className="mt-0">
                            <Compansation onNext={handleNext} onBack={handleBack} />
                        </TabsContent>

                        <TabsContent value="contract-document" className="mt-0">
                            <ContractDocument onNext={handleNext} onBack={handleBack} />
                        </TabsContent>

                        <TabsContent value="review" className="mt-0">
                            <Review onBack={handleBack} />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </main>
    );
};

export default HireAndBoard;
