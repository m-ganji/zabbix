import { KTIcon } from "../../../helpers";

const TableHosts = ({ data }) => {
  return (
    <div style={{ boxShadow: "0 0 10px -10px black" }} className={`card mt-5`}>
      {/* begin::Header */}
      {data.length == 0 && (
        <span className="card-label fw-bold fs-3 mb-1 me-0 d-flex justify-content-center mt-5 ">
          هاستی یافت نشد
        </span>
      )}
      <div className="card-header border-0 pt-5">
        {data.length !== 0 && (
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1 me-0">هاست ها</span>
            <span className="text-muted mt-1 fw-semibold fs-7">
              مجموع {data.length} عدد هاست
            </span>
          </h3>
        )}

        {data.length !== 0 && (
          <div className="card-toolbar">
            <a
              href="#"
              id="kt_activities_toggle"
              className="btn btn-sm btn-light-primary"
            >
              ساخت هاست
              <KTIcon iconName="plus" className="fs-2" />
            </a>
          </div>
        )}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      {data.length !== 0 && (
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table align-middle gs-0 gy-4">
              {/* begin::Table head */}
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
              {/* end::Table head */}
              {/* begin::Table body */}
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
                        {item.inventory_mode == 1 ? (
                          <i className="bi bi-circle-fill text-danger"></i>
                        ) : (
                          item.inventory_mode == 0 && (
                            <i className="bi bi-circle-fill text-success"></i>
                          )
                        )}
                        {item.inventory_mode == -1 && (
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
                      <span
                        className={`badge badge-light-${
                          item.issuesColor || "primary"
                        } fs-7 fw-semibold`}
                      >
                        {item?.problems[0] ? (
                              "1"
                            ) : (
                              <span className="text-gray-400">بدون مشکل</span>
                            )}

                      </span>
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
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
      )}
      {/* begin::Body */}
    </div>
  );
};

export { TableHosts };
