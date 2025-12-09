interface MiniTagProps {
  label: string;
  colorHex: string;
}

function MiniTag({ label, colorHex }: MiniTagProps) {
  return (
    <span
      className="w-fit px-2 py-0.5 text-xs rounded-[20px] bg-white"
      style={{
        color: colorHex,
        border: `1.5px solid ${colorHex}`,
      }}
    >
      {label}
    </span>
  );
}

export default MiniTag;
