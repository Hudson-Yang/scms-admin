import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import AuthProvider from "../auth/AuthProvider";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const AppProviders = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#2f4f8f",
            },
          }}
        >
          <AntdApp>
            <AuthProvider>{children}</AuthProvider>
          </AntdApp>
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
