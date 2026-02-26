import {
	ArrowLeft,
	CreditCard,
	Download,
	FileText,
	Receipt,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

const INVOICE = {
	invoiceNo: "R00000023",
	vat: "1234567890",
	terms: "Net 30",
	status: "Paid",
	company: {
		name: "Hunter Downs",
		description: "Consectetur rerum es",
		logoText: "HD",
	},
	billedBy: {
		name: "Hunter Downs",
		email: "payments@remoteme.com",
		phone: "+1234567890",
	},
	billedTo: {
		name: "Dhurandhar Casting Company",
		contact: "Miller Mark",
		email: "khan.shahab02729+miller@gmail.com",
	},
	invoiceDate: "Jan, 20 2026",
	currency: "AED",
	paymentDescription: "PAID Dirham 1300/-",
};

const INVOICE_ITEMS = [
	{
		id: 1,
		description: "AI and Development Work",
		amount: "1300.3",
	},
];

const PAYMENT_METHOD = [
	{ label: "Bank", value: "Hilary Figueroa" },
	{ label: "IBAN #", value: "12345678909876" },
	{ label: "Account Title", value: "RemoteMe" },
	{ label: "SWIFT Code", value: "12345" },
	{ label: "Bank Address", value: "Quidem aliquip facil" },
	{ label: "Bank Phone", value: "+1 (804) 459-2995" },
];

const GeneralInvoiceDetail = () => {
	return (
		<main className="flex flex-1 flex-col gap-4 py-4 md:pt-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
						<FileText className="h-4 w-4" />
					</div>
					<h2 className="text-lg font-semibold">General Invoice Detail</h2>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						className="gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
					>
						<Download className="h-4 w-4" />
						Download Invoice
					</Button>
					<Button variant="default" size="sm" className="gap-2">
						<ArrowLeft className="h-4 w-4" />
						Back
					</Button>
				</div>
			</div>

			<Card className="shadow-sm">
				<CardContent className="grid gap-6 p-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
					<div className="rounded-lg border bg-card p-5">
						<div className="flex flex-wrap items-start justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted text-xs font-semibold text-muted-foreground">
									{INVOICE.company.logoText}
								</div>
								<div>
									<p className="text-sm font-semibold text-foreground">
										{INVOICE.company.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{INVOICE.company.description}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="text-sm font-semibold text-foreground">INVOICE</p>
								<p className="text-xs text-muted-foreground">
									#{INVOICE.invoiceNo}
								</p>
								<p className="text-xs text-muted-foreground">
									VAT #: {INVOICE.vat}
								</p>
								<p className="text-xs text-muted-foreground">
									Terms: {INVOICE.terms}
								</p>
								<Badge className="mt-2 inline-flex rounded-sm border-0 bg-emerald-500/10 text-xs font-semibold uppercase text-emerald-700">
									{INVOICE.status}
								</Badge>
							</div>
						</div>

						<div className="my-4 border-b" />

						<div className="grid gap-6 sm:grid-cols-2">
							<div className="space-y-2">
								<p className="text-xs font-semibold uppercase text-muted-foreground">
									Billed By:
								</p>
								<p className="text-sm font-semibold text-foreground">
									{INVOICE.billedBy.name}
								</p>
								<p className="text-xs text-muted-foreground">
									Email: {INVOICE.billedBy.email}
								</p>
								<p className="text-xs text-muted-foreground">
									Phone: {INVOICE.billedBy.phone}
								</p>
							</div>
							<div className="space-y-2 text-right">
								<p className="text-xs font-semibold uppercase text-muted-foreground">
									Billed To:
								</p>
								<p className="text-sm font-semibold text-foreground">
									{INVOICE.billedTo.name}
								</p>
								<p className="text-xs text-muted-foreground">
									{INVOICE.billedTo.contact}
								</p>
								<p className="text-xs text-muted-foreground">
									Email: {INVOICE.billedTo.email}
								</p>
							</div>
						</div>

						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							<div>
								<p className="text-xs font-semibold uppercase text-muted-foreground">
									Invoice Date:
								</p>
								<p className="text-sm font-medium text-foreground">
									{INVOICE.invoiceDate}
								</p>
							</div>
							<div className="text-right">
								<p className="text-xs font-semibold uppercase text-muted-foreground">
									Currency:
								</p>
								<p className="text-sm font-medium text-foreground">
									{INVOICE.currency}
								</p>
							</div>
						</div>

						<div className="mt-6">
							<p className="text-xs font-semibold uppercase text-muted-foreground">
								Invoice Items:
							</p>
							<div className="mt-3 overflow-hidden rounded-md border">
								<Table>
									<TableHeader>
										<TableRow className="bg-muted/60">
											<TableHead className="w-[60px] text-xs font-semibold uppercase text-muted-foreground">
												#
											</TableHead>
											<TableHead className="text-xs font-semibold uppercase text-muted-foreground">
												Description
											</TableHead>
											<TableHead className="text-right text-xs font-semibold uppercase text-muted-foreground">
												Amount
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{INVOICE_ITEMS.map((item) => (
											<TableRow key={item.id}>
												<TableCell className="text-sm font-medium">
													{item.id}
												</TableCell>
												<TableCell className="text-sm">
													{item.description}
												</TableCell>
												<TableCell className="text-right text-sm font-medium">
													{item.amount}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>

						<div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
							<div className="space-y-3">
								<p className="text-xs font-semibold uppercase text-muted-foreground">
									Notes:
								</p>
								<p className="text-xs text-muted-foreground">
									Please make payments within 30 days of the invoice date.
									Bank transfer details are provided below. Thank you for
									your business!
								</p>
								<div className="space-y-1">
									<p className="text-xs font-semibold uppercase text-muted-foreground">
										Payment Method:
									</p>
									{PAYMENT_METHOD.map((item) => (
										<div
											key={item.label}
											className="flex items-center justify-between text-xs text-muted-foreground"
										>
											<span>{item.label}</span>
											<span>{item.value}</span>
										</div>
									))}
								</div>
							</div>
							<div className="flex items-end justify-end">
								<div className="rounded-md border bg-muted/30 px-4 py-3 text-right">
									<p className="text-xs font-semibold uppercase text-muted-foreground">
										Total Invoice Amount:
									</p>
									<p className="text-lg font-semibold text-foreground">
										1300.3
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="rounded-lg border bg-card p-4">
							<div className="flex items-center gap-2 text-sm font-semibold text-primary">
								<Receipt className="h-4 w-4" />
								<span>Update Payment</span>
							</div>
							<p className="mt-2 text-xs text-muted-foreground">
								You can update this invoice by submitting the payment receipt
								and description.
							</p>
							<Button className="mt-4 w-full gap-2">
								<CreditCard className="h-4 w-4" />
								Update Payment
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="mt-3 w-full border-primary/20 text-primary"
							>
								View Payment Receipt
							</Button>
							<div className="mt-4 rounded-md border bg-muted/20 p-3">
								<p className="text-xs font-semibold text-muted-foreground">
									Payment Description:
								</p>
								<p className="text-sm font-semibold text-foreground">
									{INVOICE.paymentDescription}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
};

export default GeneralInvoiceDetail;
