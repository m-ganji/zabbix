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
  const secondaryColor = getCSSVariableValue("--bs-gray-300");

  const [dropdownStates, setDropdownStates] = useState(
    new Array(macrosField.length).fill(false)
  );
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(macrosField.length).fill(null)
  );

  const toggleDropdown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);
  };

  const selectOption = (option, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
    toggleDropdown(index);
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
            onClick={() => toggleDropdown(index)}
            key={index}
          >
            <div className="selected-option mt-2">
              {selectedOptions[index] ? (
                selectedOptions[index]
              ) : (
                <span>
                  <KTIcon
                    iconName="text"
                    className="fs-2 d-flex justify-content-center justify-content-end gap-2"
                  />
                </span>
              )}
            </div>
            {dropdownStates[index] && (
              <div
                className="options position-absolute border card"
                style={{ zIndex: 100 }}
              >
                <div
                  key={1}
                  className="d-flex justify-content-end gap-2 p-2"
                  onClick={() =>
                    selectOption(
                      <KTIcon iconName="text" className="fs-2 d-flex" />,
                      index
                    )
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
                    selectOption(
                      <KTIcon iconName="eye-slash" className="fs-2" />,
                      index
                    )
                  }
                >
                  secret text
                  <KTIcon iconName="eye-slash" className="fs-2" />
                </div>

                <div
                  key={3}
                  className="d-flex justify-content-end gap-2 p-2"
                  onClick={() =>
                    selectOption(
                      <KTIcon iconName="lock-2" className="fs-2" />,
                      index
                    )
                  }
                >
                  vault secret <KTIcon iconName="lock-2" className="fs-2" />
                </div>
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
          macrosAppend({ macro: "", value: "", description: "" });
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
