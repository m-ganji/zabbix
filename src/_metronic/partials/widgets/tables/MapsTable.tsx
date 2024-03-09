import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { instance } from "../../../../services/axiosInstance";
import Badge from "../../../layout/components/Badge";

const MapsTable: React.FC = () => {
  const intl = useIntl();

  const [mapsData, setMapsData] = useState<any>(); // Adjust the type according to your data structure

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.post("/core/maps/get", {});
        setMapsData(response.data);
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    }
    fetchData();
  }, []);
  console.log(mapsData);
  return (
    <div className={`card mt-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          {intl.formatMessage({ id: "MONITORING.MAPS" })}
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <span className="text-muted mt-1 fw-semibold fs-7">
            تعداد 1 مورد نقشه یافت شد
          </span>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table text-center  table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted text-center ">
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".widget-9-check"
                    />
                  </div>
                </th>
                <th className=" text-end">
                  {intl.formatMessage({ id: "MONITORING.DISCOVERY.DEVICE" })}
                </th>
                <th className="min-w-140px">
                  {intl.formatMessage({ id: "WIDTH" })}
                </th>
                <th className="min-w-120px">
                  {intl.formatMessage({ id: "HEIGHT" })}
                </th>
                <th className="min-w-120px">
                  {intl.formatMessage({ id: "MENU.ACTIONS" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            {mapsData &&
              mapsData.map((value, index) => (
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input type="checkbox" value="1" />
                      </div>
                    </td>
                    <td className="text-end">
                      <Badge bg="success" title={value.name} />
                    </td>
                    <td className="text-center">
                      <Badge bg="warning" title={value.width} />
                    </td>
                    <td className="text-center">
                      <Badge bg="warning" title={value.width} />
                    </td>
                    <td id="create-map">
                      <a href="#">ویژگی‌ها</a>
                    </td>
                  </tr>
                </tbody>
              ))}

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

export { MapsTable };
