import { useIntl } from "react-intl";
import { instance } from "../../../../../../services/axiosInstance";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Loader } from "../../../../../layout/components/loader/Loader";
import { getCSSVariableValue } from "../../../../../assets/ts/_utils";
import { KTIcon } from "../../../../../helpers";

interface ItemType {
  description: string;
  globalmacroid: string;
  macro: string;
  type: string;
}

type Inputs = {
  macro: string;
  value: string;
  type: string;
  description: string;
};

const Inheritedmacros: React.FC = ({
  macrosField,
  control,
  macrosRemove,
  macrosAppend,
  setValue,
}) => {
  const intl = useIntl();
  const [globalUserMacro, setGlobalUserMacro] = useState<ItemType[]>([]);
  const [isInheritedModalOpen, setisInheritedModalOpen] =
    useState<boolean>(false);
  const [isInheritedCreateModalOpen, setIsInheritedCreateModalOpen] =
    useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const secondaryColor = getCSSVariableValue("--bs-gray-300");

  useEffect(() => {
    setIsLoaded(false);

    const fetchData = async () => {
      try {
        const response = await instance.post("/core/usermacro/get", {
          output: "extend",
          globalmacro: true,
        });
        globalUserMacro.map((e) => setGlobalUserMacro(e.macro));

        setGlobalUserMacro(response.data || []);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error during Zabbix request:", error);
      }
      // setIsLoaded(true);
    };

    fetchData();
  }, []);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const response = await instance.post(
        "/core/usermacro/create_global",
        data
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error during Zabbix request:", error);
    }
  };

  const [dropdownStates, setDropdownStates] = useState(
    new Array(macrosField.length).fill(false)
  );
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(macrosField.length).fill(null)
  );

  const toggleDropdown = (index?: number) => {
    const newDropdownStates = [...dropdownStates];
    if (index !== undefined) {
      newDropdownStates[index] = !newDropdownStates[index];
    } else {
      // Close all dropdowns
      newDropdownStates.fill(false);
    }
    setDropdownStates(newDropdownStates);
  };

  const selectOption = (option, index) => {
    let typeValue;
    if (option.props.iconName === "text") {
      typeValue = 0;
    } else if (option.props.iconName === "eye-slash") {
      typeValue = 1;
    } else if (option.props.iconName === "lock-2") {
      typeValue = 2;
    }
    setValue(`macros[${index}].type`, typeValue);
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
    toggleDropdown(index);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<JSX.Element>(
    <KTIcon iconName="text" className="fs-2" />
  );

  const options: JSX.Element[] = [
    <div className="border card rounded-2 p-2 mt-7">
      <div
        key={1}
        className="d-flex justify-content-end gap-2 p-2"
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

  return (
    <div className="d-flex flex-column">
      {isLoaded && (
        <p
          className="d-flex justify-content-center align-content-center btn btn-light-primary w-25"
          type="button"
          style={{ marginRight: "70%" }}
          onClick={() => setisInheritedModalOpen(true)}
        >
          پیکربندی مقدار
        </p>
      )}
      {/* first modal */}
      <Modal
        show={isInheritedModalOpen}
        onHide={() => setisInheritedModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>ها user macro لیست</Modal.Title>
        </Modal.Header>
        <Modal.Body dir="rtl">
          {globalUserMacro.map((e, index) => (
            <div className="d-flex py-2 mb-5 gap-5 ">
              <input
                type="text"
                className="form-control "
                defaultValue={e.macro}
                dir="rtl"
                style={{ width: "33%", direction: "rtl" }}
                key={index}
              />
              <div className="d-flex" style={{ width: "33%" }}>
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                  key={index}
                />
                <div
                  className={`custom-dropdown border border-${secondaryColor} border-2 `}
                  onClick={() => {
                    toggleDropdown(index);
                  }}
                  key={index}
                >
                  <div className="selected-option mt-2">
                    {selectedOptions[index] ? (
                      selectedOptions[index]
                    ) : (
                      <span>
                        {e.type == "0" && (
                          <span>
                            <KTIcon
                              iconName="text"
                              className="fs-2 d-flex justify-content-center justify-content-end gap-2"
                            />
                          </span>
                        )}
                        {e.type == "1" && (
                          <span>
                            <KTIcon
                              iconName="eye-slash"
                              className="fs-2 d-flex justify-content-center justify-content-end "
                            />
                          </span>
                        )}
                        {e.type == "2" && (
                          <span>
                            <KTIcon
                              iconName="lock-2"
                              className="fs-2 d-flex justify-content-center justify-content-end gap-2"
                            />
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  {dropdownStates[index] && (
                    <div
                      className="options position-absolute border card"
                      style={{ zIndex: 100 }}
                    >
                      <div
                        key={0}
                        className="d-flex justify-content-end gap-2 p-2"
                        onClick={() => {
                          selectOption(
                            <KTIcon iconName="text" className="fs-2 d-flex" />,
                            index
                          );
                        }}
                      >
                        text
                        <KTIcon
                          iconName="text"
                          className="fs-2 d-flex justify-content-center justify-content-end gap-2"
                        />
                      </div>

                      <div
                        key={1}
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
                        key={2}
                        className="d-flex justify-content-end gap-2 p-2"
                        onClick={() =>
                          selectOption(
                            <KTIcon iconName="lock-2" className="fs-2" />,
                            index
                          )
                        }
                      >
                        vault secret{" "}
                        <KTIcon iconName="lock-2" className="fs-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <input
                type="text"
                className="form-control py-2"
                aria-describedby="emailHelp"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.ADDTAG.VALUE",
                })}
                style={{ width: "33%" }}
                dir="rtl"
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-success py-2 d-block mt-5 "
            onClick={() => setIsInheritedCreateModalOpen(true)}
          >
            {intl.formatMessage({
              id: "ADD",
            })}
          </button>
        </Modal.Body>
      </Modal>
      {/* second modal*/}
      <Modal
        show={isInheritedCreateModalOpen}
        onHide={() => setIsInheritedCreateModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>user macro ایجاد</Modal.Title>
        </Modal.Header>
        <Modal.Body dir="rtl">
          <form
            className="d-flex flex-column  py-2 mb-5 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex gap-5">
              <input
                {...register("macro")}
                type="text"
                className="form-control"
                dir="rtl"
                style={{ width: "33%", direction: "rtl" }}
              />
              <div className="d-flex" style={{ width: "33%" }}>
                <input
                  {...register("value", {
                    pattern: /^\{\$test\}$/i,
                    message: "Input should be in the format '{$test}'",
                  })}
                  type="text"
                  className="form-control py-2"
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
                <div
                  {...register("type")}
                  className={`custom-dropdown border border-${secondaryColor} border-2 `}
                  onClick={(option, index) => {
                    setIsOpenAdd((prevIsOpen) => !prevIsOpen);
                    setValue(`type`, 1);
                  }}
                >
                  <div className="selected-option mt-2">{selectedOption}</div>
                  {isOpenAdd && (
                    <div
                      className="options position-absolute"
                      onClick={(e) => {
                        const innerHTML = e.target.innerHTML;
                        console.log(innerHTML);
                        if (innerHTML.includes("text")) {
                          setSelectedOption(
                            <KTIcon iconName="text" className="fs-2" />
                          );
                        }
                        if (innerHTML.includes("secret ")) {
                          setSelectedOption(
                            <KTIcon iconName="eye-slash" className="fs-2" />
                          );
                        }
                        if (innerHTML.includes("lock")) {
                          setSelectedOption(
                            <KTIcon iconName="lock-2" className="fs-2" />
                          );
                        }
                      }}
                    >
                      {options}
                    </div>
                  )}
                </div>
              </div>
              <input
                {...register("description")}
                type="text"
                className="form-control py-2"
                dir="rtl"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.ADDTAG.VALUE",
                })}
                style={{ width: "33%", direction: "rtl" }}
              />
            </div>
            <button type="submit" className="btn btn-success py-2 d-block mt-5">
              ساخت
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {(!isLoaded && (
        <div className="d-flex pt-7 w-100 justify-content-center">
          <Loader />
        </div>
      )) ||
        globalUserMacro.map((e) => (
          <div className="d-flex py-2 mb-5 gap-5 me-3">
            <input
              type="text"
              className="form-control "
              defaultValue={e.macro}
              dir="rtl"
              style={{ width: "33%", direction: "rtl" }}
            />
            <div className="d-flex" style={{ width: "33%" }}>
              <input
                type="text"
                className="form-control py-2"
                aria-describedby="emailHelp"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.ADDTAG.VALUE",
                })}
                style={{ direction: "rtl" }}
                dir="rtl"
              />
              <div
                className={`custom-dropdown border border-${secondaryColor} border-2`}
                style={{
                  cursor: "not-allowed",
                }}
              >
                <div className="selected-option mt-2">
                  {e.type == "0" && (
                    <span>
                      <KTIcon
                        iconName="text"
                        className="fs-2 d-flex justify-content-center justify-content-end gap-2"
                      />
                    </span>
                  )}
                  {e.type == "1" && (
                    <span>
                      <KTIcon
                        iconName="eye-slash"
                        className="fs-2 d-flex justify-content-center justify-content-end "
                      />
                    </span>
                  )}
                  {e.type == "2" && (
                    <span>
                      <KTIcon
                        iconName="lock-2"
                        className="fs-2 d-flex justify-content-center justify-content-end gap-2"
                      />
                    </span>
                  )}
                </div>
              </div>
            </div>

            <input
              type="text"
              className="form-control py-2"
              aria-describedby="emailHelp"
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.ADDTAG.VALUE",
              })}
              style={{ width: "33%" }}
              dir="rtl"
            />
          </div>
        ))}
    </div>
  );
};

export default Inheritedmacros;
