import React from "react";

type SwitchBTNProps = {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  state?: boolean;
};

export const SwitchBTN: React.FC<SwitchBTNProps> = ({
  label,
  onChange,
  state,
}) => {
  return (
    <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
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
