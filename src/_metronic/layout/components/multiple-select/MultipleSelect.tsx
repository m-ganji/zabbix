import React, { useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useIntl } from "react-intl";

interface Option {
  value: string;
  label: string;
}

const MultiSelect: React.FC<{
  options: Option[];
  Loading: boolean;
  title: string;
  addAll: boolean;
  DataName: string;
  setData: CallableFunction;
  currentData: [];
}> = ({ title, options, Loading, addAll, DataName, setData, currentData }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: Option) => {
    const isSelected = selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value
    );
    console.log(option);
    if (isSelected) {
      console.log(
        currentData.filter((selectedOption) => selectedOption !== option.value)
      );

      setData(
        DataName,
        selectedOptions.filter(
          (selectedOption) => selectedOption.value !== option.value
        )
      );
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOption) => selectedOption.value !== option.value
        )
      );
    } else {
      console.log(currentData);

      setData(DataName, [...currentData, option.value]);
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const toggleAllOptions = () => {
    setSelectedOptions(
      selectedOptions.length === options.length ? [] : [...options]
    );
    setData(
      DataName,
      currentData.length === options.length ? [] : options.map((i) => i.value)
    );
  };

  const deleteAllOptions = () => {
    setSelectedOptions([]);
    setData(DataName, []);
  };

  const deleteOption = (option: Option) => {
    setData(
      DataName,
      selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      )
    );
    setSelectedOptions(
      selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      )
    );
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const intl = useIntl();
  return (
    <Dropdown show={isOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        className="w-100 py-3 d-flex bg-transparent text-reset border align-items-center justify-content-between"
        variant="reset"
        onChange={(e) => console.log(e.currentTarget.value)}
      >
        {(addAll ? options : selectedOptions)?.length > 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {(addAll ? options : selectedOptions).map((option) => (
              <div
                dir="ltr"
                className="d-flex gap-1"
                style={{ maxWidth: "130px" }}
                key={option.value}
              >
                <p
                  style={{ textOverflow: "ellipsis" }}
                  className="m-0  overflow-hidden"
                >
                  {option.label}
                </p>
                <img
                  src="/media/icons/duotune/general/close-circle.svg"
                  onClick={() => deleteOption(option)}
                  alt="Close"
                />
              </div>
            ))}
          </div>
        ) : (
          intl.formatMessage({ id: title })
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu dir="rtl" className="w-100 text-center p-0">
        {Loading ? (
          <Dropdown.Item>
            <Spinner animation="border" variant="primary" />
          </Dropdown.Item>
        ) : (
          <>
            <div className="d-flex align-align-items-center">
              <Dropdown.Item
                className="w-100 text-end"
                onClick={toggleAllOptions}
              >
                {intl.formatMessage({ id: "MENU.SELECT.ALL" })}
              </Dropdown.Item>
              <Dropdown.Item
                style={{ width: "100px" }}
                className="text-center"
                onClick={deleteAllOptions}
              >
                {intl.formatMessage({ id: "MENU.SELECT.ALL.DEL" })}
              </Dropdown.Item>
            </div>
            <Dropdown.Divider />
            {options.map((option) => (
              <Dropdown.Item
                key={option.value}
                onClick={() => toggleOption(option)}
                active={selectedOptions.some(
                  (selectedOption) => selectedOption.value === option.value
                )}
              >
                {option.label}
              </Dropdown.Item>
            ))}
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { MultiSelect };
