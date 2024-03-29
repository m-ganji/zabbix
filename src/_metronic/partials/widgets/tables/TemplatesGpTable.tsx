import { useIntl } from "react-intl";

const TemplatesGpTable = () => {
  const intl = useIntl();

  return (
    <div className={`card mt-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          {intl.formatMessage({ id: "DATA.TEMPLATE.GP" })}
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <span className="text-muted mt-1 fw-semibold fs-7">
            تعداد 1 مورد گروه قالب یافت شد
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
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".widget-9-check"
                    />
                  </div>
                </th>
                <th className="min-w-150px">
                  {intl.formatMessage({ id: "NAME" })}
                </th>
                <th className="min-w-400px">
                  {intl.formatMessage({ id: "DATA.TEMPLATE" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      className="form-check-input widget-9-check"
                      type="checkbox"
                      value="1"
                    />
                  </div>
                </td>
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

export { TemplatesGpTable };
