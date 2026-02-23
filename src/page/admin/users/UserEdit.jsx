import { useState } from "react";
import { ArrowLeft, FileUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";

const UserEdit = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("Terminate");
    const [lastName, setLastName] = useState("Contract");
    const [email, setEmail] = useState(
        "khan.shahab02729+terminate@gmail.com",
    );
    const [contactNumber, setContactNumber] = useState("+0 (331) 027-2729");
    const [linkedIn, setLinkedIn] = useState("");
    const [cvFileName, setCvFileName] = useState("No file chosen");

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            setCvFileName("No file chosen");
            return;
        }

        setCvFileName(file.name);
    };

    const handleBack = () => {
        navigate(PROTECTED_ROUTES.ADMIN_USERS);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
            <div className="flex flex-auto flex-col py-2">
                <div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-auto items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-2xl font-bold tracking-tight">
                            Edit User
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
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium">
                                First Name
                            </Label>
                            <Input
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                                placeholder="Enter first name"
                                className="h-9"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium">
                                Last Name
                            </Label>
                            <Input
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                                placeholder="Enter last name"
                                className="h-9"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="Enter email address"
                                className="h-9"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium">
                                Contact Number
                            </Label>
                            <Input
                                value={contactNumber}
                                onChange={(event) =>
                                    setContactNumber(event.target.value)
                                }
                                placeholder="Enter contact number"
                                className="h-9"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium">
                                LinkedIn Profile (optional)
                            </Label>
                            <Input
                                value={linkedIn}
                                onChange={(event) =>
                                    setLinkedIn(event.target.value)
                                }
                                placeholder="Enter LinkedIn profile link"
                                className="h-9"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium">
                                Upload CV
                            </Label>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => {
                                            const input =
                                                document.getElementById(
                                                    "cv-upload-input",
                                                );

                                            if (input) {
                                                input.click();
                                            }
                                        }}
                                    >
                                        <FileUp className="h-3.5 w-3.5" />
                                        <span>Choose File</span>
                                    </Button>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {cvFileName}
                                    </span>
                                </div>
                                <span className="text-[0.7rem] text-muted-foreground">
                                    Allowed types: docx, pdf; max size: 2MB
                                </span>
                            </div>

                            <input
                                id="cv-upload-input"
                                type="file"
                                accept=".doc,.docx,.pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" className="px-6">
                            Edit User
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default UserEdit;

