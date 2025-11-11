import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Header from "../components/common/Header";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(!!email && !!password);
  }, [email, password]);

  // 임시 연결 코드
  const handleLogIn = () => {
    const accessionUser = localStorage.getItem("user");
    if (!accessionUser) {
      alert("회원 정보 존재하지 않음");
      return;
    }
    const user = JSON.parse(accessionUser);

    if (email === user.email && password === user.password) {
      navigate("/onboarding/welcome");
    } else {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  /*    백엔드 연동 시 사용 코드
  const handleLogIn = async () => {
    try {
      const res = await axios.post("/api/users/signin", {
        email,
        password,
      });
      // 백엔드에서 내려주는 데이터 구조 맞춰서 수정 필요
      const { token } = res.data;
      localStorage.setItem("accessToken", token);

      const userRes = await axios.get("/api/pets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = userRes.data;

      if (user.pets && user.pets.length > 0) {
        navigate("/calendar");
      } else {
        navigate("/onboarding/welcome");
      }
    } catch (error: any) {
      console.error("로그인 실패: ", error);
      alert(
        error.response?.data?.message ||
          "이메일 또는 비밀번호가 올바르지 않습니다."
      );
    }
  };
  */

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header type="default" title="로그인" />
      <div className="p-4">
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
