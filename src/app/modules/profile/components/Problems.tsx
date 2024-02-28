import { useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import Severities from "./hosts/severities/Index";
import Tags from "./hosts/tags/Index";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import InventoryList from "./InventoryList";
import { ProblemTable } from "../../../../_metronic/partials/widgets";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { instance } from "../../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "../../../../_metronic/layout/components/MultiSelect/MultiSelect";
import { useDispatch } from "react-redux";
import { Form, Modal } from "react-bootstrap";
import { fetchHostGroup } from "../../../../hostGroupSlice/hostGroupReducer";
import { Loader } from "../../../../_metronic/layout/components/loader/Loader";

interface hostGroupItems {
  value: string;
  label: string;
}

interface HostsData {
  id: number;
  name: string;
  host: string;
  hostid: string;
}
interface Triggers {
  id: number;
  triggerid: string;
  description: string;
}
interface HostGroupData {
  payload: [];
  meta: {
    requestStatus: string;
  };
}

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
  acknowledged: boolean;
  suppressed: boolean;
  symptom: boolean;
  tag_priority: string;
  evaltype: number;
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

export interface Problem {
  acknowledged: string;
  cause_eventid: string;
  clock: string;
  correlationid: string;
  hostids: object[];
  eventid: string;
  hosts: {
    active_available: string;
    auto_compress: string;
    custom_interfaces: string;
    description: string;
    flags: string;
    host: string;
    hostid: string;
    inventory_mode: string;
    ipmi_authtype: string;
    ipmi_password: string;
    ipmi_privilege: string;
    ipmi_username: string;
    maintenance_from: string;
    maintenance_status: string;
    maintenance_type: string;
    maintenanceid: string;
    name: string;
    proxy_address: string;
    proxy_hostid: string;
    status: string;
    templateid: string;
    tls_accept: string;
    tls_connect: string;
    tls_issuer: string;
    tls_subject: string;
    uuid: string;
    vendor_name: string;
    vendor_version: string;
  }[];
  name: string;
  ns: string;
  object: string;
  objectid: string;
  opdata: string;
  r_clock: string;
  r_eventid: string;
  r_ns: string;
  severity: string;
  source: string;
  suppressed: string;
  tags: {
    tag: string;
    value: string;
  }[];
  urls: never[];
  userid: string;
}

export function Problems() {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sortBasedOn, setSortBasedOn] = useState("");
  const [hostGroupWithParam, setHostGroupWithParam] = useState([]);
  const [hostGroupWithoutParam, setHostGroupWithoutParam] =
    useState<HostGroupData | null>(null);
  const [Triggers, setTriggers] = useState([]);
  const [IsTriggersLoading, setIsTriggersLoading] = useState<boolean>(false);
  const [ProblemsData, setProblemsData] = useState<Problem[]>([]);
  const [showTags, setShowTags] = useState<number>(3);
  const [hostsData, setHostsData] = useState<HostsData[]>([]);
  const [selectedHosts, setSelectedHosts] = useState<hostGroupItems[]>([]);
  const [SelectedTriggers, setSelectedTriggers] = useState([]);
  const [SelectedHostGpTriggers, setSelectedHostGpTriggers] = useState<
    string | number
  >(-1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isHostsModalOpen, setisHostsModalOpen] = useState<boolean>(false);
  const [isHostsDataLoading, setIsHostsDataLoading] = useState<boolean>(false);
  const [resetMultiSelect, setResetMultiSelect] = useState(false);
  const [isTriggersModalOpen, setIsTriggersModalOpen] =
    useState<boolean>(false);
  const [tagNameVisible, setTagNameVisible] = useState<number>(0);
  const [age, setAge] = useState(0);

  useEffect(() => {
    watch("hostids")?.length === 0 && unregister("hostids");
    fetchPromsListData(watch());
    dispatch(
      fetchHostGroup({
        with_triggers: true,
        output: "extend",
      })
    ).then((response) => setHostGroupWithParam(response));

    dispatch(fetchHostGroup({})).then((response) => {
      console.log(response);

      setHostGroupWithoutParam(response);
    });
  }, []);

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
        evaltype: 0,
        tags: [],
        inventory: [],
        hostids: [],
      },
    });

  const {
    fields: inventoryField,
    append: inventoryAppend,
    remove: inventoryRemove,
  } = useFieldArray({
    control,
    name: "inventory",
  });

  const {
    fields: tagsField,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });
  const currentHostids = watch("hostids") ? watch("hostids") : [];
  const currentTriggersIds = watch("objectids") ? watch("objectids") : [];
  const currentGroupids = watch("groupids") ? watch("groupids") : [];

  const handleCheckboxChange = (host) => {
    console.log(selectedHosts);
    setValue("hostids", [...currentHostids, host.hostid]);

    if (currentHostids.includes(host.hostid)) {
      setSelectedHosts(selectedHosts.filter((id) => id.hostid !== host.hostid));
    } else {
      setSelectedHosts([
        ...selectedHosts,
        { label: host.host, value: host.hostid },
      ]);
    }
  };

  const handleCheckboxTriggersChange = (trigger) => {
    console.log(currentTriggersIds);

    setValue("objectids", [...currentTriggersIds, trigger.triggerid]);

    if (currentTriggersIds.includes(trigger.triggerid)) {
      setSelectedHosts(
        SelectedTriggers.filter((id) => id.triggerid !== trigger.triggerid)
      );
    } else {
      setSelectedTriggers([
        ...SelectedTriggers,
        { label: trigger.description, value: trigger.triggerid },
      ]);
    }
  };

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

  const fetchTriggers = async (params: string) => {
    setIsTriggersLoading(true);
    console.log([params]);

    try {
      const response = await instance.post("/core/trigger/get", {
        groupids: [SelectedHostGpTriggers],
        hostids: [params],
        selectHosts: "extend",
        sortfield: "priority",
      });
      setTriggers(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setIsTriggersLoading(false);
  };

  const fetchPromsListData = async (e: object) => {
    console.log(e);

    const params = e ? e : watch();
    setIsError(false);
    setIsLoaded(false);
    try {
      const response = await instance.post("core/problems/get", params);
      setProblemsData(response.data || []);
      console.log(response.data);
    } catch (error) {
      interface ApiError {
        response?: {
          status: number;
        };
      }
      console.error(error);

      if ((error as ApiError).response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      setIsError(true);
    }
    setIsLoaded(true);
  };

  const resetData = () => {
    setResetMultiSelect(true);
    reset();
    fetchPromsListData(watch());
    setShowTags(0);
    setSelectedHosts([]);
    setSelectedHostGpTriggers(-1);
    setSelectedTriggers([]);
    resetMultiSelect && setResetMultiSelect(false);
  };

  const submit = () => {
    watch("severities")?.length === 0 && unregister("severities");
    currentHostids.length === 0 && unregister("hostids");
    currentGroupids.length === 0 && unregister("groupids");
    currentTriggersIds.length === 0 && unregister("objectids");
    handleSubmit(fetchPromsListData)();
  };

  const handleAgeData = (e) => {
    const today = new Date();
    setAge(e.currentTarget.value);
    const DaysAgo = new Date(
      today.setDate(today.getDate() - e.currentTarget.value)
    );
    console.log(DaysAgo);

    setValue("time_from", Date.parse(new Date(DaysAgo)));
  };

  const getPriorityBackgroundColor = (priority: string): string => {
    // Define color range from blue to red
    const colors = [
      "primary",
      "success",
      "warning",
      "danger",
      "danger",
      "danger",
    ];

    // Ensure priority falls within valid range
    const index = Math.min(
      Math.max(Number(priority) - 1, 0),
      colors.length - 1
    );

    // Return corresponding color
    return colors[index];
  };

  return (
    <Content>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.PROBLEMS" })}
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
              <div className="accordion-body">
                <div className="row gap-2">
                  <div className="col">
                    <div
                      className="btn-group py-2 d-flex flex-column gap-3"
                      role="group"
                      aria-label="Basic example"
                    >
                      <div className="w-100">
                        <p>
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.SHOWBASEDON",
                          })}
                        </p>
                        <div
                          className="btn-group pb-2"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className={
                              "btn btn-light-primary rounded-end-2 py-2" +
                              (sortBasedOn === "همه" ? " active" : "")
                            }
                            onClick={() => {
                              setSortBasedOn("همه");
                            }}
                            data-bs-toggle="button"
                          >
                            {intl.formatMessage({
                              id: "MONITORING.PROBLEMS.SHOWBASEDON.RECENTPROBLEMS",
                            })}
                          </button>
                          <button
                            type="button"
                            className={
                              "btn btn-light-primary py-2" +
                              (sortBasedOn === "فعال شده ها" ? " active" : "")
                            }
                            onClick={() => {
                              setSortBasedOn("فعال شده ها");
                            }}
                            data-bs-toggle="button"
                          >
                            {intl.formatMessage({
                              id: "MONITORING.PROBLEMS.SHOWBASEDON.PROBLEMS",
                            })}
                          </button>
                          <button
                            type="button"
                            className={
                              "btn btn-light-primary rounded-start-2 py-2" +
                              (sortBasedOn === "غیر فعال ها" ? " active" : "")
                            }
                            onClick={() => {
                              setSortBasedOn("غیر فعال ها");
                            }}
                            data-bs-toggle="button"
                          >
                            {intl.formatMessage({
                              id: "MONITORING.PROBLEMS.SHOWBASEDON.HISTORY",
                            })}
                          </button>
                        </div>
                      </div>

                      <MultiSelect
                        reset={resetMultiSelect}
                        addAll={false}
                        title="MENU.SELECT.HOSTS.GP"
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
                      <div className="row column-gap-3 m-0">
                        <div className="col p-0">
                          <MultiSelect
                            reset={false}
                            addAll={true}
                            title="MENU.SELECT.HOSTS.GP"
                            options={selectedHosts}
                            Loading={false}
                            DataName="hostids"
                            setData={setValue}
                            currentData={currentHostids}
                          />
                        </div>
                        <button
                          className="btn h-25 py-3 btn-light-primary px-0 col-2"
                          onClick={() => setisHostsModalOpen(true)}
                        >
                          {intl.formatMessage({
                            id: "MENU.SELECT",
                          })}
                        </button>
                      </div>
                      <Modal
                        show={isHostsModalOpen}
                        onHide={() => setisHostsModalOpen(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {intl.formatMessage({ id: "MENU.SELECT.HOSTS" })}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body dir="rtl">
                          <Form.Select
                            defaultValue={-1}
                            onChange={(e) =>
                              fetchHostsData(e.currentTarget.value, false)
                            }
                          >
                            <option value={-1}>
                              {intl.formatMessage({ id: "MENU.SELECT.ALL" })}
                            </option>
                            {hostGroupWithoutParam?.payload?.map(
                              (item: hostGroupItems, index: number) => {
                                return (
                                  <option value={item.value} key={index}>
                                    {item.label}
                                  </option>
                                );
                              }
                            )}
                          </Form.Select>

                          {!isHostsDataLoading ? (
                            hostsData.map((host) => (
                              <div
                                key={host.hostid}
                                className="w-100 justify-content-end my-3 gap-2 d-flex"
                              >
                                <label
                                  className="form-check-label"
                                  htmlFor={`host-${host.hostid}`}
                                >
                                  {host.host}
                                </label>
                                <input
                                  type="checkbox"
                                  id={`host-${host.hostid}`}
                                  checked={currentHostids.includes(host.hostid)}
                                  onChange={() => handleCheckboxChange(host)}
                                />
                              </div>
                            ))
                          ) : (
                            <div className="d-flex pt-7 w-100 justify-content-center">
                              <Loader />
                            </div>
                          )}
                        </Modal.Body>
                      </Modal>
                      <div className="row column-gap-3 m-0">
                        <div className="col pe-0">
                          <MultiSelect
                            title="MENU.SELECT.TRIGGERS"
                            reset={false}
                            options={SelectedTriggers}
                            Loading={false}
                            addAll={true}
                            DataName="objectids"
                            setData={setValue}
                            currentData={currentTriggersIds}
                          />
                        </div>
                        <button
                          className="btn h-25 py-3 btn-light-primary px-0 col-2"
                          onClick={() => setIsTriggersModalOpen(true)}
                        >
                          {intl.formatMessage({
                            id: "MENU.SELECT",
                          })}
                        </button>
                      </div>
                      <Modal
                        show={isTriggersModalOpen}
                        onHide={() => setIsTriggersModalOpen(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>عامل های شروع</Modal.Title>
                        </Modal.Header>
                        <Modal.Body dir="rtl">
                          <Form.Select
                            onChange={(e) => {
                              fetchHostsData(e.currentTarget.value, true);
                              setSelectedHostGpTriggers(e.currentTarget.value);
                            }}
                            defaultValue={-1}
                          >
                            <option value={-1}>
                              {intl.formatMessage({
                                id: "MENU.SELECT.HOSTS.GP",
                              })}
                            </option>
                            {hostGroupWithParam?.payload?.map(
                              (item: hostGroupItems, index: number) => {
                                return (
                                  <option value={item.value} key={index}>
                                    {item.label}
                                  </option>
                                );
                              }
                            )}
                          </Form.Select>
                          <Form.Select
                            defaultValue={-1}
                            className="mt-3"
                            onChange={(e) =>
                              fetchTriggers(e.currentTarget.value)
                            }
                          >
                            <option value={-1}>
                              {intl.formatMessage({ id: "MENU.SELECT.HOSTS" })}
                            </option>
                            {hostsData?.map(
                              (host: HostsData, index: number) => {
                                return (
                                  <option value={host.hostid} key={index}>
                                    {host.host}
                                  </option>
                                );
                              }
                            )}
                          </Form.Select>
                          <p className="mt-2">راهنمای رنگ ها :</p>
                          <div className="d-flex flex-wrap gap-2">
                            <span className="badge badge-light-primary">
                              اطلاع
                            </span>
                            <span className="badge badge-light-success">
                              هشدار
                            </span>
                            <span className="badge badge-light-warning">
                              عادی
                            </span>
                            <span className="badge badge-light-danger">
                              بالا
                            </span>
                          </div>

                          {!IsTriggersLoading ? (
                            Triggers.map((item: Triggers) => (
                              <div
                                key={item.triggerid}
                                className={`w-100 justify-content-end my-3 gap-2 badge d-flex badge-light-${getPriorityBackgroundColor(
                                  item.priority
                                )}`}
                              >
                                {item.description}
                                <input
                                  type="checkbox"
                                  id={`host-${item.triggerid}`}
                                  checked={currentTriggersIds.includes(
                                    item.triggerid
                                  )}
                                  onChange={() =>
                                    handleCheckboxTriggersChange(item)
                                  }
                                />
                              </div>
                            ))
                          ) : (
                            <div className="d-flex pt-7 w-100 justify-content-center">
                              <Loader />
                            </div>
                          )}
                        </Modal.Body>
                      </Modal>
                      <Controller
                        control={control}
                        name={`search.name`}
                        render={({ field }) => (
                          <input
                            type="text"
                            className="form-control py-2"
                            placeholder={intl.formatMessage({
                              id: "MONITORING.PROBLEMS.PROBLEM",
                            })}
                            {...field}
                          />
                        )}
                      />

                      <div>
                        <p className="mt-5">
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.SEVERITY",
                          })}
                        </p>
                        <Severities watch={watch} setValue={setValue} />
                      </div>
                    </div>
                  </div>
                  <div className="col d-flex row-gap-2 flex-column ">
                    <div>
                      <p className="m-0">
                        {intl.formatMessage({
                          id: "MONITORING.PROBLEMS.INVENTORYLIST",
                        })}
                        :
                      </p>
                      {inventoryField.map((item, index) => (
                        <div className="d-flex mb-3 row" key={item.id}>
                          <Controller
                            control={control}
                            name={`inventory[${index}].field`}
                            render={({ field }) => (
                              <select
                                className="form-select form-select-sm col"
                                id={`floatingSelect${item.id}`}
                                aria-label="Floating label select example"
                                {...field}
                              >
                                {InventoryList.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.title}
                                  </option>
                                ))}
                              </select>
                            )}
                          />

                          <div className="col">
                            <Controller
                              control={control}
                              name={`inventory[${index}].value`}
                              render={({ field }) => (
                                <input
                                  className="form-control py-2"
                                  id={`exampleInputEmailValue${item.id}`}
                                  placeholder={intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                  })}
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-light-danger me-2 py-2"
                            onClick={() => inventoryRemove(index)}
                            style={{ width: "10%" }}
                          >
                            {intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                            })}
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="btn btn-light-success py-2 w-25"
                      onClick={() => {
                        inventoryAppend({ field: "type", value: "" });
                      }}
                    >
                      {intl.formatMessage({
                        id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                      })}
                    </button>
                    <p className="m-0">
                      {intl.formatMessage({
                        id: "MONITORING.PROBLEMS.TAGS",
                      })}
                      :
                    </p>
                    {tagsField.map((item, index) => (
                      <div className="d-grid">
                        <div
                          dir="rtl"
                          className="row mb-3 gap-3 "
                          key={item.id}
                        >
                          <div className="col p-0">
                            <Controller
                              control={control}
                              name={`tags[${index}].tag`}
                              render={({ field }) => (
                                <input
                                  type="email"
                                  className="form-control py-2"
                                  placeholder={intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.TITLE",
                                  })}
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          <Controller
                            control={control}
                            name={`tags[${index}].operator`}
                            render={({ field }) => (
                              <select
                                className="form-select form-select-sm text-center col p-0"
                                id={`floatingSelect${item.id}`}
                                aria-label="Floating label select example"
                                {...field}
                              >
                                <option value={"4"}>
                                  {intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.OPTION1",
                                  })}
                                </option>
                                <option value={"1"}>
                                  {intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.OPTION2",
                                  })}
                                </option>
                                <option selected value={"0"}>
                                  {intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.OPTION3",
                                  })}
                                </option>
                                <option value={"5"}>
                                  {intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.OPTION4",
                                  })}
                                </option>
                                <option value={"3"}>
                                  {intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.OPTION5",
                                  })}
                                </option>
                                <option value={"2"}>
                                  {intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.OPTION6",
                                  })}
                                </option>
                              </select>
                            )}
                          />
                          <div className="col p-0">
                            <Controller
                              control={control}
                              name={`tags[${index}].value`}
                              render={({ field }) => (
                                <input
                                  type="email"
                                  className="form-control py-2"
                                  placeholder={intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                  })}
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-light-danger py-2 col p-0"
                            onClick={() => tagsRemove(index)}
                          >
                            {intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                            })}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-light-success py-2 w-25"
                      onClick={() => {
                        tagsAppend({ tag: "", operator: 0, value: "" });
                      }}
                    >
                      {intl.formatMessage({
                        id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                      })}
                    </button>
                    <Tags
                      showTags={showTags}
                      setShowTags={setShowTags}
                      tagNameVisible={tagNameVisible}
                      setTagNameVisible={setTagNameVisible}
                    />

                    <Controller
                      control={control}
                      name={`tag_priority`}
                      render={({ field }) => (
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder={intl.formatMessage({
                            id: "MONITORING.HOSTS.ADDTAG.VALUE",
                          })}
                          {...field}
                        />
                      )}
                    />
                    <div className="flex items-center align-baseline gap-3">
                      <div className="d-flex my-2">
                        <Controller
                          control={control}
                          name={`age_state`}
                          render={() => (
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                e.currentTarget.checked
                                  ? setValue("age_state", "1")
                                  : setValue("age_state", "0")
                              }
                            />
                          )}
                        />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.AGE",
                          })}
                        </span>
                        <input
                          type="number"
                          className="form-control py-2 text-center w-25 py-2"
                          onChange={handleAgeData}
                          value={age}
                        />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.DAYS",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-baseline justify-content-between">
                      <div>
                        <input type="checkbox" name="Checkboxes15" />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.SYMPTOMS",
                          })}
                        </span>
                      </div>
                      <div>
                        <input type="checkbox" name="Checkboxes15" />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.SUPPRESSEDPROBLEMS",
                          })}
                        </span>
                      </div>
                      <div>
                        <input type="checkbox" name="Checkboxes15" />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.UNACKNOWLEDGED",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex w-100 justify-content-center mt-10 column-gap-5">
                    <button
                      type="button"
                      onClick={submit}
                      className="btn py-2 btn-light-success"
                    >
                      تایید
                    </button>
                    <button
                      type="button"
                      onClick={resetData}
                      className="btn py-2 btn-light-danger"
                    >
                      باز نشانی
                    </button>
                    <button
                      type="button"
                      className="btn py-2 btn-light-primary"
                    >
                      ذخیره
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProblemTable
        isLoaded={isLoaded}
        ProblemsData={ProblemsData}
        isError={isError}
        showTags={showTags}
        tagNameVisible={tagNameVisible}
      />
    </Content>
  );
}
