import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import ToastFire from "../../../../../../layout/components/Toast";
import { instance } from "../../../../../../../services/axiosInstance";
import { Select } from "../../../../../../layout/components/Select";
import ModalContainer from "../../../../../../layout/components/ModalContainer";
import Input from "../../../../../../layout/components/Input";
import BTN from "../../../../../../layout/components/BTN";
import { Loader } from "../../../../../../layout/components/loader/Loader";

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

interface Macro {
  value?: string;
  type?: string;
  macro?: string;
  description?: string;
}

// Modal component for editing an item
const AddInheritedMacros: React.FC<AddInheritedMacrosProps> = ({
  show,
  onHide,
}) => {
  const intl = useIntl();

  const { handleSubmit, register, setValue } = useForm<Macro>({
    defaultValues: {},
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onSubmit = async (formData: ItemType) => {
    console.log(formData);
    setIsLoaded(true);
    try {
      const response = await instance.post(
        "/core/usermacro/create_global",
        formData
      );
      console.log("Response:", response);
      setIsLoaded(true);
      onHide();
      ToastFire("success", `موفق`, "با موفقیت ساخته شد");
    } catch (error) {
      console.error("Error during Zabbix request:", error);
      ToastFire("error", `لطفا با فرمت مناسب مقادیر را وارد کنید`, "");
    }
    setIsLoaded(false);
  };
  console.log("loader", isLoaded);

  return (
    <>
      <ModalContainer
        title={intl.formatMessage({
          id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.ADD",
        })}
        show={show}
        setHide={onHide}
      >
        <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-2 ">
            <div className="col d-flex gap-3">
              <input
                {...register("macro")}
                type="text"
                className="form-control"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
                })}
                defaultValue="{$MACRO}"
                onChange={(e) =>
                  setValue("macro", e.target.value.toUpperCase())
                }
              />
              <Input
                register={register("value")}
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
                })}
                className="col"
              />
              <div className="col-3">
                <Select
                  onChange={(e) => setValue("type", String(e))}
                  options={[
                    { label: "text", value: "0" },
                    { label: "secret text", value: "1" },
                    { label: "vault secret", value: "2" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <Input
              iconName="ocean"
              register={register("description")}
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
              })}
              className="col"
            />
          </div>
          {(isLoaded && (
            <div className="d-flex pt-7 w-100 justify-content-center">
              <Loader />
            </div>
          )) || (
            <div className="m-auto d-flex gap-3 mt-5">
              <BTN
                label={intl.formatMessage({
                  id: "ADD",
                })}
                className="btn-light-success"
                type="submit"
              />
              <BTN
                label={intl.formatMessage({
                  id: "CLOSE",
                })}
                className="btn-light-danger"
                onClick={onHide}
              />
            </div>
          )}
        </form>
      </ModalContainer>
    </>
  );
};

export default AddInheritedMacros;
