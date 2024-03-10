import { useIntl } from "react-intl";
import { CheckBox } from "./../../../layout/components/CheckBox/index";

const ScheduledReportsTabel = () => {
  const intl = useIntl();

  return (
    <div className={`card mt-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          {intl.formatMessage({ id: "REPORTS.SCHEDULED_REPORTS" })}
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <span className="text-muted mt-1 fw-semibold fs-7">
            تعداد 1 مورد گزارش یافت شد
          </span>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-30 text-center">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-25px">
                  <CheckBox checked={false} />
                </th>
                <th className="min-w-150px">
                  {intl.formatMessage({ id: "NAME" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "OWNER" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "REPEATS" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "PERIOD" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "LAST_SENT" })}
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
                <td>
                  <CheckBox checked={false}/>
                </td>
                <td>
                  <span className="badge badge-light-primary fs-6">linux</span>
                </td>
                <td className="text-center">
                  <span className="badge badge-light-success fs-6">
                    server 2
                  </span>
                </td>
                <td className="text-center"></td>
                <td className="text-center"></td>
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

export { ScheduledReportsTabel };
