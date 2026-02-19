import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function QueryProvider({ children }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: (failureCount, error) => {
                    if (failureCount < 2 && error?.message === "Network Error") {
                        return true;
                    }
                    return false;
                },
                retryDelay: 0,
            },
        },
    });
    return (_jsx(QueryClientProvider, { client: queryClient, children: children }));
}
