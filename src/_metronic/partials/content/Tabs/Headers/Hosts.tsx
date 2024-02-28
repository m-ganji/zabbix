import { useEffect, useState } from "react";
import { MultiSelect } from "../../../../layout/components/MultiSelect/MultiSelect";
import { useIntl } from "react-intl";
import { instance } from "../../../../../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostGroup } from "../../../../../hostGroupSlice/hostGroupReducer";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function Hosts({ logData }) {
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormValues>(
    {
      defaultValues: {
        host: "",
      },
    }
  );

  const intl = useIntl();
  const [templates, setTemplates] = useState<object>();
  const dispatch = useDispatch();

  const hostGroupData = useSelector((state) => state.hostGroup);

  useEffect(() => {
    dispatch(fetchHostGroup({}));
  }, [dispatch]);

  useEffect(() => {
    const handleGetTemplates = async () => {
      try {
        const response = await instance.post("/core/templates/get", {});
        const mapped = response.data.map((e) => ({ label: e.name }));
        setTemplates(mapped);
        // const labels = response.data.map((template) => template.name);
        console.log(response.data);
      } catch (error) {
        console.error(error);
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

            <input
              type="text"
              className="form-control rounded-start-2 rounded-end-0"
              placeholder="نام هاست"
              aria-label="نام هاست"
              aria-describedby="tab-hosts"
              required
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
              placeholder="نام نمایشی"
              aria-label="نام نمایشی"
              aria-describedby="tab-hosts"
              autoComplete="off"
              onChange={() => setValue("name", field.value)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col w-50">
            <MultiSelect
              title="MENU.SELECT.HOSTS.GP"
              options={hostGroupData.data}
              Loading={false}
              addAll={false}
            />
          </div>
          <div className="col">
            <MultiSelect
              title="MENU.SELECT.TEMPLATES"
              options={templates}
              Loading={false}
              addAll={false}
            />
          </div>
        </div>
        <div className="row mt-3 position-relative" style={{ zIndex: 0 }}>
          <div className="col">
            <div dir="rtl" className="form-floating">
              <textarea
                className="form-control"
                placeholder="توضیحات را اینجا وارد کنید"
                id="floatingTextarea2"
                style={{ height: 100 }}
              />
              <label htmlFor="floatingTextarea2">توضیحات</label>
            </div>
            <div className="d-flex justify-content-start mt-5">
              <input type="checkbox" />
              <span className="me-2">
                {intl.formatMessage({
                  id: "MONITORING.HOSTS.CREATEHOST.HOST.ACTIVE",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
