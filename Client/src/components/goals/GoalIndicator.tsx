import React from "react";

interface GoalIndicatorProps {
  className?: string;
  textClassName?: string;
  currentAmount: number;
  targetAmount: number;
  size?: number;
  strokeWidth?: number;
  withText?: boolean;
}

const GoalIndicator: React.FC<GoalIndicatorProps> = ({
  currentAmount,
  targetAmount,
  className,
  textClassName,
  size = 60,
  strokeWidth = 9,
  withText = true,
}) => {
  const progress = Math.min((currentAmount / targetAmount) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`${className}`}
      style={{ position: "relative", width: size, height: size }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-turkois"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {withText && (
        <div
          className={`absolute inset-0 flex items-center justify-center text-bg_black 
      transition-colors ${textClassName}`}
          style={{
            fontSize: size * 0.23,
          }}
        >
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default GoalIndicator;
