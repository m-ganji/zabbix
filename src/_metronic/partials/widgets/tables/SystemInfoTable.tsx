import { useIntl } from "react-intl";

const SystemInfoTable = () => {
  const intl = useIntl();

  return (
    <div className={`card mt-10`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            {intl.formatMessage({ id: "REPORTS.SYS.INFO" })}
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <span className="text-muted mt-1 fw-semibold fs-7">
            تعداد 1 اطلاعات سیستم پیدا شد
          </span>
        </div>
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
                <th className="min-w-450px">
                  {intl.formatMessage({ id: "PARAMETER" })}
                </th>
                <th className="min-w-140px">
                  {intl.formatMessage({ id: "VALUE" })}
                </th>
                <th className="min-w-120px">
                  {intl.formatMessage({ id: "DETAILS" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <p className="text-gray-900 fw-bold text-hover-primary d-block fs-6">
                    Zabbix server is running
                  </p>
                </td>
                <td>
                  <span className="badge badge-light-primary fs-6">
                    11500
                  </span>
                </td>
                <td className="text-end">
                  <span className="badge badge-light-success fs-6">
                    localhost:10051
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

export { SystemInfoTable };
