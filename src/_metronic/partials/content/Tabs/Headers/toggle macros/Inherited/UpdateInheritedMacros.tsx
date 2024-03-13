import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import ToastFire from "../../../../../../layout/components/Toast";
import { instance } from "../../../../../../../services/axiosInstance";
import { Select } from "../../../../../../layout/components/Select";
import Input from "../../../../../../layout/components/Input";
import ModalContainer from "../../../../../../layout/components/ModalContainer";
import BTN from "../../../../../../layout/components/BTN";
import { Loader } from "../../../../../../layout/components/loader/Loader";

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
}) => {
  const itemDescription = item?.description || "";
  const itemMacro = item?.macro || "";
  const itemValue = item?.value || "";
  const itemGlobalIds = item?.globalmacroid || "";
  const intl = useIntl();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { handleSubmit, register, setValue, watch } = useForm<Macro>({
    defaultValues: {},
  });
  const onSubmit = async (formData: ItemType) => {
    setIsLoaded(true);

    try {
      const response = await instance.post("/core/usermacro/update_global", {
        value: formData.value,
        macro: formData.macro,
        description: formData.description,
        type: formData.type,
        globalmacroid: itemGlobalIds,
      });
      setIsLoaded(true);
      console.log("Response:", response);
      ToastFire("success", `موفق`, "با موفقیت ویرایش شد");
      onHide();
    } catch (error) {
      console.error("Error during Zabbix request:", error);
      ToastFire("error", `لطفا با فرمت مناسب مقادیر را وارد کنید`, "");
    }
    setIsLoaded(false);
  };

  useEffect(() => {
    setValue("type", item?.type);
    setValue("macro", item?.macro);
    setValue("description", item?.description);
    setValue("value", item?.value);
    setValue("value", item?.globalmacroid);
  }, [
    item?.description,
    item?.macro,
    item?.type,
    item?.globalmacroid,
    item?.value,
    setValue,
    show,
  ]);
  return (
    <ModalContainer
      title={intl.formatMessage({
        id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.UPDATE",
      })}
      show={show}
      setHide={onHide}
    >
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-2 ">
          <div className="col d-flex gap-3">
            <Input
              register={register("macro")}
              defaultValue={itemValue}
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
              })}
              className="col"
            />
            <Input
              register={register("value")}
              defaultValue={itemValue}
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
              })}
              className="col"
            />
            <div className="col-3">
              <Select
                defaultLabel={intl.formatMessage({
                  id: "TYPE",
                })}
                value={watch("type")}
                onChange={(e) => setValue("type", String(e))}
                options={[
                  { label: "text", value: "0" },
                  { label: "secret text", value: "1" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <Input
            iconName="ocean"
            register={register("description")}
            defaultValue={itemValue}
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
          <div className="m-auto d-flex gap-3 mt-5 ">
            <BTN
              label={intl.formatMessage({
                id: "UPDATE",
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
  );
};

export default UpdateInheritedMacros;
