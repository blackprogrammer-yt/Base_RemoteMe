import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, }) => {
    const user = undefined;
    const hasPermission = (_permission) => true;
    return (_jsx(AuthContext.Provider, {
        value: {
            user,
            workspace: undefined,
            hasPermission,
            error: null,
            isLoading: false,
            isFetching: false,
            workspaceLoading: false,
            refetchAuth: () => undefined,
            refetchWorkspace: () => undefined,
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
