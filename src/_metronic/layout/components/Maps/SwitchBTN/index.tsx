import React from "react";

type SwitchBTNProps = {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  state?: boolean;
  className?: string;
};

export const SwitchBTN: React.FC<SwitchBTNProps> = ({
  label,
  onChange,
  state,
  className,
}) => {
  return (
    <div
      className={`form-check   form-switch p-0 form-switch-sm form-check-custom form-check-solid ${className} `}
    >
      <label className="form-check-label">{label}</label>
      <input
        className="form-check-input"
        type="checkbox"
        name="notifications"
        onChange={onChange}
        checked={state || false}
      />
    </div>
  );
};
