import React from "react";
import { KTIcon } from "../../../helpers";
import { Loader } from "../../../layout/components/loader/Loader";
import { Link } from "react-router-dom";

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
  problems: any[];
  graphs?: any[];
  dashboards?: any[];
}

interface TableHostsProps {
  data: Host[];
  isLoaded: boolean;
}

const TableHosts: React.FC<TableHostsProps> = ({ data, isLoaded }) => {
  return (
    <div style={{ boxShadow: "0 0 10px -10px black" }} className={`card mt-5`}>
      {isLoaded && (
        <div className="d-flex pt-7 w-100 justify-content-center">
          <Loader />
        </div>
      )}

      {data.length === 0 && !isLoaded && (
        <span className="card-label fw-bold fs-3 mb-1 me-0 d-flex justify-content-center mt-5 ">
          هاستی یافت نشد
        </span>
      )}

      {data.length !== 0 && (
        <>
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1 me-0">هاست ها</span>
              <span className="text-muted mt-1 fw-semibold fs-7">
                مجموع {data.length} عدد هاست
              </span>
            </h3>
          </div>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bold text-muted bg-light">
                    <th className="text-center min-w-100px">نام</th>
                    <th className="text-center min-w-100px">رابط</th>
                    <th className="text-center min-w-100px">دسترسی</th>
                    <th className="text-center min-w-150px">برچسب ها</th>
                    <th className="text-center min-w-100px">وضعیت</th>
                    <th className="text-center min-w-125px">آخرین داده ها</th>
                    <th className="text-center min-w-150px">مشکلات</th>
                    <th className="text-center min-w-100px">نمودارها</th>
                    <th className="text-center min-w-100px">داشبوردها</th>
                    <th className="text-center min-w-150px">وب</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id || Math.random()}>
                      <td className="text-center">
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {item.name}
                        </span>
                      </td>
                      <td className="text-center">
                        <a
                          href={item.link}
                          className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                        >
                          {item.interfaces?.map((i, interfaceIndex) => (
                            <p key={interfaceIndex}>
                              {i.port} : {i.ip}
                            </p>
                          ))}
                        </a>
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
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {item.tags?.map((value, tagIndex) => (
                            <p key={tagIndex}>
                              {value.tag} : {value.value}
                            </p>
                          ))}
                        </span>
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge badge-light-${
                            item.statusColor || "primary"
                          } fs-7 fw-semibold`}
                        >
                          {item.status === 0 ? <>✅</> : <>❌</>}
                        </span>
                      </td>
                      <td className="text-center">آخرین دیتا</td>
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
                          item.graphs.length
                        ) : (
                          <span className="text-gray-400">بدون گراف</span>
                        )}
                      </td>
                      <td className="text-center">
                        {item.dashboards?.length > 0 ? (
                          item.dashboards?.length
                        ) : (
                          <span className="text-gray-400">بدون داشبورد</span>
                        )}
                      </td>
                      <td className="text-center">وب</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { TableHosts };
