import { Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../../../helpers";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";

const Hostmacros: React.FC = ({
  macrosField,
  control,
  macrosRemove,
  macrosAppend,
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {macrosField.map((item, index) => (
        <div className="d-flex mb-3 gap-3 m-5 " key={item.id}>
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
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
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
                <select
                  className="form-select form-select-sm w-25 "
                  id={`floatingSelect${item.id}`}
                  aria-label="Floating label select example"
                  style={{ width: "33%" }}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    field.onChange(newValue);
                  }}
                >
                  <option value={1}>
                    <KTIcon iconName="plus" />
                  </option>
                  <option value={2}>🅿️&#x0054; متن 2</option>
                  <option value={2}>🔏 متن 2</option>
                </select>
              </div>
            )}
          />
          <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
              className="w-100 py-3 d-flex bg-transparent text-reset border align-items-center justify-content-between"
              variant="reset"
            >
              <KTIcon iconName="plus" className="fs-2" />1
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action-1"
                // onClick={() => handleItemClick("Item 1")}
              >
                {" "}
                <KTIcon iconName="plus" className="fs-2" />1
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                {" "}
                <KTIcon iconName="plus" className="fs-2" />1
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

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
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
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
              id: "DELETE",
            })}
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-success py-2 d-block mt-5 "
        onClick={() => {
          macrosAppend({ tag: "", value: "" });
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
