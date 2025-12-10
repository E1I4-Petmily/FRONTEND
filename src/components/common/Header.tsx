import { useNavigate } from "react-router-dom";
import Back from "../../assets/back.svg";
import PetmilyLogo from "../../assets/petmily-logo.png";
import PetmilyLogo2 from "../../assets/petmily-logo2.svg";
import Lightening from "../../assets/lightning.svg";

type HeaderType =
  | "default"
  | "arrowOnly"
  | "titleOnly"
  | "logoOnly"
  | "logoOnlyNoPdf";

interface HeaderProps {
  type: HeaderType;
  title?: string;
  onIconClick?: () => void;
  bgColor?: string;
}

const Header = ({ type, title, bgColor }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleSummary = () => {
    navigate("/calendar/summary");
  };

  const headerContent = () => {
    switch (type) {
      case "default":
        return (
          <div className="flex items-center justify-center px-6">
            <button
              type="button"
              className="absolute left-6 cursor-pointer"
              onClick={handleClickBack}
            >
              <img src={Back} alt="뒤로 가기" className="w-6 h-6" />
            </button>
            <h1
              className={`font-[PretendardVariable] font-semibold text-[18px] select-none`}
            >
              {title}
            </h1>
          </div>
        );

      case "titleOnly":
        return (
          <div className="flex items-center justify-center px-6">
            {title && (
              <h1 className="font-[PretendardVariable] font-semibold text-[18px] select-none">
                {title}
              </h1>
            )}
          </div>
        );

      case "logoOnly":
        return (
          <div className="flex justify-between items-center px-6 w-full">
            <div className="flex items-center gap-1">
              <img src={PetmilyLogo} alt="펫밀리 로고" className="w-6 h-6" />
              <img src={PetmilyLogo2} alt="펫밀리 문구" className="w-18 h-6" />
            </div>
            <img
              src={Lightening}
              alt="PDF 변환 버튼"
              className="w-6 h-6 cursor-pointer"
              onClick={handleSummary}
            />
          </div>
        );

      case "logoOnlyNoPdf":
        return (
          <div className="flex justify-start items-center px-6 w-full">
            <div className="flex items-center gap-1">
              <img src={PetmilyLogo} alt="펫밀리 로고" className="w-6 h-6" />
              <img src={PetmilyLogo2} alt="펫밀리 문구" className="w-18 h-6" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <header
      className="fixed top-0 w-full max-w-[480px] mx-auto left-0 right-0 z-50 bg-[#F8F8F8] h-[50px] flex justify-center"
      style={{ backgroundColor: bgColor || "#F8F8F8" }}
    >
      <div className="w-full max-w-[480px] flex items-center justify-center relative">
        {headerContent()}
      </div>
    </header>
  );
};

export default Header;
