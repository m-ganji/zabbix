import { Modal } from "react-bootstrap";

type Props = {
  isInheritedModalOpen: boolean;
  setIsInheritedModalOpen: CallableFunction;
};

const Update: React.FC<Props> = ({
  isInheritedModalOpen,
  setisInheritedModalOpen,
}) => {
  return (
    <div>
      <Modal
        show={isInheritedModalOpen}
        onHide={() => setIsInheritedModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>ها user macro لیست</Modal.Title>
        </Modal.Header>
        <Modal.Body dir="rtl">
          {/* {globalUserMacro.map((e, index) => (
            <div className="d-flex py-2 mb-5 gap-5 " key={index}>
              <input
                type="text"
                className="form-control "
                style={{ width: "33%" }}
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
                })}
                defaultValue={e.macro}
                onChange={(e) => console.log(e.target.value)}
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
                  onClick={async (e) => {
                    toggleDropdown(index);
                    let typeValue;
                    if (e.target.textContent === "text") {
                      typeValue = 0;
                    }
                    if (e.target.textContent === "secret text") {
                      typeValue = 1;
                    }
                    if (e.target.textContent === "vault secret") {
                      typeValue = 2;
                    }

                    try {
                      const response = await instance.post(
                        "/core/usermacro/update_global",
                        {
                          globalmacroid: globalUserMacro[index].globalmacroid,
                          type: typeValue,
                          // macro
                          // value
                          // description
                        }
                      );
                      console.log("Response:", response);
                    } catch (error) {
                      console.error("Error during Zabbix request:", error);
                    }
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
          </button> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Update;
