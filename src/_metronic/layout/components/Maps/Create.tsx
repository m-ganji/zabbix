import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import { UsersTable } from "../../../partials/widgets";
import ToggleBtns from "../ToggleBtn/ToggleBtn";
import { Controller, useFieldArray } from "react-hook-form";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import { GroupSharesTabel } from "../../../partials/widgets/tables/GroupSharesTabel";
import BTN from "../BTN";
import { UserSharesTabel } from "../../../partials/widgets/tables/UserSharesTabel";
import { SwitchBTN } from "./SwitchBTN";
import Input from "../Input";
import { Select } from "../Select";

interface CreateMapProps {
  control: object;
  setValue: CallableFunction;
}

export const CreateMap: React.FC<CreateMapProps> = ({ control, setValue }) => {
  const intl = useIntl();
  const [IsOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [IsAdvancedTags, setIsAdvancedTags] = useState(true);
  const [IsGroupSharesOpen, setIsGroupSharesOpen] = useState(false);
  const [IsUserSharesOpen, setIsUserSharesOpen] = useState(false);

  const {
    fields: URLsField,
    append: URLsAppend,
    remove: URLsRemove,
  } = useFieldArray({
    control,
    name: "URLs",
  });

  return (
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
                  className={`tab-content ${
                    URLsField.length > 1 ? "overflow-scroll" : ""
                  }`}
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
                          <Input
                            iconName="user"
                            placeholder={intl.formatMessage({
                              id: "NAME",
                            })}
                          />
                        </div>
                        <div className="input-group  col">
                          <Input
                            iconName="right-left"
                            placeholder={intl.formatMessage({
                              id: "WIDTH",
                            })}
                          />
                        </div>
                        <div className="input-group col">
                          <Input
                            iconName="up-down"
                            placeholder={intl.formatMessage({
                              id: "HEIGHT",
                            })}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <SwitchBTN
                            label={intl.formatMessage({
                              id: "MONITORING.MAPS.ICON.HIGHLIGHT",
                            })}
                          />
                        </div>
                        <div className="col">
                          <SwitchBTN
                            label={intl.formatMessage({
                              id: "MARK_ELEMENTS_ON_TRIGGER_STATUS_CHANGE",
                            })}
                          />
                        </div>
                        <div className="col">
                          <SwitchBTN
                            label={intl.formatMessage({
                              id: "MONITORING.PROBLEMS.SUPPRESSEDPROBLEMS",
                            })}
                          />
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
                      <div>
                        <SwitchBTN
                          state={IsAdvancedTags}
                          label={intl.formatMessage({
                            id: "ADVANCED_LABELS",
                          })}
                          onChange={(e) =>
                            setIsAdvancedTags(e.currentTarget.checked)
                          }
                        />
                      </div>
                      {IsAdvancedTags ? (
                        <div className="row">
                          <div className="col">
                            <Select
                              value="-1"
                              defaultLabel={intl.formatMessage({
                                id: "HOST_GROUP_LABEL_TYPE",
                              })}
                              options={[
                                {
                                  value: "0",
                                  label: intl.formatMessage({
                                    id: "ELEMENT_NAME",
                                  }),
                                },
                              ]}
                            />
                          </div>
                          <div className="col">
                            <Select
                              value="-1"
                              defaultLabel={intl.formatMessage({
                                id: "HOST_LABEL_TYPE",
                              })}
                              options={[
                                {
                                  value: "0",
                                  label: intl.formatMessage({
                                    id: "ELEMENT_NAME",
                                  }),
                                },
                              ]}
                            />
                          </div>
                          <div className="col">
                            <Select
                              value="-1"
                              defaultLabel={intl.formatMessage({
                                id: "TRIGGER_LABEL_TYPE",
                              })}
                              options={[
                                {
                                  value: "0",
                                  label: intl.formatMessage({
                                    id: "ELEMENT_NAME",
                                  }),
                                },
                              ]}
                            />
                          </div>
                          <div className="col">
                            <Select
                              value="-1"
                              defaultLabel={intl.formatMessage({
                                id: "MAP_LABEL_TYPE",
                              })}
                              options={[
                                {
                                  value: "0",
                                  label: intl.formatMessage({
                                    id: "ELEMENT_NAME",
                                  }),
                                },
                              ]}
                            />
                          </div>
                          <div className="col">
                            <Select
                              value="-1"
                              defaultLabel={intl.formatMessage({
                                id: "IMAGE_LABEL_TYPE",
                              })}
                              options={[
                                {
                                  value: "0",
                                  label: intl.formatMessage({
                                    id: "ELEMENT_NAME",
                                  }),
                                },
                              ]}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col">
                            <Select
                              value="-1"
                              defaultLabel={intl.formatMessage({
                                id: "Map_LABEL_TYPE",
                              })}
                              options={[
                                {
                                  value: "0",
                                  label: intl.formatMessage({
                                    id: "ELEMENT_NAME",
                                  }),
                                },
                              ]}
                            />
                          </div>
                        </div>
                      )}
                      <div className="row">
                        <div className="col">
                          <div className=" d-flex align-items-center gap-3 text-end ">
                            <p>
                              {intl.formatMessage({
                                id: "SEVERITY",
                              })}
                              :
                            </p>
                            <ToggleBtns
                              options={[
                                {
                                  value: 0,
                                  label: "MONITORING.HOSTS.SEVERITY.OPTION1",
                                },
                                {
                                  value: 1,
                                  label: "MONITORING.HOSTS.SEVERITY.OPTION2",
                                },
                                {
                                  value: 2,
                                  label: "MONITORING.HOSTS.SEVERITY.OPTION3",
                                },
                                {
                                  value: 2,
                                  label: "INFO",
                                },
                                {
                                  value: 2,
                                  label: "MONITORING.HOSTS.SEVERITY.OPTION5",
                                },
                                {
                                  value: 2,
                                  label: "MONITORING.HOSTS.SEVERITY.OPTION6",
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
                          <div key={item.id} className="row gap-3">
                            <div className="col p-0">
                              <Controller
                                control={control}
                                name={`URLs[${index}].name`}
                                render={({ field }) => (
                                  <Input
                                    iconName="feather"
                                    placeholder={intl.formatMessage({
                                      id: "NAME",
                                    })}
                                    value={field.value.toString()}
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                            </div>
                            <div className="col p-0">
                              <Controller
                                control={control}
                                name={`URLs[${index}].URL`}
                                render={({ field }) => (
                                  <Input
                                    iconName="fasten"
                                    placeholder="URL"
                                    value={field.value.toString()}
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                            </div>
                            <BTN
                              label={intl.formatMessage({
                                id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                              })}
                              className="btn-light-danger col-1 p-0"
                              onClick={() => URLsRemove(index)}
                            />
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
                            id: "ADD",
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
                      <div className="row">
                        {URLsField.map((item, index) => (
                          <>
                            <table className="table table-striped text-center">
                              <thead>
                                <tr>
                                  <th>
                                    {intl.formatMessage({
                                      id: "USERGROUPS",
                                    })}
                                  </th>
                                  <th>
                                    {intl.formatMessage({
                                      id: "PERMISSIONS",
                                    })}
                                  </th>
                                  <th>
                                    {intl.formatMessage({
                                      id: "ACTION",
                                    })}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Disabled</td>
                                  <td>
                                    <ToggleBtns
                                      options={[
                                        {
                                          value: 0,
                                          label: "READ.ONLY",
                                        },
                                        {
                                          value: 1,
                                          label: "READ-WRITE",
                                        },
                                      ]}
                                      data=""
                                      // setData={setShowTags}
                                      // initialData={showTags}
                                    />
                                  </td>
                                  <td>
                                    <BTN
                                      label={intl.formatMessage({
                                        id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                                      })}
                                      className="btn-light-danger"
                                      onClick={() => URLsRemove(index)}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="col"> </div>
                          </>
                        ))}
                      </div>
                      <BTN
                        className="btn-light-success col-2"
                        onClick={() => setIsGroupSharesOpen(true)}
                        label={intl.formatMessage({
                          id: "ADD",
                        })}
                      />
                      <Modal
                        show={IsGroupSharesOpen}
                        onHide={() => setIsGroupSharesOpen(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {intl.formatMessage({ id: "MENU.SELECT.HOSTS.GP" })}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="p-5" dir="rtl">
                          <GroupSharesTabel />
                        </Modal.Body>
                      </Modal>
                    </div>
                    <div className="row gap-3">
                      <h6 className="text-end p-0 m-0"></h6>
                      <div className="row">
                        {URLsField.map((item, index) => (
                          <>
                            <table className="table table-striped text-center">
                              <thead>
                                <tr>
                                  <th>
                                    {intl.formatMessage({
                                      id: "USERGROUPS",
                                    })}
                                  </th>
                                  <th>
                                    {intl.formatMessage({
                                      id: "PERMISSIONS",
                                    })}
                                  </th>
                                  <th>
                                    {intl.formatMessage({
                                      id: "ACTION",
                                    })}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Admin</td>
                                  <td>
                                    <ToggleBtns
                                      options={[
                                        {
                                          value: 0,
                                          label: "READ.ONLY",
                                        },
                                        {
                                          value: 1,
                                          label: "READ-WRITE",
                                        },
                                      ]}
                                      data=""
                                      // setData={setShowTags}
                                      // initialData={showTags}
                                    />
                                  </td>
                                  <td>
                                    <BTN
                                      label={intl.formatMessage({
                                        id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
                                      })}
                                      className="btn-light-danger"
                                      onClick={() => URLsRemove(index)}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="col"> </div>
                          </>
                        ))}
                      </div>
                      <BTN
                        label={intl.formatMessage({
                          id: "ADD",
                        })}
                        className="btn-light-success col-2"
                        onClick={() => setIsUserSharesOpen(true)}
                      />
                      <Modal
                        show={IsUserSharesOpen}
                        onHide={() => setIsUserSharesOpen(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {intl.formatMessage({ id: "USERS" })}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="p-5" dir="rtl">
                          <UserSharesTabel />
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
                <div className="d-flex w-100 justify-content-center mt-5 column-gap-5">
                  <BTN
                    label={intl.formatMessage({ id: "SUBMIT" })}
                    className="btn-light-success"
                    // onClick={submit}
                  />
                  <BTN
                    label={intl.formatMessage({ id: "CANCEL" })}
                    className="btn-light-danger"
                    // onClick={resetData}
                    id="create_map_close"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
