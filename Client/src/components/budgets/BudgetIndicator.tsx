import React from "react";

interface ProgressBarProps {
  className?: string;
  textClassName?: string;
  currentAmount: number;
  limit: number;
  width?: string;
  maxWidth?: string;
  strokeWidth?: number;
  withText?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentAmount,
  className,
  textClassName,
  limit,
  width = "100%",
  maxWidth = "80px",
  strokeWidth = 9,
  withText = true,
}) => {
  const progress = Math.min((currentAmount / limit) * 100, 100);
  const barColor = progress >= 90 ? "bg-red" : "bg-turkois";

  return (
    <div
      className={`flex flex-col gap-2 ${className}`}
      style={{ width: width, maxWidth: maxWidth }}
    >
      {withText && (
        <div
          className={`text-base text-center  transition-colors ${textClassName}`}
        >
          {currentAmount} / {limit}€
        </div>
      )}
      <div
        style={{
          height: `${strokeWidth}px`,
          background: "#e6e6e6",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          className={barColor}
          style={{
            width: `${progress}%`,
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
