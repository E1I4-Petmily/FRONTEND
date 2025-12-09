import { useState } from "react";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import searchIcon from "../assets/search-black.svg";
import { searchHospitals, type HospitalSearchResult } from "../apis/hospital";
import { registerHospital } from "../apis/hospital";
import { useNavigate } from "react-router-dom";

export default function HospitalSignUp() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<HospitalSearchResult[]>([]);

  // 필드 상태
  const [hospitalName, setHospitalName] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [animalTypes, setAnimalTypes] = useState("");
  const [departments, setDepartments] = useState("");
  const [businessHours, setBusinessHours] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const data = await searchHospitals(value);
    setResults(Array.isArray(data) ? data : []);
  };

  const selectHospital = (item: HospitalSearchResult) => {
    setHospitalName(item.name);
    setAddress(item.address); // 주소 자동 저장
    setPlaceId(item.placeId);
    setIsSearchOpen(false);
  };

  const handleRegister = async () => {
    //비밀번호 확인
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    //필수 값 체크
    if (!hospitalName || !address || !username || !password) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    const body = {
      username,
      password,
      nickname: hospitalName, //병원명으로 설정
      userProfile: 1, //임시 값
      managerName,
      managerPhone,
      hospitalName,
      representativeName,
      address,
      animalTypes,
      departments,
      businessHours,
      placeId,
    };

    try {
      await registerHospital(body);
      alert("병원 회원가입이 완료되었습니다!");
      navigate("/landing", { replace: true });
    } catch (err) {
      console.error(err);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative ">
      <Header type="default" title="회원가입" />

      <div className="p-4 pt-16 mb-20">
        <div className="flex flex-col gap-5">
          {/* 병원이름 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">병원이름</label>
            <div
              className="flex items-center w-full border-b border-[#D1D1D1] cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <input
                type="text"
                placeholder="병원이름을 입력해주세요"
                value={hospitalName}
                readOnly
                className="flex-1 px-4 py-2 placeholder-[#ABABAB] focus:outline-none"
              />
              <img src={searchIcon} className="w-5 h-5 opacity-70" />
            </div>
          </div>

          {/* 병원 주소 검색 선택 후 자동 입력 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">병원 주소</label>
            <input
              type="text"
              value={address}
              readOnly
              placeholder="검색 시 자동입력됩니다"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 담당자 이메일 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">
              담당자 이메일<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="예) abc@gmail.com"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">
              비밀번호<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="영문, 숫자 조합 8~16자"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">
              비밀번호 확인<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 한 번 더 입력해주세요"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 담당자 이름 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">
              담당자 이름<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              placeholder="한글, 영어만 사용 가능"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 담당자 전화번호 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">
              담당자 전화번호<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={managerPhone}
              onChange={(e) => setManagerPhone(e.target.value)}
              placeholder="010-1234-5678 형식으로 입력"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 대표자명 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">대표자명</label>
            <input
              type="text"
              value={representativeName}
              onChange={(e) => setRepresentativeName(e.target.value)}
              placeholder="대표자명을 입력해주세요"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 진료 동물 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">
              진료 동물<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={animalTypes}
              onChange={(e) => setAnimalTypes(e.target.value)}
              placeholder="강아지, 고양이, 햄스터 등"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 진료 분야 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">진료 분야</label>
            <input
              type="text"
              value={departments}
              onChange={(e) => setDepartments(e.target.value)}
              placeholder="내과, 외과 등"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>

          {/* 영업 시간 */}
          <div className="flex flex-col">
            <label className="text-[16px] font-semibold mb-1">영업 시간</label>
            <input
              type="text"
              value={businessHours}
              onChange={(e) => setBusinessHours(e.target.value)}
              placeholder="월~금 10:00~19:00"
              className="w-full px-4 py-2 border-b border-[#D1D1D1] placeholder-[#ABABAB] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 pb-5 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white px-6 z-50">
        <Button
          bgColor="#F56E6D"
          activeColor="#c54f4f"
          onClick={handleRegister}
        >
          회원가입
        </Button>
      </div>

      {/* 검색 모달 */}
      {isSearchOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[9998]"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* 모달 */}
          <div
            className="fixed top-32 left-1/2 -translate-x-1/2 
      w-[90%] max-w-[380px] bg-white rounded-2xl z-[9999] 
      p-4 shadow-lg"
          >
            {/* 검색창 */}
            <div className="w-full h-[42px] rounded-2xl border border-[#D1D1D1] flex items-center px-4">
              <input
                type="text"
                placeholder="동물병원 검색"
                value={searchText}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent outline-none text-[15px]"
              />
              <img src={searchIcon} className="w-5 h-5" />
            </div>

            {/* 검색 결과 리스트 */}
            <div className="mt-4 max-h-[350px] overflow-y-auto flex flex-col gap-3">
              {results.length === 0 && (
                <p className="text-center text-sm text-gray-400">
                  검색 결과가 없습니다
                </p>
              )}

              {results.map((item) => (
                <div
                  key={item.placeId}
                  className="p-3 cursor-pointer border-b-[0.5px] border-[#D1D1D1]"
                  onClick={() => selectHospital(item)}
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.address}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
