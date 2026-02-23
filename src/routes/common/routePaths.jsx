export const PROTECTED_ROUTES = {
    WORKSPACE: "/workspace/:workspaceId",
    TASKS: "/workspace/:workspaceId/tasks",
    MEMBERS: "/workspace/:workspaceId/members",
    SETTINGS: "/workspace/:workspaceId/settings",
    PROJECT_DETAILS: "/workspace/:workspaceId/project/:projectId",
    ADMIN_DASHBOARD: "/admin/dashboard",
    ADMIN_ORGANIZATIONS: "/admin/organizations",
    ADMIN_USERS: "/admin/users",
    ADMIN_USER_EDIT: "/admin/users/edit",
    ADMIN_CONTRACT: "/admin/contract",
    ADMIN_CONTRACT_DETAIL: "/admin/contract/:contractId",
    ADMIN_SIGNUP_REQUEST: "/admin/signup-request",
};
export const BASE_ROUTE = {
    INVITE_URL: "/invite/workspace/:inviteCode/join",
    LOGIN: "/",
    SIGN_UP: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
    OTP: "/otp",
};
