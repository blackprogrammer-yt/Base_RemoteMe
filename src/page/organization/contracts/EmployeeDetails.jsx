import { useMemo } from "react";
import {
	ArrowLeft,
	Banknote,
	Clock,
	Download,
	FileText,
	PencilLine,
	Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const EMPLOYEE_INFO = [
	{ label: "Name", value: "Carly Ray" },
	{ label: "Email", value: "fopiwerasi@mailinator.com" },
	{ label: "Contact Number", value: "N/A" },
	{ label: "Manager", value: "Aut Sed Ullamco Cons" },
	{ label: "Position", value: "Rem Occaecat Quibusd" },
	{ label: "Login Status", value: "Active", tone: "active" },
	{ label: "Approval Status", value: "Pending", tone: "pending" },
	{ label: "Admin Approval Status", value: "Pending", tone: "pending" },
	{ label: "Contract Start", value: "12/15/2010" },
	{ label: "Contract End", value: "12/30/2030" },
	{ label: "Salary", value: "*****", muted: true },
	{ label: "Annual Bonus", value: "10%" },
	{ label: "Annual Vacation", value: "20 Days" },
	{ label: "Holidays", value: "Company Standard" },
	{ label: "Benefits", value: "Gym Benefits", tone: "benefit" },
	{ label: "Project Name", value: "Baxter Leonard" },
	{ label: "Identification Number", value: "21333-4576561-6" },
	{ label: "Identification Document", value: "View Document", isLink: true },
];

const TIME_EFFECTIVE_SALARIES = [
	{
		id: 1,
		effectiveDate: "15-Dec-2010",
		salary: "*****",
		action: "No Action",
	},
];

const ultimateLimitedDocuments = [
	{ id: 1, title: "Employee Contract", status: "Signed" },
	{ id: 2, title: "HR - Work Ethics", status: "No sign needed" },
	{ id: 3, title: "Admin Document 1", status: "Signed" },
	{ id: 4, title: "Admin Document 2", status: "No sign needed" },
	{ id: 5, title: "Signature not needed", status: "No sign needed" },
	{ id: 6, title: "Initial Contract copy 2", status: "Signed" },
	{ id: 7, title: "Employee Contract for 2026", status: "Signed" },
	{ id: 8, title: "Employee Contract Empty Field", status: "Signed" },
];

const organizationDocuments = [
	{ id: 9, title: "HR - Work Ethics", status: "Signed" },
	{ id: 10, title: "Employee Contract Document", status: "No sign needed" },
	{ id: 11, title: "Organization Rules & Regulations", status: "No sign needed" },
	{ id: 12, title: "Word Document", status: "Signed" },
	{ id: 13, title: "Empty Field Organization Document", status: "Signed" },
];

const employeeContractDocuments = [
	{ id: 14, title: "Org Emp Contract", status: "Signed" },
];

const bankDetails = [
	{ label: "Bank Name", value: "Standard Chartered" },
	{ label: "IBAN", value: "2334534" },
	{ label: "SWIFT Code", value: "34534" },
	{ label: "Bank Phone Number", value: "12365675675" },
	{ label: "Bank Address", value: "Suite: 112/113" },
	{ label: "Beneficiary Name", value: "Martin Jacobson" },
	{ label: "Beneficiary Address", value: "Suite: 112/113" },
];

const getStatusBadge = (value, tone) => {
	if (!value) {
		return null;
	}

	if (tone === "pending") {
		return (
			<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-amber-500/10 px-2 py-1 text-xs font-semibold uppercase text-amber-700">
				<span>{value}</span>
			</Badge>
		);
	}

	if (tone === "active") {
		return (
			<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase text-emerald-700">
				<span>{value}</span>
			</Badge>
		);
	}

	if (tone === "benefit") {
		return (
			<Badge className="pointer-events-none inline-flex items-center rounded-sm border-0 bg-sky-500/10 px-2 py-1 text-xs font-semibold text-sky-700">
				<span>{value}</span>
			</Badge>
		);
	}

	return <span className="text-sm font-medium text-foreground">{value}</span>;
};

const getDocumentStatusClassName = (status) => {
	if (status.toLowerCase().includes("signed")) {
		return "text-xs font-semibold text-emerald-600";
	}

	if (status.toLowerCase().includes("no sign")) {
		return "text-xs font-semibold text-sky-600";
	}

	return "text-xs font-semibold text-muted-foreground";
};

const DocumentList = ({ title, items }) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2 text-sm font-semibold text-primary">
			<FileText className="h-4 w-4" />
			<span>{title}</span>
		</div>
		<div className="space-y-3">
			{items.map((item) => (
				<div
					key={item.id}
					className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-muted px-3 py-2"
				>
					<div>
						<p className="text-sm font-medium text-foreground">{item.title}</p>
						<p className={getDocumentStatusClassName(item.status)}>
							({item.status})
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						className="h-7 gap-1.5 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
					>
						<Download className="h-3.5 w-3.5" />
						Download
					</Button>
				</div>
			))}
		</div>
	</div>
);

