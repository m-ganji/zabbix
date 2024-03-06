// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FC, useEffect, useState } from "react";
import { MultiSelect } from "../../../layout/components/MultiSelect/MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostGroup } from "../../../../hostGroupSlice/hostGroupReducer";
import { instance } from "../../../../services/axiosInstance";
import { useIntl } from "react-intl";
import Tags from "./Headers/Tags";
import IPMI from "./Headers/IPMI";
import Host from "./Headers/Host";
import Macros from "./Headers/Macros";
import Inventory from "./Headers/Inventory";
import Encryption from "./Headers/Encryption";
import Setvalue from "./Headers/Setvalue";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ToastFire from "../../../layout/components/Toast";
interface ApiError {
  response?: {
    status: number;
  };
}

const CreateHost: FC = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset, watch, setValue } = useForm<FormValues>(
    {
      defaultValues: {
        host: "",
      },
    }
  );

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await instance.post("/core/hosts/create", data);
      console.log(response);
    } catch (error) {
      if ((error as ApiError).response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        ToastFire("error", `توکن منقضی شده است`, "لطفا مجدد وارد شوید");
      }
      console.error("Error occurred:", error);
    }
  };

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
                href="#tab-Encryption"
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
            <Host control={control} watch={watch} setValue={setValue} />
          </div>
          <div className="tab-pane container" id="tab-ipmi">
            <IPMI control={control} watch={watch} setValue={setValue} />
          </div>
          <div className="tab-pane" id="tab-tags">
            <Tags control={control} watch={watch} />
          </div>
          <div className="tab-pane" id="tab-macro">
            <Macros control={control} watch={watch} setValue={setValue} />
          </div>
          <div className="tab-pane" id="tab-inventory">
            <Inventory control={control} watch={watch} />
          </div>
          <div className="tab-pane" id="tab-Encryption">
            <Encryption control={control} watch={watch} />
          </div>
          <div className="tab-pane" id="tab-set-value">
            <Setvalue control={control} watch={watch} />
          </div>
        </div>
        <div className="position-absolute bottom-0 left-0 d-flex gap-3 mb-3 ">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="btn btn-light-success"
          >
            اضافه کردن
          </button>

          <button
            type="button"
            // onClick={resetData}
            className="btn btn-light-danger"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export { CreateHost };
