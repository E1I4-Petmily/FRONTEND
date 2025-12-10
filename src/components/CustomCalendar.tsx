import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getKSTDate = (date = new Date()) => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 9 * 60 * 60000);
};

export interface CalendarEvent<T = unknown> {
  id: string | number;
  color?: string; // 이벤트 dot 색상 (반려동물 색깔 등)
  type?: string; // pet, hospital, etc.
  data?: T; // 추가 정보 (증상 내용, 예약 정보 등)
}

export interface CustomCalendarProps<T = unknown> {
  type: "pet" | "hospital-user" | "hospital-manage";

  // date → event array
  events?: Record<string, CalendarEvent<T>[]>;

  // 선택된 날짜를 부모로 전달
  onDateSelect?: (date: Date) => void;

  onMonthChange?: (year: number, month: number) => void;

  // 날짜 스타일링
  getDayStyle?: (params: {
    date: Date;
    isToday: boolean;
    isSelected: boolean;
  }) => string;

  selectedDate?: Date | null;

  // 날짜 아래 점 렌더링
  renderEventDot?: (events: CalendarEvent<T>[]) => React.ReactNode;
}

const CustomCalendar = <T,>({
  type,
  events = {},
  onDateSelect,
  onMonthChange,
  selectedDate,
  getDayStyle,
  renderEventDot,
}: CustomCalendarProps<T>) => {
  const today = getKSTDate();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const firstDayWeek = new Date(year, month, 1).getDay();

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDayWeek; i++) daysArray.push(null);
  for (let d = 1; d <= lastDayOfMonth; d++) daysArray.push(d);

  const prevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
    onMonthChange?.(newDate.getFullYear(), newDate.getMonth() + 1);
  };

  const nextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
    onMonthChange?.(newDate.getFullYear(), newDate.getMonth() + 1);
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  // 날짜 클릭 시
  const handleSelectDate = (day: number) => {
    const dateObj = new Date(year, month, day);
    onDateSelect?.(dateObj);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-2xl">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth}>
          <ChevronLeft size={24} />
        </button>
        <div className="font-semibold text-lg">
          {year}년 {month + 1}월
        </div>
        <button onClick={nextMonth}>
          <ChevronRight size={24} />
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className={`${idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : ""}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 text-center">
        {daysArray.map((day, i) => {
          if (!day) return <div key={i}></div>;

          const dateObj = new Date(year, month, day);
          const key = dateObj.toLocaleDateString("en-CA");
          const isToday = dateObj.toDateString() === today.toDateString();
          const isSelected =
            selectedDate &&
            dateObj.toDateString() === selectedDate.toDateString();

          const styleClass = getDayStyle
            ? getDayStyle({ date: dateObj, isToday, isSelected: !!isSelected })
            : "";

          const dayEvents = events[key] || [];

          return (
            <div
              key={i}
              onClick={() => handleSelectDate(day)}
              className={`py-2 cursor-pointer transition flex flex-col items-center ${styleClass}`}
            >
              {/* 날짜 숫자 + 선택 테두리 */}
              <div className="relative flex items-center justify-center h-6">
                {/* 숫자 */}

                {isToday && (
                  <div className="absolute w-6 h-6 rounded-full bg-[#F56E6D]" />
                )}

                {/* 숫자 */}
                <span className={`z-10 ${isToday ? "text-white" : ""}`}>
                  {day}
                </span>

                {/* 선택된 날: 테두리 원 */}
                {isSelected && (
                  <div className="absolute w-6 h-6 rounded-full border-[1.5px] border-[#F56E6D]"></div>
                )}
              </div>

              {/* 이벤트 점 */}
              <div className="h-3 flex justify-center items-start pt-1">
                {type === "pet" && renderEventDot && dayEvents.length > 0
                  ? renderEventDot(dayEvents)
                  : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
