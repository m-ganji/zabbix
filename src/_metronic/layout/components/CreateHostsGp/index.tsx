import React, { useState } from "react";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import BTN from "../BTN";
import Input from "../Input";
import { instance } from "../../../../services/axiosInstance";
import { ApiError } from "../../../partials/content/Tabs/Headers/Host";
import { useNavigate } from "react-router-dom";
import ToastFire from "../Toast";
import SwalFire from "../SW_Modal";

interface CreateMapProps {}

export const CreateHostsGp: React.FC<CreateMapProps> = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [Name, setName] = useState("");

  async function fetchData() {
    try {
      const response = await instance.post("/core/hostgroup/create", {
        name: Name,
      });
      ToastFire("success", "موفق", "گروه هاست اضافه شد");
      console.log(response);
    } catch (error) {
      if ((error as ApiError).response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      } else if (
        (error as ApiError).response?.data?.detail?.includes(
          `unexpected parameter "Name"`
        )
      ) {
        SwalFire(
          "error",
          "خطا",
          "مقدار نادرست برای فیلد نام",
          true,
          false,
          "بستن"
        );
      }
      console.error(error);
    }
  }

  return (
    <div
      id="create_host-gp"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="create_host-gp"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '600px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#create_host_gp"
      data-kt-drawer-close="#create_host_gp_close"
      dir="rtl"
    >
      <div className="card shadow-none rounded-0 w-100 ">
        <div className="card-header" id="create_host_header">
          <h3 className="card-title fw-bolder text-gray-900">
            {intl.formatMessage({ id: "DATA.HOSTS.GP.NEW" })}
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary me-n5"
              id="create_host_gp_close"
            >
              <KTIcon iconName="cross" className="fs-1" />
            </button>
          </div>
        </div>

        <>
          <div className="card shadow-none rounded-0 w-100 ">
            <div dir="rtl">
              <div className="card-body pt-0">
                <div className="mt-5">
                  <h5 className="text-end mb-4">
                    {intl.formatMessage({ id: "GP.NAME" })}
                  </h5>
                  <Input
                    value={Name}
                    iconName="user"
                    placeholder={intl.formatMessage({ id: "NAME" })}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </div>
                <div className="d-flex w-100 justify-content-center mt-5 column-gap-5">
                  <BTN
                    label={intl.formatMessage({ id: "ADD" })}
                    className="btn-light-success"
                    onClick={fetchData}
                  />
                  <BTN
                    label={intl.formatMessage({ id: "CANCEL" })}
                    className="btn-light-danger"
                    id="create_host_gp_close"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
