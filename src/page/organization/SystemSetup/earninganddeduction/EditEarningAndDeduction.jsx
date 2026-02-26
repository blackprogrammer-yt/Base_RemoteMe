import { useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const EditEarningAndDeduction = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("Bonus");
	const [type, setType] = useState("addition");

	const handleBack = () => {
		navigate(-1);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex flex-auto flex-col py-2">
				<div className="flex min-w-0 flex-auto flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-auto items-center gap-2">
						<FileText className="h-5 w-5 text-muted-foreground" />
						<h2 className="text-2xl font-bold tracking-tight">Edit Earning/Deduction Code</h2>
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
				<form onSubmit={handleSubmit} className="space-y-6" noValidate>
					<div className="grid gap-4">
						<div className="space-y-1.5">
							<Label className="text-xs font-medium">
								Title <span className="text-red-500">*</span>
							</Label>
							<Input
								value={title}
								onChange={(event) => setTitle(event.target.value)}
								placeholder="Enter title"
								className="h-9"
							/>
						</div>

						<div className="space-y-1.5">
							<Label className="text-xs font-medium">
								Type <span className="text-red-500">*</span>
							</Label>
							<Select value={type} onValueChange={setType}>
								<SelectTrigger className="h-9">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="addition">Addition</SelectItem>
									<SelectItem value="deduction">Deduction</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="flex justify-end gap-3">
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
							Save
						</Button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default EditEarningAndDeduction;
