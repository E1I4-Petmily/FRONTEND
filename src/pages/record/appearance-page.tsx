import { useEffect, useState } from "react";
import RecordLayout from "../../layouts/record-layout";
import { useRecordStore } from "../../store/recordStore";
import { updatePetRecord } from "../../apis/pet";
import { useNavigate } from "react-router-dom";

const skinTags = ["물집", "가려움", "털 빠짐", "발진"];

const woundTags = ["찢어진 피부", "발바닥 출혈", "입 출혈", "멍"];

export default function AppearancePage() {
  const [skin, setSkin] = useState<string[]>([]);
  const [wound, setWound] = useState<string[]>([]);
  const navigate = useNavigate();

  const { selectedPetId, selectedDate, setReopenPicker } = useRecordStore();

  const handleSave = async () => {
    if (!selectedPetId) {
      alert("반려동물을 먼저 선택해주세요.");
      return;
    }

    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    // 1) 두 개의 리스트 합치기
    const appearanceList = [...skin, ...wound];

    console.log("=== 외형 기록 저장 시도 ===");
    console.log("petId:", selectedPetId);
    console.log("date:", selectedDate);
    console.log("appearance:", appearanceList);

    try {
      // 2) API 호출
      await updatePetRecord(selectedPetId, {
        date: selectedDate, // "YYYY-MM-DD"
        appearance: appearanceList,
      });

      alert("외형 기록이 저장되었습니다!");
    } catch (error) {
      console.error("외형 기록 저장 실패:", error);
      alert("기록 저장에 실패했습니다.");
    }

    setReopenPicker(true);
    navigate("/calendar");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <RecordLayout
      section1={{
        label: "피부",
        tags: skinTags,
        selected: skin,
        onSelect: (tag) =>
          setSkin((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          ),
      }}
      section2={{
        label: "상처/출혈",
        tags: woundTags,
        selected: wound,
        onSelect: (tag) =>
          setWound((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          ),
      }}
      onSave={handleSave}
    />
  );
}
