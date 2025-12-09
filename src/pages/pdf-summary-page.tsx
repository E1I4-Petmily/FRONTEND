import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../assets/mini-calendar.svg";
import Button from "../components/common/Button";
import { createPdfSummary } from "../apis/pdf";

export default function PDFSummaryPage() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(firstDay);
  const [endDate, setEndDate] = useState<Date>(lastDay);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD 형태
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("리포트 제목을 입력해주세요");
      return;
    }

    setLoading(true);

    try {
      const data = {
        title,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      };

      console.log("📤 PDF 요약 API 요청:", data);

      const response = await createPdfSummary(data);

      console.log("📥 API 응답:", response);

      alert("PDF 요약 리포트 생성 요청이 완료되었습니다!");
    } catch (error) {
      console.error(error);
      alert("PDF 리포트 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="p-5 pt-8 pb-32">
        <div className="mb-4">
          <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-3">
            리포트 제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="AI 요약 리포트 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[16px] font-[PretendardVariable] font-semibold mb-3">
            생성 기간
          </label>

          <div className="flex items-center gap-x-2">
            <div className="flex items-center w-[125px] border border-[#ABABAB] rounded-lg bg-white px-2 py-2">
              <img
                src={calendarIcon}
                alt="캘린더 아이콘"
                className="w-5 h-5 mr-2"
              />
              <DatePicker
                selected={startDate}
                onChange={(date) => date && setStartDate(date)}
                dateFormat="yyyy.MM.dd"
                className="w-full font-[PretendardVariable] outline-none"
              />
            </div>

            <span className="text-[#9A9A9A] text-[14px] mr-2">부터</span>

            <div className="flex items-center w-[125px] border border-[#ABABAB] rounded-lg bg-white px-2 py-2">
              <img
                src={calendarIcon}
                alt="캘린더 아이콘"
                className="w-5 h-5 mr-2"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => date && setEndDate(date)}
                dateFormat="yyyy.MM.dd"
                className="w-full font-[PretendardVariable] outline-none"
              />
            </div>

            <span className="text-[#9A9A9A] text-[14px]">까지</span>
            <div className="absolute bottom-35 left-0 w-full px-[10px]">
              <Button
                onClick={handleSubmit}
                bgColor="#F56E6D"
                activeColor="#c54f4f"
                disabled={loading}
              >
                {loading ? "생성 중..." : "생성하기"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
