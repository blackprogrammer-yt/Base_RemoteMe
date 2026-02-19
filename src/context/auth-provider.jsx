import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetWorkspaceQuery from "@/hooks/api/use-get-workspace";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, }) => {
    const workspaceId = useWorkspaceId();
    const { data: workspaceData, isLoading: workspaceLoading, error: workspaceError, refetch: refetchWorkspace, } = useGetWorkspaceQuery(workspaceId);
    const workspace = workspaceData?.workspace;
    const user = undefined;
    const hasPermission = (_permission) => true;
    return (_jsx(AuthContext.Provider, {
        value: {
            user,
            workspace,
            hasPermission,
            error: workspaceError,
            isLoading: false,
            isFetching: false,
            workspaceLoading,
            refetchAuth: () => undefined,
            refetchWorkspace,
        }, children: children
    }));
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useCurrentUserContext must be used within a AuthProvider");
    }
    return context;
};
