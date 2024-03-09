import { useEffect, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import Severities from "../../modules/profile/components/hosts/severities/Index";
import Tags from "../../modules/profile/components/hosts/tags/Index";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import InventoryList from "../../modules/profile/components/InventoryList";
import { ProblemTable } from "../../../_metronic/partials/widgets";
import { PageTitle } from "../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { instance } from "../../../services/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from "../../../_metronic/layout/components/MultiSelect/MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Badge from "../../../_metronic/layout/components/Badge";
import {
  AppDispatch,
  selectApiData,
  selectApiLoading,
} from "./../../../store/store";
import {
  fetchHostGroup,
  hostGroupItems,
} from "../../../hostGroupSlice/hostGroupReducer";
import { Loader } from "../../../_metronic/layout/components/loader/Loader";
import ToggleBtns from "../../../_metronic/layout/components/ToggleBtn/ToggleBtn";
import BTN from "../../../_metronic/layout/components/BTN";
import ModalContainer from "../../../_metronic/layout/components/ModalContainer";
import { CheckBox } from "./../../../_metronic/layout/components/CheckBox/index";

interface Triggers {
  priority: string;
  triggerid: number;
  description: string;
}
interface TriggersGp {
  value: number;
  label: string;
}
type HostGroupData = {
  value: number;
  label: string;
};

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
    operator: number | string;
    value: string;
  }[];
  inventory: {
    field: string;
    value: string;
  }[];
  severities: number[];
  objectids: number[];
  groupids: [];
}

interface ProblemParams extends Record<string, string> {
  id: string;
  value: string;
}
type HostsData = {
  host: string;
  hostid: number; // Assuming hostid is of type number
};

interface ApiError {
  response?: {
    status: number;
  };
}

