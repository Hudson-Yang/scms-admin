import { Outlet } from "react-router-dom";
import TopNavigation from "./TopNavigation";

const AppLayout = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNavigation />

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
