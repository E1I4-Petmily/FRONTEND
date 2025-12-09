import Button from "../components/common/Button";
import Header from "../components/common/Header";
import searchIcon from "../assets/search-black.svg";

export default function HospitalSignUp() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header type="default" title="회원가입" />
      <div className="p-4 pt-16">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              병원이름
            </label>
            <div className="flex items-center w-full border-b border-[#D1D1D1]">
              <input
                id="name"
                type="text"
                placeholder="병원이름을 입력해주세요"
                className="flex-1 px-4 py-2 font-[PretendardVariable] focus:outline-none placeholder-[#ABABAB]"
              />
              <img
                src={searchIcon}
                alt=""
                className="w-5 h-5 opacity-70 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              담당자 이메일<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="text"
              placeholder="예) abc@gmail.com"
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              비밀번호<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="영문, 숫자 조합 8~16자"
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              비밀번호 확인<span className="text-red-500">*</span>
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              담당자 이름<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="한글, 영어만 사용 가능"
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              담당자 전화번호<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="010-1234-5678 형식으로 입력"
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-1">
              진료동물<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="강아지, 고양이, 햄스터.. 형식으로 입력"
              className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 w-full px-[10px]">
        <Button bgColor={"#F56E6D"} activeColor={"#c54f4f"}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
