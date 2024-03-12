import React from "react";

interface SelectOption {
  value?: string | number;
  label?: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange?: (selectedValue: string | number) => void;
  defaultLabel?: string;
  value?: string | number;
  register?: CallableFunction;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  defaultLabel = "Select...",
  value,
  register,
  disabled,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event?.target?.value;
    onChange && onChange(value);
  };

  return onChange ? (
    <select
      className="form-select h-40px"
      value={value}
      onChange={handleSelectChange}
      disabled={disabled}
    >
      <option disabled value="-1">
        {defaultLabel}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ) : (
    <select disabled={disabled} className="form-select h-40px" {...register}>
      <option disabled value="-1">
        {defaultLabel}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
