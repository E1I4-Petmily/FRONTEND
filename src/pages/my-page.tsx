import PetCard from "../components/mypage/PetCard";
import pencil from "../assets/pencil.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfo } from "../apis/user";
import { getPetList, deletePet } from "../apis/pet";
import type { UserInfoResponse } from "../apis/user";
import type { PetResponse } from "../apis/pet";
import { getProfileIcon } from "../utils/profileIcon";

export default function MyPage() {
  const navigate = useNavigate();

  //상태추가
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
  const [petList, setPetList] = useState<PetResponse[]>([]);

  const handleReportClick = (petId: number) => {
    navigate("/mypage/reports", { state: { petId } });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
        console.log("내정보", user);

        const pets = await getPetList();
        setPetList(pets);
        console.log("반려동물정보", pets);
      } catch (error) {
        console.error("마이페이지 데이터 로드 실패", error);
      }
    }

    fetchData();
  }, []);

  const handleDeletePet = async (petId: number) => {
    const confirmDelete = window.confirm(
      "정말 삭제하시겠어요?\n삭제된 정보는 되돌릴 수 없어요."
    );

    if (!confirmDelete) return;

    try {
      await deletePet(petId);

      setPetList((prev) => prev.filter((pet) => pet.petId !== petId));
    } catch (err) {
      console.error("반려동물 삭제 실패", err);
    }
  };

  return (
    <div className="px-6 pb-24 mt-4 font-[PretendardVariable]">
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[100px] bg-[#f7e3c2] rounded-[40px] flex items-center justify-center">
          <img
            src={getProfileIcon(userInfo?.userProfile)}
            alt="profile icon"
            className="w-[70px]"
          />
        </div>

        <div className="flex items-center gap-1 mt-4">
          <p className="text-xl font-semibold">
            {userInfo ? userInfo.nickname : ""}
          </p>
          <img src={pencil} alt="edit" className="w-7 h-7" />
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#E7EAED] mt-6"></div>

      <div className="mt-5">
        <p className="text-sm font-semibold">PDF 요약 리포트</p>

        <div className="flex flex-col gap-2 mt-3">
          {petList.map((pet) => (
            <button
              key={pet.petId}
              className="text-base font-medium text-left"
              onClick={() => handleReportClick(pet.petId)}
            >
              {pet.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#E7EAED] my-6"></div>

      <p className="text-sm font-semibold mb-3">내 반려동물</p>

      <div className="grid grid-cols-2 gap-7">
        {petList.map((pet) => (
          <PetCard
            key={pet.petId}
            type="normal"
            petId={pet.petId}
            name={pet.name}
            gender={pet.gender}
            birthDate={pet.birthDate}
            petImageUrl={pet.petImageUrl}
            colorHex={pet.colorHex}
            onDelete={() => handleDeletePet(pet.petId)}
          />
        ))}
        <PetCard type="add" onAddClick={() => navigate("/register/welcome")} />
      </div>

      <div className="w-full flex justify-center mt-10 mb-3">
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/");
          }}
          className="text-red-500 text-sm font-medium"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
