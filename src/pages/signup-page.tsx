import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import axios from "axios";
import cat from "../assets/profile-icons/cat.png";
import tigercat from "../assets/profile-icons/cheese.png";
import siba from "../assets/profile-icons/siba.png";
import dog from "../assets/profile-icons/dog.png";
import bird from "../assets/profile-icons/bird.png";
import chick from "../assets/profile-icons/chick.png";
import hamster from "../assets/profile-icons/hamster.png";
import rabbit from "../assets/profile-icons/rabbit.png";
import pig from "../assets/profile-icons/pig.png";
import Button from "../components/common/Button";
import Header from "../components/common/Header";

const SignUp: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [selectedProfileAnimal, setSelectedProfileAnimal] =
    useState<string>("cat1");
  const [showProfilePicker, setShowProfilePicker] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const animals = [
    { id: "cat1", src: cat, alt: "고양이1" },
    { id: "cat2", src: tigercat, alt: "고양이2" },
    { id: "dog1", src: siba, alt: "강아지1" },
    { id: "dog2", src: dog, alt: "강아지2" },
    { id: "bird", src: bird, alt: "앵무새" },
    { id: "chick", src: chick, alt: "병아리" },
    { id: "hamster", src: hamster, alt: "햄스터" },
    { id: "rabbit", src: rabbit, alt: "토끼" },
    { id: "pig", src: pig, alt: "돼지" },
  ];

  useEffect(() => {
    if (
      email &&
      password &&
      passwordConfirm &&
      nickname &&
      password === passwordConfirm
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password, passwordConfirm, nickname]);

  const handleSignUp = async () => {
    try {
      const user = {
        email,
        password,
        nickname,
        profile: selectedProfileAnimal,
      };
      // 실제 백엔드 연결 시 사용
      const res = await axios.post("/api/users/signup", user, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201 || res.status === 200) {
        navigate("/landing");
      }
    } catch (err: any) {
      console.error(err);

      // 임시
      const user = {
        email,
        password,
        nickname,
        profile: selectedProfileAnimal,
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/landing");
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen relative">
        <Header type="default" title="회원가입" />
        <div className="p-4">
          <div className="mb-3">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              이메일<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="text"
              placeholder="예) abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <div className="mb-3">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              비밀번호<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="영문, 숫자 조합 8~16자"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <div className="mb-3">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              비밀번호 확인<span className="text-red-500">*</span>
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <div className="mb-3">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              닉네임<span className="text-red-500">*</span>
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="한글, 영어, 숫자만 사용 가능"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <p className="text-[16px] font-[PretendardVariable] font-semibold mb-2">
            프로필 선택
          </p>
          <div
            className="relative w-[80px] h-[80px] rounded-4xl bg-[#F7E3C2] flex items-center justify-center overflow-visible cursor-pointer"
            onClick={() => setShowProfilePicker(true)}
          >
            <img
              src={animals.find((p) => p.id === selectedProfileAnimal)?.src}
              alt="선택된 프로필"
              className="w-12 h-12 object-contain z-10"
            />

            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#F56E6D] rounded-full flex items-center justify-center border-2 border-white z-20">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>

          {showProfilePicker && (
            <div className="absolute inset-0 bg-black/30 flex items-end justify-center z-50">
              <div className="w-full bg-white p-6 rounded-t-2xl shadow-lg">
                <div className="grid grid-cols-3 gap-6 place-items-center">
                  {animals.map((animal) => (
                    <button
                      key={animal.id}
                      type="button"
                      onClick={() => {
                        setSelectedProfileAnimal(animal.id);
                        setShowProfilePicker(false);
                      }}
                      className={`w-[100px] h-[100px] rounded-4xl flex items-center justify-center 
              bg-[#F7E3C2] transition border-4 
              ${
                selectedProfileAnimal === animal.id
                  ? "border-[#F56E6D]"
                  : "border-transparent"
              }`}
                    >
                      <img
                        src={animal.src}
                        alt={animal.alt}
                        className="w-[70px] h-[70px] object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-10 left-0 w-full px-[10px]">
            <Button
              bgColor={formValid ? "#F56E6D" : "#ABABAB"}
              activeColor={formValid ? "#c54f4f" : "#ABABAB"}
              onClick={handleSignUp}
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
