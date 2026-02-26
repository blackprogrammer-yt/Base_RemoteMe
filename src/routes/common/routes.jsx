import { jsx as _jsx } from "react/jsx-runtime";
import WorkspaceDashboard from "@/page/workspace/Dashboard";
import OrganizationDashboard from "@/page/organization/Dashboard";
import HireAndBoard from "@/page/organization/hireandBoard/HireAndBoard";
import Timesheets from "@/page/organization/timesheet/Timesheets";
import TimeSheetDetail from "@/page/organization/timesheet/TimeSheetDetail";
import MyInvoices from "@/page/organization/Invoices/myInvoices/MyInvoices";
import InvoiceDetail from "@/page/organization/Invoices/myInvoices/InvoiceDetail";
import GeneralInvoice from "@/page/organization/Invoices/GeneralInvoice/GeneralInvoice";
import GeneralInvoiceDetail from "@/page/organization/Invoices/GeneralInvoice/GeneralInvoiceDetail";
import Documents from "@/page/organization/SystemSetup/document/Documents";
import EditDocument from "@/page/organization/SystemSetup/document/EditDocument";
import EarningAndDeduction from "@/page/organization/SystemSetup/earninganddeduction/EarningAndDeduction";
import EditEarningAndDeduction from "@/page/organization/SystemSetup/earninganddeduction/EditEarningAndDeduction";
import OrganizationAdmin from "@/page/organization/SystemSetup/manageAdmin/OrganizationAdmin";
import AddOrganizationAdmin from "@/page/organization/SystemSetup/manageAdmin/AddOrganizationAdmin";
import Contracts from "@/page/organization/contracts/Contracts";
import EmployeeDetails from "@/page/organization/contracts/EmployeeDetails";
import AdminDashboard from "@/page/admin/dashboard";
import OrganizationList from "@/page/admin/origanizations/OrganizationList";
import UserList from "@/page/admin/users/UserList";
import UserEdit from "@/page/admin/users/UserEdit";
import Contract from "@/page/admin/contract/Contract";
import UserDetail from "@/page/admin/contract/UserDetail";
import SignUpRequest from "@/page/admin/signUpRequest/SignUpRequest";
import Members from "@/page/workspace/Members";
import ProjectDetails from "@/page/workspace/ProjectDetails";
import Settings from "@/page/workspace/Settings";
import Tasks from "@/page/workspace/Tasks";
import { BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";
import InviteUser from "@/page/invite/InviteUser";
import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";
import ForgotPassword from "@/page/auth/Forgot-password";
import Otp from "@/page/auth/Otp";
export const protectedRoutePaths = [
    { path: PROTECTED_ROUTES.WORKSPACE, element: _jsx(WorkspaceDashboard, {}) },
    { path: PROTECTED_ROUTES.TASKS, element: _jsx(Tasks, {}) },
    { path: PROTECTED_ROUTES.MEMBERS, element: _jsx(Members, {}) },
    { path: PROTECTED_ROUTES.SETTINGS, element: _jsx(Settings, {}) },
    { path: PROTECTED_ROUTES.PROJECT_DETAILS, element: _jsx(ProjectDetails, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_DASHBOARD, element: _jsx(OrganizationDashboard, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_HIRE_AND_BOARD, element: _jsx(HireAndBoard, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_TIMESHEETS, element: _jsx(Timesheets, {}) },
    {
        path: PROTECTED_ROUTES.ORGANIZATION_TIMESHEET_DETAIL,
        element: _jsx(TimeSheetDetail, {}),
    },
    { path: PROTECTED_ROUTES.ORGANIZATION_MY_INVOICES, element: _jsx(MyInvoices, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_MY_INVOICE_DETAIL, element: _jsx(InvoiceDetail, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_GENERAL_INVOICES, element: _jsx(GeneralInvoice, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_GENERAL_INVOICE_DETAIL, element: _jsx(GeneralInvoiceDetail, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_DOCUMENTS, element: _jsx(Documents, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_DOCUMENT_EDIT, element: _jsx(EditDocument, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_EARNING_AND_DEDUCTION, element: _jsx(EarningAndDeduction, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_EARNING_AND_DEDUCTION_EDIT, element: _jsx(EditEarningAndDeduction, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_MANAGE_ADMIN, element: _jsx(OrganizationAdmin, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_SYSTEM_SETUP_MANAGE_ADMIN_ADD, element: _jsx(AddOrganizationAdmin, {}) },
    { path: PROTECTED_ROUTES.ORGANIZATION_CONTRACTS, element: _jsx(Contracts, {}) },
    {
        path: PROTECTED_ROUTES.ORGANIZATION_CONTRACT_DETAIL,
        element: _jsx(EmployeeDetails, {}),
    },
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
];
export const baseRoutePaths = [
    { path: BASE_ROUTE.INVITE_URL, element: _jsx(InviteUser, {}) },
    { path: BASE_ROUTE.LOGIN, element: _jsx(SignIn, {}) },
    { path: BASE_ROUTE.SIGN_UP, element: _jsx(SignUp, {}) },
    { path: BASE_ROUTE.FORGOT_PASSWORD, element: _jsx(ForgotPassword, {}) },
    { path: BASE_ROUTE.OTP, element: _jsx(Otp, {}) },
];
