import { Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../../../helpers";
import { useState } from "react";
import { getCSSVariableValue } from "../../../../../assets/ts/_utils";

const Hostmacros: React.FC = ({
  macrosField,
  control,
  macrosRemove,
  macrosAppend,
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<JSX.Element>(
    <KTIcon iconName="text" className="fs-2" />
  );
  const secondaryColor = getCSSVariableValue("--bs-gray-300");
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  console.log(activeDropdownIndex);

  const options: JSX.Element[] = [
    <div className="border card  rounded-2 p-2 mt-7">
      <div
        key={1}
        className="d-flex justify-content-end gap-2  p-2"
        onClick={() =>
          selectOption(<KTIcon iconName="text" className="fs-2 d-flex" />, 1)
        }
      >
        text
        <KTIcon
          iconName="text"
          className="fs-2 d-flex justify-content-center justify-content-end gap-2"
        />
      </div>

      <div
        key={2}
        className="d-flex justify-content-end gap-2 p-2"
        onClick={() =>
          selectOption(<KTIcon iconName="eye-slash" className="fs-2" />, 2)
        }
      >
        secret text
        <KTIcon iconName="eye-slash" className="fs-2" />
      </div>

      <div
        key={3}
        className="d-flex justify-content-end gap-2 p-2"
        onClick={() =>
          selectOption(<KTIcon iconName="lock-2" className="fs-2" />, 3)
        }
      >
        vault secret <KTIcon iconName="lock-2" className="fs-2" />
      </div>
    </div>,
  ];

  const toggleDropdown = (index) => {
    setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    setIsOpen((prevIsOpen) => !prevIsOpen);
    console.log(setActiveDropdownIndex);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    console.log(option);
    setIsOpen(false);
  };


  return (
    <div>
      {macrosField.map((item, index) => (
        <div className="d-flex mb-3 gap-3 m-5" key={item.id}>
          <div style={{ width: "33%" }}>
            <Controller
              name={`macros[${index}].macro`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
                  id={`exampleInputEmail${item.id}`}
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.TAGS.MACRO",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
              )}
            />
          </div>
          <Controller
            name={`macros[${index}].value`}
            control={control}
            render={({ field }) => (
              <div className="d-flex">
                <input
                  {...field}
                  type="text"
                  className="form-control py-2 w-75"
                  id={`exampleInputEmailValue${item.id}`}
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
              </div>
            )}
          />
          <div
            className={`custom-dropdown border border-${secondaryColor} border-2 `}
            onClick={() => {
              toggleDropdown(index);
              console.log(index);
            }}
            key={index}
          >
            <div className="selected-option mt-2" key={index}>
              {selectedOption}
            </div>
            {isOpen && (
              <div className="options position-absolute" key={index}>
                {options}
              </div>
            )}
          </div>
          <div style={{ width: "33%" }}>
            <Controller
              name={`macros[${index}].description`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
                  id={`exampleInputEmailValue${item.id}`}
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.TAGS.DESC",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
              )}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger me-2 py-2"
            onClick={() => macrosRemove(index)}
          >
            {intl.formatMessage({
              id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
            })}
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-success py-2 d-block mt-5 "
        onClick={() => {
          macrosAppend({  macro: "" ,value: "", description: "" });
        }}
      >
        {intl.formatMessage({
          id: "ADD",
        })}
      </button>
    </div>
  );
};

export default Hostmacros;
