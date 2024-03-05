import React, { ChangeEvent } from "react";

interface CheckBoxProps {
  className?: string;
  onchange?: (event: ChangeEvent<HTMLInputElement>) => void;
  state?: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  onchange,
  state,
}) => {
  return (
    <input
      type="checkbox"
      className={className}
      onChange={onchange}
      defaultChecked={state}
    />
  );
};
