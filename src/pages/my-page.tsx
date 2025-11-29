import catIcon from "../assets/profile-icons/cat.png";
import PetCard from "../components/mypage/PetCard";
import cat1 from "../assets/고양이1.jpg";
import pencil from "../assets/pencil.svg";

export default function MyPage() {
  return (
    <div className="px-6 pb-24">
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[100px] bg-[#f7e3c2] rounded-[40px] flex items-center justify-center">
          <img src={catIcon} alt="profile icon" className="w-[70px]" />
        </div>

        <div className="flex items-center gap-1 mt-4">
          <p className="text-xl font-semibold">식빵엄마</p>
          <img src={pencil} alt="edit" className="w-7 h-7" />
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#E7EAED] mt-6"></div>

      <div className="mt-5">
        <p className="text-sm font-semibold">PDF 요약 리포트</p>

        <div className="flex flex-col gap-2 mt-3">
          <p className="text-base font-medium">식빵</p>
          <p className="text-base font-medium">쿠키</p>
          <p className="text-base font-medium">고먐미</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#E7EAED] my-6"></div>

      <p className="text-sm font-semibold mb-3">내 반려동물</p>

      <div className="grid grid-cols-2 gap-7">
        <PetCard
          type="normal"
          petId={1}
          name="식빵"
          gender="수컷"
          birthDate="2023-10-04"
          petImageUrl={cat1}
          colorHex="#00c8b3"
        />

        <PetCard
          type="normal"
          petId={2}
          name="쿠키"
          gender="수컷"
          birthDate="2023-10-04"
          petImageUrl={cat1}
          colorHex="#00c8b3"
        />

        <PetCard
          type="normal"
          petId={3}
          name="고먐미"
          gender="수컷"
          birthDate="2023-10-04"
          petImageUrl={cat1}
          colorHex="#FFCC00"
        />
        <PetCard type="add" onAddClick={() => alert("추가버튼 클릭")} />
      </div>
    </div>
  );
}
