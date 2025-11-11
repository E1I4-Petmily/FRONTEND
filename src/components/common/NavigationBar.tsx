import React from "react";
import CalendarIcon from "../../assets/CalendarIcon";
import ProfileIcon from "../../assets/ProfileIcon";
import HospitalIcon from "../../assets/HospitalIcon";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /*
  // 온보딩 등 특정 페이지에서는 숨김
  const hideNavPaths = [
    "/signup",
    "/login",
    "/onboarding/welcome",
    "/onboarding/photo",
    "/onboarding/information",
    "/onboarding/color",
    "/onboarding/completion",
  ];
  if (hideNavPaths.includes(location.pathname)) return null;
  */

  const isActive = (pattern: string) =>
    !!matchPath({ path: pattern, end: false }, location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 w-full max-w-[480px] mx-auto right-0 bg-[#FFFFFF] flex justify-around items-center h-20">
      <button
        onClick={() => navigate("/calendar")}
        className="flex flex-col items-center gap-2 text-xs"
      >
        <CalendarIcon color={isActive("/calendar/*") ? "#F56E6D" : "gray"} />
        <span
          className={
            isActive("/calendar/*") ? "text-[#F56E6D]" : "text-gray-400"
          }
        >
          캘린더
        </span>
      </button>

      <button
        onClick={() => navigate("/mypage")}
        className="flex flex-col items-center gap-2 text-xs"
      >
        <ProfileIcon color={isActive("/mypage/*") ? "#F56E6D" : "gray"} />
        <span
          className={isActive("/mypage/*") ? "text-[#F56E6D]" : "text-gray-400"}
        >
          마이페이지
        </span>
      </button>

      <button
        onClick={() => navigate("/hospital")}
        className="flex flex-col items-center gap-2 text-xs"
      >
        <HospitalIcon color={isActive("/hospital/*") ? "#F56E6D" : "gray"} />
        <span
          className={
            isActive("/hospital/*") ? "text-[#F56E6D]" : "text-gray-400"
          }
        >
          병원
        </span>
      </button>
    </nav>
  );
};

export default NavigationBar;
