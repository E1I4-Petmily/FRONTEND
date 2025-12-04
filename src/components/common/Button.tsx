import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  bgColor: string;
  activeColor: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  bgColor,
  activeColor,
  disabled = false,
}) => {
  const defaultActive = "#c54f4f";

  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className="w-[calc(100%-20px)] h-[44px] mx-[10px] text-[16px] rounded-2xl font-pretendard text-white transition-colors"
      style={{
        backgroundColor: disabled ? "#D1D1D1" : bgColor,

        margin: "0 10px",
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          activeColor || defaultActive;
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = bgColor;
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = bgColor;
      }}
    >
      {children}
    </button>
  );
};

export default Button;
