import { useEffect, useState } from "react";
import CustomCalendar, {
  type CalendarEvent,
} from "../components/CustomCalendar";
import {
  getReservationsByDate,
  type ReservationResponse,
} from "../apis/hospital-reservation";
import file from "../assets/file.png";

export default function HospitalHome() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);

  const calendarEvents: Record<string, CalendarEvent[]> = {};

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // 날짜 선택 시 예약 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateString = formatDate(selectedDate);
        const data = await getReservationsByDate(dateString);
        setReservations(data);
      } catch (e) {
        console.error("예약 조회 실패:", e);
      }
    };

    fetchData();
  }, [selectedDate]);

  const displayDate = `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;

  return (
    <div
      className="p-4 min-h-screen pb-25"
      style={{
        background: `
          linear-gradient(
            to bottom,
            transparent 10%,
            rgba(245,110,109,0.25) 50%,
            transparent 80%
          )
        `,
      }}
    >
      <div className="mb-3 mt-2 font-[PretendardVariable]">
        <div className="text-[14px] text-[#000000]">안녕하세요!</div>
        <div className="text-[14px] text-[#000000]">
          오늘은 <span className="text-[#F56E6D]">{reservations.length}</span>
          개의 진료 예약이 잡혀 있습니다.
        </div>
      </div>
      <CustomCalendar
        type="hospital-manage"
        onDateSelect={(date) => setSelectedDate(date)}
        selectedDate={selectedDate}
        events={calendarEvents}
        getDayStyle={({ isToday }) => {
          return isToday ? "text-[#FFFFFF]" : "text-gray-700";
        }}
        renderEventDot={() => null}
      />

      <div className="mt-6">
        <div className="bg-white rounded-xl py-5 px-3 border border-[#EDEDED]">
          <div className="font-[PretendardVariable] font-medium text-center text-[15px] mb-4">
            [{displayDate}] 진료 예약 목록
          </div>

          <div className="grid grid-cols-4 text-[12px] text-gray-700 mb-2 px-7 pl-3">
            <div>시간</div>
            <div>보호자</div>
            <div>종류</div>
            <div className="">이름</div>
          </div>

          {reservations.length === 0 ? (
            <div className="text-center text-gray-500 text-[14px] mt-3">
              예약된 진료가 없습니다.
            </div>
          ) : (
            <ul className="space-y-2">
              {reservations.map((r, idx) => (
                <li
                  key={idx}
                  className="flex items-center bg-[#FFDEDA] rounded-lg p-3"
                >
                  {/* 왼쪽 정보 영역 (4개 항목) */}
                  <div className="grid grid-cols-4 w-full text-[14px] gap-2">
                    <div className="font-medium">{r.time}</div>
                    <div>{r.guardianName}</div>
                    <div>{r.petType}</div>
                    <div>{r.petName}</div>
                  </div>

                  {/* pdf null 아닐경우에만 아이콘 보이게 */}
                  {r.reportPdfUrl && (
                    <div
                      className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm ml-auto"
                      onClick={() => window.open(r.reportPdfUrl, "_blank")}
                    >
                      <img src={file} alt="파일 아이콘" className="w-5 h-5" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
