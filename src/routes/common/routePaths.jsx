export const PROTECTED_ROUTES = {
    WORKSPACE: "/workspace/:workspaceId",
    TASKS: "/workspace/:workspaceId/tasks",
    MEMBERS: "/workspace/:workspaceId/members",
    SETTINGS: "/workspace/:workspaceId/settings",
    PROJECT_DETAILS: "/workspace/:workspaceId/project/:projectId",
    ADMIN_DASHBOARD: "/admin/dashboard",
    ADMIN_ORGANIZATIONS: "/admin/organizations",
};
export const BASE_ROUTE = {
    INVITE_URL: "/invite/workspace/:inviteCode/join",
    LOGIN: "/",
    SIGN_UP: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
    OTP: "/otp",
};
