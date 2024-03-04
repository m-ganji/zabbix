import { useIntl } from "react-intl";

const AvailabilityReportTabel = () => {
  const intl = useIntl();


  return (
    <div className={`card mt-10`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            {intl.formatMessage({ id: "REPORT.AVAILABILITY_REPORT" })}
          </span>
        </h3>
  
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "HOST" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "NAME" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "PROBLEM" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "OK" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "GRAPH" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <span className="badge badge-light-success fs-6">
                   LINUX
                  </span>
                </td>
                <td>
                  <span className="badge badge-light-danger fs-6">
                  LINUX CHANGED
                  </span>
                </td>
                <td className="text-end"></td>
                <td className="text-end">
                  <span className="badge badge-light-success">100%</span>
                  
                  </td>
                <td className="text-end">
                <span className="badge badge-light-primary">SHOW</span>
                  </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { AvailabilityReportTabel };
