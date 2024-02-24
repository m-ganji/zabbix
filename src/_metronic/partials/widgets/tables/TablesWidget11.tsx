import React from "react";
import { Problem } from "../../../../app/modules/profile/components/Projects";
import moment from "jalali-moment";

interface TablesWidget11Props {
  ProblemsData: Problem[];
  isLoaded: boolean;
  isError: boolean;
  showTags: number;
  tagNameVisible: number;
}

const TablesWidget11: React.FC<TablesWidget11Props> = ({
  ProblemsData,
  isLoaded,
  isError,
  showTags,
  tagNameVisible,
}) => {
  function formatNowTime(seconds: string) {
    const targetDate = new Date(Number(seconds) * 1000);
    const jnow = moment(targetDate).format("jYYYY/jMM/jDD HH:mm:ss");
    return jnow;
  }

  function formatTime(seconds: string) {
    const now = new Date();
    const targetDate = new Date(Number(seconds) * 1000);
    // const s = moment(targetDate).format('jYYYY/jMM/jDD HH:mm:ss');
    let diffMilliseconds = Math.abs(now - targetDate);
    const days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    diffMilliseconds %= 24 * 60 * 60;

    // const hours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    // diffMilliseconds %= 60 * 60;
    // const minutes = Math.floor(diffMilliseconds / (1000 * 60)); ${hours}h ${minutes}m

    return `${days} روز پیش`;
  }

  const severityToColor = {
    5: { title: "بسیار بالا", color: "danger" },
    4: { title: "بالا", color: "red/80" },
    3: { title: "عادی", color: "info" },
    2: { title: "هشدار", color: "warning" },
    1: { title: "اطلاعات", color: "primary" },
    0: { title: "نا معلوم", color: "dark" },
  };

  return (
    <div style={{ boxShadow: "0 0 10px -10px black" }} className={`card my-5`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1 me-0">مشکل ها</span>
        </h3>
        <div className="card-toolbar">
          <span className="text-muted mt-1 fw-semibold fs-7">
            {ProblemsData?.length === 0
              ? `مشکلی یافت نشد`
              : `مجموع ${ProblemsData?.length} عدد مشکل یافت شد.`}
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
            ProblemsData?.length === 0 ? (
              <p>not found</p>
            ) : (
              <table className="table align-middle gs-0 gy-4">
                {/* begin::Table head */}
                <thead>
                  <tr className="fw-bold text-muted bg-light">
                    <th className="ps-4 min-w-125px">تاریخ</th>
                    <th className="text-center min-w-100px">مشکل</th>
                    <th className="text-center min-w-100px">سطح بحران</th>
                    <th className="text-center min-w-50px">بهبودی</th>
                    <th className="text-center min-w-100px">وضعیت</th>
                    <th className="text-center min-w-50px">اطلاعات</th>
                    <th className="text-center min-w-100px">هاست</th>
                    <th className="text-center min-w-100px">مدت زمان</th>
                    <th className="text-center min-w-100px">بروز رسانی</th>
                    <th className="text-center min-w-10px">اقدامات</th>
                    <th className="text-center min-w-200px">برچسب ها</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {ProblemsData?.map((data) => {
                    return (
                      <tr key={data.eventid}>
                        <td className="text-center">
                          <span className="text-muted fw-semibold text-muted d-block fs-7">
                            {formatNowTime(data.clock)}
                          </span>
                        </td>
                        <td className="text-center">
                          <a
                            href="#"
                            className="text-gray-900 text-hover-primary d-block mb-1"
                          >
                            {data.name}
                          </a>
                        </td>
                        <td className="text-center">
                          <span
                            className={`badge badge-light-${
                              severityToColor[data.severity].color
                            } fs-7 fw-semibold`}
                          >
                            {severityToColor[data.severity].title}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-muted fw-semibold text-muted d-block fs-7"></span>
                        </td>
                        <td className="text-center">
                          {data.acknowledged == "1" ? (
                            <span className="badge badge-light-primary fs-7 fw-semibold">
                              بدون مشکل
                            </span>
                          ) : (
                            <span className="badge badge-light-danger fs-7 fw-semibold">
                              مشکل
                            </span>
                          )}
                        </td>
                        <td className="text-center"></td>
                        <td className="text-center">
                          <span className="badge badge-light-warning fs-7 fw-semibold">
                            {data.hosts[0].host}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="badge badge-light fs-8 fw-semibold">
                            {formatTime(data.clock)}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="badge badge-light-primary fs-7 fw-semibold">
                            بروز رسانی
                          </span>
                        </td>
                        <td className="text-center"></td>
                        <td className="text-center">
                          {/* (
                              <NoMaxWidthTooltip
                                placement="right"
                                title={
                                  <div className="flex gap-2">
                                    {data.tags.map((value, index) => (
                                      <p
                                        key={index}
                                        className="bg-lightBlue/30  h-fit flex w-fit p-2 rounded-md"
                                      >
                                        {value.tag + ":" + value.value}
                                      </p>
                                    ))}
                                  </div>
                                }
                              >
                                <span>بیشتر</span>
                              </NoMaxWidthTooltip>
                            ), */}
                          {showTags !== 0 &&
                            (showTags === 3 ? (
                              <div className=" h-40px px-2 overflow-y-scroll ">
                                {data.tags.slice(0, 3).map((value) => (
                                  <p className="badge badge-light-success mx-1 fs-7 fw-semibold">
                                    {tagNameVisible === 0 &&
                                      value.tag + ":" + value.value}
                                    {tagNameVisible === 1 &&
                                      value.tag.slice(
                                        0,
                                        value.tag.length / 2.5
                                      ) +
                                        ":" +
                                        value.value}
                                    {tagNameVisible === 2 && value.value}
                                  </p>
                                ))}
                              </div>
                            ) : showTags === 1 ? (
                              <div className="  px-2 gap-2 ">
                                <p className="badge badge-light-success fs-7 fw-semibold">
                                  {tagNameVisible === 0 &&
                                    data.tags[0].tag + ":" + data.tags[0].value}
                                  {tagNameVisible === 1 &&
                                    data.tags[0].tag.slice(
                                      0,
                                      data.tags[0].tag.length / 2.5
                                    ) +
                                      ":" +
                                      data.tags[0].value}
                                  {tagNameVisible === 2 && data.tags[0].value}
                                </p>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 justify-items-center h-40px px-2 overflow-y-scroll gap-2 ">
                                {data.tags.slice(0, 2).map((value) => (
                                  <p className="badge badge-light-success mx-1 fs-7 fw-semibold">
                                    {tagNameVisible === 0 &&
                                      value.tag + ":" + value.value}
                                    {tagNameVisible === 1 &&
                                      value.tag.slice(
                                        0,
                                        value.tag.length / 2.5
                                      ) +
                                        ":" +
                                        value.value}
                                    {tagNameVisible === 2 && value.value}
                                  </p>
                                ))}
                              </div>
                            ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* end::Table body */}
              </table>
            )
          ) : (
            <div className="pb-6">
              <span
                className="spinner-border
                border-lg
                align-middle ms-2 text-primary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </span>
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

export { TablesWidget11 };
