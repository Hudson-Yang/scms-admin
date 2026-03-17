import { App } from "antd";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AppMessageProvider = ({ children }: Props) => {
  return <App>{children}</App>;
};

export default AppMessageProvider;
