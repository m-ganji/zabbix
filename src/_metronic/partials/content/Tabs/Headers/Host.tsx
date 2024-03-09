import { useEffect, useState } from "react";
import { MultiSelect } from "../../../../layout/components/MultiSelect/MultiSelect";
import { useIntl } from "react-intl";
import { instance } from "../../../../../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ToastFire from "../../../../layout/components/Toast";
import {
  selectApiData,
  selectApiError,
  selectApiLoading,
} from "../../../../../store/store";
import { fetchHostGroup } from "../../../../../hostGroupSlice/hostGroupReducer";
interface HostProps {
  control: object;
  watch: () => void;
  setValue: object;
}

interface ApiError {
  response?: {
    status: number;
  };
}

const Host: React.FC<HostProps> = ({ control, watch, setValue }) => {
  const intl = useIntl();
  const [templates, setTemplates] = useState<object>();
  const [resetMultiSelect, setResetMultiSelect] = useState(false);
  const currentGroupids = watch("groupids") ? watch("groupids") : [];
  const currentTemplate = watch("template") ? watch("template") : [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HostGroupData = useSelector(selectApiData);
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);

  useEffect(() => {
    // dispatch(fetchHostGroup({}));
    dispatch(fetchHostGroup({}));
  }, [dispatch]);

  console.log(HostGroupData, loading, error);
  useEffect(() => {
    const handleGetTemplates = async () => {
      try {
        const response = await instance.post("/core/templates/get", {});
        const mapped = response.data.map((e) => ({ label: e.name }));
        setTemplates(mapped);
      } catch (error) {
        if ((error as ApiError).response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          ToastFire("error", `توکن منقضی شده است`, "لطفا مجدد وارد شوید");
        }
        throw error;
      }
    };

    handleGetTemplates();
  }, []);

  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="input-group mb-3 col">
            <span
              className="input-group-text rounded-start-0 rounded-end-2"
              id="tab-hosts"
            >
              <i className="bi bi-hdd-network" />
            </span>

            <Controller
              name={`host`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control rounded-start-2 rounded-end-0"
                  placeholder="نام هاست"
                  aria-label="نام هاست"
                  aria-describedby="tab-hosts"
                  required
                />
              )}
            />
          </div>
          <div className="input-group mb-3 col">
            <span
              className="input-group-text rounded-start-0 rounded-end-2"
              id="tab-hosts"
            >
              <i className="bi bi-bullseye" />
            </span>
            <input
              type="text"
              className="form-control rounded-start-2 rounded-end-0"
              aria-label="نام نمایشی"
              aria-describedby="tab-hosts"
              autoComplete="off"
              placeholder={
                watch("host") === ""
                  ? "نام نمایشی"
                  : `نام نمایشی : ${watch("host")}`
              }
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col w-50">
            <MultiSelect
              title="MENU.SELECT.HOSTS.GP"
              reset={resetMultiSelect}
              addAll={false}
              options={HostGroupData}
              Loading={loading}
              DataName="groups"
              setData={setValue}
              currentData={currentGroupids}
            />
          </div>
          <div className="col">
            <MultiSelect
              title="MENU.SELECT.TEMPLATES"
              reset={resetMultiSelect}
              addAll={false}
              options={templates}
              // Loading={
              //   hostGroupData &&
              //   hostGroupData.meta &&
              //   hostGroupData.meta.requestStatus !== "fulfilled"
              // }
              DataName="template"
              setData={setValue}
              currentData={currentTemplate}
            />
          </div>
        </div>
        <div className="row mt-3 position-relative" style={{ zIndex: 0 }}>
          <div className="col">
            <div dir="rtl" className="form-floating">
              <Controller
                name={`description`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    title="توضیحات را اینجا وارد کنید"
                    id="floatingTextarea2"
                    style={{ height: 100 }}
                  />
                )}
              />
            </div>
            <div className="d-flex justify-content-start mt-5">
              <input type="checkbox" />
              <span className="me-2">
                {intl.formatMessage({
                  id: "ACTIVE",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
