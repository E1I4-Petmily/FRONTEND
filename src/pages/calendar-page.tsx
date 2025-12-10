import { useEffect, useState } from "react";
import CustomCalendar, {
  type CalendarEvent,
} from "../components/CustomCalendar";
import pencil from "../assets/pencil.svg";
import Button from "../components/common/Button";
import weightIcon from "../assets/record-icons/weight.svg";
import behaviorIcon from "../assets/record-icons/food.svg";
import appearanceIcon from "../assets/record-icons/bandage.svg";
import periodIcon from "../assets/record-icons/poop.svg";
import { useNavigate } from "react-router-dom";
import Picker from "react-mobile-picker";
import {
  getDailyRecords,
  getMonthlyRecords,
  getPetList,
  updatePetRecord,
  type PetRecordResponse,
  type PetResponse,
} from "../apis/pet";
import { usePetListStore } from "../store/petListStore";
import { useRecordStore } from "../store/recordStore";

export default function CalendarPage() {
  const { pets, setPets } = usePetListStore();
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState<PetResponse | null>(null);
  const {
    selectedDate,
    setSelectedPetId,
    setSelectedDate,
    reopenPicker,
    setReopenPicker,
  } = useRecordStore();
  const [selectedDateState, setSelectedDateState] = useState<Date>(
    selectedDate ? new Date(selectedDate) : today
  );
  const [monthlyEvents, setMonthlyEvents] = useState<
    Record<string, CalendarEvent[]>
  >({});
  const [dailyRecords, setDailyRecords] = useState<
    Record<
      string,
      Record<
        number,
        {
          weight: number | null;
          behavior: string[];
          appearance: string[];
          reaction: string[];
        }
      >
    >
  >({});

  const [currentMonth, setCurrentMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const [showRecordPicker, setShowRecordPicker] = useState(false);
  const [showWeightPicker, setShowWeightPicker] = useState(false);
  const [pickerValue, setPickerValue] = useState({
    kg: "00",
    decimal: "00",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetList();
        console.log("🐶 반려동물 목록 조회:", res);
        setPets(res);
      } catch (err) {
        console.error("반려동물 목록 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [setPets]);

  useEffect(() => {
    if (reopenPicker) {
      setShowRecordPicker(true);
      setReopenPicker(false);
    }
  }, [reopenPicker]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      setLoading(true);
      try {
        const { year, month } = currentMonth;
        const res = await getMonthlyRecords(year, month);

        // 디버깅용: 데이터 확인
        console.log("변환 전 API 데이터:", res);

        const newEvents: Record<string, CalendarEvent[]> = {};

        res.forEach((record: PetRecordResponse) => {
          const dateKey = record.date;

          if (!newEvents[dateKey]) newEvents[dateKey] = [];
          const uniqueId = record.petName;

          const exists = newEvents[dateKey].find((e) => e.id === uniqueId);

          if (!exists) {
            newEvents[dateKey].push({
              id: uniqueId,
              color: record.petColor,
              type: "pet",
              data: record,
            });
          }
        });

        console.log("변환된 캘린더 이벤트:", newEvents); // 확인용 로그
        setMonthlyEvents(newEvents);
      } catch (err) {
        console.error("월별 기록 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    // pets 목록이 없어도 기록은 띄울 수 있어야 한다면 pets.length 조건 제거 고려
    fetchMonthlyData();
  }, [currentMonth.year, currentMonth.month]);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchDailyData = async () => {
      setLoading(true);
      try {
        const res = await getDailyRecords(
          selectedDateState.toLocaleDateString("en-CA")
        );
        console.log(selectedDateState.toLocaleDateString("en-CA"));
        console.log("일별 기록 조회:", res);

        const newDailyRecords: Record<
          number,
          {
            weight: number | null;
            behavior: string[];
            appearance: string[];
            reaction: string[];
          }
        > = {};
        res.pets.forEach((pet) => {
          newDailyRecords[pet.petId] = {
            weight: pet.weight,
            behavior: pet.behavior,
            appearance: pet.appearance,
            reaction: pet.reaction,
          };
        });

        setDailyRecords(newDailyRecords);
      } catch (err) {
        console.error("일별 기록 조회 실패:", err);
        console.log(selectedDate);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyData();
  }, [selectedDate]);

  const numbers = Array.from({ length: 100 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const weightSelections = {
    kg: numbers,
    decimal: numbers,
  };

  const formatDate = (date: Date) => {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}월 ${date.getDate()}일(${dayNames[date.getDay()]})`;
  };

  if (loading) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-[#F56E6D] rounded-full"></div>
      </div>
    );
  }

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
        onDateSelect={(date) => {
          const dateString = date.toLocaleDateString("en-CA");
          setSelectedDateState(date);
          setSelectedDate(dateString);
          console.log("선택한 날짜:", dateString);
        }}
        selectedDate={selectedDateState}
        events={monthlyEvents}
        onMonthChange={(year, month) => {
          console.log("📅 달 변경됨:", year, month);
          setCurrentMonth({ year, month });
        }}
        getDayStyle={({ isToday }) => {
          return isToday ? "text-[#FFFFFF]" : "text-gray-700";
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
        <div className="mt-6 w-full max-w-md bg-white rounded-xl p-4">
          <div className="font-[PretendardVariable] font-medium text-[#4C4C4C] text-[16px] mb-4">
            {formatDate(selectedDateState)}
          </div>

          <div className="flex flex-col gap-3">
            {pets.map((pet) => {
              const dateKey = selectedDateState.toLocaleDateString("en-CA");
              const symptoms = dailyRecords[dateKey]?.[pet.petId];

              return (
                <div
                  key={pet.petId}
                  className="flex items-start gap-3 rounded-lg"
                >
                  <div
                    className="w-2 h-6.5 rounded-md"
                    style={{ backgroundColor: pet.colorHex }}
                  />

                  <div className="flex-1">
                    <div className="font-[PretendardVariable] font-medium text-[18px] text-[#2C2C2C]">
                      {pet.name}
                    </div>

                    {symptoms && (
                      <div className="flex flex-col gap-1 mt-1">
                        {symptoms.weight != null && (
                          <div className="flex items-center gap-1 text-gray-600">
                            <img
                              src={weightIcon}
                              alt="체중"
                              className="w-4 h-4"
                            />
                            {symptoms.weight} kg
                          </div>
                        )}
                        {symptoms.behavior.length > 0 && (
                          <div className="flex items-center gap-1 text-gray-600">
                            <img
                              src={behaviorIcon}
                              alt="행동/식습관"
                              className="w-4 h-4"
                            />
                            {symptoms.behavior.join(", ")}
                          </div>
                        )}
                        {symptoms.appearance.length > 0 && (
                          <div className="flex items-center gap-1 text-gray-600">
                            <img
                              src={appearanceIcon}
                              alt="외형이상"
                              className="w-4 h-4"
                            />
                            {symptoms.appearance.join(", ")}
                          </div>
                        )}
                        {symptoms.reaction.length > 0 && (
                          <div className="flex items-center gap-1 text-gray-600">
                            <img
                              src={periodIcon}
                              alt="생리반응"
                              className="w-4 h-4"
                            />
                            {symptoms.reaction.join(", ")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      const dateKey =
                        selectedDateState.toLocaleDateString("en-CA");
                      setSelectedPetId(pet.petId);
                      setSelectedDate(dateKey);
                      setSelectedPet(pet);
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
          <div className="w-full max-w-[480px] mx-auto bg-white pb-6 px-[10px] rounded-t-2xl shadow-lg">
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
          <div className="w-full max-w-[480px] mx-auto bg-white pb-6 px-[10px] rounded-t-lg shadow-lg">
            <div className="relative flex justify-center items-center py-4">
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
                            padding: "8px 60px",
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
                            padding: "8px 60px",
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
              <span className="absolute text-[20px] font-semibold -translate-x-1">
                .
              </span>
              <span className="absolute right-5 text-[18px] font-semibold">
                kg
              </span>
            </div>

            <Button
              bgColor="#F56E6D"
              activeColor="#c54f4f"
              onClick={async () => {
                if (!selectedPet?.petId) return;
                if (!selectedDate) return;

                const weightValue =
                  Number(pickerValue.kg) + Number(pickerValue.decimal) / 100;

                try {
                  await updatePetRecord(selectedPet.petId, {
                    date: selectedDateState.toLocaleDateString("en-CA"),
                    weight: weightValue,
                  });
                  alert("체중이 기록되었습니다!");
                  setShowWeightPicker(false);
                } catch (err) {
                  console.error("체중 기록 실패", err);
                  alert("체중 기록에 실패했습니다.");
                }
              }}
            >
              저장
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
