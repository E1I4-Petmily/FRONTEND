import { useEffect, useState } from "react";
import RecordLayout from "../../layouts/record-layout";
import { useRecordStore } from "../../store/recordStore";
import { updatePetRecord } from "../../apis/pet";
import { useNavigate } from "react-router-dom";

const poopTags = ["설사", "변비", "혈변", "배변 어려움"];
const breathTags = ["기침", "코막힘", "재채기", "헐떡임", "콧물"];

export default function ReactionPage() {
  const [poop, setPoop] = useState<string[]>([]);
  const [breath, setBreath] = useState<string[]>([]);
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
    const reactionList = [...poop, ...breath];

    console.log("=== 생리 반응 기록 저장 시도 ===");
    console.log("petId:", selectedPetId);
    console.log("date:", selectedDate);
    console.log("behavior:", reactionList);

    try {
      // 2) API 호출
      await updatePetRecord(selectedPetId, {
        date: selectedDate, // "YYYY-MM-DD"
        behavior: reactionList,
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
        label: "배변",
        tags: poopTags,
        selected: poop,
        onSelect: (tag) =>
          setPoop((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          ),
      }}
      section2={{
        label: "호흡/기침",
        tags: breathTags,
        selected: breath,
        onSelect: (tag) =>
          setBreath((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          ),
      }}
      onSave={handleSave}
    />
  );
}
