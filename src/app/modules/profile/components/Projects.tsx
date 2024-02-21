import React, { useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import Severities from "./hosts/severities/Index";
import Tags from "./hosts/tags/Index";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import InventoryList from "./InventoryList";
import { TablesWidget11 } from "../../../../_metronic/partials/widgets";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { instance } from "../../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

interface FormValues {
  selectTags: string;
  selectHosts: string;
  search: {
    name: string;
  };
  tag_name_format: number;
  age: string;
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
  }[];
  severities: number[];
}

export interface Problem {
  acknowledged: string;
  cause_eventid: string;
  clock: string;
  correlationid: string;
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

export function Projects() {
  const intl = useIntl();
  const navigate = useNavigate();

  const { control, watch, setValue, handleSubmit, reset, unregister } =
    useForm<FormValues>({
      defaultValues: {
        selectTags: "extend",
        selectHosts: "extend",
        search: { name: "" },
        tag_name_format: 0,
        age: "14",
        age_state: "0",
        acknowledged: false,
        suppressed: false,
        symptom: false,
        tag_priority: "",
        evaltype: 0,
        tags: [],
        inventory: [],
      },
    });

  const [sortBasedOn, setSortBasedOn] = useState("");

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

  const [ProblemsData, setProblemsData] = useState<Problem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [showTags, setShowTags] = useState<number>(3);
  const [tagNameVisible, setTagNameVisible] = useState<number>(0);

  useEffect(() => {
    fetchPromsListData(watch());
  }, []);

  const fetchPromsListData = async (e: object) => {
    console.log(e);
    watch("severities")?.length === 0 && unregister("severities");
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
        navigate("/auth");
        return (
          <div
            className="toast align-items-center"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">
                Hello, world! This is a toast message.
              </div>
              <button
                type="button"
                className="btn-close me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
          </div>
        );
      }
      setIsError(true);
    }
    setIsLoaded(true);
  };

  const resetData = () => {
    setShowTags(0);
    // setHostGp([]);
    // setHostCheckState([]);
    // setTriggerCheckState([]);
    reset();
    fetchPromsListData(watch());
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
                <div className="row">
                  <div className="col">
                    <div
                      className="btn-group py-2 d-flex flex-column gap-5 "
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
                      <input
                        type="text"
                        className="form-control py-2 w-100"
                        placeholder="اسم"
                      />
                      <input
                        type="text"
                        className="form-control py-2"
                        placeholder="اسم"
                      />
                      <input
                        type="text"
                        className="form-control py-2"
                        placeholder="اسم"
                      />
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
                  <div className="col d-flex gap-5 flex-column ">
                    <div>
                      <p className="mb-3">
                        {intl.formatMessage({
                          id: "MONITORING.PROBLEMS.INVENTORYLIST",
                        })}
                      </p>
                      {inventoryField.map((item, index) => (
                        <div className="d-flex mb-3 gap-3 " key={item.id}>
                          <select
                            className="form-select form-select-sm"
                            id={`floatingSelect${item.id}`}
                            aria-label="Floating label select example"
                            style={{ width: "45%" }}
                          >
                            {InventoryList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            ))}
                          </select>
                          <div style={{ width: "45%" }}>
                            <input
                              type="email"
                              className="form-control py-2"
                              id={`exampleInputEmailValue${item.id}`}
                              placeholder={intl.formatMessage({
                                id: "MONITORING.HOSTS.ADDTAG.VALUE",
                              })}
                              style={{ direction: "rtl" }}
                              dir="rtl"
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
                    <p className="mb-3">
                        {intl.formatMessage({
                          id: "MONITORING.PROBLEMS.TAGS",
                        })}
                        :
                      </p>
                    {tagsField.map((item, index) => (
                      <div className="d-flex mb-3 gap-3 " key={item.id}>
                        <div style={{ width: "33%" }}>
                          <input
                            type="email"
                            className="form-control py-2"
                            id={`exampleInputEmail${item.id}`}
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.TITLE",
                            })}
                          />
                        </div>
                        <select
                          className="form-select form-select-sm"
                          id={`floatingSelect${item.id}`}
                          aria-label="Floating label select example"
                          style={{ width: "33%" }}
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
                            type="email"
                            className="form-control py-2"
                            id={`exampleInputEmailValue${item.id}`}
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.VALUE",
                            })}
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-light-danger me-2 py-2"
                          onClick={() => tagsRemove(index)}
                        >
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                          })}
                        </button>
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
                    <input
                      type="text"
                      className="form-control py-2"
                      // id={`exampleInputEmailValue${item.id}`}
                      placeholder={intl.formatMessage({
                        id: "MONITORING.HOSTS.ADDTAG.VALUE",
                      })}
                      style={{ direction: "rtl" }}
                      dir="rtl"
                    />
                    <div className="flex items-center align-baseline gap-3">
                      <div className="d-flex  ">
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
                        <Controller
                          control={control}
                          name={`age`}
                          render={({ field }) => (
                            <input
                              type="number"
                              className="form-control py-2 text-center w-25 py-2"
                              {...field}
                            />
                          )}
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
                      onClick={handleSubmit(fetchPromsListData)}
                      className="btn btn-light-success"
                    >
                      تایید
                    </button>
                    <button
                      type="button"
                      onClick={resetData}
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
            </div>
          </div>
        </div>
      </div>
      <TablesWidget11
        isLoaded={isLoaded}
        ProblemsData={ProblemsData}
        isError={isError}
        showTags={showTags}
        tagNameVisible={tagNameVisible}
      />
    </Content>
  );
}
