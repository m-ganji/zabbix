import React from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { getCSSVariableValue } from "../../../../../../assets/ts/_utils";
import { useForm } from "react-hook-form";
import ToastFire from "../../../../../../layout/components/Toast";
import { instance } from "../../../../../../../services/axiosInstance";
import { Select } from "../../../../../../layout/components/Select";

interface ItemType {
  description?: string;
  globalmacroid?: string;
  macro?: string;
  type?: string;
  value?: string;
}

interface AddInheritedMacrosProps {
  show: boolean;
  item: ItemType | null;
  onHide: () => void;
}

// Modal component for editing an item
const AddInheritedMacros: React.FC<AddInheritedMacrosProps> = ({
  show,
  onHide,
}) => {
  const intl = useIntl();
  const secondaryColor = getCSSVariableValue("--bs-gray-300");

  const { handleSubmit, register, setValue } = useForm<Macro>({
    defaultValues: {},
  });

  const onSubmit = async (formData: ItemType) => {
    console.log(formData);
    try {
      const response = await instance.post(
        "/core/usermacro/create_global",
        formData
      );
      console.log("Response:", response);
      ToastFire("success", `موفق`, "با موفقیت ساخته شد");
    } catch (error) {
      console.error("Error during Zabbix request:", error);
      ToastFire("error", `لطفا با فرمت مناسب مقادیر را وارد کنید`, "");
    }
  };

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
        <form
          className="d-flex flex-column  py-2 mb-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row mb-2 ">
            <div className="col">
              <input
                {...register("value")}
                type="text"
                className="form-control py-2"
                aria-describedby="emailHelp"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
                })}
              />
              <Select
                onChange={(e) => setValue("type", e)}
                options={[
                  { label: "text", value: "0" },
                  { label: "secret text", value: "1" },
                  { label: "vault secret", value: "2" },
                ]}
              />
            </div>
            <div className="col">
              <div className="d-flex">
                <input
                  {...register("macro")}
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
                  })}
                  defaultValue="{$Macro}"
                />
              </div>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col">
              <input
                {...register("description")}
                type="text"
                className="form-control py-2"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
                })}
              />
            </div>
          </div>
          <Modal.Footer className="m-auto">
            <button
              type="button"
              onClick={onHide}
              className="btn btn-light-danger"
            >
              {intl.formatMessage({
                id: "CLOSE",
              })}
            </button>
            <button type="submit" className="btn btn-light-success">
              {intl.formatMessage({
                id: "ADD",
              })}
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddInheritedMacros;
