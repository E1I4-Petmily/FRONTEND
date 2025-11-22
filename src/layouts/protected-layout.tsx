import { matchPath, Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import NavigationBar from "../components/common/NavigationBar";
//import NavigationBar from "../components/common/NavigationBar";

const ProtectedLayout = () => {
  const location = useLocation();

  const showNav = ["/calendar/*", "/mypage/*", "hospital/*"];

  const showNavBar = showNav.some((pattern) =>
    matchPath({ path: pattern, end: false }, location.pathname)
  );

  const isCalendar = !!matchPath("/calendar", location.pathname);

  const hideArrowPages = ["/calendar", "/mypage", "/register/completion"];
  const hasArrow = !hideArrowPages.includes(location.pathname);

  const pageTitles: Record<string, string> = {
    "/mypage": "마이페이지",
    "/calendar/behavior": "행동식습관",
    "/calendar/appearance": "외형이상",
    "/calendar/reaction": "생리반응",
    "/hospital/reservation": "예약하기",
  };

  const title = pageTitles[location.pathname] || "";

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[480px] min-h-screen bg-[#F8F8F8]">
        <Header
          type={isCalendar ? "logoOnly" : hasArrow ? "default" : "titleOnly"}
          title={title}
          bgColor={
            location.pathname === "/hospital/reservation"
              ? "#FFFFFF"
              : undefined
          }
        />
        <div className="pt-12">
          <Outlet />
          {showNavBar && <NavigationBar />}
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
