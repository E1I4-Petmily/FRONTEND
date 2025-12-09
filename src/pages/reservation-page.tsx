import { useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import Button from "../components/common/Button";

export default function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  // const [checked, setChecked] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDayStyle = ({ date }: { date: Date }) => {
    if (date < today) {
      return "text-gray-300 pointer-events-none"; // 회색 + 클릭 못하게
    }
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      return "bg-[#F56E6D] text-[#FFFFFF] rounded-lg font-semibold";
    }
    return "";
  };

  const amTimes = ["10:00", "11:00"];
  const pmTimes = [
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
  ];
  const petTypes = ["강아지", "고양이", "햄스터", "도마뱀", "앵무새"];

  return (
    <div className="bg-white min-h-screen mt-3">
      {/* 달력 + 시간 전체 박스 */}
      <div>
        <div className="p-4">
          <h2 className="font-[PretendardVariable] font-medium text-[16px] mb-4">
            날짜와 시간을 선택해주세요
          </h2>

          <CustomCalendar
            type="hospital-user"
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime("");
            }}
            getDayStyle={getDayStyle}
          />
        </div>

        {/* 날짜 선택 전: 여백 유지 */}
        {!selectedDate && <div className="h-10" />}

        {/* 날짜 선택 후: 시간 선택 표시 */}
        {selectedDate && (
          <>
            <hr className="mx-4 text-[#E7EAED]" />

            <div className="mt-6 p-4">
              <div className="mb-4">
                <div className="font-medium mb-2">오전</div>
                <div className="grid grid-cols-4 gap-2">
                  {amTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`border rounded-lg py-2 text-center ${
                        selectedTime === time
                          ? "bg-[#F56E6D] text-white"
                          : "border-gray-300 text-[#656565]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="font-medium mb-2">오후</div>
                <div className="grid grid-cols-4 gap-2">
                  {pmTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`border rounded-lg py-2 text-center ${
                        selectedTime === time
                          ? "bg-[#F56E6D] text-white"
                          : "border-gray-300 text-[#656565]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {selectedDate && <div className="h-3 bg-[#F8F8F8] w-full" />}

      {selectedDate && (
        <div className="mt-3 p-4 bg-white mb-4">
          <div className="font-[PretendardVariable] font-medium mb-2">
            진료대상 반려동물 종을 선택해주세요
          </div>
          <div className="grid grid-cols-4 gap-2">
            {petTypes.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedPet(tag)}
                className={`font-[PretendardVariable] font-light text-[14px] px-3.5 py-1.5 rounded-full border ${
                  selectedPet === tag
                    ? "bg-[#F56E6D] text-white border-[#F56E6D]"
                    : "bg-white border-[#ABABAB] text-[#656565]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && <div className="h-3 bg-[#F8F8F8] w-full" />}

      {selectedDate && (
        <div className="mt-3 p-4 bg-white pb-40">
          <div className="font-[PretendardVariable] font-medium mb-2">
            AI 요약 리포트 첨부 여부를 알려주세요
          </div>
          <label className="flex items-center gap-2 cursor-pointer mb-1">
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded-sm"
              // onChange={(e) => setChecked(e.target.checked)}
            />
            <span className="font-[PretendardVariable] font-medium text-[15px] text-[#333333]">
              AI 요약 리포트 첨부
            </span>
          </label>
          <p className="font-[PretendardVariable] text-[12px] text-gray-500 pl-6 leading-tight">
            *반려동물 정보 수집에 동의하며 진료 이후 2년 뒤 삭제됩니다
          </p>
        </div>
      )}

      <div className="fixed bottom-20 py-2 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white px-3 z-50">
        <Button onClick={() => {}} bgColor="#F56E6D" activeColor="#c54f4f">
          예약하기
        </Button>
      </div>
    </div>
  );
}
