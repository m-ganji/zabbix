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
    { id: 0, title: "طبقه بندی نشده" },
    { id: 2, title: "هشدار" },
    { id: 4, title: "بالا" },
    { id: 1, title: "اطلاعات" },
    { id: 3, title: "عادی" },
    { id: 5, title: "بسیار بالا" },
  ];
  const intl = useIntl();
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
                    <p>وضعیت</p>
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
                          همه
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
                          فعال شده ها
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
                          غیر فعال ها
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="btn-group btn-group-toggle d-flex flex-column mb-5 "
                    data-toggle="buttons"
                  >
                    <p className="mt-5 ">تگ ها</p>
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
                          and/or
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
                          OR
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
                            placeholder="تگ"
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
                          <option value={4}>موجود</option>
                          <option value={1}>برابر</option>
                          <option selected value={0}>
                            شامل
                          </option>
                          <option value={5}> موجود نیست</option>
                          <option value={3}> برابر نیست</option>
                          <option value={2}> شامل نیست</option>{" "}
                        </select>

                        <div style={{ width: "33%" }}>
                          <input
                            type="email"
                            className="form-control py-2"
                            id={`exampleInputEmailValue${item.id}`}
                            aria-describedby="emailHelp"
                            placeholder="مقدار"
                            style={{ direction: "rtl" }}
                            dir="rtl"
                          />
                        </div>

                        <button
                          type="button"
                          className="btn btn-danger me-2 py-2"
                          onClick={() => tagsRemove(index)}
                        >
                          حذف
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
                    اضافه کردن
                  </button>
                  <div className="mt-5 d-flex justify-content-start align-content-center gap-5 ">
                    <div>
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />{" "}
                      <span className="me-2">
                        نمایش میزبان ها در تعمیر و نگهداری
                      </span>
                    </div>
                    <div>
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                      <span className="me-2">نمایش مشکلات سرکوب شده</span>
                    </div>
                  </div>
                </div>

                <div className="col d-flex gap-5 flex-column">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="email"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder="اسم"
                        style={{ direction: "rtl" }}
                        dir="rtl"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="email"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder="IP"
                        style={{ direction: "rtl" }}
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="email"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder="DNS"
                        style={{ direction: "rtl" }}
                        dir="rtl"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="email"
                        className="form-control py-2"
                        aria-describedby="emailHelp"
                        placeholder="PORT"
                        style={{ direction: "rtl" }}
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <p className="mt-5">سطح بحران</p>
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
