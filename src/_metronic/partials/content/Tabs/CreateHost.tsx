import { FC } from "react";
import { instance } from "../../../../services/axiosInstance";
import Tags from "./Headers/Tags";
import IPMI from "./Headers/IPMI";
import Host, { ApiError } from "./Headers/Host";
import Macros from "./Headers/Macros";
import Inventory from "./Headers/Inventory";
import Encryption from "./Headers/Encryption";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ToastFire from "../../../layout/components/Toast";
import SwalFire from "../../../layout/components/SW_Modal";

interface FormValues {
  host?: string;
  groups?: [];
  macros?: [];
  tags?: { tag: string; value: string }[];
}

const CreateHost: FC = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, watch, setValue, register, unregister } =
    useForm<FormValues>({
      defaultValues: {
        host: "",
      },
    });

  function include(error: ApiError, params: string) {
    return error.response?.data?.detail?.includes(params);
  }

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    const isNameTyped = watch("host") != "";
    const isHostGroupSelected = watch("groups") === undefined;

    if (isNameTyped && !isHostGroupSelected) {
      try {
        const response = await instance.post("/core/hosts/create", data);
        console.log(response);
        ToastFire("success", "موفق", "هاست با موفقیت اضافه شد");
      } catch (error) {
        console.error(error);
        console.error(error);
        if ((error as ApiError).response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          ToastFire("error", `توکن منقضی شده است`, "لطفا مجدد وارد شوید");
        }
        if (include(error as ApiError, "cannot be without host group")) {
          SwalFire("error", "خطا", "ss", true, false, "بستن");
        } else if (include(error as ApiError, "Host with the same name ")) {
          SwalFire(
            "error",
            "خطا",
            "هاست با این نام از قبل وجود دارد",
            true,
            false,
            "بستن"
          );
          SwalFire(
            "error",
            "خطا",
            "هاست با این نام از قبل وجود دارد",
            true,
            false,
            "بستن"
          );
        }
      }
    } else {
      SwalFire(
        "error",
        "خطا",
        "مواردی که با ستاره* علامت گذاری شده اند نمی توانند خالی باشند",
        true,
        false,
        "بستن"
      );
    }
  };

  const submit = () => {
    watch("groups")?.length === 0 && unregister("groups");
    watch("macros")?.length === 0 && unregister("macros");
    const isTagEmpty = watch("tags")?.every(
      (item) => item.tag === "" && item.value === ""
    );
    isTagEmpty && unregister("tags");

    handleSubmit(onSubmit)();
  };

  return (
    <>
      <div className="card-body p-0">
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
            </ul>
          </div>
        </div>
        <div
          style={{ maxHeight: "595px" }}
          className={`card-body h-100 overflow-y-scroll py-0`}
        >
          <div className="tab-content">
            <div className="tab-pane active show" id="tab-hosts">
              <Host
                control={control}
                watch={watch}
                setValue={setValue}
                register={register}
              />
            </div>
            <div className="tab-pane container" id="tab-ipmi">
              <IPMI
                control={control}
                watch={watch}
                setValue={setValue}
                register={register}
              />
            </div>
            <div className="tab-pane" id="tab-tags">
              <Tags control={control} watch={watch} register={register} />
            </div>
            <div className="tab-pane" id="tab-macro">
              <Macros control={control} watch={watch} setValue={setValue} />
            </div>
            <div className="tab-pane" id="tab-inventory">
              <Inventory watch={watch} setValue={setValue} />
            </div>
            <div className="tab-pane" id="tab-Encryption">
              <Encryption control={control} watch={watch} register={register} />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex card-footer justify-content-center p-5 gap-3">
        <button
          type="button"
          onClick={submit}
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
    </>
  );
};

export { CreateHost };
