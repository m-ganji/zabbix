import React, { useState } from "react";

interface SelectOption {
  value?: string | number;
  label?: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange?: (selectedValue: string | number) => void;
  defaultLabel?: string;
  value?: string | number;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  defaultLabel = "Select...",
  value
}) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event?.target?.value;
    onChange(value);
  };

  return (
    <select
      className="form-select h-40px"
      value={value}
      onChange={handleSelectChange}
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
  );
};