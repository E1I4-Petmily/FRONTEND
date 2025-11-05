import { Outlet } from "react-router-dom";
//import NavigationBar from "../components/common/NavigationBar";

const ProtectedLayout = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[480px] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
