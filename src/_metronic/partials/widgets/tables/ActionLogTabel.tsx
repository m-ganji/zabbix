import { useIntl } from "react-intl";

const ActionLogTabel = () => {
  const intl = useIntl();

  return (
    <div className={`card mt-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            {intl.formatMessage({ id: "REPORT.ACTION_LOG" })}
          </span>
        </h3>
        <span className="text-muted mt-1 fw-semibold fs-7">
          {intl.formatMessage(
            { id: "REPORT.FIND" },
            {
              COUNT: 1,
              LABEL: intl.formatMessage({ id: "REPORT.ACTION_LOG" }),
            }
          )}
        </span>
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
                  {intl.formatMessage({ id: "TIME" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "ACTION" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "REPORTS.MEDIA_TYPE" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "RECIPIENT" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "MSG" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "STATUS" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "INFO" })}
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
                <td className="text-end"></td>
                <td className="text-end"></td>
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

export { ActionLogTabel };
