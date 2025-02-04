import React from "react";

type AvatarType = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const Avatar = ({ name, size = "md", className }: AvatarType) => {
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

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full 
        bg-turkois 
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
