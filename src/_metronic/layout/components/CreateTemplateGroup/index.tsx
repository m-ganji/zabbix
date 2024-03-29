import React from "react";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import BTN from "../BTN";
import Input from "../Input";

interface CreateMapProps {}

export const CreateTemplateGroup: React.FC<CreateMapProps> = () => {
  const intl = useIntl();

  return (
    <div
      id="create_templategp"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="create_template"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '600px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#create_template_gp"
      data-kt-drawer-close="#create_template_gp_close"
      dir="rtl"
    >
      <div className="card shadow-none rounded-0 w-100 ">
        <div className="card-header" id="create_template_header">
          <h3 className="card-title fw-bolder text-gray-900">
            {intl.formatMessage({ id: "DATA.TEMPLATE.GP.NEW" })}
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary me-n5"
              id="create_template_gp_close"
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
                    className=""
                    iconName="user"
                    placeholder={intl.formatMessage({ id: "NAME" })}
                    value=""
                  />
                </div>
                <div className="d-flex w-100 justify-content-center mt-5 column-gap-5">
                  <BTN
                    label={intl.formatMessage({ id: "ADD" })}
                    className="btn-light-success"
                    // onClick={submit}
                  />
                  <BTN
                    label={intl.formatMessage({ id: "CANCEL" })}
                    className="btn-light-danger"
                    id="create_template_gp_close"
                    // onClick={resetData}
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
