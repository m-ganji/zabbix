import React from "react";
import { useState } from "react";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import { useFieldArray } from "react-hook-form";
import { Control } from "react-hook-form";
import BTN from "../BTN";
import { SwitchBTN } from "../SwitchBTN";
import Input from "../Input";
import { Select } from "../Select";
import { CheckBox } from "../CheckBox";
import ModalContainer from "../ModalContainer";
import { AddChecks } from "./AddChecks";
import { instance } from "../../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../../partials/content/Tabs/Headers/Host";
import SwalFire from "../SW_Modal";
import { DiscoveryRullData } from "../../../../app/pages/LatestData/Discovery";

interface DiscoveryCreateProps {
  control: Control<DiscoveryRullData>;
  setValue: CallableFunction;
  register: CallableFunction;
  handleSubmit: CallableFunction;
  watch: CallableFunction;
  fetchData: CallableFunction;
}

export const DiscoveryCreate: React.FC<DiscoveryCreateProps> = ({
  control,
  setValue,
  register,
  watch,
  handleSubmit,
  fetchData,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [IsOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [IsAdvancedTags, setIsAdvancedTags] = useState(true);

  const {
    fields: ChecksField,
    append: ChecksAppend,
    remove: ChecksRemove,
  } = useFieldArray({
    control,
    name: "dchecks",
  });

  const fetchCreate = async (e: object) => {
    console.log(e);
    const params = e ? e : watch();

    const name = watch("name");
    const ip = watch("iprange");

    if (name != "" || ip != "") {
      try {
        const response = await instance.post("/core/drule/create", params);
        fetchData();
        console.log(response.data);
      } catch (error) {
        if ((error as ApiError).response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
        if (
          (error as ApiError).response?.data?.detail?.includes(
            'Incorrect value for field "iprange"'
          )
        ) {
          SwalFire(
            "error",
            "خطا",
            "مقدار نادرست برای آی پی فیلد",
            true,
            false,
            "بستن"
          );
        }
        console.error(error);
      }
    } else {
      SwalFire(
        "error",
        "خطا",
        "مواردی که با ستاره* علامت گذاری شده اند نمی توانند خالی باشند",
        true,
        false,
        "بستن"
      );
    }
  };

  const submit = () => {
    handleSubmit(fetchCreate)();
  };

  const checkTypes = [
    { value: 3, label: "انتقال فایل FTP" },
    { value: 4, label: "پروتکل انتقال ابرمتن HTTP" },
    { value: 14, label: "پروتکل انتقال ابرمتن امن HTTPS" },
    { value: 12, label: "پینگ ICMP" },
    { value: 7, label: "پروتکل ایمیل IMAP" },
    { value: 1, label: "پروتکل دایرکتوری LDAP" },
    { value: 6, label: "پروتکل اخباری NNTP" },
    { value: 5, label: "پروتکل ایمیل POP" },
    { value: 2, label: "پروتکل ارسال ایمیل SMTP" },
    { value: 10, label: "عامل SNMPv1" },
    { value: 11, label: "عامل SNMPv2" },
    { value: 13, label: "عامل SNMPv3" },
    { value: 0, label: "پروتکل خدمات شل SSH" },
    { value: 8, label: "پروتکل کنترل انتقال TCP" },
    { value: 15, label: "پروتکل ارتباطی تلنت" },
    { value: 9, label: "عامل زبیکس Zabbix" },
  ];

  function getLabelFromValue(value: number) {
    const foundType = checkTypes.find((type) => type.value == value);
    console.log(value);

    return foundType ? foundType.label : null;
  }

  return (
    <div
      id="create"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="activities"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '700px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#create-drull"
      data-kt-drawer-close="#create_drull_close"
      dir="rtl"
    >
      <div className="card shadow-none rounded-0 w-100 ">
        <div className="card-header" id="kt_activities_header">
          <h3 className="card-title fw-bolder text-gray-900">
            {intl.formatMessage({ id: "DATA.DISCOVERY.CREATE" })}
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary me-n5"
              id="create_drull_close"
            >
              <KTIcon iconName="cross" className="fs-1" />
            </button>
          </div>
        </div>

        <>
          <>
            <div className="card-body d-flex flex-column gap-4 text-center">
              <div className="row">
                <div className="col p-0">
                  <Input
                    iconName="user"
                    placeholder={intl.formatMessage({
                      id: "NAME",
                    })}
                    register={register("name")}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col p-0">
                  <Input
                    iconName="abstract-43"
                    placeholder={intl.formatMessage({
                      id: "IP",
                    })}
                    register={register("iprange")}
                    required
                  />
                </div>
              </div>
              <ModalContainer
                title={intl.formatMessage({ id: "CHECKS.DISCOVERY" })}
                show={IsOwnerModalOpen}
                setHide={setIsOwnerModalOpen}
              >
                <AddChecks
                  setIsOwnerModalOpen={setIsOwnerModalOpen}
                  append={ChecksAppend}
                  watch={watch}
                  register={register}
                  setValue={setValue}
                  checkTypes={checkTypes}
                />
              </ModalContainer>
              <div className="d-grid gap-3">
                <div className="d-flex gap-1">
                  <span className="text-danger fs-3">*</span>
                  <h6 className="text-end ">
                    {intl.formatMessage({ id: "CHECKS" })} :
                  </h6>
                </div>

                <div className="row">
                  <div className="d-flex flex-column align-content-center">
                    {watch("dchecks")?.map(
                      (item: { type: number; port: string }, index: number) => (
                        <div
                          key={index}
                          className="row d-flex justify-content-center gap-3 my-3"
                        >
                          <div className="col-4 d-flex align-items-center gap-3 p-0">
                            <h6 className="fs-7">
                              {getLabelFromValue(item.type)}
                            </h6>
                            <h6 className="fs-7">({item.port})</h6>
                          </div>
                          <BTN
                            label={intl.formatMessage({
                              id: "EDIT",
                            })}
                            className="btn-light-warning col-2"
                            onClick={() => setIsOwnerModalOpen(true)}
                          />
                          <BTN
                            label={intl.formatMessage({
                              id: "DELETE",
                            })}
                            className="btn-light-danger col-2"
                            onClick={() => ChecksRemove(index)}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="row">
                  <BTN
                    className="btn-light-success col-2"
                    label={intl.formatMessage({
                      id: "ADD",
                    })}
                    onClick={() => setIsOwnerModalOpen(true)}
                  />
                </div>
              </div>
              <div className="row gap-3">
                <div className="input-group  col p-0">
                  <Input
                    iconName="time"
                    placeholder={intl.formatMessage({
                      id: "INTERVAL.UPDATE",
                    })}
                    required
                  />
                </div>
                <div className="input-group col p-0">
                  <Select
                    value={-1}
                    options={[]}
                    onChange={(e) => console.log(e)}
                    defaultLabel={intl.formatMessage({
                      id: "DATA.DISCOVERY.PROXY",
                    })}
                  />
                </div>
              </div>
              <div className="row text-end">
                <div className="col p-0">
                  <div className="d-flex align-items-center gap-5">
                    <h6>
                      {intl.formatMessage({
                        id: "DATA.DEVIVE.UNIC.CI",
                      })}{" "}
                      :
                    </h6>
                    <SwitchBTN
                      label={intl.formatMessage({
                        id: "IP.ADDRESS",
                      })}
                      value="1"
                      state={watch("uniq")}
                      onChange={() => setValue("uniq", "1")}
                    />
                  </div>
                </div>
              </div>
              <div className="row text-end">
                <div className="col p-0">
                  <div className="d-flex align-items-center gap-5">
                    <h6>
                      {intl.formatMessage({
                        id: "HOST.NAME",
                      })}{" "}
                      :
                    </h6>
                    <SwitchBTN
                      label={intl.formatMessage({
                        id: "IP.ADDRESS",
                      })}
                      value="2"
                      state={watch("host_source")}
                      onChange={() => setValue("host_source", "2")}
                    />
                    <SwitchBTN
                      label={intl.formatMessage({
                        id: "DNS.NAME",
                      })}
                      value="1"
                      state={watch("host_source")}
                      onChange={() => setValue("host_source", "1")}
                    />
                  </div>
                </div>
              </div>
              <div className="row text-end">
                <div className="col p-0">
                  <div className="d-flex align-items-center gap-5">
                    <h6>
                      {intl.formatMessage({
                        id: "VISIBLE.NAME",
                      })}{" "}
                      :
                    </h6>
                    <SwitchBTN
                      label={intl.formatMessage({
                        id: "HOST.NAME",
                      })}
                      value="0"
                      state={watch("name_source")}
                      onChange={() => setValue("name_source", "0")}
                    />
                    <SwitchBTN
                      label={intl.formatMessage({
                        id: "DNS.NAME",
                      })}
                      value="1"
                      state={watch("name_source")}
                      onChange={() => setValue("name_source", "1")}
                    />
                    <SwitchBTN
                      label={intl.formatMessage({
                        id: "IP.ADDRESS",
                      })}
                      value="2"
                      state={watch("name_source")}
                      onChange={() => setValue("name_source", "2")}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col p-0">
                  <CheckBox
                    state={IsAdvancedTags}
                    label={intl.formatMessage({
                      id: "ACTIVED",
                    })}
                    checked={true}
                    onchange={(e) => setIsAdvancedTags(e.currentTarget.checked)}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center my-5 column-gap-5">
              <BTN
                label={intl.formatMessage({ id: "SUBMIT" })}
                className="btn-light-success"
                onClick={submit}
              />
              <BTN
                label={intl.formatMessage({ id: "CANCEL" })}
                className="btn-light-danger"
                // onClick={resetData}
                id="create_drull_close"
              />
            </div>
          </>
        </>
      </div>
    </div>
  );
};
