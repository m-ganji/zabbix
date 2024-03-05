import React, { ChangeEvent } from "react";

interface CheckBoxProps {
  className?: string;
  onchange?: (event: ChangeEvent<HTMLInputElement>) => void;
  state?: boolean;
  label?: string;
  dir?: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  onchange,
  state,
  label,
  dir,
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
        defaultChecked={state}
      />
      <span className="form-check-label">{label}</span>
    </label>
  );
};
