import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
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

interface UpdateInheritedMacrosProps {
  show: boolean;
  item: ItemType | null;
  onHide: () => void;
  onUpdate: (updatedItem: ItemType) => void;
}

interface Macro {
  value?: string;
  type?: string;
  macro?: string;
  description?: string;
}

// Modal component for editing an item
const UpdateInheritedMacros: React.FC<UpdateInheritedMacrosProps> = ({
  show,
  item,
  onHide,
  // onUpdate,
}) => {
  const itemDescription = item?.description || "";
  const itemMacro = item?.macro || "";
  const itemValue = item?.value || "";
  const intl = useIntl();
  // const secondaryColor = getCSSVariableValue("--bs-gray-300");
  const { handleSubmit, register, setValue, watch } = useForm<Macro>({
    defaultValues: {},
  });

  const onSubmit = async (formData: ItemType) => {
    console.log(formData);
    try {
      const response = await instance.post(
        "/core/usermacro/update_global",
        formData
      );
      console.log("Response:", response);
      ToastFire("success", `موفق`, "با موفقیت ویرایش شد");
    } catch (error) {
      console.error("Error during Zabbix request:", error);
      ToastFire("error", `لطفا با فرمت مناسب مقادیر را وارد کنید`, "");
    }
  };

  useEffect(() => {
    setValue("type", item?.type);
    setValue("macro", item?.macro);
    setValue("description", item?.description);
    setValue("value", item?.value);
  }, [show]);

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
            <div className="col d-flex ">
              <div className="w-50">
                <Select
                  defaultLabel={intl.formatMessage({
                    id: "TYPE",
                  })}
                  value={watch("type")}
                  onChange={(e) => setValue("type", e)}
                  options={[
                    { label: "text", value: "0" },
                    { label: "secret text", value: "1" },
                    { label: "vault secret", value: "2" },
                  ]}
                />
              </div>

              <input
                {...register("value")}
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
                  {...register("macro")}
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
                {...register("description")}
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
                id: "UPDATE",
              })}
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateInheritedMacros;
