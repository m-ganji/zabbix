import React, { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import Severities from "./hosts/severities/Index";
import Tags from "./hosts/tags/Index";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import InventoryList from "./InventoryList";
import { TablesWidget11 } from "../../../../_metronic/partials/widgets";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

interface FormValues {
  selectTags: string;
  selectHosts: string;
  search: {
    name: string;
  };
  tag_name_format: number;
  age: number;
  age_state: number;
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
}

export function Projects() {
  const intl = useIntl();
  const { control } = useForm<FormValues>({
    defaultValues: {
      selectTags: "extend",
      selectHosts: "extend",
      search: { name: "" },
      tag_name_format: 0,
      age: 14,
      age_state: 0,
      acknowledged: false,
      suppressed: false,
      symptom: false,
      evaltype: 0,
      tags: [{ tag: "", operator: 0, value: "" }],
      inventory: [{ field: "type", value: "" }],
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

  return (
    <Content>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOSTS" })}
      </PageTitle>
      <ToolbarWrapper />
      <div className="row w-100">
        <div
          className="accordion"
          style={{ boxShadow: "0 0 10px -10px black" }}
          id="monitoring-hosts"
        >
          <div className="accordion-item">
            <button
              className="accordion-button "
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
                      <p>
                        {intl.formatMessage({
                          id: "MONITORING.PROBLEMS.SHOWBASEDON",
                        })}
                      </p>
                      <div className="w-100">
                        <div
                          className="btn-group py-2"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className={
                              "btn btn-primary rounded-end-2 py-2" +
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
                              "btn btn-primary  py-2" +
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
                              "btn btn-primary rounded-start-2 py-2" +
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
                        aria-describedby="emailHelp"
                        placeholder="اسم"
                      />
                      <input
                        type="text"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder="اسم"
                      />
                      <input
                        type="text"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder="اسم"
                      />
                      <Controller
                        control={control}
                        name={`search.name`}
                        render={({ field }) => (
                          <input
                            type="text"
                            className="form-control py-2"
                            aria-describedby="emailHelp"
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
                        <Severities />
                      </div>
                    </div>
                  </div>
                  <div className="col d-flex gap-5 flex-column">
                    <p>
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
                            aria-describedby="emailHelp"
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.VALUE",
                            })}
                            style={{ direction: "rtl" }}
                            dir="rtl"
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger me-2 py-2"
                          onClick={() => inventoryRemove(index)}
                          style={{ width: "10%" }}
                        >
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                          })}
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-success py-2 w-25"
                      onClick={() => {
                        inventoryAppend({ field: "type", value: "" });
                      }}
                    >
                      {intl.formatMessage({
                        id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                      })}
                    </button>
                    {tagsField.map((item, index) => (
                      <div className="d-flex mb-3 gap-3 " key={item.id}>
                        <div style={{ width: "33%" }}>
                          <input
                            type="email"
                            className="form-control py-2"
                            id={`exampleInputEmail${item.id}`}
                            aria-describedby="emailHelp"
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.TITLE",
                            })}
                            style={{ direction: "rtl" }}
                            dir="rtl"
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
                            aria-describedby="emailHelp"
                            placeholder={intl.formatMessage({
                              id: "MONITORING.HOSTS.ADDTAG.VALUE",
                            })}
                            style={{ direction: "rtl" }}
                            dir="rtl"
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

                    <button
                      type="button"
                      className="btn btn-success py-2 w-25"
                      onClick={() => {
                        tagsAppend({ tag: "", operator: 0, value: "" });
                      }}
                    >
                      {intl.formatMessage({
                        id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                      })}
                    </button>
                    <Tags />
                    <input
                      type="text"
                      className="form-control py-2"
                      // id={`exampleInputEmailValue${item.id}`}
                      aria-describedby="emailHelp"
                      placeholder={intl.formatMessage({
                        id: "MONITORING.HOSTS.ADDTAG.VALUE",
                      })}
                      style={{ direction: "rtl" }}
                      dir="rtl"
                    />
                    <div className="flex items-center gap-3">
                      <div className="d-flex align-baseline ">
                        <input
                          className="form-check-input mt-2 "
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.AGE",
                          })}
                        </span>
                        <input
                          type="text"
                          className="form-control py-2 w-25 py-2"
                          aria-describedby="emailHelp"
                          style={{ direction: "rtl" }}
                          dir="rtl"
                        />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.DAYS",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-baseline">
                      <div>
                        <input
                          className="form-check-input mt-2 "
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.SYMPTOMS",
                          })}
                        </span>
                      </div>
                      <div>
                        <input
                          className="form-check-input mt-2 "
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        />{" "}
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.SUPPRESSEDPROBLEMS",
                          })}
                        </span>
                      </div>
                      <div>
                        <input
                          className="form-check-input mt-2 "
                          type="checkbox"
                          aria-label="Checkbox for following text input"
                        />
                        <span className="form-check-label m-2 ">
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.UNACKNOWLEDGED",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TablesWidget11 className="mt-5" />
    </Content>
  );
}
