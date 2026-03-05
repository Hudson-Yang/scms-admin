import { Outlet } from "react-router-dom";
import TopNavigation from "./TopNavigation/TopNavigation";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <TopNavigation />
      <div className="app-layout__body">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
