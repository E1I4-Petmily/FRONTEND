import { matchPath, Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import NavigationBar from "../components/common/NavigationBar";
import { useState } from "react";
import HospitalNav from "../components/common/HospitalNav";

const ProtectedLayout = () => {
  const location = useLocation();
  const [dynamicTitle, setDynamicTitle] = useState("");
  const isHospitalDetail = matchPath("/hospital/:placeId", location.pathname);

  const showNav = ["/calendar/*", "/mypage/*", "hospital/*"];
  const hideHeader = ["/hospital"];

  const shouldHideHeader = hideHeader.some((pattern) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );

  const showNavBar = showNav.some((pattern) =>
    matchPath({ path: pattern, end: false }, location.pathname)
  );

  const isCalendar = !!matchPath("/calendar", location.pathname);

  const hideArrowPages = [
    "/calendar",
    "/mypage",
    "/register/completion",
    "/hospital",
  ];
  const hasArrow = !hideArrowPages.includes(location.pathname);

  const pageTitles: Record<string, string> = {
    "/mypage": "마이페이지",
    "/petedit": "반려동물 정보 수정",
    "/mypage/reports": "요약 리포트",
    "/calendar/behavior": "행동식습관",
    "/calendar/appearance": "외형이상",
    "/calendar/reaction": "생리반응",
    "/calendar/summary": "AI 요약 리포트 생성",
    "/hospital/reservation": "예약하기",
  };

  const title = pageTitles[location.pathname] || "";

  const finalTitle = isHospitalDetail && dynamicTitle ? dynamicTitle : title;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#F8F8F8]">
        {!shouldHideHeader && (
          <Header
            type={isCalendar ? "logoOnly" : hasArrow ? "default" : "titleOnly"}
            title={finalTitle}
            bgColor={
              location.pathname === "/hospital/reservation"
                ? "#FFFFFF"
                : undefined
            }
          />
        )}
        <div className="pt-12">
          <Outlet context={setDynamicTitle} />
          {showNavBar &&
            (location.pathname === "/hospital/home" ||
            location.pathname === "hospital/mypage" ? (
              <HospitalNav />
            ) : (
              <NavigationBar />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
