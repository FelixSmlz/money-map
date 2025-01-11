import React from "react";

interface ProgressBarProps {
  currentAmount: number;
  limit: number;
  width?: string;
  strokeWidth?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentAmount,
  limit,
  width = "100%",
  strokeWidth = 9,
}) => {
  const progress = Math.min((currentAmount / limit) * 100, 100);

  return (
    <div
      className="flex flex-col gap-2"
      style={{ width: width, maxWidth: "80px" }}
    >
      <div className="text-base text-center text-bg_black">
        {currentAmount}€ / {limit}€
      </div>
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
          className="bg-turkois"
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
