import { useIntl } from "react-intl";
import { Select } from "../../../layout/components/Select";

const ReportsNotificationsTable = () => {
  const intl = useIntl();

  const MediaTypes = [
    { value: 0, label: "همه" },
    { value: 29, label: "Brevis.one" },
    { value: 10, label: "Discord" },
    { value: 1, label: "ایمیل" },
    { value: 4, label: "ایمیل (HTML)" },
    { value: 40, label: "رویداد-محور Ansible" },
    { value: 30, label: "Express.ms" },
    { value: 32, label: "گیت‌هاب" },
    { value: 33, label: "GLPi" },
    { value: 34, label: "Gmail" },
    { value: 35, label: "Gmail رله" },
    { value: 22, label: "iLert" },
    { value: 26, label: "iTop" },
    { value: 12, label: "جیرا" },
    { value: 20, label: "Jira ServiceDesk" },
    { value: 13, label: "جیرا با فیلدهای سفارشی" },
    { value: 38, label: "خط" },
    { value: 31, label: "ManageEngine ServiceDesk" },
    { value: 41, label: "MantisBT" },
    { value: 5, label: "Mattermost" },
    { value: 14, label: "MS Teams" },
    { value: 36, label: "Office365" },
    { value: 37, label: "Office365 رله" },
    { value: 6, label: "Opsgenie" },
    { value: 21, label: "OTRS" },
    { value: 39, label: "OTRS CE" },
    { value: 7, label: "PagerDuty" },
    { value: 8, label: "Pushover" },
    { value: 15, label: "Redmine" },
    { value: 27, label: "Rocket.Chat" },
    { value: 18, label: "ServiceNow" },
    { value: 11, label: "SIGNL4" },
    { value: 9, label: "Slack" },
    { value: 3, label: "پیام کوتاه (SMS)" },
    { value: 23, label: "سیستم پشتیبانی سولارویندز" },
    { value: 24, label: "SysAid" },
    { value: 16, label: "تلگرام" },
    { value: 25, label: "TOPdesk" },
    { value: 28, label: "VictorOps" },
    { value: 19, label: "Zammad" },
    { value: 17, label: "Zendesk" },
  ];

  const periodOptions = [
    { value: "daily", label: "روزانه" },
    { value: "weekly", label: "هفتگی" },
    { value: "monthly", label: "ماهانه" },
    { value: "yearly", label: "سالانه" },
  ];

  return (
    <div className={`card mt-10`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            {intl.formatMessage({ id: "REPORTS.SYS.INFO" })}
          </span>
        </h3>
        <div className=" w-50 gap-5 d-flex">
          <Select
            defaultLabel={intl.formatMessage({ id: "REPORTS.MEDIA_TYPE" })}
            options={MediaTypes}
          />
          <Select
            defaultLabel={intl.formatMessage({ id: "PERIOD" })}
            options={periodOptions}
          />
          <Select
            defaultLabel={intl.formatMessage({ id: "YEAR" })}
            options={[{ value: "1402", label: "1402" }]}
          />
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
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "DATE.FROM" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "DATE.TILL" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "ADMIN" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "GUEST" })}
                </th>
                <th className="min-w-100px">
                  {intl.formatMessage({ id: "تست" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <span className="badge badge-light-success fs-6">
                    2024-01-01 00:00
                  </span>
                </td>
                <td>
                  <span className="badge badge-light-danger fs-6">
                    2024-01-08 00:00
                  </span>
                </td>
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

export { ReportsNotificationsTable };
