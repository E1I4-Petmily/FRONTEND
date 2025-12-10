import React from "react";
import ProfileIcon from "../../assets/navigation-bar/ProfileIcon";
import HospitalIcon from "../../assets/navigation-bar/HospitalIcon";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (pattern: string) =>
    !!matchPath({ path: pattern, end: false }, location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 w-full max-w-[480px] mx-auto right-0 bg-[#FFFFFF] flex justify-around items-center h-20">
      <button
        onClick={() => navigate("/hospital/home")}
        className="flex flex-col items-center gap-2 text-xs"
      >
        <ProfileIcon color={isActive("/hospital/home") ? "#F56E6D" : "gray"} />
        <span
          className={
            isActive("/hospital/home") ? "text-[#F56E6D]" : "text-gray-400"
          }
        >
          예약확인
        </span>
      </button>

      <button
        onClick={() => navigate("/hospital/mypage")}
        className="flex flex-col items-center gap-2 text-xs"
      >
        <HospitalIcon
          color={isActive("/hospital/mypage") ? "#F56E6D" : "gray"}
        />
        <span
          className={
            isActive("/hospital/mypage") ? "text-[#F56E6D]" : "text-gray-400"
          }
        >
          마이페이지
        </span>
      </button>
    </nav>
  );
};

export default NavigationBar;
