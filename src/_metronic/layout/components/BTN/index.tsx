import React, { PropsWithChildren, ButtonHTMLAttributes } from "react";

type BTNProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  className?: string;
  label: string;
  type?: string;
};

const BTN: React.FC<BTNProps> = ({ className, onClick, label, id, type }) => (
  <button
    id={id}
    type={type ?? "button"}
    onClick={onClick}
    className={`btn ${className} py-2`}
  >
    {label}
  </button>
);

export default BTN;
