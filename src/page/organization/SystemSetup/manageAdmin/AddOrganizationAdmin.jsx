import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddOrganizationAdmin = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleBack = () => {
		navigate(-1);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Handle form submission
		console.log({
			firstName,
			lastName,
			email,
			contactNumber,
			password,
			confirmPassword,
		});
	};

	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Users className="h-5 w-5 text-muted-foreground" />
					<h2 className="text-2xl font-bold tracking-tight">Add Organization Admin</h2>
				</div>
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

			<Card className="shadow-sm">
				<CardContent className="space-y-6 p-5">
					<form onSubmit={handleSubmit}>
						{/* Name Section - Two Columns */}
						<div className="grid gap-4 md:grid-cols-2">
							{/* First Name */}
							<div className="space-y-1.5">
								<Label htmlFor="firstName" className="text-xs font-medium text-muted-foreground">
									First Name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="firstName"
									placeholder="Enter first name"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="h-9"
									required
								/>
							</div>

							{/* Last Name */}
							<div className="space-y-1.5">
								<Label htmlFor="lastName" className="text-xs font-medium text-muted-foreground">
									Last Name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="lastName"
									placeholder="Enter last name"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="h-9"
									required
								/>
							</div>
						</div>

						{/* Email and Contact Section - Two Columns */}
						<div className="grid gap-4 md:grid-cols-2">
							{/* Email */}
							<div className="space-y-1.5">
								<Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
									Email <span className="text-red-500">*</span>
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="h-9"
									required
								/>
							</div>

							{/* Contact Number */}
							<div className="space-y-1.5">
								<Label htmlFor="contactNumber" className="text-xs font-medium text-muted-foreground">
									Contact Number <span className="text-red-500">*</span>
								</Label>
								<div className="flex gap-2">
									<div className="flex items-center rounded-md border border-input bg-muted/30 px-3 py-2">
										<span className="text-sm text-muted-foreground">🇺🇸</span>
										<span className="mx-1 text-muted-foreground">/</span>
										<span className="text-sm font-medium">+1</span>
									</div>
									<Input
										id="contactNumber"
										placeholder="Enter contact number"
										value={contactNumber}
										onChange={(e) => setContactNumber(e.target.value)}
										className="h-9 flex-1"
										required
									/>
								</div>
							</div>
						</div>

						{/* Password Section - Two Columns */}
						<div className="grid gap-4 md:grid-cols-2">
							{/* Password */}
							<div className="space-y-1.5">
								<Label htmlFor="password" className="text-xs font-medium text-muted-foreground">
									Password <span className="text-red-500">*</span>
								</Label>
								<div className="relative flex items-center">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="h-9 pr-10"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										aria-label="Toggle password visibility"
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
							</div>

							{/* Confirm Password */}
							<div className="space-y-1.5">
								<Label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground">
									Confirm Password <span className="text-red-500">*</span>
								</Label>
								<div className="relative flex items-center">
									<Input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirm password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="h-9 pr-10"
										required
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										aria-label="Toggle confirm password visibility"
									>
										{showConfirmPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="mt-8 flex justify-end gap-3 border-t pt-4">
							<Button
								type="button"
								variant="outline"
								size="lg"
								className="px-6"
								onClick={handleBack}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								size="lg"
								className="px-6 bg-black hover:bg-gray-900 text-white"
							>
								Save Admin
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</main>
	);
};

export default AddOrganizationAdmin;
