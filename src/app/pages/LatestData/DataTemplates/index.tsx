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
import Severities from "../../../modules/profile/components/hosts/severities/Index";
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
  filter: {
    status: string | string[];
  };
  tags: { tag: string; operator: string; value: string }[];
  inventory: { field: string; value: string }[];
}

export function DataTemplates() {
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

  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [resetMultiSelect, setResetMultiSelect] = useState(false);
  const currentGroupids = watch("groupids") ? watch("groupids") : [];

  const HostGroupData: hostGroupItems[] = useSelector(selectApiData);
  const HostGroupLoading = useSelector(selectApiLoading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dataHost(watch());
    dispatch(fetchHostGroup());
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
      console.error("Error fetching host data:", error);
      setIsError(true);
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

  return (
    <Content>
      <form>
        <PageTitle breadcrumbs={[]}>
          {intl.formatMessage({ id: "DATA.TEMPLATE" })}
        </PageTitle>
        <button
          id="kt_activities_toggle"
          className="btn btn-sm btn-light-primary mt-3 float-start"
        >
          {intl.formatMessage({ id: "DATA.TEMPLATES.CREATE" })}
          <KTIcon iconName="plus" className="fs-2" />
        </button>
        <ToolbarWrapper />
        <div
          className="accordion"
          style={{ boxShadow: "0 0 10px -10px black" }}
          id="monitoring-hosts"
        >
          <div className="accordion-item ">
            <button
              className="accordion-button p-3 w-100"
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
                  <div className="col d-grid gap-3">
                    <MultiSelect
                      reset={false}
                      addAll={false}
                      title="DATA.TEMPLATE.GP"
                      options={HostGroupData.map((group) => ({
                        value: group.groupid,
                        label: group.name,
                      }))}
                      DataName="groupids"
                      setData={setValue}
                      currentData={currentGroupids}
                      Loading={HostGroupLoading}
                    />
                    <MultiSelect
                      reset={false}
                      addAll={false}
                      title="DATA.TEMPLATE.LINKED"
                      options={HostGroupData.map((group) => ({
                        value: group.groupid,
                        label: group.name,
                      }))}
                      DataName="groupids"
                      setData={setValue}
                      currentData={currentGroupids}
                      Loading={HostGroupLoading}
                    />
                    <div>
                      <p className="m-0">
                        {intl.formatMessage({ id: "MONITORING.HOSTS.TAGS" })} :
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
                              <ToggleBtns
                                options={[
                                  {
                                    value: "0",
                                    label: "MONITORING.HOSTS.TAGS.AND",
                                  },
                                  {
                                    value: "2",
                                    label: "MONITORING.HOSTS.TAGS.OR",
                                  },
                                ]}
                                data="evaltype"
                                setData={setValue}
                                initialData={watch("evaltype")}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      {tagsField.map((item, index) => (
                        <div className="d-flex mb-3 gap-3" key={item.id}>
                          <div style={{ width: "33%" }}>
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
                            className="form-select form-select-sm"
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

                          <div style={{ width: "33%" }}>
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
                    <BTN
                      className="btn-light-success col-2"
                      onClick={() => {
                        tagsAppend({ tag: "", operator: "0", value: "" });
                      }}
                      label={intl.formatMessage({
                        id: "ADD",
                      })}
                    />
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
                              placeholder={"Vendor"}
                              style={{ direction: "rtl" }}
                              dir="rtl"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
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
                                id: "VERSION",
                              })}
                              style={{ direction: "rtl" }}
                              dir="rtl"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
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
              </div>
            </div>
          </div>
        </div>
        <TableHosts isError={false} data={data} isLoaded={isLoaded} />
      </form>
    </Content>
  );
}
