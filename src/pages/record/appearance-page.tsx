import { useState } from "react";
import RecordLayout from "../../layouts/record-layout";

const skinTags = ["물집", "가려움", "털 빠짐", "발진"];

const woundTags = ["찢어진 피부", "발바닥 출혈", "입 출혈", "멍"];

export default function AppearancePage() {
  const [skin, setSkin] = useState<string[]>([]);
  const [wound, setWound] = useState<string[]>([]);

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
      onSave={() => {
        console.log({
          skin,
          wound,
        });
      }}
    />
  );
}
