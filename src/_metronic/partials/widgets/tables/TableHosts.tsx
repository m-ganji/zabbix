import React from "react";
import { KTIcon } from "../../../helpers";
import { Loader } from "../../../layout/components/loader/Loader";
import { Link } from "react-router-dom";
import Badge from "./../../../layout/components/Badge/index";
import { useIntl } from "react-intl";

interface Host {
  id: string;
  name: string;
  link: string;
  interfaces?: { port: string; ip: string }[];
  inventory_mode: number;
  tags?: { tag: string; value: string }[];
  status: number;
  statusColor?: string;
  issuesColor?: string;
  problems: [[]];
  graphs: [];
  dashboards: [];
  hostid: string;
  host: string;
}

interface TableHostsProps {
  data: Host[];
  isLoaded: boolean;
  isError: boolean;
}

const TableHosts: React.FC<TableHostsProps> = ({ data, isLoaded, isError }) => {
  const intl = useIntl();
  isError && console.log(isError);

  return (
    <div style={{ boxShadow: "0 0 10px -10px black" }} className={`card my-5`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1 me-0">هاست ها</span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <span className="text-muted mt-1 fw-semibold fs-7">
            {!isLoaded &&
              (data.length === 0 ? (
                <p>هاستی یافت نشد</p>
              ) : (
                intl.formatMessage(
                  { id: "REPORT.FIND" },
                  {
                    COUNT: data.length,
                    LABEL: intl.formatMessage({ id: "HOST" }),
                  }
                )
              ))}
          </span>
        </div>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive text-center">
          {!isLoaded ? (
            data.length === 0 ? (
              <p>هاستی یافت نشد</p>
            ) : (
              <>
                <table className="table align-middle gs-0 gy-4">
                  <thead>
                    <tr className="fw-bold text-muted bg-light">
                      <th className="text-center min-w-100px">نام</th>
                      <th className="text-center min-w-150px">رابط</th>
                      <th className="text-center min-w-100px">دسترسی</th>
                      <th className="text-center min-w-120px">برچسب ها</th>
                      <th className="text-center min-w-50px">وضعیت</th>
                      <th className="text-center min-w-125px">آخرین داده ها</th>
                      <th className="text-center min-w-150px">مشکلات</th>
                      <th className="text-center min-w-100px">نمودارها</th>
                      <th className="text-center min-w-100px">داشبوردها</th>
                      <th className="text-center min-w-50px">وب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            <Badge title={item.name} bg="success" />
                          </td>
                          <td className="text-center">
                            {item.interfaces?.map((i, index) => (
                              <Badge
                                title={`${i.ip + " : " + i.port}`}
                                bg="primary"
                                key={index}
                              />
                            ))}
                          </td>
                          <td className="text-center">
                            <span className="text-muted fw-semibold text-muted d-block fs-7">
                              {item.inventory_mode === 1 ? (
                                <i className="bi bi-circle-fill text-danger"></i>
                              ) : (
                                item.inventory_mode === 0 && (
                                  <i className="bi bi-circle-fill text-success"></i>
                                )
                              )}
                              {item.inventory_mode === -1 && (
                                <i className="bi bi-circle-fill"></i>
                              )}
                            </span>
                          </td>
                          <td className="text-center">
                            <div className="d-flex flex-column gap-2">
                              {item.tags?.map((value, index) => (
                                <div
                                  className="d-flex justify-content-center"
                                  key={index}
                                >
                                  <Badge
                                    title={`${value.tag + " : " + value.value}`}
                                    bg="info"
                                    key={index}
                                  />
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="text-center">
                            {item.status == 0 ? (
                              <KTIcon
                                iconName="check"
                                className="fs-1 text-success"
                              />
                            ) : (
                              <KTIcon
                                iconName="cross"
                                className="fs-1 text-danger"
                              />
                            )}
                          </td>
                          <td className="text-center">
                            <a href="">آخرین دیتا</a>
                          </td>
                          <td className="text-center">
                            {item?.problems[0] ? (
                              <Link
                                to={`/Monitoring/Problems/${item?.hostid}/${item?.host}`}
                                className={`badge badge-light-${
                                  item.issuesColor || "primary"
                                } fs-7 fw-semibold`}
                              >
                                {item?.problems.length}
                              </Link>
                            ) : (
                              <span className="text-gray-400">بدون مشکل</span>
                            )}
                          </td>
                          <td className="text-center">
                            {item.graphs?.length > 0 ? (
                              <Badge title={item.graphs.length} bg="primary" />
                            ) : (
                              <span className="text-gray-400">بدون گراف</span>
                            )}
                          </td>
                          <td className="text-center">
                            {item.dashboards?.length > 0 ? (
                              <Badge
                                title={item.dashboards?.length}
                                bg="primary"
                              />
                            ) : (
                              <span className="text-gray-400">
                                بدون داشبورد
                              </span>
                            )}
                          </td>
                          <td className="text-center">
                            <span className="text-gray-400">وب</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
            )
          ) : (
            <div className="d-flex pt-7 w-100 justify-content-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { TableHosts };
