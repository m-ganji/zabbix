import React, { useEffect, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useIntl } from "react-intl";
import { hostGroupItems } from "../../../../hostGroupSlice/hostGroupReducer";

const MultiSelect: React.FC<{
  options: hostGroupItems[];
  Loading: null | boolean | string;
  title: string;
  addAll: boolean;
  DataName: string;
  setData: CallableFunction;
  currentData: number[];
  reset: boolean;
  selectedValue?: hostGroupItems[];
}> = ({
  title,
  options,
  Loading,
  addAll,
  DataName,
  setData,
  currentData,
  reset,
  selectedValue,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<hostGroupItems[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const intl = useIntl();

  useEffect(() => {
    addAll && setSelectedOptions(options);

    selectedValue?.[0]?.value && setSelectedOptions(selectedValue);
  }, [addAll, options, reset]);

  const toggleOption = (option: hostGroupItems) => {
    const isSelected = selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value
    );
    console.log(isSelected);

    const filteredOptions = selectedOptions.filter(
      (selectedOption) => selectedOption.value !== option.value
    );

    if (isSelected) {
      if (DataName === "groups") {
        setData(DataName, [
          ...currentData,
          ...filteredOptions.map((group) => ({
            groupid: group.value,
            name: group.label,
          })),
        ]);
      } else {
        setData(
          DataName,
          filteredOptions.map((i) => i.value)
        );
      }
      setSelectedOptions(filteredOptions);
    } else {
      if (DataName === "groups") {
        setData(DataName, [
          ...selectedOptions.map((group) => ({
            groupid: group.value,
            name: group.label,
          })),
          ...[option].map((group) => ({
            groupid: group.value,
            name: group.label,
          })),
        ]);
        setSelectedOptions([...selectedOptions, option]);
      } else {
        setData(DataName, [...currentData, option.value]);
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const toggleAllOptions = () => {
    if (DataName === "groups") {
      setSelectedOptions(
        selectedOptions.length === options.length ? [] : [...options]
      );
      setData(
        DataName,
        options.map((group) => ({
          groupid: group.value,
          name: group.label,
        }))
      );
    } else {
      setSelectedOptions([...options]);
      setData(
        DataName,
        options.map((i) => i.value)
      );
    }
  };

  const deleteAllOptions = () => {
    console.log(selectedOptions);
    setSelectedOptions([]);
    setData(DataName, []);
  };

  const deleteOption = (option: hostGroupItems) => {
    const filteredOptions = selectedOptions.filter(
      (selectedOption) => selectedOption.value !== option.value
    );

    if (DataName === "groups") {
      setData(
        DataName,
        filteredOptions.map((group) => ({
          groupid: group.value,
          name: group.label,
        }))
      );
    } else {
      setData(
        DataName,
        filteredOptions.map((i) => i.value)
      );
    }
    setSelectedOptions(filteredOptions);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown show={isOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        className="w-100 py-3 d-flex bg-transparent text-reset border align-items-center justify-content-between"
        variant="reset"
      >
        {selectedOptions?.length > 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {selectedOptions.map((option, index) => (
              <div
                dir="ltr"
                className="d-flex gap-1"
                style={{
                  maxWidth: "130px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                key={index}
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
            {options?.length != 0 ? (
              options?.map((option, index) => (
                <Dropdown.Item
                  key={index}
                  style={{
                    direction: "ltr",
                    textOverflow: "ellipsis",
                    maxHeight: "250px",
                  }}
                  onClick={() => toggleOption(option)}
                  active={selectedOptions.some(
                    (selectedOption) => selectedOption.value === option.value
                  )}
                >
                  {option.label}
                </Dropdown.Item>
              ))
            ) : (
              <p>{intl.formatMessage({ id: "NOT_FOUND" })}</p>
            )}
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { MultiSelect };
