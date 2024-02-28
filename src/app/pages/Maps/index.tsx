import { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "../../../_metronic/layout/components/multiple-select/MultiSelect";
import { MapsTable } from "../../../_metronic/partials/widgets/tables/MapsTable";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../_metronic/helpers";
import { UsersTable } from "../../../_metronic/partials/widgets";
import ToggleBtns from "../../../_metronic/layout/components/ToggleBtn/ToggleBtn";

interface FormValues {
  search: {
    name: string;
  };
  URLs: {
    name: string;
    URL: string;
    Element: string;
  }[];
}

export function Maps() {
  const intl = useIntl();
  const navigate = useNavigate();

  const [resetMultiSelect, setResetMultiSelect] = useState(false);
  const [IsOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [IsAdvancedTags, setIsAdvancedTags] = useState(true);

  const { control, watch, setValue, handleSubmit, reset, unregister } =
    useForm<FormValues>({
      defaultValues: {
        search: { name: "" },
        URLs: [
          {
            name: "",
            URL: "",
            Element: "",
          },
        ],
      },
    });

  const {
    fields: URLsField,
    append: URLsAppend,
    remove: URLsRemove,
  } = useFieldArray({
    control,
    name: "URLs",
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
            id="create-map"
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
            id="create"
            className="bg-body"
            data-kt-drawer="true"
            data-kt-drawer-name="activities"
            data-kt-drawer-activate="true"
            data-kt-drawer-overlay="true"
            data-kt-drawer-width="{default:'300px', 'lg': '965px'}"
            data-kt-drawer-direction="end"
            data-kt-drawer-toggle="#create-map"
            data-kt-drawer-close="#create_map_close"
            dir="rtl"
          >
            <div className="card shadow-none rounded-0 w-100 ">
              <div className="card-header" id="kt_activities_header">
                <h3 className="card-title fw-bolder text-gray-900">
                  {intl.formatMessage({ id: "MONITORING.MAPS.CREATE" })}
                </h3>
                <div className="card-toolbar">
                  <button
                    type="button"
                    className="btn btn-sm btn-icon btn-active-light-primary me-n5"
                    id="create_map_close"
                  >
                    <KTIcon iconName="cross" className="fs-1" />
                  </button>
                </div>
              </div>

              <>
                <div className="card shadow-none rounded-0 w-100 ">
                  <div dir="rtl">
                    <div className="card-header border-0 p-5 w-100 ">
                      <div className="card-toolbar">
                        <ul className="nav ">
                          <li className="nav-item">
                            <a
                              className="nav-item btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
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
                      <div
                        style={{ maxHeight: "510px" }}
                        className={`tab-content ${URLsField.length > 1 ? "overflow-scroll" : ""}`}
                      >
                        <div className="tab-pane active show" id="map">
                          <div className="container d-grid gap-4 text-center">
                            <div className="row column-gap-3 m-0 ">
                              <div className="col pe-0">
                                <MultiSelect
                                  title="OWNER"
                                  reset={false}
                                  options={[]}
                                  Loading={false}
                                  addAll={true}
                                  DataName="objectids"
                                  setData={setValue}
                                  currentData={[]}
                                />
                              </div>
                              <button
                                className="btn py-3 btn-light-primary px-0 col-2"
                                onClick={() => setIsOwnerModalOpen(true)}
                              >
                                {intl.formatMessage({
                                  id: "MENU.SELECT",
                                })}
                              </button>
                            </div>
                            <Modal
                              show={IsOwnerModalOpen}
                              onHide={() => setIsOwnerModalOpen(false)}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  {intl.formatMessage({ id: "USERS" })}
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body className="p-5" dir="rtl">
                                <UsersTable />
                              </Modal.Body>
                            </Modal>
                            <div className="row">
                              <div className="input-group  col">
                                <span
                                  className="input-group-text rounded-start-0 rounded-end-2"
                                  id="map"
                                >
                                  <i className="bi bi-person-bounding-box" />
                                </span>
                                <input
                                  type="text"
                                  className="form-control rounded-start-2 rounded-end-0"
                                  placeholder={intl.formatMessage({
                                    id: "NAME",
                                  })}
                                  aria-label={intl.formatMessage({
                                    id: "NAME",
                                  })}
                                  aria-describedby="map"
                                  required
                                />
                              </div>
                              <div className="input-group  col">
                                <span
                                  className="input-group-text rounded-start-0 rounded-end-2"
                                  id="map"
                                >
                                  <i className="bi bi-arrows" />
                                </span>
                                <input
                                  type="text"
                                  className="form-control rounded-start-2 rounded-end-0"
                                  placeholder={intl.formatMessage({
                                    id: "WIDTH",
                                  })}
                                  aria-label={intl.formatMessage({
                                    id: "WIDTH",
                                  })}
                                  aria-describedby="map"
                                  required
                                />
                              </div>
                              <div className="input-group  col">
                                <span
                                  className="input-group-text rounded-start-0 rounded-end-2"
                                  id="map"
                                >
                                  <i className="bi bi-arrows-vertical" />
                                </span>
                                <input
                                  type="text"
                                  className="form-control rounded-start-2 rounded-end-0"
                                  placeholder={intl.formatMessage({
                                    id: "HEIGHT",
                                  })}
                                  aria-label={intl.formatMessage({
                                    id: "HEIGHT",
                                  })}
                                  aria-describedby="map"
                                  autoComplete="off"
                                  required
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                  <label className="form-check-label">
                                    {intl.formatMessage({
                                      id: "MONITORING.MAPS.ICON.HIGHLIGHT",
                                    })}
                                  </label>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    name="MONITORING.MAPS.ICON.HIGHLIGHT"
                                    defaultChecked={true}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-check px-3 form-switch form-switch-sm form-check-custom form-check-solid">
                                  <label className="form-check-label">
                                    {intl.formatMessage({
                                      id: "MARK_ELEMENTS_ON_TRIGGER_STATUS_CHANGE",
                                    })}
                                  </label>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    name="MARK_ELEMENTS_ON_TRIGGER_STATUS_CHANGE"
                                    defaultChecked={false}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                  <label className="form-check-label">
                                    {intl.formatMessage({
                                      id: "MONITORING.PROBLEMS.SUPPRESSEDPROBLEMS",
                                    })}
                                  </label>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    name="notifications"
                                    defaultChecked={false}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <select className="form-select">
                                  <option disabled selected>
                                    {intl.formatMessage({
                                      id: "BG.IMAGE",
                                    })}
                                  </option>
                                  <option value="1">
                                    {intl.formatMessage({
                                      id: "BG.D.EXIST",
                                    })}
                                  </option>
                                </select>
                              </div>
                              <div className="col">
                                <select className="form-select">
                                  <option disabled selected>
                                    {intl.formatMessage({
                                      id: "MONITORING.MAPS.AUTO.ICON",
                                    })}
                                  </option>
                                  <option value="<manual>">{`<manual>`}</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="d-flex align-items-center gap-3 text-end ">
                                  <p>
                                    {intl.formatMessage({
                                      id: "DISPLAY_PROBLEMS",
                                    })}
                                    :
                                  </p>
                                  <ToggleBtns
                                    options={[
                                      {
                                        value: 0,
                                        label: "EXPAND_SINGLE_PROBLEM",
                                      },
                                      {
                                        value: 1,
                                        label: "NUMBER_OF_PROBLEMS",
                                      },
                                      {
                                        value: 2,
                                        label:
                                          "PROBLEMS_NUM_PROBLEMS_EXP_MOST_CRITICAL",
                                      },
                                    ]}
                                    data=""
                                    // setData={setShowTags}
                                    // initialData={showTags}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <div className="form-check p-0 form-switch form-switch-sm form-check-custom form-check-solid">
                                <label className="form-check-label">
                                  {intl.formatMessage({
                                    id: "ADVANCED_LABELS",
                                  })}
                                </label>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="ADVANCED_LABELS"
                                  onChange={(e) =>
                                    setIsAdvancedTags(e.currentTarget.checked)
                                  }
                                  checked={IsAdvancedTags}
                                />
                              </div>
                            </div>
                            {IsAdvancedTags ? (
                              <div className="row">
                                <div className="col">
                                  <select className="form-select">
                                    <option disabled selected>
                                      {intl.formatMessage({
                                        id: "HOST_GROUP_LABEL_TYPE",
                                      })}
                                    </option>
                                    <option value="1">
                                      {intl.formatMessage({
                                        id: "ELEMENT_NAME",
                                      })}
                                    </option>
                                  </select>
                                </div>
                                <div className="col">
                                  <select className="form-select">
                                    <option disabled selected>
                                      {intl.formatMessage({
                                        id: "HOST_LABEL_TYPE",
                                      })}
                                    </option>
                                    <option value="ELEMENT_NAME">
                                      {intl.formatMessage({
                                        id: "ELEMENT_NAME",
                                      })}
                                    </option>
                                  </select>
                                </div>
                                <div className="col">
                                  <select className="form-select">
                                    <option disabled selected>
                                      {intl.formatMessage({
                                        id: "TRIGGER_LABEL_TYPE",
                                      })}
                                    </option>
                                    <option value="ELEMENT_NAME">
                                      {intl.formatMessage({
                                        id: "ELEMENT_NAME",
                                      })}
                                    </option>
                                  </select>
                                </div>
                                <div className="col">
                                  <select className="form-select">
                                    <option disabled selected>
                                      {intl.formatMessage({
                                        id: "MAP_LABEL_TYPE",
                                      })}
                                    </option>
                                    <option value="ELEMENT_NAME">
                                      {intl.formatMessage({
                                        id: "ELEMENT_NAME",
                                      })}
                                    </option>
                                  </select>
                                </div>
                                <div className="col">
                                  <select className="form-select">
                                    <option disabled selected>
                                      {intl.formatMessage({
                                        id: "IMAGE_LABEL_TYPE",
                                      })}
                                    </option>
                                    <option value="ELEMENT_NAME">
                                      {intl.formatMessage({
                                        id: "ELEMENT_NAME",
                                      })}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            ) : (
                              <div className="row">
                                <div className="col">
                                  <select className="form-select">
                                    <option disabled selected>
                                      {intl.formatMessage({
                                        id: "Map_LABEL_TYPE",
                                      })}
                                    </option>
                                    <option value="1">
                                      {intl.formatMessage({
                                        id: "ELEMENT_NAME",
                                      })}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            )}
                            <div className="row">
                              <div className="col">
                                <div className=" d-flex align-items-center gap-3 text-end ">
                                  <p>
                                    {intl.formatMessage({
                                      id: "MONITORING.HOSTS.SEVERITY",
                                    })}
                                    :
                                  </p>
                                  <ToggleBtns
                                    options={[
                                      {
                                        value: 0,
                                        label:
                                          "MONITORING.HOSTS.SEVERITY.OPTION1",
                                      },
                                      {
                                        value: 1,
                                        label:
                                          "MONITORING.HOSTS.SEVERITY.OPTION2",
                                      },
                                      {
                                        value: 2,
                                        label:
                                          "MONITORING.HOSTS.SEVERITY.OPTION3",
                                      },
                                      {
                                        value: 2,
                                        label:
                                          "MONITORING.HOSTS.SEVERITY.OPTION4",
                                      },
                                      {
                                        value: 2,
                                        label:
                                          "MONITORING.HOSTS.SEVERITY.OPTION5",
                                      },
                                      {
                                        value: 2,
                                        label:
                                          "MONITORING.HOSTS.SEVERITY.OPTION6",
                                      },
                                    ]}
                                    data=""
                                    // setData={setShowTags}
                                    // initialData={showTags}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row gap-3">
                              <h6 className="text-end p-0 m-0">URLs :</h6>
                              {URLsField.map((item, index) => (
                                <div className="row">
                                  <Controller
                                    control={control}
                                    name={`URLs[${index}].name`}
                                    render={({ field }) => (
                                      <input
                                        className="form-control col py-2"
                                        placeholder={intl.formatMessage({
                                          id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                        })}
                                        {...field}
                                      />
                                    )}
                                  />
                                  <div className="col">
                                    <Controller
                                      control={control}
                                      name={`URLs[${index}].URL`}
                                      render={({ field }) => (
                                        <input
                                          className="form-control py-2"
                                          placeholder={intl.formatMessage({
                                            id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                          })}
                                          {...field}
                                        />
                                      )}
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    className="btn col-2 btn-light-danger me-2 py-2"
                                    onClick={() => URLsRemove(index)}
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
                                className="btn btn-light-success py-2 col-2"
                                onClick={() => {
                                  URLsAppend({
                                    name: "type",
                                    URL: "",
                                    Element: "",
                                  });
                                }}
                              >
                                {intl.formatMessage({
                                  id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                                })}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane container gap-4" id="tab-ipmi">
                          <div className="row">
                            <div className="col">
                              <div className=" d-flex align-items-center gap-3 text-end ">
                                <p>
                                  {intl.formatMessage({
                                    id: "TYPE",
                                  })}
                                  :
                                </p>
                                <ToggleBtns
                                  options={[
                                    {
                                      value: 0,
                                      label: "PRIVATE",
                                    },
                                    {
                                      value: 1,
                                      label: "PUBLIC",
                                    },
                                  ]}
                                  data=""
                                  // setData={setShowTags}
                                  // initialData={showTags}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row gap-3">
                            <h6 className="text-end p-0 m-0">
                              {intl.formatMessage({
                                id: "LIST_OF_USER_GP_SHARE",
                              })}
                            </h6>
                            <div className="row">
                              {URLsField.map((item, index) => (
                                <>
                                  <Controller
                                    control={control}
                                    name={`URLs[${index}].name`}
                                    render={({ field }) => (
                                      <input
                                        className="form-control col py-2"
                                        placeholder={intl.formatMessage({
                                          id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                        })}
                                        {...field}
                                      />
                                    )}
                                  />
                                  <div className="col">
                                    <Controller
                                      control={control}
                                      name={`URLs[${index}].URL`}
                                      render={({ field }) => (
                                        <input
                                          className="form-control py-2"
                                          placeholder={intl.formatMessage({
                                            id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                          })}
                                          {...field}
                                        />
                                      )}
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    className="btn col-2 btn-light-danger me-2 py-2"
                                    onClick={() => URLsRemove(index)}
                                    style={{ width: "10%" }}
                                  >
                                    {intl.formatMessage({
                                      id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                                    })}
                                  </button>
                                </>
                              ))}
                            </div>
                            <button
                              type="button"
                              className="btn btn-light-success py-2 col-2"
                              onClick={() => {
                                URLsAppend({
                                  name: "type",
                                  URL: "",
                                  Element: "",
                                });
                              }}
                            >
                              {intl.formatMessage({
                                id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                              })}
                            </button>
                          </div>
                          <div className="row gap-3">
                            <h6 className="text-end p-0 m-0">
                              {intl.formatMessage({
                                id: "LIST_OF_USER_SHARE",
                              })}
                            </h6>
                            <div className="row">
                              {URLsField.map((item, index) => (
                                <>
                                  <Controller
                                    control={control}
                                    name={`URLs[${index}].name`}
                                    render={({ field }) => (
                                      <input
                                        className="form-control col py-2"
                                        placeholder={intl.formatMessage({
                                          id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                        })}
                                        {...field}
                                      />
                                    )}
                                  />
                                  <div className="col">
                                    <Controller
                                      control={control}
                                      name={`URLs[${index}].URL`}
                                      render={({ field }) => (
                                        <input
                                          className="form-control py-2"
                                          placeholder={intl.formatMessage({
                                            id: "MONITORING.HOSTS.ADDTAG.VALUE",
                                          })}
                                          {...field}
                                        />
                                      )}
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    className="btn col-2 btn-light-danger me-2 py-2"
                                    onClick={() => URLsRemove(index)}
                                    style={{ width: "10%" }}
                                  >
                                    {intl.formatMessage({
                                      id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                                    })}
                                  </button>
                                </>
                              ))}
                            </div>
                            <button
                              type="button"
                              className="btn btn-light-success py-2 col-2"
                              onClick={() => {
                                URLsAppend({
                                  name: "type",
                                  URL: "",
                                  Element: "",
                                });
                              }}
                            >
                              {intl.formatMessage({
                                id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
                              })}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex w-100 justify-content-center mt-5 column-gap-5">
                        <button
                          type="button"
                          onClick={submit}
                          className="btn py-2 btn-light-success"
                        >
                          {intl.formatMessage({ id: "SUBMIT" })}
                        </button>
                        <button
                          type="button"
                          onClick={resetData}
                          className="btn py-2 btn-light-danger"
                        >
                          {intl.formatMessage({ id: "CANCEL" })}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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
