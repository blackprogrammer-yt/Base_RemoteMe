import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ChangePassword = () => {
	const navigate = useNavigate();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleBack = () => {
		navigate(-1);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Handle form submission
		console.log({
			oldPassword,
			newPassword,
			confirmPassword,
		});
	};

	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<KeyRound className="h-5 w-5 text-muted-foreground" />
					<h2 className="text-2xl font-bold tracking-tight">Change Password</h2>
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
						{/* Old Password */}
						<div className="space-y-1.5">
							<Label htmlFor="oldPassword" className="text-xs font-medium text-muted-foreground">
								Old Password <span className="text-red-500">*</span>
							</Label>
							<div className="relative flex items-center">
								<Input
									id="oldPassword"
									type={showOldPassword ? "text" : "password"}
									placeholder="Enter old password"
									value={oldPassword}
									onChange={(e) => setOldPassword(e.target.value)}
									className="h-9 pr-10"
									required
								/>
								<button
									type="button"
									onClick={() => setShowOldPassword(!showOldPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									aria-label="Toggle old password visibility"
								>
									{showOldPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>

						{/* New Password and Confirm Password - Two Columns */}
						<div className="grid gap-4 md:grid-cols-2">
							{/* New Password */}
							<div className="space-y-1.5">
								<Label htmlFor="newPassword" className="text-xs font-medium text-muted-foreground">
									New Password <span className="text-red-500">*</span>
									<span className="ml-2 inline-flex items-center gap-1 text-blue-500 text-[11px] font-normal">
										<svg
											className="h-3.5 w-3.5"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
												clipRule="evenodd"
											/>
										</svg>
										Requirements
									</span>
								</Label>
								<div className="relative flex items-center">
									<Input
										id="newPassword"
										type={showNewPassword ? "text" : "password"}
										placeholder="Enter new password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										className="h-9 pr-10"
										required
									/>
									<button
										type="button"
										onClick={() => setShowNewPassword(!showNewPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										aria-label="Toggle new password visibility"
									>
										{showNewPassword ? (
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
								Change Password
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</main>
	);
};

export default ChangePassword;
