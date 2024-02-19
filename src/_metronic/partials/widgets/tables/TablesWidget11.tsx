import React from "react";
import { KTIcon } from "../../../helpers";

type Props = {
  className: string;
};

const TablesWidget11: React.FC<Props> = ({ className }) => {
  return (
    <div
      style={{ boxShadow: "0 0 10px -10px black" }}
      className={`card ${className}`}
    >
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1 me-0">هاست ها</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            مجموع 1 عدد هاست
          </span>
        </h3>
        <div className="card-toolbar">
          <a href="#" id="kt_activities_toggle" className="btn btn-sm btn-light-primary">
            ساخت هاست
            <KTIcon iconName="plus" className="fs-2" />
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-125px">نام</th>
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
              <tr>
                <td className="text-center">
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    هاست 22
                  </span>
                </td>
                <td className="text-center">
                  <a
                    href="#"
                    className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                  >
                    -
                  </a>
                </td>
                <td className="text-center">
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Rejected
                  </span>
                </td>
                <td className="text-center">
                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                    Insurance
                  </span>
                </td>
                <td className="text-center">
                  <span className="badge badge-light-primary fs-7 fw-semibold">
                    Approved
                  </span>
                </td>
                <td className="text-center">
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="switch" className="fs-3" />
                  </a>
                </td>
                <td className="text-center">
                  <span className="badge badge-light-primary fs-7 fw-semibold">
                    Approved
                  </span>
                </td>
                <td className="text-center">
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="switch" className="fs-3" />
                  </a>
                </td>
                <td className="text-center">
                  <span className="badge badge-light-primary fs-7 fw-semibold">
                    Approved
                  </span>
                </td>
                <td className="text-center">
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon iconName="switch" className="fs-3" />
                  </a>
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

export { TablesWidget11 };
