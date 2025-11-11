import { useNavigate } from "react-router-dom";
import mainlogo from "../assets/petmily-main.png";
import Button from "../components/common/Button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="p-4 min-h-screen grid grid-rows-[auto_1fr_auto] items-center relative">
      <div className="flex flex-col items-center mt-[15vh]">
        <p className="text-[16px] font-[NotoSansRegular] leading-2">
          함께라서 행복해요
        </p>
        <p className="text-[48px] font-[NotoSansBold] font-bold mb-15">
          펫밀리
        </p>

        <img
          src={mainlogo}
          alt="온보딩 이미지"
          className="w-[171px] object-contain opacity-75"
        />
      </div>

      <div className="absolute bottom-10 left-0 w-full px-[10px]">
        <p className="text-[14px] text-[#ABABAB] font-[PretendardVariable] text-center">
          로그인하고 나의 가족을 관리하세요
        </p>
        <div className="flex flex-col mt-2 gap-2">
          <Button
            bgColor="#F56E6D"
            activeColor="#c54f4f"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
          <Button
            bgColor="#F56E6D"
            activeColor="#c54f4f"
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
