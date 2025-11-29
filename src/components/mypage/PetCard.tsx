import { useState, useRef, useEffect } from "react";
import moreIcon from "../../assets/more.svg";
import MiniTag from "../common/MiniTag";
import plus from "../../assets/plus.svg";
import { useNavigate } from "react-router-dom";

interface PetCardProps {
  type?: "normal" | "add";
  name?: string;
  gender?: string;
  birthDate?: string;
  petImageUrl?: string;
  colorHex?: string;
  onAddClick?: () => void;
}

function PetCard({
  type = "normal",
  name,
  gender,
  birthDate,
  petImageUrl,
  colorHex,
  onAddClick,
}: PetCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/petedit`, {
      state: {
        name,
        gender,
        birthDate,
        petImageUrl,
        colorHex,
      },
    });
  };

  useEffect(() => {
    //메뉴바 바깥 클릭 시 닫게하기
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (type === "add") {
    return (
      <button
        onClick={onAddClick}
        style={{ width: "calc(100%)" }}
        className="h-[190px] rounded-[20px] bg-[#ECECEC] shadow-md flex flex-col items-center justify-center"
      >
        <div className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center">
          <img src={plus} alt="add" className="w-6 h-6" />
        </div>
      </button>
    );
  }

  return (
    <div
      className="relative bg-white rounded-[20px] shadow-md pb-4"
      style={{
        width: "calc(100%)",
      }}
    >
      <img
        src={petImageUrl}
        alt={name}
        className="w-full h-[110px] object-cover rounded-t-[20px]"
      />

      <div className="flex justify-between items-center px-3 mt-2">
        <p className="text-lg font-semibold text-[#1f1f1f]">{name}</p>

        <button onClick={() => setMenuOpen(!menuOpen)}>
          <img src={moreIcon} alt="more" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-2 px-3 mt-2">
        <MiniTag label={gender!} colorHex={colorHex!} />
        <MiniTag label={birthDate!} colorHex={colorHex!} />
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-3 top-12 bg-white shadow-md rounded-lg w-[120px] z-10"
        >
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-t-lg text-sm"
            onClick={handleEditClick}
          >
            수정하기
          </button>
          <div className="w-full h-[1px] bg-[#E7EAED]"></div>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-b-lg text-sm text-red-500">
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default PetCard;
