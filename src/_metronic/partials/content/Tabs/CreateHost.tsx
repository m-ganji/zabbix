import { FC, useEffect, useState } from "react";
import { MultiSelect } from "../../../layout/components/multiple-select/MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostGroup } from "../../../../hostGroupSlice/hostGroupReducer";
import { instance } from "../../../../services/axiosInstance";
import { useIntl } from "react-intl";
import Tags from "./Headers/Tags";
import IPMI from "./Headers/IPMI";
import Hosts from "./Headers/Hosts";
import Macros from "./Headers/Macros";
import Inventory from "./Headers/Inventory";
import Encription from "./Headers/Encription";
import Setvalue from "./Headers/Setvalue";

const CreateHost: FC = () => {
  return (
    <div dir="rtl">
      <div className="card-header border-0 pt-5 w-100 ">
        <div className="card-toolbar">
          <ul className="nav">
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
                data-bs-toggle="tab"
                href="#tab-hosts"
              >
                هاست
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4 me-1"
                data-bs-toggle="tab"
                href="#tab-ipmi"
              >
                IPMI
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-tags"
              >
                تگ ها
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-macro"
              >
                ماکرو ها
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-inventory"
              >
                فهرست
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-encription"
              >
                رمز گذاری
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-set-value"
              >
                تعیین مقدار
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="tab-content">
          <div className="tab-pane active show" id="tab-hosts">
            <Hosts />
          </div>
          <div className="tab-pane container" id="tab-ipmi">
            <IPMI />
          </div>
          <div className="tab-pane" id="tab-tags">
            <Tags />
          </div>
          <div className="tab-pane" id="tab-macro">
            <Macros />
          </div>
          <div className="tab-pane" id="tab-inventory">
            <Inventory />
          </div>
          <div className="tab-pane" id="tab-encription">
            <Encription />
          </div>
          <div className="tab-pane" id="tab-set-value">
            <Setvalue />
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateHost };
