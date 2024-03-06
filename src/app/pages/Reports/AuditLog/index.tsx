import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "../../../../_metronic/layout/components/MultiSelect/MultiSelect";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../../services/axiosInstance";
import BTN from "../../../../_metronic/layout/components/BTN";
import { Content } from "../../../../_metronic/layout/components/content";
import { AuditLogTabel } from "../../../../_metronic/partials/widgets/tables/AuditLogTabel";
import { KTIcon } from "../../../../_metronic/helpers";
import DatePickerSelect from "../../../../_metronic/layout/components/DatePicker";
import Input from "../../../../_metronic/layout/components/Input";
import { Select } from "../../../../_metronic/layout/components/Select";
import { CheckBox } from "../../../../_metronic/layout/components/CheckBox";

interface FormValues {
  selectTags: string;
  selectHosts: string;
  hostids: number[];
  search: {
    name: string;
  };
  tag_name_format: number;
  time_from: string;
  age_state: string;
  recent: string;
  acknowledged: boolean;
  suppressed: boolean;
  symptom: boolean;
  tag_priority: string;
  evaltype: string;
  tags: {
    tag: string;
    operator: number;
    value: string;
  }[];
  inventory: {
    field: string;
    value: string;
    [index: number]: {
      field: string;
    };
  }[];
  severities: number[];
  objectids: [];
  groupids: [];
}
interface HostsData {
  id: number;
  name: string;
  host: string;
  hostid: string;
}
interface hostGroupItems {
  value: string;
  label: string;
}
interface HostGroupData {
  payload: [];
  meta: {
    requestStatus: string;
  };
}
const AuditLog = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hostsData, setHostsData] = useState<HostsData[]>([]);
  const [hostGroupWithoutParam, setHostGroupWithoutParam] =
    useState<HostGroupData | null>(null);
  const [selectedHosts, setSelectedHosts] = useState<hostGroupItems[]>([]);
  const [resetMultiSelect, setresetMultiSelect] = useState(false);
  const [isHostsModalOpen, setisHostsModalOpen] = useState<boolean>(false);
  const [isHostsDataLoading, setIsHostsDataLoading] = useState<boolean>(false);
  const [Mood, setMood] = useState<string>("0");

  const ResourseOptions = [
    { value: -1, label: "همه" },
    { value: 45, label: "توکن API" },
    { value: 5, label: "عملیات" },
    { value: 42, label: "احراز هویت" },
    { value: 38, label: "خودکار ثبت نام" },
    { value: 51, label: "اتصال‌دهنده" },
    { value: 33, label: "داشبورد" },
    { value: 23, label: "قانون کشف" },
    { value: 34, label: "همبستگی رویداد" },
    { value: 6, label: "نمودار" },
    { value: 35, label: "پروتوتایپ نمودار" },
    { value: 47, label: "گره پایداری بالا" },
    { value: 4, label: "میزبان" },
    { value: 14, label: "گروه میزبان" },
    { value: 37, label: "پروتوتایپ میزبان" },
    { value: 41, label: "نگهداری خانه" },
    { value: 32, label: "نقشه آیکن" },
    { value: 16, label: "تصویر" },
    { value: 15, label: "مورد" },
    { value: 36, label: "پروتوتایپ مورد" },
    { value: 29, label: "ماکرو" },
    { value: 27, label: "نگهداری" },
    { value: 19, label: "نقشه" },
    { value: 3, label: "نوع رسانه" },
    { value: 39, label: "ماژول" },
    { value: 26, label: "پراکسی" },
    { value: 28, label: "عبارت منظم" },
    { value: 48, label: "تعهد سطح خدمت" },
    { value: 46, label: "گزارش زمان‌بندی شده" },
    { value: 25, label: "اسکریپت" },
    { value: 18, label: "خدمات" },
    { value: 40, label: "تنظیمات" },
    { value: 30, label: "الگو" },
    { value: 43, label: "داشبورد الگو" },
    { value: 50, label: "گروه الگو" },
    { value: 13, label: "محرک" },
    { value: 31, label: "پروتوتایپ محرک" },
    { value: 0, label: "کاربر" },
    { value: 49, label: "دایرکتوری کاربر" },
    { value: 11, label: "گروه کاربر" },
    { value: 44, label: "نقش کاربر" },
    { value: 17, label: "نقشه مقدار" },
    { value: 22, label: "سناریو وب" },
  ];

  const { control, watch, setValue, handleSubmit, reset, unregister } =
    useForm<FormValues>({
      defaultValues: {
        selectTags: "extend",
        selectHosts: "extend",
        search: { name: "" },
        tag_name_format: 0,
        time_from: "14",
        age_state: "0",
        acknowledged: false,
        suppressed: false,
        symptom: false,
        tag_priority: "",
        evaltype: "0",
        tags: [],
        inventory: [],
        hostids: [],
        recent: "1",
      },
    });

  const currentHostids = watch("hostids") ? watch("hostids") : [];
  const currentGroupids = watch("groupids") ? watch("groupids") : [];

  const fetchHostsData = async (params: string, with_triggers: boolean) => {
    console.log(with_triggers);

    setIsHostsDataLoading(true);
    const param =
      Number(params) === -1
        ? with_triggers
          ? { with_triggers: "extend" }
          : {}
        : with_triggers
        ? { groupids: [params], with_triggers: "extend" }
        : { groupids: [params] };

    try {
      const response = await instance.post("/core/hosts/get", param);
      setHostsData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsHostsDataLoading(false);
  };
  const handleCheckboxChange = (host) => {
    if (currentHostids.includes(host.hostid)) {
      const newData = selectedHosts.filter((id) => id.value != host.hostid);
      setSelectedHosts(newData);
      setValue(
        "hostids",
        newData.map((i) => i.value)
      );
      console.log(newData);
    } else {
      setSelectedHosts([
        ...selectedHosts,
        { label: host.host, value: host.hostid },
      ]);
      setValue("hostids", [...currentHostids, host.hostid]);
    }
  };

  const resetData = () => {
    setResetMultiSelect(true);
    reset();
    setSelectedHosts([]);
    resetMultiSelect && setResetMultiSelect(false);
  };

  const submit = () => {
    currentHostids.length === 0 && unregister("hostids");
    currentGroupids.length === 0 && unregister("groupids");
    handleSubmit(fetchPromsListData)();
  };

  const handleDateChange = (e) => {
    console.log(e);
    // Your logic here
  };

  const handleMood = (e) => {
    setMood(e);
  };

  return (
    <>
      <Content>
        <div className="d-flex align-items-center my-4">
          <h3 className="fw-bolder w-100">
            {intl.formatMessage({ id: "REPORT.AUDIT_LOG" })}
          </h3>
          <div className="d-flex gap-3 w-50 justify-content-end">
            <ul className="nav d-flex gap-3 align-items-center">
              <li className="nav-item">
                <a
                  data-bs-toggle="tab"
                  href="#Availability_filter"
                  className="w-100 text-end btn py-2 btn-light-primary active"
                >
                  <KTIcon iconName="filter" className="fs-2" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  data-bs-toggle="tab"
                  href="#Availability_date"
                  className="w-100 text-end btn py-2 btn-light-warning"
                >
                  <KTIcon iconName="calendar" className="fs-2" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div
            className="accordion "
            style={{ boxShadow: "0 0 10px -10px black" }}
            id="monitoring-hosts"
          >
            <div className="accordion-item ">
              <button
                className="accordion-button px-5 py-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <span className="w-100 text-end">فیلتر</span>
              </button>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#monitoring-hosts"
              >
                <div className="accordion-body tab-content">
                  <div
                    id="Availability_filter"
                    className="tab-pane active show"
                  >
                    <div className="d-flex gap-3 justify-content-center">
                      <div className="d-flex flex-column align-items-center gap-3 w-50">
                        <div className="w-100">
                          <MultiSelect
                            reset={resetMultiSelect}
                            addAll={false}
                            title="USERS"
                            options={
                              hostGroupWithoutParam
                                ? hostGroupWithoutParam.payload
                                : []
                            }
                            Loading={
                              hostGroupWithoutParam &&
                              hostGroupWithoutParam.meta &&
                              hostGroupWithoutParam.meta.requestStatus !==
                                "fulfilled"
                            }
                            DataName="groupids"
                            setData={setValue}
                            currentData={currentGroupids}
                          />
                        </div>
                        <div className="w-100">
                          <p className="my-1">
                            {intl.formatMessage({ id: "MENU.ACTIONS" })} :
                          </p>
                          <div className="d-flex  gap-3">
                            <div className="d-flex flex-column gap-3">
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "ADD",
                                })}
                              />
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "EXECUTE",
                                })}
                              />
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "LOGIN",
                                })}
                              />
                            </div>
                            <div className="d-flex flex-column gap-3">
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "CONFIGURATION_REFRESH",
                                })}
                              />
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "FAILED_LOGIN",
                                })}
                              />
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "LOGOUT",
                                })}
                              />
                            </div>
                            <div className="d-flex flex-column gap-3">
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "DELETE",
                                })}
                              />
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "HISTORY_CLEAR",
                                })}
                              />
                              <CheckBox
                                dir="rtl"
                                className=" justify-content-between"
                                label={intl.formatMessage({
                                  id: "UPDATE",
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center gap-3 w-50">
                        <Select
                          value="-1"
                          defaultLabel={intl.formatMessage({
                            id: "RESOURCE",
                          })}
                          options={ResourseOptions}
                        />
                        <Input
                          iconName="abstract-43"
                          placeholder={intl.formatMessage({
                            id: "RESOURCE_ID",
                          })}
                        />
                        <Input
                          iconName="abstract-41"
                          placeholder={intl.formatMessage({
                            id: "RECORDSET_ID",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div id="Availability_date" className=" tab-pane">
                    <div className="d-flex justify-content-center">
                      <DatePickerSelect
                        range={true}
                        defaultValue={new Date()}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex w-100 justify-content-center mt-10 column-gap-5">
                    <BTN
                      label={intl.formatMessage({ id: "SUBMIT" })}
                      className="btn-light-success"
                      onClick={submit}
                    />
                    <BTN
                      label="باز نشانی"
                      className="btn-light-danger"
                      onClick={resetData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AuditLogTabel />
      </Content>
    </>
  );
};

export default AuditLog;
