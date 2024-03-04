import { useIntl } from "react-intl";

const BusiestTriggersTabel = () => {
  const intl = useIntl();

  return (
    <div className={`card my-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            {intl.formatMessage({ id: "REPORTS.BUSIEST_TRIGGERS" })}
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
                  {intl.formatMessage({ id: "TRIGGER" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "SEVERITY" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "NUMBER OF STATUS CHANGE" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td className="text-end"></td>
                <td className="text-end">
                  <span className="badge badge-light-danger">
                    No Data Found
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

export { BusiestTriggersTabel };
