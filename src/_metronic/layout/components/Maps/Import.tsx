import React from "react";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import BTN from "../BTN";
import { CheckBox } from "../CheckBox";

interface CreateMapProps {}

export const ImportMap: React.FC<CreateMapProps> = () => {
  const intl = useIntl();

  return (
    <div
      id="import"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="activities"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '800px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#import-map"
      data-kt-drawer-close="#import_map_close"
      dir="rtl"
    >
      <div className="card shadow-none rounded-0 w-100 ">
        <div className="card-header" id="kt_activities_header">
          <h3 className="card-title fw-bolder text-gray-900">
            {intl.formatMessage({ id: "IMPORT" })}
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary me-n5"
              id="import_map_close"
            >
              <KTIcon iconName="cross" className="fs-1" />
            </button>
          </div>
        </div>

        <>
          <div className="card shadow-none rounded-0 w-100 ">
            <div dir="rtl">
              <div className="card-body pt-0">
                <div className="mt-5">
                  <h4 className="text-end mb-4">
                    {intl.formatMessage({ id: "IMPORT.FILE" })}
                  </h4>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="fileInput"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center bg-light-primary rounded-2">
                    <h6 className="text-end m-0 mt-4">
                      {intl.formatMessage({ id: "RULES" })}
                    </h6>
                    <table className="table w-50 text-center">
                      <thead>
                        <tr>
                          <th></th>
                          <th>{intl.formatMessage({ id: "UPDATE.CREATE" })}</th>
                          <th> {intl.formatMessage({ id: "NEW" })}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {intl.formatMessage({ id: "MONITORING.MAPS" })}
                          </td>
                          <td>
                            <CheckBox />
                          </td>
                          <td>
                            <CheckBox />
                          </td>
                        </tr>
                        <tr>
                          <td>{intl.formatMessage({ id: "IMAGES" })}</td>
                          <td>
                            <CheckBox />
                          </td>
                          <td>
                            <CheckBox />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="d-flex w-100 justify-content-center mt-5 column-gap-5">
                  <BTN
                    label={intl.formatMessage({ id: "IMPORT" })}
                    className="btn-light-success"
                    // onClick={submit}
                  />
                  <BTN
                    label={intl.formatMessage({ id: "CANCEL" })}
                    className="btn-light-danger"
                    id="import_map_close"
                    // onClick={resetData}
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
