import { useState } from "react";
import RecordLayout from "../../layouts/record-layout";

const poopTags = ["설사", "변비", "혈변", "배변 어려움"];
const breathTags = ["기침", "코막힘", "재채기", "헐떡임", "콧물"];

export default function ReactionPage() {
  const [poop, setPoop] = useState<string[]>([]);
  const [breath, setBreath] = useState<string[]>([]);

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
      onSave={() => {
        console.log({
          poop,
          breath,
        });
      }}
    />
  );
}
