import { ArrowLeft, Clock, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const EMPLOYEE_DETAILS = [
	{ label: "Employee Name", value: "Empty Field" },
	{ label: "Job Title", value: "Blockchain Developer" },
	{ label: "Start Date", value: "02-Feb-2026" },
	{ label: "End Date", value: "08-Feb-2026" },
];

const TIMESHEET_ROWS = [
	{ id: 1, date: "Mon 02-Feb-2026", hours: "", taskTitle: "", taskDesc: "" },
	{ id: 2, date: "Tue 03-Feb-2026", hours: "", taskTitle: "", taskDesc: "" },
	{ id: 3, date: "Wed 04-Feb-2026", hours: "", taskTitle: "", taskDesc: "" },
	{ id: 4, date: "Thu 05-Feb-2026", hours: "", taskTitle: "", taskDesc: "" },
	{ id: 5, date: "Fri 06-Feb-2026", hours: "", taskTitle: "", taskDesc: "" },
	{ id: 6, date: "Sat 07-Feb-2026", hours: "", taskTitle: "", taskDesc: "" },
	{ id: 7, date: "Sun 08-Feb-2026", hours: "", taskTitle: "", taskDesc: "" },
];

const TimeSheetDetail = () => {
	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
						<Clock className="h-4 w-4" />
					</div>
					<h2 className="text-lg font-semibold">Timesheets Details</h2>
				</div>
				<Button variant="default" size="sm" className="gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back
				</Button>
			</div>

			<Card className="shadow-sm">
				<CardContent className="space-y-6 p-5">
					<div className="rounded-md border bg-card px-4 py-4">
						<div className="flex items-center gap-2 text-sm font-semibold text-primary">
							<FileText className="h-4 w-4" />
							<span>Employee Details</span>
						</div>

						<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{EMPLOYEE_DETAILS.map((item) => (
								<div key={item.label} className="space-y-1">
									<p className="text-xs font-medium text-muted-foreground">
										{item.label}:
									</p>
									<p className="text-sm font-semibold text-foreground">
										{item.value}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="overflow-hidden rounded-lg border">
						<Table>
							<TableHeader>
								<TableRow className="border-b bg-muted/40">
									<TableHead className="text-xs font-semibold uppercase text-muted-foreground">Date</TableHead>
									<TableHead className="text-xs font-semibold uppercase text-muted-foreground">Hours</TableHead>
									<TableHead className="text-xs font-semibold uppercase text-muted-foreground">Task Title</TableHead>
									<TableHead className="text-xs font-semibold uppercase text-muted-foreground">Task Description</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{TIMESHEET_ROWS.map((row, index) => (
									<TableRow
										key={row.id}
										className={index % 2 === 0 ? "bg-muted/30" : "bg-background"}
									>
										<TableCell className="py-3 text-sm font-medium">
											{row.date}
										</TableCell>
										<TableCell className="py-3 text-sm">
											{row.hours}
										</TableCell>
										<TableCell className="py-3 text-sm">
											{row.taskTitle}
										</TableCell>
										<TableCell className="py-3 text-sm">
											{row.taskDesc}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</main>
	);
};

export default TimeSheetDetail;
