import Button from "../components/common/Button";

interface RecordLayoutProps {
  section1: {
    label: string;
    tags: string[];
    selected: string[];
    onSelect: (tag: string) => void;
  };
  section2: {
    label: string;
    tags: string[];
    selected: string[];
    onSelect: (tag: string) => void;
  };
  onSave: () => void;
}

export default function RecordLayout({
  section1,
  section2,
  onSave,
}: RecordLayoutProps) {
  return (
    <div>
      <div className="p-4">
        <div className="mt-6">
          <p className="font-regular font-[PretendardVariable] text-[#656565]">
            {section1.label}
          </p>
          <div className="flex flex-wrap gap-2.5 mt-3">
            {section1.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => section1.onSelect(tag)}
                className={`font-[PretendardVariable] font-light text-[14px] px-3.5 py-1.5 rounded-full border ${
                  section1.selected.includes(tag)
                    ? "bg-[#F56E6D] text-white"
                    : "bg-white border-[#ABABAB]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <p className="font-regular font-[PretendardVariable] text-[#656565]">
            {section2.label}
          </p>
          <div className="flex flex-wrap gap-2.5 mt-3">
            {section2.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => section2.onSelect(tag)}
                className={`font-[PretendardVariable] font-light text-[14px] px-3.5 py-1.5 rounded-full border ${
                  section2.selected.includes(tag)
                    ? "bg-[#F56E6D] text-white"
                    : "bg-white border-[#ABABAB]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto pb-24">
        <Button onClick={onSave} bgColor="#F56E6D" activeColor="#c54f4f">
          저장
        </Button>
      </div>
    </div>
  );
}
