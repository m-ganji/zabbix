import { useIntl } from "react-intl";

const DiscoveryTable = () => {
  const intl = useIntl();

  return (
    <div className={`card mt-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          {intl.formatMessage({ id: "MONITORING.DISCOVERY" })}
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <span className="text-muted mt-1 fw-semibold fs-7">
           تعداد 1 مورد کشف شد
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
                <th className="min-w-150px">
                  {intl.formatMessage({ id: "MONITORING.DISCOVERY.DEVICE" })}
                </th>
                <th className="min-w-140px">
                  {intl.formatMessage({ id: "MONITORING.HOSTS.MONITORED" })}
                </th>
                <th className="min-w-120px">
                  {intl.formatMessage({ id: "MENU.UP/DOWN" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        className="text-gray-900 fw-bold text-hover-primary fs-6"
                      >
                        ZABBIX
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-light-primary">
                    linux host 2
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                      <span className="text-muted me-2 fs-7 fw-semibold">
                        50%
                      </span>
                    </div>
                    <div className="progress h-6px w-100">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
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

export { DiscoveryTable };
