import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Picker from "react-mobile-picker";
import Button from "../components/common/Button";
import { petEdit } from "../apis/pet-edit";

interface EditPageState {
  petId: number;
  name: string;
  gender: string;
  birthDate: string;
  petImageUrl?: string;
  colorHex?: string;
}

interface PickerValue {
  year: string;
  month: string;
  day: string;
  [key: string]: string;
}

//성별매핑
const genderToCode = (kor: string) => {
  switch (kor) {
    case "수컷":
      return "MALE";
    case "암컷":
      return "FEMALE";
    case "중성화":
      return "NEUTERED";
    default:
      return "UNKNOWN";
  }
};

function PetEditPage() {
  const navigate = useNavigate();
  const { petId: petIdParam } = useParams();
  const location = useLocation();
  const state = (location.state || {}) as EditPageState;

  const petId = state.petId ?? Number(petIdParam);

  const [name, setName] = useState(state.name ?? "");

  //기존값이 초기값
  const [pickerValue, setPickerValue] = useState<PickerValue>(() => {
    if (state.birthDate) {
      const [y, m, d] = state.birthDate.split("-");
      return {
        year: y,
        month: String(Number(m)), // "01" -> "1"
        day: String(Number(d)),
      };
    }
    return { year: "2020", month: "1", day: "1" };
  });

  const years = Array.from({ length: 30 }, (_, i) => (1995 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const dateSelections = { year: years, month: months, day: days };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [gender, setGender] = useState(state.gender ?? "수컷");
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const genders = ["수컷", "암컷", "중성화"];

  //사진 미리보기
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    state.petImageUrl ?? null
  );

  useEffect(() => {
    if (photoFile) {
      const url = URL.createObjectURL(photoFile);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [photoFile]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
    }
  };

  //제출가능한지
  const canSubmit = useMemo(() => name.trim().length > 0, [name]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      alert("이름을 입력해주세요.");
      return;
    }

    const birthDate =
      `${pickerValue.year}-` +
      `${pickerValue.month.padStart(2, "0")}-` +
      `${pickerValue.day.padStart(2, "0")}`;

    const requestDto = {
      name: name.trim(),
      gender: genderToCode(gender),
      birthDate,
    };

    try {
      await petEdit(petId, requestDto, photoFile || undefined);

      alert("반려동물 정보가 수정되었습니다!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("반려동물 정보를 수정하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F9F9F9] mt-4 font-[PretendardVariable]">
      <main className="px-6 pb-32">
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">이름</label>
          <input
            type="text"
            placeholder="반려동물의 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-0 py-2 bg-transparent border-b border-[#D1D1D1] focus:border-gray-700 focus:outline-none placeholder-[#ABABAB]"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">생일</label>
          <div
            onClick={() => setShowDatePicker(true)}
            className="flex items-center justify-between px-0 py-2 border-b border-[#D1D1D1] cursor-pointer"
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
          <label className="block mb-2 text-lg font-semibold">성별</label>
          <div
            onClick={() => setShowGenderPicker(true)}
            className="px-0 py-2 border-b border-[#D1D1D1] cursor-pointer"
          >
            {gender}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">사진</label>
          <label
            className={`w-28 h-28 rounded-full bg-[#F0F0F0] flex items-center justify-center cursor-pointer overflow-hidden border ${
              previewUrl ? "border-[#F56E6D]" : "border-dashed border-gray-300"
            }`}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="반려동물 사진"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl text-gray-400">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
      </main>

      <div className="fixed bottom-0 py-5 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-3 z-50">
        <Button onClick={handleSubmit} bgColor="#F56E6D" activeColor="#c54f4f">
          수정완료
        </Button>
      </div>

      {showDatePicker && (
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
                          {option.padStart(2, "0")}
                        </div>
                      )}
                    </Picker.Item>
                  ))}
                </Picker.Column>
              ))}
            </Picker>

            <div className="fixed bottom-6 left-0 w-full px-6">
              <Button
                onClick={() => setShowDatePicker(false)}
                bgColor="#F56E6D"
                activeColor="#c54f4f"
              >
                저장
              </Button>
            </div>
            {/* <button
              className="mt-2 w-full bg-red-300 text-white py-2 rounded-lg"
              onClick={() => setShowDatePicker(false)}
            >
              저장
            </button> */}
          </div>
        </div>
      )}

      {showGenderPicker && (
        <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
          <div className="w-full bg-white p-4 rounded-t-lg shadow-lg">
            <Picker
              value={{ gender }}
              onChange={(v: { gender: string }) => setGender(v.gender)}
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
            <Button
              onClick={() => setShowGenderPicker(false)}
              bgColor="#F56E6D"
              activeColor="#c54f4f"
            >
              저장
            </Button>
            {/* <button
              className="mt-2 w-full bg-red-300 text-white py-2 rounded-lg"
              onClick={() => setShowGenderPicker(false)}
            >
              저장
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default PetEditPage;
