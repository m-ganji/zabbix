import React from "react";
import { useIntl } from "react-intl";
import Badge from "../../../../../layout/components/Badge";
import { DiscoveryRullData } from "../../../../../../app/pages/LatestData/Discovery";
import { Loader } from "../../../../../layout/components/loader/Loader";

type data = {
  data?: DiscoveryRullData[];
  isLoaded: boolean;
};

const DataDiscoveryTable: React.FC<data> = ({ data, isLoaded }) => {
  const intl = useIntl();

  // Adjust the type according to your data structure
  const ServiceLabels: { [key: number]: string } = {
    0: "SSH",
    1: "LDAP",
    2: "SMTP",
    3: "FTP",
    4: "HTTP",
    5: "POP",
    6: "NNTP",
    7: "IMAP",
    8: "TCP",
    9: "Zabbix agent",
    10: "SNMPv1 agent",
    11: "SNMPv2 agent",
    12: "ICMP ping",
    13: "SNMPv3 agent",
    14: "HTTPS",
    15: "Telnet",
  };
  const getServiceLabel = (number: number): string => {
    return ServiceLabels[number] || "Unknown";
  };
  return (
    <div className={`card mt-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          {intl.formatMessage({ id: "DATA.DISCOVERY.RULES" })}
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
        <div className="table-responsive text-center">
          {/* begin::Table */}
          {isLoaded ? (
            data?.length === 0 ? (
              <p>مشکلی یافت نشد</p>
            ) : (
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
                      {intl.formatMessage({ id: "NAME" })}
                    </th>
                    <th className="min-w-140px">
                      {intl.formatMessage({ id: "IP" })}
                    </th>
                    <th className="min-w-120px">
                      {intl.formatMessage({ id: "PROXY" })}
                    </th>
                    <th className="min-w-120px">
                      {intl.formatMessage({ id: "INTERVAL" })}
                    </th>
                    <th className="min-w-120px">
                      {intl.formatMessage({ id: "CHECKS" })}
                    </th>
                    <th className="min-w-120px">
                      {intl.formatMessage({ id: "STATUS" })}
                    </th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                {data?.map((value, index) => (
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
                        <Badge bg="primary" title={value.iprange} />
                      </td>
                      <td className="text-center">
                        <Badge bg="warning" title={value.proxy_hostid} />
                      </td>
                      <td className="text-center">
                        <Badge bg="info" title={value.delay} />
                      </td>
                      <td className="text-center">
                        <Badge
                          bg="warning"
                          title={getServiceLabel(value?.dchecks[0]?.type)}
                        />
                      </td>
                      <td className="text-center">
                        {value.status === "1" ? (
                          <Badge bg="danger" title="غیر فعال" />
                        ) : (
                          <Badge bg="success" title="فعال" />
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
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

export { DataDiscoveryTable };
