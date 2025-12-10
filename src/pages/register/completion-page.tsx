import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { usePetFormStore } from "../../store/petFormStore";
import { registerPet } from "../../apis/pet";
import { useEffect } from "react";

const Completion = () => {
  const navigate = useNavigate();
  const { petInfo, resetPetForm } = usePetFormStore();

  const petName = petInfo.name || "우리 아이";
  const petPhoto = petInfo.photo
    ? URL.createObjectURL(petInfo.photo as File)
    : null;
  const petColor = petInfo.color || "#F56E6D";
  console.log("Onboarding state:", petInfo);

  const handleRegister = async () => {
    try {
      await registerPet(petInfo);
      alert("등록 성공!");
      resetPetForm();
      navigate("/calendar");
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-4 text-center mt-10">
      {petPhoto && (
        <img
          src={petPhoto}
          alt={petName}
          className="w-32 h-32 rounded-full object-cover"
          style={{
            border: `6px solid ${petColor}`,
          }}
        />
      )}

      <div className="text-[17px] font-[PretendardVariable] font-medium">
        <p>{petName}의 하루를 기록하고 관리할 준비가 끝났어요.</p>
        <p className="mt-2 text-[#ABABAB] text-[15px] font-[PretendardVariable] font-light">
          펫밀리를 통해 {petName}와의 소중한 시간을 놓치지 마세요!
        </p>
      </div>

      <div className="absolute bottom-10 left-0 w-full px-[10px]">
        <Button
          onClick={handleRegister}
          bgColor="#F56E6D"
          activeColor="#c54f4f"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default Completion;
