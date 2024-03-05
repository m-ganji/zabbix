import { useIntl } from "react-intl";
import Badge from "./../../../../layout/components/Badge/index";

const HostTabel = () => {
  const intl = useIntl();

  return (
    <div className={`card mt-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            {intl.formatMessage({ id: "INVENTORY.HOST" })}
          </span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table text-center table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-50px">
                  {intl.formatMessage({ id: "HOST" })}
                </th>
                <th className="min-w-50px">
                  {intl.formatMessage({ id: "GP.NAME" })}
                </th>
                <th className="min-w-50px">
                  {intl.formatMessage({ id: "NAME" })}
                </th>
                <th className="min-w-50px">
                  {intl.formatMessage({ id: "TYPE" })}
                </th>
                <th className="min-w-200px">OS</th>
                <th className="min-w-50px">
                  {intl.formatMessage({ id: "INVENTORY.SERIAL_A" })}
                </th>
                <th className="min-w-50px">
                  {intl.formatMessage({ id: "LABEL" })}
                </th>
                <th className="min-w-50px">
                  {intl.formatMessage({ id: "INVENTORY.MAC_A" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <Badge
                    bg="success"
                    title={intl.formatMessage({ id: "VALUE" })}
                  />
                </td>
                <td>
                  <Badge
                    bg="info"
                    title={intl.formatMessage({ id: "GP.NAME" })}
                  />
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

export { HostTabel };
