import React from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { getCSSVariableValue } from "../../../../../../assets/ts/_utils";

interface ItemType {
  description?: string;
  globalmacroid?: string;
  macro?: string;
  type?: string;
  value?: string;
}

interface UpdateInheritedMacrosProps {
  show: boolean;
  item: ItemType | null;
  onHide: () => void;
  onUpdate: (updatedItem: ItemType) => void;
}

// Modal component for editing an item
const UpdateInheritedMacros: React.FC<UpdateInheritedMacrosProps> = ({
  show,
  item,
  onHide,
  onUpdate,
}) => {
  // Ensure item is not null before using its properties
  const itemDescription = item?.description || "";
  const itemMacro = item?.macro || "";
  const itemValue = item?.value || "";
  const intl = useIntl();
  const secondaryColor = getCSSVariableValue("--bs-gray-300");

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.UPDATE",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-2 ">
          <div className="col">
            <input
              type="text"
              className="form-control "
              aria-describedby="emailHelp"
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
              })}
              defaultValue={itemValue}
            />
          </div>
          <div className="col">
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                defaultValue={itemMacro}
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
                })}
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col">
            <input
              type="text"
              className="form-control "
              aria-describedby="emailHelp"
              defaultValue={itemDescription}
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
              })}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="m-auto">
        <button type="button" onClick={onHide} className="btn btn-light-danger">
          {intl.formatMessage({
            id: "CLOSE",
          })}
        </button>

        <button
          type="button"
          onClick={onHide}
          className="btn btn-light-success"
        >
          {intl.formatMessage({
            id: "UPDATE",
          })}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateInheritedMacros;

// todo
// 1 request
// 2 toast
