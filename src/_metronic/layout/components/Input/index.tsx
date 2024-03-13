import React, { ChangeEvent } from "react";
import { KTIcon } from "../../../helpers";

interface Props {
  className?: string;
  iconName?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  register?: CallableFunction | object;
  disabled?: boolean;
  type?: string;
  defaultValue?: string;
}

const Input: React.FC<Props> = ({
  className,
  iconName,
  placeholder,
  value,
  required,
  onChange,
  register,
  disabled,
  type,
  defaultValue,
}) => {
  return register ? (
    <div dir="rtl" className={`input-group ${className || ""}`}>
      {required && (
        <span className="text-danger position-absolute top-0 me-1 fs-3">*</span>
      )}
      {iconName && (
        <span className="input-group-text rounded-start-0 rounded-end-2 p-3">
          <KTIcon iconName={iconName} className="fs-3" />
        </span>
      )}
      <input
        type={type ?? "text"}
        className={`form-control py-0 rounded-start-2 ${
          iconName ? "rounded-end-0" : ""
        }`}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  ) : (
    <div dir="rtl" className={`input-group ${className}`}>
      {required && (
        <span className="text-danger position-absolute top-0 me-1 fs-3">*</span>
      )}
      {iconName && (
        <span className="input-group-text rounded-start-0 rounded-end-2 p-3">
          <KTIcon iconName={iconName} className="fs-3" />
        </span>
      )}
      <input
        type={type ?? "text"}
        className={`form-control py-0 rounded-start-2 ${
          iconName ? "rounded-end-0" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
