import { useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { TableHosts } from "../../../../_metronic/partials/widgets";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { instance } from "../../../../services/axiosInstance";
import { MultiSelect } from "../../../../_metronic/layout/components/MultiSelect/MultiSelect";
// import { fetchHostGroup } from "../../../../hostGroupSlice/hostGroupReducer";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import BTN from "../../../../_metronic/layout/components/BTN";
import ToggleBtns from "../../../../_metronic/layout/components/ToggleBtn/ToggleBtn";
import {
  fetchHostGroup,
  hostGroupItems,
} from "../../../../hostGroupSlice/hostGroupReducer";
import {
  AppDispatch,
  selectApiData,
  selectApiLoading,
} from "../../../../store/store";
import { ImportMap } from "../../../../_metronic/layout/components/Maps/Import";
import { ApiError } from "../../../../_metronic/partials/content/Tabs/Headers/Host";
import { useNavigate } from "react-router-dom";
import ToastFire from "../../../../_metronic/layout/components/Toast";

interface FormValues {
  selectProblems: string;
  selectGraphs: string;
  selectTags: string;
  selectDashboards: string;
  selectInterfaces: string;
  search: {
    name: string;
    ip: string;
    dns: string;
    port: string;
  };
  status: string;
  evaltype: string;
  maintenance_status: string;
  show_suppressed: string;
  name: string;
  ip: string;
  dns: string;
  port: string;
  severities: number[];
  groupids: number[];
  template: [];
  filter: {
    status: string | string[];
  };
  tags: { tag: string; operator: string; value: string }[];
  inventory: { field: string; value: string }[];
}

export function DataHosts() {
  const navigate = useNavigate();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    register,
    unregister,
  } = useForm<FormValues>({
    defaultValues: {
      selectProblems: "extend",
      selectGraphs: "extend",
      selectTags: "extend",
      selectDashboards: "extend",
      selectInterfaces: "extend",
      evaltype: "",
      maintenance_status: "",
      show_suppressed: "",
      search: { name: "", ip: "", dns: "", port: "" },
      filter: { status: ["0", "1"] },
      tags: [],
    },
  });

  const intl = useIntl();

  const [data, setData] = useState([]);
  const [Templates, setTemplates] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [activeButtonTag, setActiveButtonTag] = useState<string>("");
  const [resetMultiSelect, setResetMultiSelect] = useState(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState<boolean>(false);

  const currentGroupids = watch("groupids") ? watch("groupids") : [];
  const currentTemplate = watch("template") ? watch("template") : [];

  const HostGroupData: hostGroupItems[] = useSelector(selectApiData);
  const HostGroupLoading = useSelector(selectApiLoading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dataHost(watch());
    dispatch(fetchHostGroup());
    handleGetTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const {
    fields: tagsField,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  async function dataHost(data: object) {
    console.log(data);
    setIsLoaded(true);
    setIsError(false);

    try {
      const response = await instance.post("/core/hosts/get", data);
      setData(response.data);
      setIsLoaded(false);
      return response;
    } catch (error) {
      console.error(error);
      setIsError(true);
      if ((error as ApiError).response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        ToastFire("error", `توکن منقضی شده است`, "لطفا مجدد وارد شوید");
      }
      throw error;
    }
  }

  const resetData = () => {
    setResetMultiSelect(true);
    resetMultiSelect && setResetMultiSelect(false);
    reset();
    unregister("groupids");
    dataHost(watch());
  };

  const submit = () => {
    watch("severities")?.length === 0 && unregister("severities");
    currentGroupids.length === 0 && unregister("groupids");
    handleSubmit(dataHost)();
  };

  const handleGetTemplates = async () => {
    setIsTemplateLoading(true);
    try {
      const response = await instance.post("/core/templates/get", {});
      const mapped = response.data.map(
        (e: { name: string; templateid: string }) => ({
          label: e.name,
          value: e.templateid,
        })
      );
      setTemplates(mapped);
    } catch (error) {
      if ((error as ApiError).response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        ToastFire("error", `توکن منقضی شده است`, "لطفا مجدد وارد شوید");
      }
      throw error;
    }
    setIsTemplateLoading(false);
  };

  return (
    <Content>
      <div className="d-flex flex-wrap flex-stack my-4">
        <h3 className="fw-bolder ">
          {intl.formatMessage({ id: "MENU.HOSTS" })}
        </h3>
        <div className="d-flex gap-4 align-items-center">
          <BTN
            id="kt_activities_toggle"
            label={intl.formatMessage({ id: "MONITORING.HOSTS.CREATE" })}
            className="btn-light-primary"
          />
          <BTN
            id="import-map"
            label={intl.formatMessage({ id: "IMPORT" })}
            className="btn-light-warning"
          />
          <ImportMap />
        </div>
      </div>
      <div
        className="accordion"
        style={{ boxShadow: "0 0 10px -10px black" }}
        id="monitoring-hosts"
      >
        <div className="accordion-item">
          <button
            className="accordion-button w-100"
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
              <div className="row">
                <div className="col">
                  <div
                    className="btn-group btn-group-toggle d-flex flex-column"
                    data-toggle="buttons"
                  >
                    <p className="m-0 mb-1">
                      {intl.formatMessage({
                        id: "STATUS",
                      })}
                    </p>
                    <div className="w-100 ">
                      <ToggleBtns
                        options={[
                          {
                            value: "",
                            label: "ALL",
                          },
                          {
                            value: "0",
                            label: "MONITORING.HOSTS.STATUS.ENABLED",
                          },
                          {
                            value: "1",
                            label: "MONITORING.HOSTS.STATUS.DISABLED",
                          },
                        ]}
                        data="filter.status"
                        setData={setValue}
                        initialData={watch("filter.status")}
                      />
                    </div>
                  </div>
                  <div
                    className="btn-group btn-group-toggle d-flex flex-column"
                    data-toggle="buttons"
                  >
                    <p className="m-0 mb-1">
                      {intl.formatMessage({
                        id: "MONITORING.HOSTS.MONITORED",
                      })}{" "}
                      :
                    </p>
                    <div className="w-100 ">
                      <ToggleBtns
                        options={[
                          {
                            value: "",
                            label: "ALL",
                          },
                          {
                            value: "0",
                            label: "SERVER",
                          },
                          {
                            value: "1",
                            label: "PROXY",
                          },
                        ]}
                        data="filter.status"
                        setData={setValue}
                        initialData={watch("filter.status")}
                      />
                    </div>
                  </div>

                  <div
                    className="btn-group btn-group-toggle d-flex flex-column mb-5 "
                    data-toggle="buttons"
                  >
                    <p className="mt-5 ">
                      {intl.formatMessage({ id: "MONITORING.HOSTS.TAGS" })}
                    </p>
                    <div className="w-100">
                      <div
                        className="btn-group py-2"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Controller
                          name="evaltype"
                          control={control}
                          defaultValue=""
                          render={() => (
                            <button
                              type="button"
                              className={
                                "btn btn-primary rounded-end-2 py-2" +
                                (activeButtonTag === "and/or" ? " active" : "")
                              }
                              onClick={() => {
                                setValue("evaltype", "0");
                                setActiveButtonTag("and/or");
                              }}
                              data-bs-toggle="button"
                            >
                              {intl.formatMessage({
                                id: "MONITORING.HOSTS.TAGS.AND",
                              })}
                            </button>
                          )}
                        />
                        <button
                          type="button"
                          className={
                            "btn btn-primary rounded-start-2 py-2" +
                            (activeButtonTag === "OR" ? " active" : "")
                          }
                          onClick={() => {
                            setValue("evaltype", "2");
                            setActiveButtonTag("OR");
                          }}
                          data-bs-toggle="button"
                        >
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.TAGS.OR",
                          })}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    {tagsField.map((item, index) => (
                      <div className="d-flex mb-3 gap-3" key={item.id}>
                        <div>
                          <input
                            {...register(`tags.${index}.tag`)}
                            type="text"
                            className="form-control py-2"
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.VALUE",
                            })}
                          />
                        </div>
                        <select
                          className="form-select form-select-sm col"
                          {...register(`tags.${index}.operator`)}
                        >
                          <option value={4}>
                            {intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.OPTION1",
                            })}
                          </option>
                          <option value={1}>
                            {intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.OPTION2",
                            })}
                          </option>
                          <option selected value={0}>
                            {intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.OPTION3",
                            })}
                          </option>
                          <option value={5}>
                            {" "}
                            {intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.OPTION4",
                            })}
                          </option>
                          <option value={3}>
                            {intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.OPTION5",
                            })}
                          </option>
                          <option value={2}>
                            {intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.OPTION6",
                            })}
                          </option>
                        </select>

                        <div>
                          <input
                            {...register(`tags.${index}.value`)}
                            type="text"
                            className="form-control py-2"
                            id={`exampleInputEmailValue${item.id}`}
                            aria-describedby="emailHelp"
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.VALUE",
                            })}
                          />
                        </div>
                        <BTN
                          label={intl.formatMessage({
                            id: "DELETE",
                          })}
                          className="btn-light-danger"
                          onClick={() => tagsRemove(index)}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-success py-2"
                    onClick={() => {
                      tagsAppend({ tag: "", operator: "0", value: "" });
                    }}
                  >
                    {intl.formatMessage({
                      id: "ADD",
                    })}
                  </button>
                </div>
                <div className="col d-flex gap-5 flex-column">
                  <div className="row">
                    <div className="col-6">
                      <Controller
                        name="search.name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <input
                              type="text"
                              className="form-control py-2"
                              aria-describedby="emailHelp"
                              placeholder={intl.formatMessage({
                                id: "NAME",
                              })}
                              {...field}
                            />
                          </>
                        )}
                      />
                    </div>
                    <div className="col-6">
                      <Controller
                        name="search.ip"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="form-control py-2"
                            aria-describedby="emailHelp"
                            placeholder={intl.formatMessage({
                              id: "IP",
                            })}
                            style={{ direction: "rtl" }}
                            dir="rtl"
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Controller
                        name="search.dns"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            type="text"
                            className="form-control py-2"
                            aria-describedby="emailHelp"
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.DNS",
                            })}
                            style={{ direction: "rtl" }}
                            dir="rtl"
                            {...field}
                          />
                        )}
                      />
                    </div>
                    <div className="col-6">
                      <Controller
                        name="search.port"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            type="text"
                            className="form-control py-2 mb-5"
                            aria-describedby="emailHelp"
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.PORT",
                            })}
                            style={{ direction: "rtl" }}
                            dir="rtl"
                            {...field}
                          />
                        )}
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
                      DataName="groupids"
                      setData={setValue}
                      currentData={currentGroupids}
                      Loading={HostGroupLoading}
                    />
                  </div>
                  <MultiSelect
                    reset={false}
                    addAll={false}
                    title="MENU.SELECT.TEMPLATES"
                    options={Templates}
                    DataName="template"
                    setData={setValue}
                    currentData={currentTemplate}
                    Loading={isTemplateLoading}
                  />
                  <MultiSelect
                    reset={false}
                    addAll={false}
                    title="PROXY"
                    options={[]}
                    DataName="groupids"
                    setData={setValue}
                    currentData={currentGroupids}
                    Loading={HostGroupLoading}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mb-5 gap-5 ">
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
              <BTN label="ذخیره" className="btn-light-primary" />
            </div>
          </div>
        </div>
      </div>
      <TableHosts isError={false} data={data} isLoaded={isLoaded} />
    </Content>
  );
}
