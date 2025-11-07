import { matchPath, Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
//import NavigationBar from "../components/common/NavigationBar";

const ProtectedLayout = () => {
  const location = useLocation();
  const isCalendar = !!matchPath("/calendar", location.pathname);

  const hideArrowPages = ["/calendar", "/mypage"];
  const hasArrow = !hideArrowPages.includes(location.pathname);

  const pageTitles: Record<string, string> = {
    "/mypage": "마이페이지",
  };

  const title = pageTitles[location.pathname] || "";

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[480px] min-h-screen bg-[#F8F8F8]">
        <Header
          type={isCalendar ? "logoOnly" : hasArrow ? "default" : "titleOnly"}
          title={title}
        />
        <div className="pt-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
