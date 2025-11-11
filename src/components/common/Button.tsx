import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  bgColor: string;
  activeColor: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  bgColor,
  activeColor,
}) => {
  const defaultActive = "#c54f4f";

  return (
    <button
      onClick={onClick}
      className="w-[calc(100%-20px)] h-[50px] mx-[10px] text-[16px] rounded-2xl font-pretendard text-white transition-colors"
      style={{
        backgroundColor: bgColor,

        margin: "0 10px",
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          activeColor || defaultActive;
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = bgColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = bgColor;
      }}
    >
      {children}
    </button>
  );
};

export default Button;
