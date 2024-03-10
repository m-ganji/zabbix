import { useIntl } from "react-intl";
import { instance } from "../../../../../../services/axiosInstance";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Control, useForm } from "react-hook-form";
import { Loader } from "../../../../../layout/components/loader/Loader";
import { getCSSVariableValue } from "../../../../../assets/ts/_utils";
import { KTIcon } from "../../../../../helpers";
import { useNavigate } from "react-router-dom";
import ToastFire from "../../../../../layout/components/Toast";

interface ItemType {
  description?: string;
  globalmacroid?: string;
  macro?: string;
  type?: string;
  value?: string;
}

type Inputs = {
  macro: string;
  value?: string;
  type?: string;
  description?: string;
};
interface Macro {
  macrosField: object[];
  control: Control;
  macrosRemove: CallableFunction;
  macrosAppend: CallableFunction;
  setValue: CallableFunction;
}
const Inheritedmacros: React.FC<Macro> = ({
  macrosField,
  // control,
  // macrosRemove,
  // macrosAppend,
  setValue,
}) => {
  const intl = useIntl();
  const [globalUserMacro, setGlobalUserMacro] = useState<ItemType[]>([]);
  const [isInheritedModalOpen, setisInheritedModalOpen] =
    useState<boolean>(false);
  const [isInheritedCreateModalOpen, setIsInheritedCreateModalOpen] =
    useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAddLoaded, setIsAddLoaded] = useState<boolean>(false);
  const secondaryColor = getCSSVariableValue("--bs-gray-300");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(false);
    const fetchData = async () => {
      try {
        const response = await instance.post("/core/usermacro/get", {
          output: "extend",
          globalmacro: true,
        });

        setGlobalUserMacro(response.data || []);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error during Zabbix request:", error);
        navigate("/");
      }
    };

    fetchData();
  }, []);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {},
  });

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    setIsAddLoaded(false);

    try {
      const response = await instance.post(
        "/core/usermacro/create_global",
        data
      );
      console.log("Response:", response);
      ToastFire("success", `موفق`, "با موفقیت ساخته شد");
      setIsInheritedCreateModalOpen(false);
      setIsAddLoaded(true);
    } catch (error) {
      console.error("Error during Zabbix request:", error);
      ToastFire("error", `لطفا با فرمت مناسب مقادیر را وارد کنید`, "");
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
      newDropdownStates.fill(false);
    }
    setDropdownStates(newDropdownStates);
  };
  console.log(dropdownStates);

  const selectOption = (
    option: { props: { iconName: string } },
    index: number
  ) => {
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
            <div className="d-flex py-2 mb-5 gap-5 " key={index}>
              <input
                type="text"
                className="form-control "
                style={{ width: "33%" }}
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
                })}
                defaultValue={e.macro}
              />

              <div className="d-flex" style={{ width: "33%" }}>
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
                  })}
                  defaultValue={e.value}
                />
                <div
                  className={`custom-dropdown border border-${secondaryColor} border-2 `}
                  onClick={() => {
                    toggleDropdown(index);
                  }}
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
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
                })}
                style={{ width: "33%" }}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-success py-2 d-block mt-5 "
            onClick={() => {
              setIsInheritedCreateModalOpen(true);
              setisInheritedModalOpen(false);
              setDropdownStates(new Array(macrosField.length).fill(false));
            }}
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
          {
            <form
              className="d-flex flex-column  py-2 mb-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="d-flex gap-5">
                <input
                  {...register("macro")}
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
                  })}
                  defaultValue="{$Macro}"
                  style={{ width: "33%" }}
                />
                <div className="d-flex" style={{ width: "33%" }}>
                  <input
                    {...register("value")}
                    type="text"
                    className="form-control py-2"
                    aria-describedby="emailHelp"
                    placeholder={intl.formatMessage({
                      id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
                    })}
                  />
                  <div
                    className={`custom-dropdown border border-${secondaryColor} border-2 `}
                    onClick={() => {
                      setIsOpenAdd((prevIsOpen) => !prevIsOpen);
                    }}
                  >
                    <div className="selected-option mt-2">{selectedOption}</div>
                    {isOpenAdd && (
                      <div
                        className="options position-absolute"
                        onClick={(
                          e: React.MouseEvent<HTMLDivElement, MouseEvent>
                        ) => {
                          const innerHTML = (e.target as HTMLElement).innerHTML;
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
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
                  })}
                  style={{ width: "33%" }}
                />
              </div>
              <div className="d-flex gap-5 m-auto mt-5 ">
                <button
                  type="submit"
                  className="btn btn-success py-2 d-block mt-5"
                >
                  ساخت
                </button>
                <button
                  type="button"
                  onClick={() => setIsInheritedCreateModalOpen(false)}
                  className="btn btn-danger py-2 d-block mt-5"
                >
                  بستن
                </button>
              </div>
            </form>
          }
        </Modal.Body>
      </Modal>
      {(!isLoaded && (
        <div className="d-flex pt-7 w-100 justify-content-center">
          <Loader />
        </div>
      )) ||
        globalUserMacro.map((e, index) => (
          <div key={index} className="d-flex py-2 mb-5 gap-5 me-3">
            <input
              type="text"
              className="form-control "
              defaultValue={e.macro}
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
              })}
              key={index}
              style={{ width: "33%", cursor: "not-allowed" }}
            />
            <div className="d-flex" style={{ width: "33%" }}>
              <input
                type="text"
                className="form-control py-2"
                aria-describedby="emailHelp"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
                })}
                defaultValue={e.value}
                style={{
                  cursor: "not-allowed",
                }}
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
                id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
              })}
              style={{ width: "33%" }}
            />
          </div>
        ))}
    </div>
  );
};

export default Inheritedmacros;
