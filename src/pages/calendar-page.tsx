import { useMemo, useState } from "react";
import CustomCalendar, {
  type CalendarEvent,
} from "../components/CustomCalendar";
import { MOCK_PETS, MOCK_LOGS } from "../mocks/mockPets";
import type { Pet } from "../types/pet";
import pencil from "../assets/pencil.svg";
import Button from "../components/common/Button";
import weightIcon from "../assets/record-icons/weight.svg";
import behaviorIcon from "../assets/record-icons/food.svg";
import appearanceIcon from "../assets/record-icons/bandage.svg";
import periodIcon from "../assets/record-icons/poop.svg";
import { useNavigate } from "react-router-dom";
import Picker from "react-mobile-picker";

export default function CalendarPage() {
  const today = new Date();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showRecordPicker, setShowRecordPicker] = useState(false);
  const [showWeightPicker, setShowWeightPicker] = useState(false);
  const [pickerValue, setPickerValue] = useState({
    kg: "00",
    decimal: "00",
  });

  const numbers = Array.from({ length: 100 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const weightSelections = {
    kg: numbers,
    decimal: numbers,
  };

  const [petSymptomsByDate] = useState<
    Record<string, Record<number, string[]>>
  >({});

  const formatDate = (date: Date) => {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}월 ${date.getDate()}일(${dayNames[date.getDay()]})`;
  };

  const handlePetEditClick = (pet: Pet) => {
    setSelectedPet(pet);
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
        getDayStyle={({ isToday }) => {
          return isToday ? "text-[#FFFFFF]" : "text-gray-700 hover:bg-gray-100";
        }}
        renderEventDot={(events) => (
          <div className="flex gap-0.5">
            {events.slice(0, 3).map((evt, idx) => (
              <div
                key={idx}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: evt.color }}
              />
            ))}
          </div>
        )}
      />

      {selectedDate && (
        <div className="mt-6 w-full max-w-md bg-white rounded-xl shadow p-4">
          <div className="font-[PretendardVariable] font-medium text-[#4C4C4C] text-[16px] mb-4">
            {formatDate(selectedDate)}
          </div>

          <div className="flex flex-col gap-3">
            {MOCK_PETS.map((pet) => {
              const dateKey = selectedDate.toISOString().split("T")[0];
              const symptoms = petSymptomsByDate[dateKey]?.[pet.id] || [];

              return (
                <div key={pet.id} className="flex items-start gap-3 rounded-lg">
                  <div
                    className="w-2 h-6.5 rounded-md"
                    style={{ backgroundColor: pet.color }}
                  />

                  <div className="flex-1">
                    <div className="font-[PretendardVariable] font-medium text-[18px] text-[#2C2C2C]">
                      {pet.name}
                    </div>

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

                  <button
                    onClick={() => {
                      handlePetEditClick(pet);
                      setShowRecordPicker(true);
                    }}
                    className="text-gray-500 hover:text-black"
                  >
                    <img src={pencil} alt="기록 버튼" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showRecordPicker && (
        <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
          <div className="w-full bg-white pb-6 px-[10px] rounded-t-2xl shadow-lg">
            <div className="text-left text-lg font-semibold mb-4 pl-4 mt-4">
              {selectedPet?.name} 기록하기
            </div>

            <div className="flex justify-between px-8 mt-8 mb-20">
              {[
                { label: "체중", icon: weightIcon, type: "picker" },
                {
                  label: "행동/식습관",
                  icon: behaviorIcon,
                  type: "page",
                  path: "/calendar/behavior",
                },
                {
                  label: "외형이상",
                  icon: appearanceIcon,
                  type: "page",
                  path: "/calendar/appearance",
                },
                {
                  label: "생리반응",
                  icon: periodIcon,
                  type: "page",
                  path: "/calendar/reaction",
                },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowRecordPicker(false);
                    if (item.type === "picker") {
                      setShowWeightPicker(true);
                      return;
                    }
                    if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F56E6D] flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  <span className="font-[PretendardVariable] font-light text-[#2C2C2C] text-[12px]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <Button
              bgColor="#F56E6D"
              activeColor="#c54f4f"
              onClick={() => setShowRecordPicker(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      )}

      {showWeightPicker && (
        <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
          <div className="w-full bg-white pb-6 px-[10px] rounded-t-lg shadow-lg">
            <Picker
              value={pickerValue}
              onChange={setPickerValue}
              wheelMode="natural"
            >
              <Picker.Column name="kg">
                {weightSelections.kg.map((kg) => (
                  <Picker.Item key={kg} value={kg}>
                    {({ selected }) => (
                      <div
                        style={{
                          padding: "8px 0",
                          color: selected ? "black" : "#999",
                          fontWeight: selected ? 600 : 400,
                          fontSize: 18,
                        }}
                      >
                        {kg}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>

              <Picker.Column name="decimal">
                {weightSelections.decimal.map((d) => (
                  <Picker.Item key={d} value={d}>
                    {({ selected }) => (
                      <div
                        style={{
                          padding: "8px 0",
                          color: selected ? "black" : "#999",
                          fontWeight: selected ? 600 : 400,
                          fontSize: 18,
                        }}
                      >
                        {d}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>

            <Button
              bgColor="#F56E6D"
              activeColor="#c54f4f"
              onClick={() => setShowWeightPicker(false)}
            >
              저장
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
