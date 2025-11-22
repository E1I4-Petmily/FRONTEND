import { useState } from "react";
import CustomCalendar from "../components/CustomCalendar";

export default function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

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

  return (
    <div className="bg-white mt-3">
      <div className="p-4 min-h-screen">
        <h2 className="font-[PretendardVariable] font-medium text-[16px] mb-4">
          날짜와 시간을 선택해주세요
        </h2>

        <CustomCalendar
          type="hospital-user"
          selectedDate={selectedDate}
          onDateSelect={(date) => {
            setSelectedDate(date);
            setSelectedTime(""); // 날짜 바뀌면 시간 초기화
          }}
          getDayStyle={getDayStyle}
        />

        <hr className="px-4 text-[#E7EAED]" />

        {selectedDate && (
          <div className="mt-6">
            <div className="mb-4">
              <div className="font-medium mb-2">오전</div>
              <div className="flex flex-wrap gap-2">
                {amTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`border rounded-lg py-2 px-4 ${
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
              <div className="flex flex-wrap gap-2">
                {pmTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`border rounded-lg py-2 px-4 ${
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
        )}
      </div>
    </div>
  );
}
