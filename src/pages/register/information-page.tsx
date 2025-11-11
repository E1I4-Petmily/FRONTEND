import { useCallback, useMemo, useState } from "react";
import RegisterLayout from "../../layouts/register-layout";
import type { PetForm } from "../../types/pet";
import { useNavigate } from "react-router-dom";
import { usePetFormStore } from "../../store/petFormStore";
import Picker from "react-mobile-picker";

export default function Information() {
  const navigate = useNavigate();
  const { petInfo, setName, setBirth, setGender } = usePetFormStore();

  const [name, setNameState] = useState(petInfo.name || "");
  const [showPicker, setShowPicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const [pickerValue, setPickerValue] = useState(() => {
    const { year, month, day } = petInfo.birthday;
    if (year && month && day) {
      return { year, month, day };
    }
    return { year: "2020", month: "1", day: "1" };
  });

  const [gender, setGenderState] = useState(petInfo.gender || "수컷");

  const years = Array.from({ length: 30 }, (_, i) => (1995 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const genders = ["수컷", "암컷", "중성화"];
  const dateSelections = { year: years, month: months, day: days };

  const canProceed = useMemo(() => {
    return name.trim().length > 0;
  }, [name, gender]);

  const handleNext = useCallback(() => {
    if (!canProceed) {
      alert("이름과 성별을 모두 입력해주세요.");
      return;
    }

    setName(name.trim());
    setBirth(pickerValue as PetForm["birthday"]);
    setGender(gender);

    navigate("/register/color");
  }, [
    name,
    gender,
    pickerValue,
    setName,
    setBirth,
    setGender,
    navigate,
    canProceed,
  ]);

  return (
    <RegisterLayout
      step={3}
      title={<>반려동물 정보를 등록해주세요</>}
      subtitle="기본 정보를 등록해 관리해요"
      onNext={handleNext}
      buttonContext="다음"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block font-[PretendardVariable] font-medium text-[18px] mb-2"
        >
          이름
        </label>
        <input
          id="name"
          type="text"
          placeholder="반려동물의 이름"
          value={name}
          onChange={(e) => setNameState(e.target.value)}
          className="w-full px-4 py-2 font-[PretendardVariable] border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors placeholder-[#ABABAB]"
        />
      </div>

      <div className="mb-6">
        <label className="block font-[PretendardVariable] font-medium text-[18px] mb-2">
          생년월일
        </label>
        <div
          onClick={() => setShowPicker(true)}
          className={`flex items-center justify-between px-4 py-2 font-[PretendardVariable] cursor-pointer border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors ${
            showPicker ? "border-gray-700" : "border-gray-300"
          } transition-colors`}
        >
          <div className="flex-1 text-center">{pickerValue.year}</div>
          <div className="text-gray-400">|</div>
          <div className="flex-1 text-center">
            {pickerValue.month.padStart(2, "0")}
          </div>
          <div className="text-gray-400">|</div>
          <div className="flex-1 text-center">
            {pickerValue.day.padStart(2, "0")}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-[PretendardVariable] font-medium text-[18px] mb-2">
          성별
        </label>
        <div
          onClick={() => setShowGenderPicker(true)}
          className={`flex px-4 py-2 font-[PretendardVariable] cursor-pointer border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none transition-colors ${
            showGenderPicker ? "border-gray-700" : "border-gray-300"
          } transition-colors`}
        >
          <div className="text-center">{gender}</div>
        </div>
      </div>

      {showPicker && (
        <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
          <div className="w-full bg-white p-4 rounded-t-lg shadow-lg">
            <Picker
              value={pickerValue}
              onChange={setPickerValue}
              wheelMode="natural"
            >
              {Object.keys(dateSelections).map((name) => (
                <Picker.Column key={name} name={name}>
                  {(
                    dateSelections[
                      name as keyof typeof dateSelections
                    ] as string[]
                  ).map((option) => (
                    <Picker.Item key={option} value={option}>
                      {({ selected }: { selected: boolean }) => (
                        <div
                          style={{
                            padding: "8px 0",
                            color: selected ? "black" : "#999",
                            fontWeight: selected ? 600 : 400,
                          }}
                        >
                          {option.padStart(2, "0")} {/* 1 → 01 형태로 */}
                        </div>
                      )}
                    </Picker.Item>
                  ))}
                </Picker.Column>
              ))}
            </Picker>
            <button
              className="mt-2 w-full bg-red-300 text-white py-2 rounded-lg"
              onClick={() => setShowPicker(false)}
            >
              저장
            </button>
          </div>
        </div>
      )}

      {showGenderPicker && (
        <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
          <div className="w-full bg-white p-4 rounded-t-lg shadow-lg">
            <Picker
              value={{ gender }}
              onChange={(v) => setGenderState(v.gender)}
              wheelMode="natural"
            >
              <Picker.Column name="gender">
                {genders.map((g) => (
                  <Picker.Item key={g} value={g}>
                    {({ selected }: { selected: boolean }) => (
                      <div
                        style={{
                          padding: "8px 0",
                          color: selected ? "black" : "#999",
                          fontWeight: selected ? 600 : 400,
                        }}
                      >
                        {g}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
            <button
              className="mt-2 w-full bg-red-300 text-white py-2 rounded-lg"
              onClick={() => setShowGenderPicker(false)}
            >
              저장
            </button>
          </div>
        </div>
      )}
    </RegisterLayout>
  );
}
