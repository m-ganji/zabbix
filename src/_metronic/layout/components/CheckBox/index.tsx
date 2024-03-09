import React, { ChangeEvent } from "react";

interface CheckBoxProps {
  className?: string;
  onchange?: (event: ChangeEvent<HTMLInputElement>) => void;
  state?: boolean;
  label?: string;
  dir?: string;
  checked: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  onchange,
  label,
  dir,
  checked,
}) => {
  return (
    <label
      dir={dir}
      className="form-check form-check-sm form-check-custom form-check-solid gap-2"
    >
      <input
        type="checkbox"
        className={className}
        onChange={onchange}
        checked={checked}
      />
      <span className="form-check-label">{label}</span>
    </label>
  );
};
