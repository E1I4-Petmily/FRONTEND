import { useState } from "react";
import RecordLayout from "../../layouts/record-layout";

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
      onSave={() => {
        console.log({
          behavior,
          appetite,
        });
      }}
    />
  );
}
