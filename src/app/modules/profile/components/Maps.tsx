import { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "../../../../_metronic/layout/components/multiple-select/MultiSelect";
import { MapsTable } from "../../../../_metronic/partials/widgets/tables/MapsTable";
import { Modal } from "react-bootstrap";

interface FormValues {
  search: {
    name: string;
  };
}

export function Maps() {
  const intl = useIntl();
  const navigate = useNavigate();

  const [resetMultiSelect, setResetMultiSelect] = useState(false);

  const { control, watch, setValue, handleSubmit, reset, unregister } =
    useForm<FormValues>({
      defaultValues: {
        search: { name: "" },
      },
    });

  const currentName = watch("search.name") ? watch("search.name") : [];

  const fetchPromsListData = async (e: object) => {
    console.log(e);

    // const params = e ? e : watch();
    // setIsError(false);
    // setIsLoaded(false);
    // try {
    //   const response = await instance.post("core/problems/get", params);
    //   setProblemsData(response.data || []);
    //   console.log(response.data);
    // } catch (error) {
    //   interface ApiError {
    //     response?: {
    //       status: number;
    //     };
    //   }
    //   console.error(error);

    //   if ((error as ApiError).response?.status === 401) {
    //     localStorage.removeItem("token");
    //     navigate("/");
    //   }
    //   setIsError(true);
    // }
    // setIsLoaded(true);
  };
  const [isCreateMapOpen, setisCreateMapOpen] = useState<boolean>(false);

  const resetData = () => {
    setResetMultiSelect(true);
    reset();
    fetchPromsListData(watch());
  };

  const submit = () => {
    handleSubmit(fetchPromsListData)();
  };

  return (
    <Content>
      <div className="d-flex flex-wrap flex-stack my-4">
        <h3 className="fw-bolder ">
          {intl.formatMessage({ id: "MONITORING.MAPS" })}
        </h3>
        <div className="d-flex gap-5 align-items-center">
          <button
            id="create_map"
            onClick={() => setisCreateMapOpen(true)}
            className="btn btn-light-primary btn-sm"
            title={intl.formatMessage({ id: "MONITORING.MAPS.CREATE" })}
          >
            {intl.formatMessage({ id: "MONITORING.MAPS.CREATE" })}
          </button>
          <button
            className="btn btn-light-warning btn-sm"
            data-bs-toggle="tooltip"
            title={intl.formatMessage({ id: "IMPORT" })}
          >
            {intl.formatMessage({ id: "IMPORT" })}
          </button>

          <div
            id="create_map"
            className="bg-body"
            data-kt-drawer="true"
            data-kt-drawer-name="create_map"
            data-kt-drawer-activate="true"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="{default:'500px', 'lg': '990px'}"
            data-kt-drawer-direction="end"
            data-kt-drawer-toggle="#create_map"
            data-kt-drawer-close="#create_map_closes"
            dir="rtl"
          >
            <div className="card shadow-none rounded-0 w-100 ">
              <div className="card-header" id="create_map_header">
                <h3 className="card-title fw-bolder text-gray-900">
                  {intl.formatMessage({ id: "MONITORING.MAPS.CREATE" })}
                </h3>
                <div className="card-toolbar">
                  <button
                    type="button"
                    className="btn btn-sm btn-icon btn-active-light-primary me-n5"
                    // id="create_map_close"
                  >
                    c
                  </button>
                </div>
              </div>

              <div dir="rtl">
                <div className="card-header border-0 pt-5 w-100 ">
                  <div className="card-toolbar">
                    <ul className="nav">
                      <li className="nav-item">
                        <a
                          className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
                          data-bs-toggle="tab"
                          href="#map"
                        >
                          نقشه
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4 me-1"
                          data-bs-toggle="tab"
                          href="#tab-ipmi"
                        >
                          اشتراک گذاری
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="tab-content">
                    <div className="tab-pane active show" id="map">
                      <div className="container text-center">
                        <div className="row">
                          <div className="input-group mb-3 col">
                            <span
                              className="input-group-text rounded-start-0 rounded-end-2"
                              id="map"
                            >
                              <i className="bi bi-hdd-network" />
                            </span>
                            <input
                              type="text"
                              className="form-control rounded-start-2 rounded-end-0"
                              placeholder="نام هاست"
                              aria-label="نام هاست"
                              aria-describedby="map"
                              required
                            />
                          </div>
                          <div className="input-group mb-3 col">
                            <span
                              className="input-group-text rounded-start-0 rounded-end-2"
                              id="map"
                            >
                              <i className="bi bi-bullseye" />
                            </span>
                            <input
                              type="text"
                              className="form-control rounded-start-2 rounded-end-0"
                              placeholder="نام نمایشی"
                              aria-label="نام نمایشی"
                              aria-describedby="map"
                              autoComplete="off"
                              required
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col w-50">
                            <MultiSelect
                              reset={false}
                              title="MENU.SELECT.HOSTS.GP"
                              options={[]}
                              Loading={false}
                              addAll={false}
                              DataName=""
                              setData={() => console.log()}
                              currentData={[]}
                            />
                          </div>
                          <div className="col">
                            <MultiSelect
                              reset={false}
                              title="MENU.SELECT.HOSTS.GP"
                              options={[]}
                              Loading={false}
                              addAll={false}
                              DataName=""
                              setData={() => console.log()}
                              currentData={[]}
                            />
                          </div>
                        </div>
                        <div
                          className="row mt-3 position-relative"
                          style={{ zIndex: 0 }}
                        >
                          <div className="col">
                            <div dir="rtl" className="form-floating">
                              <textarea
                                className="form-control"
                                placeholder="توضیحات را اینجا وارد کنید"
                                id="floatingTextarea2"
                                style={{ height: 100 }}
                              />
                              <label htmlFor="floatingTextarea2">توضیحات</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane container" id="tab-ipmi">
                      <div className="mb-3 row">
                        <div className="col">
                          <label
                            htmlFor="AuthenticationAlgorithm"
                            className="form-label"
                          >
                            الگوریتم احراز هویت
                          </label>
                          <select
                            className="form-select form-select-lg"
                            name="AuthenticationAlgorithm"
                            id="AuthenticationAlgorithm"
                            defaultValue="-1"
                          >
                            <option value="-1">پیش فرض</option>
                            <option value="0">هیچکدام</option>
                            <option value="1">MD2</option>
                            <option value="2">MD5</option>
                            <option value="4">Straight</option>
                            <option value="5">OEM</option>
                            <option value="6">RMCP+</option>
                          </select>
                        </div>
                        <div className="col">
                          <label
                            htmlFor="AuthenticationAlgorithm"
                            className="form-label"
                          >
                            سطح دسترسی
                          </label>
                          <select
                            className="form-select form-select-lg"
                            name="AuthenticationAlgorithm"
                            id="AuthenticationAlgorithm"
                            defaultValue="-1"
                          >
                            <option value="-1">پیش فرض</option>
                            <option value="0">CallBack</option>
                            <option value="1">کاربر</option>
                            <option value="2">اپراتور</option>
                            <option value="4">ادمین</option>
                            <option value="5">OEM</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <div className="col">
                          <label className="form-label">اسم</label>
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            placeholder="اسم را اینجا وارد نمایید"
                          />
                        </div>
                        <form className="col">
                          <label htmlFor="password" className="form-label">
                            رمز عبور
                          </label>
                          <div className="input-group">
                            <input
                              // type={showPassword ? "text" : "password"}
                              className="form-control rounded-end-2 rounded-start-0 "
                              id="password"
                              placeholder="رمز عبور را اینجا وارد نمایید"
                              autoComplete="off"
                            />
                            <button
                              className="btn border rounded-start-2 rounded-end-0"
                              type="button"
                              // onClick={togglePasswordVisibility}
                            >
                              <div>
                                {/* {showPassword ? (
                                  <i className="bi bi-eye-slash" />
                                ) : (
                                  <i className="bi bi-eye" />
                                )} */}
                              </div>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                <MultiSelect
                  title="NAME"
                  reset={false}
                  options={[]}
                  Loading={false}
                  addAll={true}
                  DataName="objectids"
                  setData={setValue}
                  currentData={[]}
                />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <MapsTable />
    </Content>
  );
}