const EmployeeDetails = () => {
	const infoRows = useMemo(() => EMPLOYEE_INFO, []);

	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
						<Users className="h-4 w-4" />
					</div>
					<h2 className="text-lg font-semibold">Employee Details</h2>
				</div>
				<Button variant="outline" size="sm" className="gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back
				</Button>
			</div>

			<div className="rounded-lg border bg-card px-4 py-5 shadow-sm">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div className="flex items-center gap-2 text-sm font-semibold text-primary">
						<FileText className="h-4 w-4" />
						<span>Employee Information</span>
					</div>
					<Button size="sm" className="gap-2">
						<PencilLine className="h-4 w-4" />
						Edit Contract
					</Button>
				</div>

				<div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
					<div className="grid gap-4 sm:grid-cols-2">
						{infoRows.map((item) => (
							<div key={item.label} className="space-y-1">
								<p className="text-xs font-medium text-muted-foreground">
									{item.label}
								</p>
								{item.isLink ? (
									<button
										type="button"
										className="text-sm font-semibold text-primary hover:underline"
									>
										{item.value}
									</button>
								) : item.tone ? (
									getStatusBadge(item.value, item.tone)
								) : (
									<p
										className={`text-sm font-semibold ${
											item.muted ? "text-muted-foreground" : "text-foreground"
										}`}
									>
										{item.value}
									</p>
								)}
							</div>
						))}
					</div>

					<div className="rounded-md border bg-background">
						<div className="flex items-center justify-between gap-3 border-b px-4 py-2">
							<div className="flex items-center gap-2 text-sm font-semibold text-primary">
								<Clock className="h-4 w-4" />
								<span>Time Effective Salaries</span>
							</div>
							<Button
								variant="outline"
								size="sm"
								className="h-7 gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
							>
								+ Add Salary
							</Button>
						</div>

						<Table>
							<TableHeader>
								<TableRow className="border-b bg-muted/40">
									<TableHead className="text-xs font-semibold uppercase text-muted-foreground">Effective Date</TableHead>
									<TableHead className="text-xs font-semibold uppercase text-muted-foreground">Salary</TableHead>
									<TableHead className="text-xs font-semibold uppercase text-muted-foreground">Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{TIME_EFFECTIVE_SALARIES.map((row) => (
									<TableRow key={row.id}>
										<TableCell className="text-sm font-medium">
											{row.effectiveDate}
										</TableCell>
										<TableCell className="text-sm">
											{row.salary}
										</TableCell>
										<TableCell className="text-sm text-muted-foreground">
											{row.action}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>

				<div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
					<DocumentList
						title="Ultimate Limited Documents"
						items={ultimateLimitedDocuments}
					/>

					<div className="space-y-3">
						<div className="flex items-center gap-2 text-sm font-semibold text-primary">
							<Banknote className="h-4 w-4" />
							<span>Bank Details</span>
						</div>
						<div className="space-y-3 rounded-md border border-muted px-3 py-3">
							{bankDetails.map((detail) => (
								<div key={detail.label} className="space-y-1">
									<p className="text-xs font-medium text-muted-foreground">
										{detail.label}
									</p>
									<p className="text-sm font-semibold text-foreground">
										{detail.value}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-6 space-y-6">
					<DocumentList
						title="Organization Documents"
						items={organizationDocuments}
					/>
					<DocumentList
						title="Employee Contract Documents"
						items={employeeContractDocuments}
					/>
				</div>
			</div>
		</main>
	);
};

export default EmployeeDetails;
