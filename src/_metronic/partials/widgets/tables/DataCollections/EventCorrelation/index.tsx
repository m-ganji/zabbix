import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { instance } from "../../../../../../services/axiosInstance";
import Badge from "../../../../../layout/components/Badge";
import { KTIcon } from "../../../../../helpers";

interface Map {
  name: string;
  status: number;
}

const EventCorrelationTabel: React.FC = () => {
  const intl = useIntl();

  const [mapsData, setMapsData] = useState<Map[]>([]); // Adjust the type according to your data structure

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
          {intl.formatMessage({ id: "DATA.CORRECTION" })}
        </h3>
        <div className="card-toolbar">
          <span className="text-muted mt-1 fw-semibold fs-7">
            {intl.formatMessage(
              { id: "REPORT.FIND" },
              {
                COUNT: 1,
                LABEL: intl.formatMessage({ id: "MONITORING.DISCOVERY" }),
              }
            )}
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
                <th className="min-w-150px text-end">
                  {intl.formatMessage({ id: "NAME" })}
                </th>
                <th className="min-w-150px">
                  {intl.formatMessage({ id: "CONDITIONS" })}
                </th>
                <th className="min-w-150px">
                  {intl.formatMessage({ id: "ACTION" })}
                </th>
                <th className="min-w-150px">
                  {intl.formatMessage({ id: "STATUS" })}
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            {mapsData?.map((value, index) => (
              <tbody key={index}>
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
                    <Badge bg="primary" title="Active" />
                  </td>
                  <td className="text-center">
                    {/* <Badge bg="warning" title={value.height} /> */}
                  </td>
                  <td className="text-center">
                    {value.status == 0 ? (
                      <KTIcon iconName="check" className="fs-1 text-success" />
                    ) : (
                      <KTIcon iconName="cross" className="fs-1 text-danger" />
                    )}
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

export { EventCorrelationTabel };
