import { jsx as _jsx } from "react/jsx-runtime";
import OrganizationDashboard from "@/page/organization/Dashboard";
import HireAndBoard from "@/page/organization/hireandBoard/HireAndBoard";
import Timesheets from "@/page/organization/timesheet/Timesheets";
import TimeSheetDetail from "@/page/organization/timesheet/TimeSheetDetail";
import MyInvoices from "@/page/organization/Invoices/myInvoices/MyInvoices";
import OrgInvoiceDetail from "@/page/organization/Invoices/myInvoices/InvoiceDetail";
import GeneralInvoice from "@/page/organization/Invoices/GeneralInvoice/GeneralInvoice";
import GeneralInvoiceDetail from "@/page/organization/Invoices/GeneralInvoice/GeneralInvoiceDetail";
import PayrollPayment from "@/page/organization/PayrollPayments/PayrollPayment";
import PayrollDetail from "@/page/organization/PayrollPayments/PayrollDetail";
import OrgDocuments from "@/page/organization/SystemSetup/document/Documents";
import OrgEditDocument from "@/page/organization/SystemSetup/document/EditDocument";
import EarningAndDeduction from "@/page/organization/SystemSetup/earninganddeduction/EarningAndDeduction";
import EditEarningAndDeduction from "@/page/organization/SystemSetup/earninganddeduction/EditEarningAndDeduction";
import OrganizationAdmin from "@/page/organization/SystemSetup/manageAdmin/OrganizationAdmin";
import AddOrganizationAdmin from "@/page/organization/SystemSetup/manageAdmin/AddOrganizationAdmin";
import Contracts from "@/page/organization/contracts/Contracts";
import EmployeeDetails from "@/page/organization/contracts/EmployeeDetails";
import EmployeeTimesheet from "@/page/employee/timesheet/Timesheet";
import EmployeeDashboard from "@/page/employee/dashboard/Dashboard";
import MyContract from "@/page/employee/myContract/MyContract";
import MyPayment from "@/page/employee/myPayemnt/MyPayment";
import AdminDashboard from "@/page/admin/Dashboard";
import OrganizationList from "@/page/admin/origanizations/OrganizationList";
import UserList from "@/page/admin/users/UserList";
import UserEdit from "@/page/admin/users/UserEdit";
import Contract from "@/page/admin/contract/Contract";
import UserDetail from "@/page/admin/contract/UserDetail";
import SignUpRequest from "@/page/admin/signUpRequest/SignUpRequest";
import EmployeePayments from "@/page/admin/employeePayments/EmployeePayments";
import EmployeePaymentDetails from "@/page/admin/employeePayments/EmployeePaymentDetails";
import GeneralInvoices from "@/page/admin/invoices/generalInvoices/GeneralInvoices";
import CreateNewGeneralInvoice from "@/page/admin/invoices/generalInvoices/CreateNewGeneralInvoice";
import EditGeneralInvoice from "@/page/admin/invoices/generalInvoices/EditGeneralInvoice";
import GeneralInvoiceDetails from "@/page/admin/invoices/generalInvoices/GeneralInvoiceDetails";
import PayrollInvoices from "@/page/admin/invoices/organizationInvoices/PayrollInvoices";
import InvoiceDetail from "@/page/admin/invoices/organizationInvoices/InvoiceDetail";
import EditPayrollInvoice from "@/page/admin/invoices/organizationInvoices/EditPayrollInvoice";
import Documents from "@/page/admin/systemSetup/documents/Documents";
import Benefits from "@/page/admin/systemSetup/benefits/Benefits";
import Currencies from "@/page/admin/systemSetup/currencies/Currencies";
import SystemSetting from "@/page/admin/systemSetup/setting/setting";
import AddCurrency from "@/page/admin/systemSetup/currencies/AddCurrency";
import EditCurrency from "@/page/admin/systemSetup/currencies/EditCurrency";
import AddBenefits from "@/page/admin/systemSetup/benefits/AddBenefits";
import EditBenefits from "@/page/admin/systemSetup/benefits/EditBenefits";
import AddDocument from "@/page/admin/systemSetup/documents/AddDocument";
import EditDocument from "@/page/admin/systemSetup/documents/EditDocument";
import { BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";
import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";
import ForgotPassword from "@/page/auth/Forgot-password";
import Otp from "@/page/auth/Otp";
export const protectedRoutePaths = [
    { path: PROTECTED_ROUTES.ORGANIZATION_DASHBOARD, element: _jsx(OrganizationDashboard, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_HIRE_AND_BOARD, element: _jsx(HireAndBoard, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_TIMESHEETS, element: _jsx(Timesheets, {}) },
    {
        path: PROTECTED_ROUTES.ORGANIZATION_TIMESHEET_DETAIL,
        element: _jsx(TimeSheetDetail, {}),
    },
    { path: PROTECTED_ROUTES.ORGANIZATION_MY_INVOICES, element: _jsx(MyInvoices, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_MY_INVOICE_DETAIL, element: _jsx(OrgInvoiceDetail, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_GENERAL_INVOICES, element: _jsx(GeneralInvoice, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_GENERAL_INVOICE_DETAIL, element: _jsx(GeneralInvoiceDetail, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_PAYROLL_PAYMENTS, element: _jsx(PayrollPayment, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_PAYROLL_PAYMENT_DETAIL, element: _jsx(PayrollDetail, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_DOCUMENTS, element: _jsx(OrgDocuments, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_DOCUMENT_EDIT, element: _jsx(OrgEditDocument, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_EARNING_AND_DEDUCTION, element: _jsx(EarningAndDeduction, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_EARNING_AND_DEDUCTION_EDIT, element: _jsx(EditEarningAndDeduction, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_MANAGE_ADMIN, element: _jsx(OrganizationAdmin, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_MANAGE_ADMIN_ADD, element: _jsx(AddOrganizationAdmin, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_CONTRACTS, element: _jsx(Contracts, {}) },
    {
        path: PROTECTED_ROUTES.ORGANIZATION_CONTRACT_DETAIL,
        element: _jsx(EmployeeDetails, {}),
    },
    { path: PROTECTED_ROUTES.EMPLOYEE_DASHBOARD, element: _jsx(EmployeeDashboard, {}) },
    { path: PROTECTED_ROUTES.EMPLOYEE_TIMESHEETS, element: _jsx(EmployeeTimesheet, {}) },
    { path: PROTECTED_ROUTES.EMPLOYEE_MY_CONTRACT, element: _jsx(MyContract, {}) },
    { path: PROTECTED_ROUTES.EMPLOYEE_MY_PAYMENT, element: _jsx(MyPayment, {}) },
    { path: PROTECTED_ROUTES.ADMIN_DASHBOARD, element: _jsx(AdminDashboard, {}) },
    {
        path: PROTECTED_ROUTES.ADMIN_ORGANIZATIONS,
        element: _jsx(OrganizationList, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_USERS,
        element: _jsx(UserList, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_USER_EDIT,
        element: _jsx(UserEdit, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_CONTRACT,
        element: _jsx(Contract, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_CONTRACT_DETAIL,
        element: _jsx(UserDetail, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_SIGNUP_REQUEST,
        element: _jsx(SignUpRequest, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_EMPLOYEE_PAYMENTS,
        element: _jsx(EmployeePayments, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_EMPLOYEE_PAYMENTS_DETAIL,
        element: _jsx(EmployeePaymentDetails, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_GENERAL_INVOICES,
        element: _jsx(GeneralInvoices, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_CREATE_GENERAL_INVOICE,
        element: _jsx(CreateNewGeneralInvoice, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_EDIT_GENERAL_INVOICE,
        element: _jsx(EditGeneralInvoice, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_ORGANIZATION_INVOICES,
        element: _jsx(PayrollInvoices, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_ORGANIZATION_INVOICE_DETAILS,
        element: _jsx(InvoiceDetail, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_EDIT_PAYROLL_INVOICE,
        element: _jsx(EditPayrollInvoice, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_GENERAL_INVOICE_DETAILS,
        element: _jsx(GeneralInvoiceDetails, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_DOCUMENTS,
        element: _jsx(Documents, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_BENEFITS,
        element: _jsx(Benefits, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_CURRENCIES,
        element: _jsx(Currencies, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_SYSTEM_SETUP_SETTING,
        element: _jsx(SystemSetting, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_ADD_BENEFIT,
        element: _jsx(AddBenefits, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_EDIT_BENEFIT,
        element: _jsx(EditBenefits, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_ADD_CURRENCY,
        element: _jsx(AddCurrency, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_EDIT_CURRENCY,
        element: _jsx(EditCurrency, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_ADD_DOCUMENT,
        element: _jsx(AddDocument, {}),
    },
    {
        path: PROTECTED_ROUTES.ADMIN_EDIT_DOCUMENT,
        element: _jsx(EditDocument, {}),
    },
];
export const baseRoutePaths = [
    { path: BASE_ROUTE.LOGIN, element: _jsx(SignIn, {}) },
    { path: BASE_ROUTE.SIGN_UP, element: _jsx(SignUp, {}) },
    { path: BASE_ROUTE.FORGOT_PASSWORD, element: _jsx(ForgotPassword, {}) },
    { path: BASE_ROUTE.OTP, element: _jsx(Otp, {}) },
];
