import { useIntl } from "react-intl";

const OverviewTabel = () => {
  const intl = useIntl();

  return (
    <div className={`card mt-5`}>
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
                  {intl.formatMessage({ id: "VALUE" })}
                </th>
                <th className="min-w-200px">
                  {intl.formatMessage({ id: "HOST_COUNT" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <span className="badge badge-light-success">
                    {intl.formatMessage({ id: "VALUE" })}
                  </span>
                </td>
                <td>
                  <span className="badge badge-light-info">
                    {intl.formatMessage({ id: "HOST_COUNT" })}
                  </span>
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

export { OverviewTabel };
