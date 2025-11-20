import { useMemo, useState } from "react";
import CustomCalendar, {
  type CalendarEvent,
} from "../components/CustomCalendar";
import { MOCK_PETS, MOCK_LOGS } from "../mocks/mockPets";
import type { Pet } from "../types/pet";

export default function CalendarPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const [petSymptomsByDate, setPetSymptomsByDate] = useState<
    Record<string, Record<number, string[]>>
  >({});

  const formatDate = (date: Date) => {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}월 ${date.getDate()}일(${dayNames[date.getDay()]})`;
  };

  const handlePetEditClick = (pet: Pet) => {
    setSelectedPet(pet);
    setBottomSheetOpen(true);
  };

  // 1. 캘린더용 이벤트 데이터 변환
  const calendarEvents = useMemo(() => {
    const events: Record<string, CalendarEvent[]> = {};

    MOCK_LOGS.forEach((log) => {
      const pet = MOCK_PETS.find((p) => p.id === log.petId);
      if (!pet) return;

      if (!events[log.date]) {
        events[log.date] = [];
      }
      // 중복 방지: 해당 날짜에 해당 펫의 점이 이미 있으면 추가 안 함
      if (!events[log.date].find((e) => e.id === pet.id)) {
        events[log.date].push({
          id: pet.id,
          color: pet.color,
          type: "pet",
          data: log,
        });
      }
    });
    return events;
  }, []);

  return (
    <div
      className="p-4 min-h-screen"
      style={{
        background: `
          linear-gradient(
            to bottom,
            transparent 20%,
            rgba(245,110,109,0.15) 35%,
            transparent 55%
          )
        `,
      }}
    >
      <CustomCalendar
        type="pet"
        onDateSelect={(date) => setSelectedDate(date)}
        selectedDate={selectedDate}
        events={calendarEvents}
        getDayStyle={({ isToday, isSelected }) => {
          if (isToday)
            return "bg-[#F56E6D] text-white font-bold hover:bg-[#e05a59]";
          if (isSelected)
            return "border-[1.5px] border-[#F56E6D] text-gray-900 font-bold";
          return "text-gray-700 hover:bg-gray-100";
        }}
        renderEventDot={(events) => (
          <div className="flex gap-0.5">
            {events.slice(0, 3).map((evt, idx) => (
              <div
                key={idx}
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: evt.color }}
              />
            ))}
          </div>
        )}
      />

      {selectedDate && (
        <div className="mt-6 w-full max-w-md bg-white rounded-xl shadow p-4">
          {/* 날짜 헤더 */}
          <div className="text-lg font-semibold mb-4">
            {formatDate(selectedDate)}
          </div>

          {/* 반려동물 리스트 */}
          <div className="flex flex-col gap-3">
            {MOCK_PETS.map((pet) => {
              const dateKey = selectedDate.toISOString().split("T")[0];
              const symptoms = petSymptomsByDate[dateKey]?.[pet.id] || [];

              return (
                <div
                  key={pet.id}
                  className="flex items-start gap-3 p-3 border rounded-lg"
                >
                  {/* 대표색 세로 바 */}
                  <div
                    className="w-2 rounded-md"
                    style={{ backgroundColor: pet.color }}
                  />

                  {/* 이름 + 증상 */}
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{pet.name}</div>

                    {/* 저장된 증상 목록 */}
                    {symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {symptoms.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 border text-gray-600 flex items-center gap-1"
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: pet.color }}
                            />
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 연필 아이콘 버튼 */}
                  <button
                    onClick={() => handlePetEditClick(pet)}
                    className="text-gray-500 hover:text-black"
                  >
                    ✏️
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {bottomSheetOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-2xl p-4">
          <div className="text-center text-lg font-semibold mb-2">
            {selectedPet?.name} 기록하기
          </div>

          <div className="text-sm text-gray-500 text-center mb-4">
            (여기에 체중/행동/식습관/외형/생리 바텀시트 페이지 넣으면 됨)
          </div>

          <button
            onClick={() => setBottomSheetOpen(false)}
            className="w-full py-3 bg-gray-200 rounded-lg"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
