import { useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "../../../../_metronic/layout/components/MultiSelect/MultiSelect";
import { useIntl } from "react-intl";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { instance } from "../../../../services/axiosInstance";
import BTN from "../../../../_metronic/layout/components/BTN";
import { Content } from "../../../../_metronic/layout/components/content";
import { Select } from "../../../../_metronic/layout/components/Select";
import DatePickerSelect from "../../../../_metronic/layout/components/DatePicker";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { HostTabel } from "../../../../_metronic/partials/widgets/tables/Inventory/HostTabel";
import Input from "../../../../_metronic/layout/components/Input";

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
// interface HostsData {
//   id: number;
//   name: string;
//   host: string;
//   hostid: string;
// }
// interface hostGroupItems {
//   value: string;
//   label: string;
// }
interface HostGroupData {
  payload: [];
  meta: {
    requestStatus: string;
  };
}
const InventoryHost = () => {
  const intl = useIntl();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [hostsData, setHostsData] = useState<HostsData[]>([]);
  // const [hostGroupWithoutParam, setHostGroupWithoutParam] =
  useState<HostGroupData | null>(null);
  // const [selectedHosts, setSelectedHosts] = useState<hostGroupItems[]>([]);
  // const [resetMultiSelect, setresetMultiSelect] = useState(false);
  // const [isHostsModalOpen, setisHostsModalOpen] = useState<boolean>(false);
  // const [isHostsDataLoading, setIsHostsDataLoading] = useState<boolean>(false);
  const { watch, setValue, reset, unregister } = useForm<FormValues>({
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

  // const fetchHostsData = async (params: string, with_triggers: boolean) => {
  //   console.log(with_triggers);

  //   setIsHostsDataLoading(true);
  //   const param =
  //     Number(params) === -1
  //       ? with_triggers
  //         ? { with_triggers: "extend" }
  //         : {}
  //       : with_triggers
  //       ? { groupids: [params], with_triggers: "extend" }
  //       : { groupids: [params] };

  //   try {
  //     const response = await instance.post("/core/hosts/get", param);
  //     setHostsData(response.data);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsHostsDataLoading(false);
  // };
  // const handleCheckboxChange = (host) => {
  //   if (currentHostids.includes(host.hostid)) {
  //     const newData = selectedHosts.filter((id) => id.value != host.hostid);
  //     setSelectedHosts(newData);
  //     setValue(
  //       "hostids",
  //       newData.map((i) => i.value)
  //     );
  //     console.log(newData);
  //   } else {
  //     setSelectedHosts([
  //       ...selectedHosts,
  //       { label: host.host, value: host.hostid },
  //     ]);
  //     setValue("hostids", [...currentHostids, host.hostid]);
  //   }
  // };

  const resetData = () => {
    // setResetMultiSelect(true);
    reset();
    // setSelectedHosts([]);
    // resetMultiSelect && setResetMultiSelect(false);
  };

  const submit = () => {
    currentHostids.length === 0 && unregister("hostids");
    currentGroupids.length === 0 && unregister("groupids");
    // handleSubmit(fetchPromsListData)();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    // Your logic here
  };

  return (
    <>
      <Content>
        <PageTitle breadcrumbs={[]}>
          {intl.formatMessage({ id: "INVENTORY.HOST" })}
        </PageTitle>
        <ToolbarWrapper />
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
                    <div className="d-flex flex-column align-items-center gap-3">
                      <div className="w-50">
                        <MultiSelect
                          reset={false}
                          addAll={false}
                          title="MENU.SELECT.HOSTS.GP"
                          options={
                            // hostGroupWithoutParam
                            //   ? hostGroupWithoutParam.payload
                            //   : []
                            []
                          }
                          Loading={
                            // hostGroupWithoutParam &&
                            // hostGroupWithoutParam.meta &&
                            // hostGroupWithoutParam.meta.requestStatus !==
                            //   "fulfilled"
                            false
                          }
                          DataName="groupids"
                          setData={setValue}
                          currentData={currentGroupids}
                        />
                      </div>
                      <div className="d-flex gap-3 w-75">
                        <Select
                          onChange={(e) => console.log(e)}
                          value="-1"
                          defaultLabel={intl.formatMessage({
                            id: "VALUE",
                          })}
                          options={[]}
                        />
                        <Select
                          onChange={(e) => console.log(e)}
                          value="-1"
                          defaultLabel={intl.formatMessage({
                            id: "MONITORING.HOSTS.ADDTAG.OPTION3",
                          })}
                          options={[
                            {
                              value: "1",
                              label: intl.formatMessage({
                                id: "MONITORING.HOSTS.ADDTAG.OPTION2",
                              }),
                            },
                          ]}
                        />
                        <Input
                          iconName="abstract-43"
                          placeholder={intl.formatMessage({
                            id: "VALUE",
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
        <HostTabel />
      </Content>
    </>
  );
};

export default InventoryHost;
