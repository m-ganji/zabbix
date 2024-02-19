import { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

export function Projects() {
  const intl = useIntl();
  const { control } = useForm({
    defaultValues: {
      selectTags: "extend",
      selectHosts: "extend",
      search: { name: "" },
      show_tags: 0,
      show: 1,
      tag_name_format: 0,
      age: 14,
      age_state: 0,
      acknowledged: false,
      suppressed: false,
      symptom: false,
      show_timeline: 0,
      show_opdata: 0,
      tag_priority: "",
      highlight_row: 1,
      evaltype: 0,
      compact_view: 0,
      tags: [],
      inventory: [{ field: "type", value: "" }],
    },
  });
  const [sortBasedOn, setSortBasedOn] = useState("");

  const severitiesData: { id: number; title: string }[] = [
    {
      id: 0,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION1" }),
    },

    {
      id: 2,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION2" }),
    },
    {
      id: 4,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION3" }),
    },
    {
      id: 1,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION4" }),
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION5" }),
    },
    {
      id: 5,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION6" }),
    },
  ];

  const {
    fields: inventoryField,
    append: inventoryAppend,
    remove: inventoryRemove,
  } = useFieldArray({
    control,
    name: "inventory",
  });

  return (
    <Content>
      <div className="row w-100 ">
        <div className="col ">
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
              style={{ direction: "rtl" }}
              dir="rtl"
            />
            <input
              type="text"
              className="form-control py-2"
              aria-describedby="emailHelp"
              placeholder="اسم"
              style={{ direction: "rtl" }}
              dir="rtl"
            />
            <input
              type="text"
              className="form-control py-2"
              aria-describedby="emailHelp"
              placeholder="اسم"
              style={{ direction: "rtl" }}
              dir="rtl"
            />
            <input
              type="text"
              className="form-control py-2"
              aria-describedby="emailHelp"
              placeholder={intl.formatMessage({
                id: "MONITORING.PROBLEMS.PROBLEM",
              })}
              style={{ direction: "rtl" }}
              dir="rtl"
            />
            <div className="row">
              <p className="mt-5">
                {intl.formatMessage({
                  id: "MONITORING.HOSTS.SEVERITY",
                })}
              </p>

              {severitiesData.map((severity) => (
                <div className="col-md-6" key={severity.id}>
                  <div className="d-flex align-baseline ">
                    <input
                      className="form-check-input mt-2 "
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      id={`severity-${severity.id}`}
                    />
                    <span className="form-check-label m-2 ">
                      {severity.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
        <div className="col d-flex gap-5 flex-column">
          <p>
            {intl.formatMessage({
              id: "MONITORING.PROBLEMS.INVENTORYLIST",
            })}
          </p>

          {inventoryField.map((inv, index) => {
            return (
              <div key={inv.id} className="flex gap-2 mt-1">
                <div className="d-flex mb-3 gap-3 " key={index}>
                  <div style={{ width: "33%" }}>
                    <input
                      type="text"
                      className="form-control py-2"
                      id={`exampleInputEmail${inv.id}`} // Changed `item.id` to `inv.id`
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
                  </div>

                  <button
                    type="button"
                    className="btn btn-danger me-2 py-2"
                    // onClick={() => tagsRemove(index)}
                  >
                    {intl.formatMessage({
                      id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                    })}
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-success py-2"
                  onClick={() => {
                    inventoryAppend({ field: "", value: "" });
                  }}
                >
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                  })}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Content>
  );
}
