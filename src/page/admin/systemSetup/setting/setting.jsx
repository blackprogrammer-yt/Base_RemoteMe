import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Setting = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        legalName: "Hunter Downs",
        paymentTerms: "30",
        businessEmail: "payments@remoteme.com",
        contactNumber: "+1 (234) 567-890",
        defaultCurrency: "AED",
        vatNumber: "1234567890",
        bankName: "Hillary Figueroa",
        accountTitle: "RemoteMe",
        iban: "12345678909876",
        swiftCode: "12345",
        bankPhone: "+1 (804) 459-2995",
        bankAddress: "Quidem aliquip facil",
        beneficiaryName: "The Bank",
        beneficiaryAddress: "Consectetur rerum es",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleUpdate = () => {
        toast({
            title: "Success",
            description: "Settings updated successfully.",
        });
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                        <SettingsIcon className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            Settings
                        </h2>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card px-3 py-4 shadow-sm md:px-4">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}
                    className="space-y-6"
                    noValidate
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Legal Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="legalName" className="text-xs font-medium">
                                Legal Name
                            </Label>
                            <Input
                                id="legalName"
                                value={formData.legalName}
                                onChange={handleChange}
                                placeholder="Legal Name"
                                className="h-9"
                            />
                        </div>

                        {/* Payment Terms */}
                        <div className="space-y-1.5">
                            <Label htmlFor="paymentTerms" className="text-xs font-medium">
                                Payment Terms (in days)
                            </Label>
                            <Select 
                                value={formData.paymentTerms} 
                                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Select terms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                    <SelectItem value="45">45</SelectItem>
                                    <SelectItem value="60">60</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Business Email */}
                        <div className="space-y-1.5">
                            <Label htmlFor="businessEmail" className="text-xs font-medium">
                                Business Email
                            </Label>
                            <Input
                                id="businessEmail"
                                value={formData.businessEmail}
                                onChange={handleChange}
                                placeholder="Business Email"
                                className="h-9"
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="space-y-1.5">
                            <Label htmlFor="contactNumber" className="text-xs font-medium">
                                Contact Number
                            </Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                                    <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-3" />
                                    <span className="text-sm text-slate-400">▼</span>
                                </div>
                                <Input
                                    id="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    placeholder="Contact Number"
                                    className="h-9 pl-14"
                                />
                            </div>
                        </div>

                        {/* Default Currency */}
                        <div className="space-y-1.5">
                            <Label htmlFor="defaultCurrency" className="text-xs font-medium">
                                Default Currency
                            </Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none z-10">
                                    <img src="https://flagcdn.com/w20/ae.png" alt="AE" className="w-4 h-3" />
                                </div>
                                <Select 
                                    value={formData.defaultCurrency} 
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, defaultCurrency: value }))}
                                >
                                    <SelectTrigger className="h-9 pl-10">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AED">AED</SelectItem>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="INR">INR</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* VAT Number */}
                        <div className="space-y-1.5">
                            <Label htmlFor="vatNumber" className="text-xs font-medium">
                                VAT Number
                            </Label>
                            <Input
                                id="vatNumber"
                                value={formData.vatNumber}
                                onChange={handleChange}
                                placeholder="VAT Number"
                                className="h-9"
                            />
                        </div>

                        {/* Bank Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="bankName" className="text-xs font-medium">
                                Bank Name
                            </Label>
                            <Input
                                id="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                placeholder="Bank Name"
                                className="h-9"
                            />
                        </div>

                        {/* Account Title */}
                        <div className="space-y-1.5">
                            <Label htmlFor="accountTitle" className="text-xs font-medium">
                                Account Title
                            </Label>
                            <Input
                                id="accountTitle"
                                value={formData.accountTitle}
                                onChange={handleChange}
                                placeholder="Account Title"
                                className="h-9"
                            />
                        </div>

                        {/* IBAN */}
                        <div className="space-y-1.5">
                            <Label htmlFor="iban" className="text-xs font-medium">
                                IBAN
                            </Label>
                            <Input
                                id="iban"
                                value={formData.iban}
                                onChange={handleChange}
                                placeholder="IBAN"
                                className="h-9"
                            />
                        </div>

                        {/* Swift Code */}
                        <div className="space-y-1.5">
                            <Label htmlFor="swiftCode" className="text-xs font-medium">
                                Swift Code
                            </Label>
                            <Input
                                id="swiftCode"
                                value={formData.swiftCode}
                                onChange={handleChange}
                                placeholder="Swift Code"
                                className="h-9"
                            />
                        </div>

                        {/* Bank Phone */}
                        <div className="space-y-1.5">
                            <Label htmlFor="bankPhone" className="text-xs font-medium">
                                Bank Phone
                            </Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                                    <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-3" />
                                    <span className="text-sm text-slate-400">▼</span>
                                </div>
                                <Input
                                    id="bankPhone"
                                    value={formData.bankPhone}
                                    onChange={handleChange}
                                    placeholder="Bank Phone"
                                    className="h-9 pl-14"
                                />
                            </div>
                        </div>

                        {/* Bank Address */}
                        <div className="space-y-1.5">
                            <Label htmlFor="bankAddress" className="text-xs font-medium">
                                Bank Address
                            </Label>
                            <Input
                                id="bankAddress"
                                value={formData.bankAddress}
                                onChange={handleChange}
                                placeholder="Bank Address"
                                className="h-9"
                            />
                        </div>

                        {/* Beneficiary Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="beneficiaryName" className="text-xs font-medium">
                                Beneficiary Name
                            </Label>
                            <Input
                                id="beneficiaryName"
                                value={formData.beneficiaryName}
                                onChange={handleChange}
                                placeholder="Beneficiary Name"
                                className="h-9"
                            />
                        </div>

                        {/* Beneficiary Address */}
                        <div className="space-y-1.5">
                            <Label htmlFor="beneficiaryAddress" className="text-xs font-medium">
                                Beneficiary Address
                            </Label>
                            <Input
                                id="beneficiaryAddress"
                                value={formData.beneficiaryAddress}
                                onChange={handleChange}
                                placeholder="Beneficiary Address"
                                className="h-9"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            size="lg"
                            className="px-6"
                        >
                            Update Settings
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Setting;
