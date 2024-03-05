import React, { ChangeEvent } from "react";
import { KTIcon } from "../../../helpers";

interface Props {
  className?: string;
  iconName: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface Field {
  field: {
    value: string;
  };
}

const Input: React.FC<Props> = ({
  className,
  iconName,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={`input-group ${className}`}>
      <span className="input-group-text rounded-start-0 rounded-end-2 p-3">
        <KTIcon iconName={iconName} className="fs-3" />
      </span>
      <input
        type="text"
        className="form-control py-0 rounded-start-2 rounded-end-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
