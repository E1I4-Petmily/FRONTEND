import { useState } from "react";
import RecordLayout from "../../layouts/record-layout";
import { useRecordStore } from "../../store/recordStore";
import { updatePetRecord } from "../../apis/pet";
import { useNavigate } from "react-router-dom";

const behaviorTags = [
  "무기력",
  "안기려 하지 않음",
  "짖음",
  "핥음",
  "빙글빙글 돎",
];
const appetiteTags = [
  "밥 거부",
  "간식만 먹음",
  "물 과도 섭취",
  "입맛이 돌아옴",
  "토",
];

export default function BehaviorPage() {
  const [behavior, setBehavior] = useState<string[]>([]);
  const [appetite, setAppetite] = useState<string[]>([]);
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
    const behaviorList = [...behavior, ...appetite];

    console.log("=== 행동 기록 저장 시도 ===");
    console.log("petId:", selectedPetId);
    console.log("date:", selectedDate);
    console.log("behavior:", behaviorList);

    try {
      // 2) API 호출
      await updatePetRecord(selectedPetId, {
        date: selectedDate, // "YYYY-MM-DD"
        behavior: behaviorList,
      });

      alert("외형 기록이 저장되었습니다!");
    } catch (error) {
      console.error("외형 기록 저장 실패:", error);
      alert("기록 저장에 실패했습니다.");
    }

    setReopenPicker(true);

    navigate("/calendar");
  };

  return (
    <RecordLayout
      section1={{
        label: "행동변화",
        tags: behaviorTags,
        selected: behavior,
        onSelect: (tag) =>
          setBehavior((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          ),
      }}
      section2={{
        label: "식욕/음수",
        tags: appetiteTags,
        selected: appetite,
        onSelect: (tag) =>
          setAppetite((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          ),
      }}
      onSave={handleSave}
    />
  );
}
