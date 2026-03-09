import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateProfile = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("Master");
	const [lastName, setLastName] = useState("Admin");
	const [contactNumber, setContactNumber] = useState("+1 (234) 567-8901");
	const [email, setEmail] = useState("from.shahabkhan@gmail.com");
	const [avatar, setAvatar] = useState(null);
	const [avatarPreview, setAvatarPreview] = useState(null);

	const handleBack = () => {
		navigate(-1);
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatar(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Handle form submission
		console.log({
			firstName,
			lastName,
			contactNumber,
			email,
			avatar,
		});
	};

	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<UserCircle2 className="h-5 w-5 text-muted-foreground" />
					<h2 className="text-2xl font-bold tracking-tight">Update Profile</h2>
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

						{/* Avatar Section */}
						<div className="space-y-1.5">
							<Label htmlFor="avatar" className="text-xs font-medium text-muted-foreground">
								Avatar
							</Label>
							<div className="flex items-center gap-4">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1599c9] text-white">
									{avatarPreview ? (
										<img
											src={avatarPreview}
											alt="Avatar preview"
											className="h-full w-full rounded-full object-cover"
										/>
									) : (
										<UserCircle2 className="h-14 w-14" />
									)}
								</div>
								<div className="flex flex-1 flex-col gap-2">
									<label
										htmlFor="avatar"
										className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium cursor-pointer hover:bg-muted transition"
									>
										<Upload className="h-4 w-4" />
										<span>Choose File</span>
									</label>
									<input
										id="avatar"
										type="file"
										accept="image/*"
										onChange={handleAvatarChange}
										className="hidden"
									/>
									{avatar && (
										<p className="text-xs text-muted-foreground">{avatar.name}</p>
									)}
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
								Update Profile
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</main>
	);
};

export default UpdateProfile;
