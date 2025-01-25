import React from "react";

type AvatarType = {
  name: string;
  size?: "sm" | "md" | "lg";
};

const Avatar = ({ name, size = "md" }: AvatarType) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-20 h-20 text-lg",
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
      `}
    >
      {initials}
    </div>
  );
};

export default Avatar;
