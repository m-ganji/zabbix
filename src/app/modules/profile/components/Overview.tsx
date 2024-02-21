import { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useForm, useFieldArray } from "react-hook-form";
import { TablesWidget11 } from "../../../../_metronic/partials/widgets";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

interface FormValues {
  tags: { tag: string; operator: number; value: string }[];
}

export function Overview() {
  const intl = useIntl();

  const [activeButtonTag, setActiveButtonTag] = useState("");
  const [activeSituation, setActiveSituation] = useState("");
  const { control } = useForm<FormValues>({
    defaultValues: {
      tags: [{ tag: "", operator: 0, value: "" }],
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

  return (
    <Content>
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
                        id: "MONITORING.HOSTS.STATUS.ANY",
                      })}
                    </p>
                    <div className="w-100 ">
                      <div
                        className="btn-group py-2"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          className={
                            "btn btn-primary rounded-end-2 py-2" +
                            (activeSituation === "همه" ? " active" : "")
                          }
                          onClick={() => {
                            setActiveSituation("همه");
                          }}
                          data-bs-toggle="button"
                        >
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.STATUS.ANY",
                          })}
                        </button>
                        <button
                          type="button"
                          className={
                            "btn btn-primary  py-2" +
                            (activeSituation === "فعال شده ها" ? " active" : "")
                          }
                          onClick={() => {
                            setActiveSituation("فعال شده ها");
                          }}
                          data-bs-toggle="button"
                        >
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.STATUS.ENABLED",
                          })}
                        </button>
                        <button
                          type="button"
                          className={
                            "btn btn-primary rounded-start-2 py-2" +
                            (activeSituation === "غیر فعال ها" ? " active" : "")
                          }
                          onClick={() => {
                            setActiveSituation("غیر فعال ها");
                          }}
                          data-bs-toggle="button"
                        >
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.STATUS.DISABLED",
                          })}
                        </button>
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
                        <button
                          type="button"
                          className={
                            "btn btn-primary py-2 rounded-end-2" +
                            (activeButtonTag === "and/or" ? " active" : "")
                          }
                          onClick={() => {
                            console.log("and/or");
                            setActiveButtonTag("and/or");
                          }}
                        >
                          {intl.formatMessage({
                            id: "MONITORING.HOSTS.TAGS.AND",
                          })}{" "}
                        </button>
                        <button
                          type="button"
                          className={
                            "btn btn-primary py-2 rounded-start-2" +
                            (activeButtonTag === "OR" ? " active" : "")
                          }
                          onClick={() => {
                            console.log("OR");
                            setActiveButtonTag("OR");
                          }}
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
                      <input type="checkbox" name="Checkboxes15" />
                      <span className="me-2">
                        {intl.formatMessage({
                          id: "MONITORING.HOSTS.FIRSTCHECKBOX",
                        })}
                      </span>
                    </div>
                    <div>
                      <input type="checkbox" name="Checkboxes15" />
                      <span className="me-2">
                        {intl.formatMessage({
                          id: "MONITORING.HOSTS.SECONDCHECKBOX",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col d-flex gap-5 flex-column">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder={intl.formatMessage({
                          id: "MONITORING.HOSTS.NAME",
                        })}
                        style={{ direction: "rtl" }}
                        dir="rtl"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder={intl.formatMessage({
                          id: "MONITORING.HOSTS.IP",
                        })}
                        style={{ direction: "rtl" }}
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder={intl.formatMessage({
                          id: "MONITORING.HOSTS.DNS",
                        })}
                        style={{ direction: "rtl" }}
                        dir="rtl"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder={intl.formatMessage({
                          id: "MONITORING.HOSTS.PORT",
                        })}
                        style={{ direction: "rtl" }}
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <p className="mt-5">
                      {intl.formatMessage({
                        id: "MONITORING.HOSTS.SEVERITY",
                      })}
                    </p>
                    {severitiesData.map((severity, index) => (
                      <div
                        className="col-md-4 d-flex"
                        key={severity.id}
                        key={severity.id}
                      >
                        <div className="d-flex align-baseline ">
                          <input
                            type="checkbox"
                            name={`Checkboxes15-${severity.id}`}
                            id={`severity-${severity.id}`}
                          />
                          <span className="form-check-label m-2">
                            {severity.title}
                          </span>
                        </div>
                      </div>
                    ))}
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
