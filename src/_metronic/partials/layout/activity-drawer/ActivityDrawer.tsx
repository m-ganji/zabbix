import { FC } from "react";
import { Link } from "react-router-dom";
import { KTIcon } from "../../../helpers";
import { CreateHost } from "../../content/Tabs/CreateHost";

const ActivityDrawer: FC = () => (
  <div
    id="kt_activities"
    className="bg-body"
    data-kt-drawer="true"
    data-kt-drawer-name="activities"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'300px', 'lg': '900px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_activities_toggle"
    data-kt-drawer-close="#kt_activities_close"
    dir="rtl"
  >
    <div className="card shadow-none rounded-0 w-100 ">
      <div className="card-header" id="kt_activities_header">
        <h3 className="card-title fw-bolder text-gray-900">ساخت هاست</h3>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn btn-sm btn-icon btn-active-light-primary me-n5"
            id="kt_activities_close"
          >
            <KTIcon iconName="cross" className="fs-1" />
          </button>
        </div>
      </div>
      <CreateHost />
    </div>
  </div>
);

export { ActivityDrawer };
