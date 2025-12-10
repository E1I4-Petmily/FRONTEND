import { useState, useEffect } from "react";
import CustomCalendar from "../components/CustomCalendar";
import Button from "../components/common/Button";
import ReportModal from "../components/ReportModal";
import { getPdfReports } from "../apis/pdf";
import { createReservation } from "../apis/hospital-reservation";
import type { PdfReportResponse } from "../apis/pdf";
import { getPetList } from "../apis/pet";
import type { PetResponse } from "../apis/pet";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [reportAgree, setReportAgree] = useState(false); //체크박스 상태
  const [showReportModal, setShowReportModal] = useState(false); //모달 표시 여부
  const [pdfReports, setPdfReports] = useState<PdfReportResponse[]>([]); //리포트 목록
  const [petList, setPetList] = useState<PetResponse[]>([]);
  const [selectedPetName, setSelectedPetName] = useState("");

  const location = useLocation();
  const { hospitalProfileId } = location.state || {};
  const navigate = useNavigate();
  console.log("상세에서 받아온 병원 ID:", hospitalProfileId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDayStyle = ({ date }: { date: Date }) => {
    if (date < today) {
      return "text-gray-300 pointer-events-none";
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

  //반려동물 목록 가져오기
  useEffect(() => {
    async function fetchPets() {
      try {
        const list = await getPetList();
        setPetList(list);
      } catch (error) {
        console.error("반려동물 목록 로드 실패:", error);
      }
    }

    fetchPets();
  }, []);

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime || !selectedPet || !selectedPetName) {
      alert("날짜, 시간, 진료대상 종, 반려동물을 모두 선택해주세요.");
      return;
    }

    function to24Hour(time: string): string {
      const [hour, minute] = time.split(":");
      const h = parseInt(hour, 10);

      if (h >= 1 && h <= 7) {
        return `${h + 12}:${minute}`; //오후 1~7시는 13~19시
      }

      return `${hour.padStart(2, "0")}:${minute}`; //01:00처럼 0 채움
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    const convertedTime = to24Hour(selectedTime);

    const startAt = `${dateStr}T${convertedTime}:00`;

    try {
      await createReservation({
        hospitalProfileId,
        startAt,
        petType: selectedPet,
        petName: selectedPetName,
        reportAgree: reportAgree ? "true" : "false",
      });

      alert("예약이 완료되었습니다.");
      navigate("/calendar");
    } catch (error) {
      console.error("예약 실패:", error);
      alert("예약 중 오류가 발생했습니다.");
    }
  };

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
        <div className="mt-3 p-4 bg-white mb-4">
          <div className="font-[PretendardVariable] font-medium mb-2">
            진료 받을 반려동물을 선택해주세요
          </div>

          <div className="flex flex-col gap-2">
            {petList.length === 0 && (
              <p className="text-sm text-gray-500">
                등록된 반려동물이 없습니다.
              </p>
            )}

            {petList.map((pet) => (
              <button
                key={pet.petId}
                onClick={() => setSelectedPetName(pet.name)}
                className={`w-full text-left text-[15px] ${
                  selectedPetName === pet.name ? "font-semibold" : "font-normal"
                }`}
              >
                {pet.name}
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
              checked={reportAgree}
              onChange={async (e) => {
                const checked = e.target.checked;
                setReportAgree(checked);

                if (checked) {
                  try {
                    //PDF 목록 조회
                    const list = await getPdfReports();
                    setPdfReports(list);
                    console.error("리포트 조회:", list);
                  } catch (error) {
                    console.error("리포트 조회 실패:", error);

                    setPdfReports([]);
                  }

                  setShowReportModal(true);
                }
              }}
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

      {showReportModal && (
        <ReportModal
          reports={pdfReports}
          onClose={() => setShowReportModal(false)}
          onSelect={() => {
            setShowReportModal(false);
            setReportAgree(true);
          }}
        />
      )}

      <div className="fixed bottom-20 py-2 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white px-3 z-50">
        <Button
          onClick={handleReservation}
          bgColor="#F56E6D"
          activeColor="#c54f4f"
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}
