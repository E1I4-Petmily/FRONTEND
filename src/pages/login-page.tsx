import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import { login } from "../apis/user";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(!!email && !!password);
  }, [email, password]);

  const handleLogIn = async () => {
    if (!formValid) return;

    try {
      await login({
        username: email,
        password,
      });
      navigate("/calendar");
    } catch (err) {
      console.error("로그인 실패: ", err);
      alert(err || "이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header type="default" title="로그인" />
      <div className="p-4 pt-16">
        <div className="mb-4">
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

        <div className="mb-4">
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

        <div className="absolute bottom-10 left-0 w-full px-[10px]">
          <Button
            bgColor={formValid ? "#F56E6D" : "#ABABAB"}
            activeColor={formValid ? "#c54f4f" : "#ABABAB"}
            onClick={formValid ? handleLogIn : undefined}
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
