import { useNavigate } from "react-router-dom";
import bird from "../../assets/register-welcome/yellow-bird.png";
import cat from "../../assets/register-welcome/gray-cat.png";
import dog from "../../assets//register-welcome/brown-dog.png";
import RegisterLayout from "../../layouts/register-layout";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <RegisterLayout
      step={1}
      title={
        <>
          우리 집 <span className="text-[#F56E6D]">반려동물</span>, 잊지 말고
          기록해요
        </>
      }
      subtitle="이름과 기본정보를 등록해 맞춤형 서비스를 시작해요"
      onNext={() => navigate("/register/photo")}
      buttonContext="다음"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle at center, #F56E6D 0%, transparent 52%)",
            opacity: 0.8,
          }}
        />
      </div>

      <img
        src={bird}
        alt="새"
        className="absolute top-[28%] left-[-0.5%] h-40 w-44 z-10 rotate-[2deg]"
      />
      <img
        src={cat}
        alt="고양이"
        className="absolute bottom-[40%] right-0 h-38 w-48 z-10"
      />
      <img
        src={dog}
        alt="개"
        className="absolute bottom-[25%] left-[5%] h-34 w-44 z-10"
      />
    </RegisterLayout>
  );
}
