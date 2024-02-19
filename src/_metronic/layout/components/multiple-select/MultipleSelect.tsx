import React, { useState } from "react";
import { Form, Dropdown, Spinner } from "react-bootstrap";
import { useIntl } from "react-intl";

interface Option {
  value: string;
  label: string;
}

const MultiSelect: React.FC<{ options: Option[]; Loading: boolean }> = ({
  options,
  Loading,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: Option) => {
    const isSelected = selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value
    );
    setSelectedOptions(
      isSelected
        ? selectedOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        : [...selectedOptions, option]
    );
  };

  const toggleAllOptions = () => {
    setSelectedOptions(
      selectedOptions.length === options.length ? [] : [...options]
    );
  };

  const deleteAllOptions = () => {
    setSelectedOptions([]);
  };

  const deleteOption = (option: Option) => {
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
        className="w-100 d-flex bg-transparent text-reset border align-items-center justify-content-between"
        id="dropdown-basic"
        variant="reset"
      >
        {selectedOptions.length > 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <div className="d-flex gap-1" key={option.value}>
                <p className="m-0">{option.label}</p>
                <img
                  src="/media/icons/duotune/general/close-circle.svg"
                  onClick={() => deleteOption(option)}
                  alt="Close"
                />
              </div>
            ))}
          </div>
        ) : (
          intl.formatMessage({ id: "MENU.SELECT" })
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

const MultipleSelect: React.FC<{ options: Option[]; Loading: boolean }> = ({
  options,
  Loading,
}) => {
  return (
    <Form>
      <Form.Group controlId="multiSelect">
        <MultiSelect options={options} Loading={Loading} />
      </Form.Group>
    </Form>
  );
};

export { MultipleSelect };
