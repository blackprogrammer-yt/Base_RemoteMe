import { jsx as _jsx } from "react/jsx-runtime";
import WorkspaceDashboard from "@/page/workspace/Dashboard";
import AdminDashboard from "@/page/admin/dashboard";
import OrganizationList from "@/page/admin/origanizations/OrganizationList";
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
    { path: PROTECTED_ROUTES.ADMIN_DASHBOARD, element: _jsx(AdminDashboard, {}) },
    {
        path: PROTECTED_ROUTES.ADMIN_ORGANIZATIONS,
        element: _jsx(OrganizationList, {}),
    },
];
export const baseRoutePaths = [
    { path: BASE_ROUTE.INVITE_URL, element: _jsx(InviteUser, {}) },
    { path: BASE_ROUTE.LOGIN, element: _jsx(SignIn, {}) },
    { path: BASE_ROUTE.SIGN_UP, element: _jsx(SignUp, {}) },
    { path: BASE_ROUTE.FORGOT_PASSWORD, element: _jsx(ForgotPassword, {}) },
    { path: BASE_ROUTE.OTP, element: _jsx(Otp, {}) },
];
