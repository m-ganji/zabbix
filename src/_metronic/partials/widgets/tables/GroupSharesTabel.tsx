import React from "react";
import { useIntl } from "react-intl";

const GroupSharesTabel = () => {
  const intl = useIntl();

  return (
    <div className={`card`}>
      {/* begin::Body */}
      <div className="card-body p-0">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <div className="d-flex justify-content-center">
            {/* Centering container */}
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 m-0">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="w-10px">
                    <div className="form-check ms-2 m-0 form-check-sm form-check-custom form-check-solid">
                      <input
                        type="checkbox"
                        value="1"
                        data-kt-check="true"
                        data-kt-check-target=".widget-9-check"
                      />
                    </div>
                  </th>
                  <th className="min-w-120hpx">
                    {intl.formatMessage({ id: "NAME" })}
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
                        <span className="badge badge-light-success">
                          Disabled
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

export { GroupSharesTabel };
