import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "../../../../_metronic/layout/components/MultiSelect/MultiSelect";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../../services/axiosInstance";
import BTN from "../../../../_metronic/layout/components/BTN";
import { Content } from "../../../../_metronic/layout/components/content";
import { ActionLogTabel } from "../../../../_metronic/partials/widgets/tables/ActionLogTabel";
import { KTIcon } from "../../../../_metronic/helpers";
import DatePickerSelect from "../../../../_metronic/layout/components/DatePicker";
import Input from "../../../../_metronic/layout/components/Input";
import { SwitchBTN } from "../../../../_metronic/layout/components/Maps/SwitchBTN/index";

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
const ActionLog = () => {
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
            {intl.formatMessage({ id: "REPORT.ACTION_LOG" })}
          </h3>
          <div className="d-flex gap-3 w-50 justify-content-end">
            <div>
              <BTN
                label={intl.formatMessage({ id: "EXPORT_TO_CSV" })}
                className="btn-light-success"
              />
            </div>
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
                            title="RECIPIENTS"
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
                          <MultiSelect
                            reset={resetMultiSelect}
                            addAll={false}
                            title="MENU.ACTIONS"
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
                          <MultiSelect
                            reset={resetMultiSelect}
                            addAll={false}
                            title="REPORTS.MEDIA_TYPE"
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
                      </div>
                      <div className="d-flex flex-column align-items-center gap-3 w-50">
                        <div className="w-100">
                          <p className="m-0">
                            {intl.formatMessage({ id: "STATUS" })} :
                          </p>
                          <div className="d-flex gap-3">
                            <SwitchBTN
                              label={intl.formatMessage({
                                id: "IN_PROGRESS",
                              })}
                            />
                            <SwitchBTN
                              label={intl.formatMessage({
                                id: "SENT/EXECUTED",
                              })}
                            />
                            <SwitchBTN
                              label={intl.formatMessage({
                                id: "FAILED",
                              })}
                            />
                          </div>
                        </div>
                        <Input
                          iconName="magnifier"
                          placeholder={intl.formatMessage({
                            id: "SEARCH_STRING",
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
        <ActionLogTabel />
      </Content>
    </>
  );
};

export default ActionLog;
