import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import App from "./app/App.tsx";
import AuthProvider from "./auth/AuthProvider.tsx";
import AppMessageProvider from "./app/AppMessageProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppMessageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppMessageProvider>
    </QueryClientProvider>
  </StrictMode>,
);
