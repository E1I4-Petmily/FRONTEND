import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RegisterLayout from "../../layouts/register-layout";
import { usePetFormStore } from "../../store/petFormStore";

export default function Photo() {
  const navigate = useNavigate();
  const { petInfo, setPhoto } = usePetFormStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const petPhoto = petInfo.photo;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (petPhoto instanceof File) {
      const url = URL.createObjectURL(petPhoto);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [petPhoto]);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const canProceed = petPhoto instanceof File;

  const handleNext = useCallback(() => {
    if (canProceed) {
      navigate("/register/information");
    } else {
      alert("반려동물의 사진을 등록해주세요.");
    }
  }, [canProceed, navigate]);

  return (
    <RegisterLayout
      step={2}
      title={<>반려동물 사진을 등록해주세요</>}
      subtitle="우리 아이의 모습을 담아보아요"
      onNext={handleNext}
      buttonContext="다음"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <label
          className={`w-64 h-64 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden transition duration-200 
            ${previewUrl ? "border-[#F56E6D]" : "border-gray-300 hover:border-gray-500"}`}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="반려동물 사진"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">사진 업로드 영역</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
          />
        </label>
      </div>
    </RegisterLayout>
  );
}
