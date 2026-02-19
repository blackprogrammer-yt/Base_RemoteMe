import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";

import { Toaster } from "./components/ui/toaster.jsx";
import App from "./App.jsx";
import QueryProvider from "./context/query-provider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryProvider>
            <NuqsAdapter>
                <App />
            </NuqsAdapter>
            <Toaster />
        </QueryProvider>
    </StrictMode>
);
