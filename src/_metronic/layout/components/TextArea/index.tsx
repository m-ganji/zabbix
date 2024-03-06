import React, { ChangeEvent } from "react";
import { KTIcon } from "../../../helpers";

interface Props {
  className?: string;
  iconName: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<Props> = ({
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
      <textarea
        className="form-control rounded-start-2 rounded-end-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;