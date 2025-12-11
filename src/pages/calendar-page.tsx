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
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState<PetResponse | null>(null);
  const {
    selectedDate,
    setSelectedPetId,
    setSelectedDate,
    reopenPicker,
    setReopenPicker,
  } = useRecordStore();
  const initialDate = selectedDate ? new Date(selectedDate) : new Date();
  const [selectedDateState, setSelectedDateState] = useState<Date>(initialDate);
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
    year: initialDate.getFullYear(),
    month: initialDate.getMonth() + 1,
  });
  const [showRecordPicker, setShowRecordPicker] = useState(false);
  const [showWeightPicker, setShowWeightPicker] = useState(false);
  const [pickerValue, setPickerValue] = useState({
    kg: "00",
    decimal: "00",
  });

  useEffect(() => {
    if (selectedDate) {
      setSelectedDateState(new Date(selectedDate));
    }
  }, [selectedDate]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetList();
        console.log("🐶 반려동물 목록 조회:", res);
        setPets(res);
      } catch (err) {
        console.error("반려동물 목록 조회 실패:", err);
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
      }
    };

    // pets 목록이 없어도 기록은 띄울 수 있어야 한다면 pets.length 조건 제거 고려
    fetchMonthlyData();
  }, [currentMonth.year, currentMonth.month]);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchDailyData = async () => {
      try {
        const dateKey = selectedDateState.toLocaleDateString("en-CA");
        const res = await getDailyRecords(dateKey);
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

        setDailyRecords((prev) => ({
          ...prev,
          [dateKey]: newDailyRecords,
        }));
      } catch (err) {
        console.error("일별 기록 조회 실패:", err);
        console.log(selectedDate);
      }
    };

    fetchDailyData();
  }, [selectedDateState]);

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

  return (
    <div
      className="p-4 pb-24 min-h-screen"
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
          <div className="font-[PretendardVariable] font-medium text-[#4C4C4C] text-[16px] mb-4 ml-1 mt-1">
            {formatDate(selectedDateState)}
          </div>

          <div className="flex flex-col gap-3">
            {pets.map((pet) => {
              const dateKey = selectedDateState.toLocaleDateString("en-CA");
              const record = dailyRecords[dateKey]?.[pet.petId];

              const hasRecord =
                record &&
                (record.weight !== null ||
                  record.behavior.length > 0 ||
                  record.appearance.length > 0 ||
                  record.reaction.length > 0);

              return (
                <div key={pet.petId} className="flex gap-2">
                  <div className="flex flex-col items-center gap-2 pt-1"></div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-7 rounded-full"
                          style={{ backgroundColor: pet.colorHex }}
                        />
                        <span className="font-[PretendardVariable] font-medium text-[18px] text-[#2C2C2C]">
                          {pet.name}
                        </span>
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
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <img
                          src={pencil}
                          alt="기록 수정"
                          className="w-6 h-6 mr-2"
                        />
                      </button>
                    </div>

                    {/* 하단: 기록 내용 표시 영역 */}
                    {record ? (
                      <div className="flex flex-col gap-3">
                        {/* 1. 체중 */}
                        {record.weight !== null && (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              {/* 반려동물 색깔 동그라미 */}
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: pet.colorHex }}
                              />
                              <span className="text-xs font-medium text-gray-500">
                                체중
                              </span>
                            </div>
                            <div className="text-[15px] text-[#4C4C4C] pl-4">
                              {record.weight} kg
                            </div>
                          </div>
                        )}

                        {/* 2. 행동/식습관 */}
                        {record.behavior && record.behavior.length > 0 && (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: pet.colorHex }}
                              />
                              <span className="text-xs font-medium text-gray-500">
                                행동/식습관
                              </span>
                            </div>
                            <div className="text-[15px] text-[#4C4C4C] pl-4 leading-normal">
                              {record.behavior.join(", ")}
                            </div>
                          </div>
                        )}

                        {/* 3. 외형이상 */}
                        {record.appearance && record.appearance.length > 0 && (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: pet.colorHex }}
                              />
                              <span className="text-xs font-medium text-gray-500">
                                외형이상
                              </span>
                            </div>
                            <div className="text-[15px] text-[#4C4C4C] pl-4 leading-normal">
                              {record.appearance.join(", ")}
                            </div>
                          </div>
                        )}

                        {/* 4. 생리반응 */}
                        {record.reaction && record.reaction.length > 0 && (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: pet.colorHex }}
                              />
                              <span className="text-xs font-medium text-gray-500">
                                생리반응
                              </span>
                            </div>
                            <div className="text-[15px] text-[#4C4C4C] pl-4 leading-normal">
                              {record.reaction.join(", ")}
                            </div>
                          </div>
                        )}

                        {/* 기록이 아예 없는 경우 안내 문구 (선택사항) */}
                        {!hasRecord && (
                          <div className="text-xs text-gray-300 py-2">
                            기록된 내용이 없습니다.
                          </div>
                        )}
                      </div>
                    ) : (
                      // record 객체 자체가 없을 때
                      <div className="text-xs text-gray-300 pl-4 py-2">
                        기록된 내용이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showRecordPicker && (
        <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
          <div className="w-full max-w-[480px] mx-auto bg-white pb-6 px-[10px] rounded-t-2xl shadow-lg">
            <div className="text-center text-lg font-[PretendardVariable] font-medium mb-4 mt-4">
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

                const dateKey = selectedDateState.toLocaleDateString("en-CA");

                try {
                  await updatePetRecord(selectedPet.petId, {
                    date: selectedDateState.toLocaleDateString("en-CA"),
                    weight: weightValue,
                  });
                  alert("체중이 기록되었습니다!");

                  setDailyRecords((prev) => {
                    const currentDayRecords = prev[dateKey] || {};
                    const currentPetRecord = currentDayRecords[
                      selectedPet.petId
                    ] || {
                      weight: null,
                      behavior: [],
                      appearance: [],
                      reaction: [],
                    };

                    return {
                      ...prev,
                      [dateKey]: {
                        ...currentDayRecords,
                        [selectedPet.petId]: {
                          ...currentPetRecord,
                          weight: weightValue,
                        },
                      },
                    };
                  });

                  setMonthlyEvents((prev) => {
                    const currentEvents = prev[dateKey] || [];

                    // 이미 해당 펫의 점이 찍혀있는지 확인 (중복 방지)
                    // (fetchMonthlyData에서 uniqueId를 petName으로 썼으므로 동일하게 petName 사용)
                    const hasDot = currentEvents.some(
                      (e) => e.id === selectedPet.name
                    );

                    if (hasDot) return prev; // 이미 점이 있으면 변경 없음

                    // 점이 없다면 추가
                    return {
                      ...prev,
                      [dateKey]: [
                        ...currentEvents,
                        {
                          id: selectedPet.name,
                          color: selectedPet.colorHex,
                          type: "pet",
                          data: { petId: selectedPet.petId }, // 필요한 최소 데이터
                        },
                      ],
                    };
                  });

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
