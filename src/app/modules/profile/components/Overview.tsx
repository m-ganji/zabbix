import { useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  TablesWidget10,
  TablesWidget11,
  TablesWidget12,
  TablesWidget13,
} from "../../../../_metronic/partials/widgets";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { Button } from "react-bootstrap";
import { instance } from "../../../../services/axiosInstance";
import { MultipleSelect } from "../../../../_metronic/layout/components/multiple-select/MultipleSelect";
import { fetchHostGroup } from "../../../../hostGroupSlice/hostGroupReducer";
import { useDispatch } from "react-redux";
import Severities from "./hosts/severities/Index";

interface FormValues {
  status: string;
  evaltype: string;
  maintenance_status: string;
  show_suppressed: string;
  name: string;
  ip: string;
  dns: string;
  port: string;
  severities: number[];
  groupids: string[];
  filter: []; // Define the type appropriately
  tags: string[];
  inventory: { field: string; value: string }[];
}

interface Severity {
  id: number;
  title: string;
  color: string;
  bg: string;
}

export function Overview() {
  const intl = useIntl();

  const [activeButtonTag, setActiveButtonTag] = useState<string>("");
  const [activeSituation, setActiveSituation] = useState<string>("");
  const [hostGroups, setHostGroups] = useState([]);

  const dispatch = useDispatch();

  const { control, watch, setValue, handleSubmit, reset, unregister } =
    useForm<FormValues>({
      defaultValues: {
        status: "",
        evaltype: "",
        maintenance_status: "",
        show_suppressed: "",
        search: { name: "", ip: "", dns: "", port: "" },
        // severities: [],
        // groupids: [],
        filter: { status: "" },
        tags: [],
      },
    });

  const {
    fields: tagsField,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const dataHost = async (data) => {
    console.log(data);
    try {
      const response = await instance.post("/core/hosts/get", data);
      console.log(response);
      return response;

      // setIsLoaded(true);
      // setHostData(response.data || []);
    } catch (error) {
      console.error("Error fetching host data:", error);
      throw error;
      // setIsLoaded(true);
      // setIsError(true);
    }
  };

  useEffect(() => {
    dispatch(fetchHostGroup({})).then((response) => setHostGroups(response));
  }, []);

  return (
    <Content>
      <form>
        <PageTitle breadcrumbs={[]}>
          {intl.formatMessage({ id: "MENU.HOSTS" })}
        </PageTitle>
        <ToolbarWrapper />
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
                      <p>
                        {intl.formatMessage({
                          id: "MONITORING.HOSTS.STATUS",
                        })}
                      </p>
                      <div className="w-100 ">
                        <div
                          className="btn-group py-2"
                          role="group"
                          aria-label="Basic example"
                        >
                          <Controller
                            name="filter.status"
                            control={control}
                            defaultValue=""
                            render={() => (
                              <button
                                type="button"
                                className={
                                  "btn btn-primary rounded-end-2 py-2" +
                                  (activeSituation === "همه" ? " active" : "")
                                }
                                onClick={() => {
                                  setValue("filter.status", -1);
                                  setActiveSituation("همه");
                                }}
                                data-bs-toggle="button"
                              >
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.STATUS.ANY",
                                })}
                              </button>
                            )}
                          />
                          <Controller
                            name="filter.status"
                            control={control}
                            defaultValue=""
                            render={() => (
                              <button
                                type="button"
                                className={
                                  "btn btn-primary py-2" +
                                  (activeSituation === "فعال شده ها"
                                    ? " active"
                                    : "")
                                }
                                onClick={() => {
                                  setValue("filter.status", 0);
                                  setActiveSituation("فعال شده ها");
                                }}
                                data-bs-toggle="button"
                              >
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.STATUS.ENABLED",
                                })}
                              </button>
                            )}
                          />

                          <Controller
                            name="filter.status"
                            control={control}
                            defaultValue=""
                            render={() => (
                              <button
                                type="button"
                                className={
                                  "btn btn-primary rounded-start-2 py-2" +
                                  (activeSituation === "غیر فعال ها"
                                    ? " active"
                                    : "")
                                }
                                onClick={() => {
                                  setValue("filter.status", 1);
                                  setActiveSituation("غیر فعال ها");
                                }}
                                data-bs-toggle="button"
                              >
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.STATUS.DISABLED",
                                })}
                              </button>
                            )}
                          />
                        </div>
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
                                  (activeButtonTag === "and/or"
                                    ? " active"
                                    : "")
                                }
                                onClick={() => {
                                  setValue("evaltype", 0);
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

                          <Controller
                            name="evaltype"
                            control={control}
                            defaultValue=""
                            render={() => (
                              <button
                                type="button"
                                className={
                                  "btn btn-primary rounded-start-2 py-2" +
                                  (activeButtonTag === "OR" ? " active" : "")
                                }
                                onClick={() => {
                                  setValue("evaltype", 2);
                                  setActiveButtonTag("OR");
                                }}
                                data-bs-toggle="button"
                              >
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.TAGS.OR",
                                })}
                              </button>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      {tagsField.map((item, index) => (
                        <div className="d-flex mb-3 gap-3" key={item.id}>
                          <div style={{ width: "33%" }}>
                            <Controller
                              name={`tags[${index}].tag`}
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="form-control py-2"
                                  id={`exampleInputEmail${item.id}`}
                                  aria-describedby="emailHelp"
                                  placeholder={intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                  })}
                                  style={{ direction: "rtl" }}
                                  dir="rtl"
                                />
                              )}
                            />
                          </div>

                          <Controller
                            name={`tags[${index}].operator`}
                            control={control}
                            render={({ field }) => (
                              <select
                                className="form-select form-select-sm"
                                id={`floatingSelect${item.id}`}
                                aria-label="Floating label select example"
                                style={{ width: "33%" }}
                                onChange={(e) => {
                                  const newValue = parseInt(e.target.value, 10);
                                  field.onChange(newValue);
                                }}
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
                            )}
                          />

                          <div style={{ width: "33%" }}>
                            <Controller
                              name={`tags[${index}].value`}
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="form-control py-2"
                                  id={`exampleInputEmailValue${item.id}`}
                                  aria-describedby="emailHelp"
                                  placeholder={intl.formatMessage({
                                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                  })}
                                  style={{ direction: "rtl" }}
                                  dir="rtl"
                                />
                              )}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-danger me-2 py-2"
                            onClick={() => tagsRemove(index)}
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
                      className="btn btn-success py-2"
                      onClick={() => {
                        tagsAppend({ tag: "", operator: 0, value: "" });
                      }}
                    >
                      {intl.formatMessage({
                        id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                      })}
                    </button>
                    <div className="mt-5 d-flex justify-content-start align-baseline gap-5 ">
                      <div>
                        <Controller
                          name="show_suppressed"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <>
                              <input
                                onChange={() =>
                                  setValue(
                                    "show_suppressed",
                                    field.value == 1 ? 0 : 1
                                  )
                                }
                                type="checkbox"
                              />
                            </>
                          )}
                        />
                        <span className="me-2">
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.SUPPRESSED",
                          })}
                        </span>
                      </div>
                      <div>
                        <Controller
                          name="maintenance_status"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <>
                              <input
                                onChange={() =>
                                  setValue(
                                    "maintenance_status",
                                    field.value == 1 ? 0 : 1
                                  )
                                }
                                type="checkbox"
                              />
                            </>
                          )}
                        />
                        <span className="me-2">
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.MAINTENANCE",
                          })}
                        </span>
                      </div>
                    </div>
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
                                  id: "MONITORING.HOSTS.NAME",
                                })}
                                style={{ direction: "rtl" }}
                                dir="rtl"
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
                                id: "MONITORING.HOSTS.IP",
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
                      {hostGroups.payload && (
                        <MultipleSelect
                          addAll={false}
                          title="MENU.SELECT.HOSTS.GP"
                          options={hostGroups.payload}
                        />
                      )}
                    </div>
                    <div className="row">
                      <p className="mt-5">
                        {intl.formatMessage({
                          id: "MONITORING.HOSTS.SEVERITY",
                        })}
                      </p>
                      <Severities watch={watch} setValue={setValue} />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="d-flex justify-content-center mb-5 gap-5 ">
              <button
                type="button"
                onClick={handleSubmit((data) => {
                  dataHost(data);
                })}
                className="btn btn-light-success"
              >
                تایید
              </button>
              <button
                type="button"
                // onClick={resetData}
                className="btn btn-light-danger"
              >
                باز نشانی
              </button>
              <button type="button" className="btn btn-light-primary">
                ذخیره
              </button>
            </div>
          </div>
        </div>
        <TablesWidget12 />
      </form>
    </Content>
  );
}
