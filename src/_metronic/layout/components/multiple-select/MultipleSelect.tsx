import React, { useState } from "react";
import { Form, Dropdown, Spinner } from "react-bootstrap";
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
}> = ({ title, options, Loading, addAll }) => {
  
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    addAll ? options : []
    );
    const [isOpen, setIsOpen] = useState(false);
    
    console.log(selectedOptions);
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
        variant="reset"
      >
        {selectedOptions.length > 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <div dir="ltr" className="d-flex gap-1" key={option.value}>
                <p
                  style={{ textOverflow: "ellipsis" }}
                  className="m-0 w-150px overflow-hidden"
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

const MultipleSelect: React.FC<{
  options: Option[];
  Loading: boolean;
  title: string;
  addAll: boolean;
}> = ({ options, Loading, title, addAll }) => {
  return (
    <Form className="w-100">
      <Form.Group controlId="multiSelect">
        <MultiSelect
          title={title}
          addAll={addAll}
          options={options}
          Loading={Loading}
        />
      </Form.Group>
    </Form>
  );
};

export { MultipleSelect };
