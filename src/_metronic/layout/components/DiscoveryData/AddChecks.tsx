import React from "react";
import { useIntl } from "react-intl";
import Input from "../Input";
import BTN from "../BTN";
import SwalFire from "../SW_Modal";

interface AddChecks {
  setIsOwnerModalOpen: CallableFunction;
  append: CallableFunction;
  register: CallableFunction;
  setValue: CallableFunction;
  watch: CallableFunction;
  checkTypes: { value: number; label: string }[];
}
export const AddChecks: React.FC<AddChecks> = ({
  setIsOwnerModalOpen,
  append,
  register,
  watch,
  setValue,
  checkTypes,
}) => {
  const intl = useIntl();

  const addHandler = () => {
    const type = watch("dchecks.type");
    const port = watch("dchecks.ports");

    if (type === "" || port === "") {
      SwalFire(
        "error",
        "خطا",
        "تمامی فیلد ها را پر نمایید",
        true,
        false,
        "بستن"
      );
    } else {
      append({
        type,
        port,
      });
      setIsOwnerModalOpen(false);
    }
  };

  return (
    <>
      <div className="d-flex gap-4">
        <select
          className="form-select h-40px"
          onChange={(e) => {
            setValue("dchecks.type", e.currentTarget.value);
          }}
        >
          {checkTypes.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Input
          iconName="focus"
          placeholder={intl.formatMessage({
            id: "PORT.RANGE",
          })}
          register={register("dchecks.ports")}
          required
        />
      </div>
      <div className="d-flex w-100 justify-content-center mt-5 column-gap-3">
        <BTN
          label={intl.formatMessage({ id: "ADD" })}
          className="btn-light-success"
          onClick={addHandler}
        />
        <BTN
          label={intl.formatMessage({ id: "CANCEL" })}
          className="btn-light-danger"
          onClick={() => setIsOwnerModalOpen(false)}
        />
      </div>
    </>
  );
};
