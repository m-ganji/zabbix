import React from "react";
import { useIntl } from "react-intl";
import { Loader } from "../../../layout/components/loader/Loader";

interface HostGps {
  HostGps: {
    name: string;
    hosts: { name: string }[];
  }[];
  isLoaded: boolean;
}

const HostsGpTable: React.FC<HostGps> = ({ HostGps, isLoaded }) => {
  const intl = useIntl();

  return (
    <div className={`card my-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          {intl.formatMessage({ id: "DATA.HOSTS.GP" })}
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <span className="text-muted mt-1 fw-semibold fs-7">
            تعداد 1 مورد گروه هاست یافت شد
          </span>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive text-center">
          {/* begin::Table */}
          {isLoaded ? (
            HostGps?.length === 0 ? (
              <p>گروه هاستی یافت نشد</p>
            ) : (
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                {/* begin::Table head */}
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="w-25px">
                      <input type="checkbox" />
                    </th>
                    <th className="min-w-150px">
                      {intl.formatMessage({ id: "NAME" })}
                    </th>
                    <th className="min-w-400px">
                      {intl.formatMessage({ id: "MENU.HOSTS" })}
                    </th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {HostGps?.map((gp, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <a
                                href="#"
                                className="text-gray-900 fw-bold text-hover-primary fs-6"
                              >
                                {gp.name}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {gp?.hosts?.map((host, index: number) => {
                              return (
                                <span
                                  key={index}
                                  className="badge badge-light-primary"
                                >
                                  {host.name}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* end::Table body */}
              </table>
            )
          ) : (
            <div className="d-flex pt-7 w-100 justify-content-center">
              <Loader />
            </div>
          )}

          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { HostsGpTable };