export function Problems() {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { id, value } = useParams<ProblemParams>();

  const [hostGroupWithoutParam, setHostGroupWithoutParam] = useState<
    HostGroupData[]
  >([]);
  const [Triggers, setTriggers] = useState([]);
  const [IsTriggersLoading, setIsTriggersLoading] = useState<boolean>(false);
  const [ProblemsData, setProblemsData] = useState([]);
  const [showTags, setShowTags] = useState<number>(3);
  const [hostsData, setHostsData] = useState<HostsData[]>([]);
  const [selectedHosts, setSelectedHosts] = useState<hostGroupItems[]>([]);
  const [SelectedTriggers, setSelectedTriggers] = useState<TriggersGp[]>([]);
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

  const HostGroupData: hostGroupItems[] = useSelector(selectApiData);
  const HostGroupLoading = useSelector(selectApiLoading);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    unregister,
    register,
  } = useForm<FormValues>({
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
      inventory: [],
      recent: "1",
      hostids: id ? [parseInt(id as string, 10)] : [],
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

  const currentHostids: number[] = watch("hostids") ?? [];
  const currentTriggersIds: number[] = watch("objectids") ?? [];
  const currentGroupids: number[] = watch("groupids") ?? [];

  useEffect(() => {
    id && value && setSelectedHosts([{ value: id, label: value }]);

    dispatch(fetchHostGroup());

    watch("hostids")?.length === 0 && unregister("hostids");
    fetchPromsListData(watch());
  }, [navigate, dispatch]);

  useEffect(() => {
    isTriggersModalOpen && fetchTriggerHostGps();
  }, [isTriggersModalOpen]);

  const fetchTriggerHostGps = async () => {
    const response = await instance.post("/core/hostgroup/get", {
      with_triggers: true,
    });

    setHostGroupWithoutParam(
      response?.data.map((group: hostGroupItems) => ({
        value: group.groupid,
        label: group.name,
      }))
    );
  };

  const handleCheckboxChange = (host: HostsData) => {
    if (currentHostids.includes(host.hostid)) {
      const newData = selectedHosts.filter((id) => id.value !== host.hostid);
      setSelectedHosts(newData);
      setValue(
        "hostids",
        newData.map((i) => i.value as number)
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

  const handleCheckboxTriggersChange = (trigger: Triggers) => {
    console.log(currentTriggersIds);

    if (currentTriggersIds.includes(trigger.triggerid)) {
      const newData = SelectedTriggers.filter(
        (id) => id.value !== trigger.triggerid
      );
      setSelectedTriggers(newData);
      setValue(
        "objectids",
        newData.map((i) => i.value as number)
      );
    } else {
      setSelectedTriggers([
        ...SelectedTriggers,
        { label: trigger.description, value: trigger.triggerid },
      ]);
      setValue("objectids", [
        ...currentTriggersIds,
        trigger.triggerid,
      ] as unknown as []);
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
      console.log("res", response?.status);
    } catch (error) {
      console.log("error", error);
      if ((error as ApiError).response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
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
    unregister("hostids");
    reset();
    navigate("/Monitoring/Problems");
    setResetMultiSelect(true);
    setShowTags(0);
    setSelectedHosts([]);
    setSelectedHostGpTriggers(-1);
    setSelectedTriggers([]);
    resetMultiSelect && setResetMultiSelect(false);
    fetchPromsListData(watch());
  };

  const submit = () => {
    watch("severities")?.length === 0 && unregister("severities");
    currentHostids.length === 0 && unregister("hostids");
    currentGroupids.length === 0 && unregister("groupids");
    currentTriggersIds.length === 0 && unregister("objectids");
    handleSubmit(fetchPromsListData)();
  };

  const handleAgeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const today = new Date();
    const ageValue = parseInt(e.currentTarget.value, 10); // Parse the input value as an integer
    setAge(ageValue);

    const DaysAgo = new Date(today.setDate(today.getDate() - ageValue));

    setValue("time_from", DaysAgo.toISOString()); // Convert the date to ISO string before setting the value
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
                        <ToggleBtns
                          options={[
                            {
                              value: "1",
                              label:
                                "MONITORING.PROBLEMS.SHOWBASEDON.RECENTPROBLEMS",
                            },
                            {
                              value: "2",
                              label: "MONITORING.PROBLEMS.SHOWBASEDON.PROBLEMS",
                            },
                            {
                              value: "3",
                              label: "MONITORING.PROBLEMS.SHOWBASEDON.HISTORY",
                            },
                          ]}
                          data="recent"
                          setData={setValue}
                          initialData={watch("recent")}
                        />
                      </div>
                      <MultiSelect
                        reset={false}
                        addAll={false}
                        title="MENU.SELECT.HOSTS.GP"
                        options={HostGroupData.map((group) => ({
                          value: group.groupid,
                          label: group.name,
                        }))}
                        Loading={HostGroupLoading}
                        DataName="groupids"
                        setData={setValue}
                        currentData={currentGroupids}
                      />
                      <div className="row column-gap-3 m-0">
                        <div className="col p-0">
                          <MultiSelect
                            reset={false}
                            addAll={true}
                            title="MENU.SELECT.HOSTS"
                            options={selectedHosts}
                            Loading={false}
                            DataName="hostids"
                            selectedValue={selectedHosts}
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
                      <ModalContainer
                        show={isHostsModalOpen}
                        setHide={setisHostsModalOpen}
                        title={intl.formatMessage({ id: "MENU.SELECT.HOSTS" })}
                      >
                        <div className=" h-350px overflow-y-scroll mt-2">
                          {!isHostsDataLoading ? (
                            hostsData.map((host) => (
                              <div
                                key={host.hostid}
                                className="w-100 justify-content-end my-3 gap-2 d-flex"
                              >
                                <CheckBox
                                  label={host.host}
                                  checked={currentHostids.includes(host.hostid)}
                                  onchange={() => handleCheckboxChange(host)}
                                />
                              </div>
                            ))
                          ) : (
                            <div className="d-flex pt-7 w-100 justify-content-center">
                              <Loader />
                            </div>
                          )}
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                          <BTN
                            className="btn-light-danger"
                            onClick={() => setisHostsModalOpen(false)}
                            label={intl.formatMessage({ id: "CANCEL" })}
                          />
                        </div>
                      </ModalContainer>
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
                        <BTN
                          label={intl.formatMessage({
                            id: "MENU.SELECT",
                          })}
                          className="btn h-25 py-3 btn-light-primary px-0 col-2"
                          onClick={() => setIsTriggersModalOpen(true)}
                        />
                      </div>
                      <ModalContainer
                        show={isTriggersModalOpen}
                        setHide={setIsTriggersModalOpen}
                        title="عامل های شروع"
                      >
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
                          {hostGroupWithoutParam?.map(
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
                          onChange={(e) => fetchTriggers(e.currentTarget.value)}
                        >
                          <option value={-1}>
                            {intl.formatMessage({ id: "MENU.SELECT.HOSTS" })}
                          </option>
                          {hostsData?.map((host: HostsData, index: number) => {
                            return (
                              <option value={host.hostid} key={index}>
                                {host.host}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <p className="mt-2">راهنمای رنگ ها :</p>
                        <div className="d-flex flex-wrap gap-2">
                          <Badge title="اطلاع" bg="primary" />
                          <Badge title="هشدار" bg="success" />
                          <Badge title="عادی" bg="warning" />
                          <Badge title="بالا" bg="danger" />
                        </div>
                        <div className=" h-350px overflow-y-scroll mt-2">
                          {!IsTriggersLoading ? (
                            Triggers.map((item: Triggers) => (
                              <div
                                key={item.triggerid}
                                className={`w-100 justify-content-end my-3 gap-2 badge d-flex badge-light-${getPriorityBackgroundColor(
                                  item.priority
                                )}`}
                              >
                                <CheckBox
                                  dir="ltr"
                                  label={item.description}
                                  onchange={() =>
                                    handleCheckboxTriggersChange(item)
                                  }
                                  checked={currentTriggersIds.includes(
                                    Number(item.triggerid)
                                  )}
                                />
                              </div>
                            ))
                          ) : (
                            <div className="d-flex pt-7 w-100 justify-content-center">
                              <Loader />
                            </div>
                          )}
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                          <button
                            type="button"
                            onClick={() => setIsTriggersModalOpen(false)}
                            className="btn py-2 btn-light-danger"
                          >
                            بستن
                          </button>
                        </div>
                      </ModalContainer>
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
                            id: "SEVERITY",
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
                        <div className="d-flex mb-3 mt-2 row" key={item.id}>
                          <select
                            className="form-select form-select-sm col"
                            {...register(`inventory.${index}.field`)}
                          >
                            {InventoryList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            ))}
                          </select>
                          <div className="col">
                            <input
                              className="form-control py-2"
                              placeholder={intl.formatMessage({
                                id: "MONITORING.HOSTS.ADDTAG.VALUE",
                              })}
                              {...register(`inventory.${index}.value`)}
                            />
                          </div>
                          <BTN
                            label={intl.formatMessage({
                              id: "DELETE",
                            })}
                            className="btn btn-light-danger col-2"
                            onClick={() => inventoryRemove(index)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="row">
                      <BTN
                        label={intl.formatMessage({
                          id: "ADD",
                        })}
                        className="btn btn-light-success py-2 col-3"
                        onClick={() => {
                          inventoryAppend({ field: "type", value: "" });
                        }}
                      />
                    </div>
                    <p className="m-0">
                      {intl.formatMessage({
                        id: "MONITORING.PROBLEMS.TAGS",
                      })}
                      :
                    </p>
                    {tagsField.map((item, index) => (
                      <div key={item.id} className="d-grid">
                        <div dir="rtl" className="row mb-3 gap-3 ">
                          <div className="col p-0">
                            <input
                              type="email"
                              className="form-control py-2"
                              placeholder={intl.formatMessage({
                                id: "MONITORING.HOSTS.ADDTAG.TITLE",
                              })}
                              {...register(`tags.${index}.tag`)}
                            />
                          </div>
                          <div className="col">
                            <select
                              className="form-select form-select-sm col"
                              {...register(`tags.${index}.operator`)}
                            >
                              <option value="4">
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.ADDTAG.OPTION1",
                                })}
                              </option>
                              <option value="1">
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.ADDTAG.OPTION2",
                                })}
                              </option>
                              <option value="0">
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.ADDTAG.OPTION3",
                                })}
                              </option>
                              <option value="5">
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.ADDTAG.OPTION4",
                                })}
                              </option>
                              <option value="3">
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.ADDTAG.OPTION5",
                                })}
                              </option>
                              <option value="2">
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.ADDTAG.OPTION6",
                                })}
                              </option>
                            </select>
                          </div>
                          <div className="col p-0">
                            <input
                              type="email"
                              className="form-control py-2"
                              placeholder={intl.formatMessage({
                                id: "MONITORING.HOSTS.ADDTAG.VALUE",
                              })}
                              {...register(`tags.${index}.value`)}
                            />
                          </div>
                          <BTN
                            label={intl.formatMessage({
                              id: "DELETE",
                            })}
                            className="btn btn-light-danger py-2 col p-0"
                            onClick={() => tagsRemove(index)}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="row">
                      <BTN
                        label={intl.formatMessage({
                          id: "ADD",
                        })}
                        className="btn btn-light-success py-2 col-3"
                        onClick={() => {
                          tagsAppend({ tag: "", operator: 0, value: "" });
                        }}
                      />
                    </div>
                    <Tags
                      showTags={showTags}
                      setShowTags={setShowTags}
                      tagNameVisible={tagNameVisible}
                      setTagNameVisible={setTagNameVisible}
                      setValue={setValue}
                      activeButtonTag={watch("evaltype")}
                    />
                    <Controller
                      control={control}
                      name={`tag_priority`}
                      render={({ field }) => (
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder={intl.formatMessage({
                            id: "MONITORING.PROBLEMS.TAGS.SHOW.TITLE.PRIORITY",
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
                        <Controller
                          control={control}
                          name="symptom"
                          render={({ field }) => (
                            <>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                              <span className="form-check-label m-2 ">
                                {intl.formatMessage({
                                  id: "MONITORING.PROBLEMS.SYMPTOMS",
                                })}
                              </span>
                            </>
                          )}
                        />
                      </div>
                      <div>
                        <Controller
                          control={control}
                          name="suppressed"
                          render={({ field }) => (
                            <>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                              <span className="form-check-label m-2 ">
                                {intl.formatMessage({
                                  id: "MONITORING.PROBLEMS.SUPPRESSEDPROBLEMS",
                                })}
                              </span>
                            </>
                          )}
                        />
                      </div>
                      <div>
                        <Controller
                          control={control}
                          name="acknowledged"
                          render={({ field }) => (
                            <>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                              <span className="form-check-label m-2 ">
                                {intl.formatMessage({
                                  id: "MONITORING.PROBLEMS.ACKNOWLEDGED",
                                })}
                              </span>
                            </>
                          )}
                        />
                      </div>
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
                    <BTN
                      label="ذخیره"
                      className="btn-light-primary"
                      // onClick={resetData}
                    />
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
