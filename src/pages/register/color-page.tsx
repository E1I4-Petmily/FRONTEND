import { useNavigate } from "react-router-dom";
import { usePetFormStore } from "../../store/petFormStore";
import { useEffect, useState } from "react";
import RegisterLayout from "../../layouts/register-layout";

const colors = [
  "#E9D052",
  "#A0D062",
  "#68CE7D",
  "#31ADA7",
  "#36BCEF",
  "#369AD8",
  "#5657A7",
  "#8D55AC",
  "#B74CAA",
  "#F34F96",
  "#F84B55",
  "#F49543",
];

export default function Color() {
  const navigate = useNavigate();
  const { petInfo, setColor } = usePetFormStore();
  const [selectedColor, setSelectedColor] = useState<string | null>(
    petInfo?.color || null
  );

  const handleNext = () => {
    if (!selectedColor) return;
    setColor(selectedColor);
    navigate("/register/completion");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <RegisterLayout
      step={4}
      title={<>표시될 색상을 선택해주세요</>}
      subtitle="다이어리에 표시된 색으로 쉽게 확인해요"
      onNext={handleNext}
      buttonContext="완료"
    >
      <div className="grid grid-cols-4 gap-6 mt-6 place-items-center">
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-12 h-12 rounded-full cursor-pointer transition 
              ${selectedColor === color ? "ring-4 ring-offset-2 ring-[#F56E6D]" : ""}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </RegisterLayout>
  );
}
