type AvatarType = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
};

const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace("#", "");

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128;
};

const getContrastingTextColor = (backgroundColor: string): string => {
  return isLightColor(backgroundColor) ? "#1A1B1C" : "#FFFFFF";
};

const Avatar = ({
  name,
  size = "md",
  className,
  color = "#80d9ff",
}: AvatarType) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-20 h-20 text-lg",
    xl: "w-24 h-24 text-[2rem]",
  };

  const textColor = getContrastingTextColor(color);

  return (
    <div
      style={{
        backgroundColor: color,
        color: textColor,
      }}
      className={`
        ${sizeClasses[size]}
        rounded-full 
        text-white 
        font-medium 
        flex 
        items-center 
        justify-center
        ${className}
      `}
    >
      {initials}
    </div>
  );
};

export default Avatar;
