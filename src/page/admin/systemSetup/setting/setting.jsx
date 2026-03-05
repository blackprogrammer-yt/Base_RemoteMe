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
        <main className="flex flex-1 flex-col gap-6 py-4 md:pt-3">
            <div className="flex items-center gap-2">
                <SettingsIcon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Settings
                </h2>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {/* Legal Name */}
                        <div className="space-y-2">
                            <Label htmlFor="legalName" className="text-sm font-medium text-slate-600">
                                Legal Name
                            </Label>
                            <Input
                                id="legalName"
                                value={formData.legalName}
                                onChange={handleChange}
                                placeholder="Legal Name"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* Payment Terms */}
                        <div className="space-y-2">
                            <Label htmlFor="paymentTerms" className="text-sm font-medium text-slate-600">
                                Payment Terms (in days)
                            </Label>
                            <Select 
                                value={formData.paymentTerms} 
                                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}
                            >
                                <SelectTrigger className="h-11 border-slate-200 bg-slate-50/30">
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
                        <div className="space-y-2">
                            <Label htmlFor="businessEmail" className="text-sm font-medium text-slate-600">
                                Business Email
                            </Label>
                            <Input
                                id="businessEmail"
                                value={formData.businessEmail}
                                onChange={handleChange}
                                placeholder="Business Email"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber" className="text-sm font-medium text-slate-600">
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
                                    className="h-11 pl-14 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                                />
                            </div>
                        </div>

                        {/* Default Currency */}
                        <div className="space-y-2">
                            <Label htmlFor="defaultCurrency" className="text-sm font-medium text-slate-600">
                                Default Currency
                            </Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                                    <img src="https://flagcdn.com/w20/ae.png" alt="AE" className="w-4 h-3" />
                                </div>
                                <Select 
                                    value={formData.defaultCurrency} 
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, defaultCurrency: value }))}
                                >
                                    <SelectTrigger className="h-11 pl-10 border-slate-200 bg-slate-50/30">
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
                        <div className="space-y-2">
                            <Label htmlFor="vatNumber" className="text-sm font-medium text-slate-600">
                                VAT Number
                            </Label>
                            <Input
                                id="vatNumber"
                                value={formData.vatNumber}
                                onChange={handleChange}
                                placeholder="VAT Number"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* Bank Name */}
                        <div className="space-y-2">
                            <Label htmlFor="bankName" className="text-sm font-medium text-slate-600">
                                Bank Name
                            </Label>
                            <Input
                                id="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                placeholder="Bank Name"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* Account Title */}
                        <div className="space-y-2">
                            <Label htmlFor="accountTitle" className="text-sm font-medium text-slate-600">
                                Account Title
                            </Label>
                            <Input
                                id="accountTitle"
                                value={formData.accountTitle}
                                onChange={handleChange}
                                placeholder="Account Title"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* IBAN */}
                        <div className="space-y-2">
                            <Label htmlFor="iban" className="text-sm font-medium text-slate-600">
                                IBAN
                            </Label>
                            <Input
                                id="iban"
                                value={formData.iban}
                                onChange={handleChange}
                                placeholder="IBAN"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* Swift Code */}
                        <div className="space-y-2">
                            <Label htmlFor="swiftCode" className="text-sm font-medium text-slate-600">
                                Swift Code
                            </Label>
                            <Input
                                id="swiftCode"
                                value={formData.swiftCode}
                                onChange={handleChange}
                                placeholder="Swift Code"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* Bank Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="bankPhone" className="text-sm font-medium text-slate-600">
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
                                    className="h-11 pl-14 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                                />
                            </div>
                        </div>

                        {/* Bank Address */}
                        <div className="space-y-2">
                            <Label htmlFor="bankAddress" className="text-sm font-medium text-slate-600">
                                Bank Address
                            </Label>
                            <Input
                                id="bankAddress"
                                value={formData.bankAddress}
                                onChange={handleChange}
                                placeholder="Bank Address"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* Beneficiary Name */}
                        <div className="space-y-2">
                            <Label htmlFor="beneficiaryName" className="text-sm font-medium text-slate-600">
                                Beneficiary Name
                            </Label>
                            <Input
                                id="beneficiaryName"
                                value={formData.beneficiaryName}
                                onChange={handleChange}
                                placeholder="Beneficiary Name"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>

                        {/* Beneficiary Address */}
                        <div className="space-y-2">
                            <Label htmlFor="beneficiaryAddress" className="text-sm font-medium text-slate-600">
                                Beneficiary Address
                            </Label>
                            <Input
                                id="beneficiaryAddress"
                                value={formData.beneficiaryAddress}
                                onChange={handleChange}
                                placeholder="Beneficiary Address"
                                className="h-11 border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/30"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-8">
                        <Button
                            onClick={handleUpdate}
                            className="h-11 px-8 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg"
                        >
                            Update Settings
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Setting;
