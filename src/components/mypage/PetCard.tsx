import { useState } from "react";
import moreIcon from "../../assets/more.svg";

interface PetCardProps {
  name: string;
  gender: string;
  birthDate: string;
  petImageUrl: string;
}

function PetCard({ name, gender, birthDate, petImageUrl }: PetCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-[150px] bg-white rounded-[20px] shadow-md pb-4">
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

      <div className="flex gap-2 px-3 mt-1">
        <span className="px-2 py-0.5 text-xs rounded-[20px] bg-[#ccfffa] text-[#00c8b3]">
          {gender}
        </span>
        <span className="px-2 py-0.5 text-xs rounded-[20px] bg-[#ccfffa] text-[#00c8b3]">
          {birthDate}
        </span>
      </div>

      {menuOpen && (
        <div className="absolute right-3 top-12 bg-white shadow-md rounded-lg w-[100px] py-2 z-10">
          <button className="w-full text-left px-3 py-1 hover:bg-gray-100 text-sm">
            수정하기
          </button>
          <button className="w-full text-left px-3 py-1 hover:bg-gray-100 text-sm text-red-500">
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default PetCard;
