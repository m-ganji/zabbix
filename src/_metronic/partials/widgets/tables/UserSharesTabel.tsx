import React from "react";
import { useIntl } from "react-intl";

const UserSharesTabel = () => {
  const intl = useIntl();

  return (
    <div className={`card`}>
    {/* begin::Body */}
    <div className="card-body p-0">
      {/* begin::Table container */}
      <div className="table-responsive">
        {/* begin::Table */}
        <div className="d-flex justify-content-center"> {/* Centering container */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 m-0">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-10px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".widget-9-check"
                    />
                  </div>
                </th>
                <th className="min-w-120hpx">
                  {intl.formatMessage({ id: "USERNAME" })}
                </th>
                <th className="min-wh-120px">
                  {intl.formatMessage({ id: "NAME" })}
                </th>
                <th className="min-wh-120px">
                  {intl.formatMessage({ id: "LASTNAME" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input type="checkbox" value="1" />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-start flex-column">
                      <span className="badge badge-light-primary">Admin</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-light-success">Zabbix</span>
                </td>
                <td className="text-end">
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="badge badge-light-success">
                        Administrator
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
        </div>
        {/* end::Table */}
      </div>
      {/* end::Table container */}
    </div>
    {/* begin::Body */}
  </div>
  
  );
};

export { UserSharesTabel };
