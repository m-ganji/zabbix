import React from "react";

interface BadgeProps {
  title: string;
  bg: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ title, bg, className }) => {
  return (
    <span className={`badge badge-light-${bg} ${className || ""}`}>
      {title}
    </span>
  );
};

export default Badge;
