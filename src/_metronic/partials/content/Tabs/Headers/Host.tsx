import { useEffect, useState } from "react";
import { MultiSelect } from "../../../../layout/components/MultiSelect/MultiSelect";
import { useIntl } from "react-intl";
import { instance } from "../../../../../services/axiosInstance";
import { useSelector } from "react-redux";
import { Control, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ToastFire from "../../../../layout/components/Toast";
import { selectApiData, selectApiLoading } from "../../../../../store/store";
import ToggleBtns from "../../../../layout/components/ToggleBtn/ToggleBtn";

interface HostProps {
  control: Control;
  watch: CallableFunction;
  register: CallableFunction;
  setValue: CallableFunction;
}

export interface ApiError {
  response?: {
    status: number;
    data?: {
      detail?: {
        data: string;
        includes: (e: string) => boolean;
      };
    };
  };
}

const Host: React.FC<HostProps> = ({ control, watch, setValue, register }) => {
  const intl = useIntl();
  const [templates, setTemplates] = useState<[]>([]);
  const currentGroupids = watch("groupids") ? watch("groupids") : [];
  const currentTemplate = watch("template") ? watch("template") : [];

  const navigate = useNavigate();

  const HostGroupData = useSelector(selectApiData);
  const loading = useSelector(selectApiLoading);
  // const error = useSelector(selectApiError);

  // useEffect(() => {
  //   // dispatch(fetchHostGroup({}));
  //   dispatch(fetchHostGroup({}));
  // }, [dispatch]);

  useEffect(() => {
    const handleGetTemplates = async () => {
      try {
        const response = await instance.post("/core/templates/get", {});
        const mapped = response.data.map((e: { name: string }) => ({
          label: e.name,
          value:e.templateid
        }));
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
  }, [navigate]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "interface",
  });

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
              {...register("host")}
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
              reset={false}
              addAll={false}
              options={HostGroupData?.map((gp) => ({
                value: gp.groupid,
                label: gp.name,
              }))}
              Loading={loading}
              DataName="groups"
              setData={setValue}
              currentData={currentGroupids}
            />
          </div>
          <div className="col">
            <MultiSelect
              title="MENU.SELECT.TEMPLATES"
              reset={false}
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
              Loading={false}
            />
          </div>
        </div>
        {fields.map((value, index) => (
          <div className="d-flex mt-3" key={index}>
            <input
              {...register(`interface[${index}].ip`)}
              type="text"
              className="form-control rounded-start-2 rounded-end-0"
              placeholder={intl.formatMessage({
                id: "IP",
              })}
              aria-label="آی‌پی"
              aria-describedby="tab-hosts"
              required
            />
            <input
              {...register(`interface[${index}].dns`)}
              type="text"
              className="form-control rounded-start-2 rounded-end-0 me-2"
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.DNS",
              })}
              aria-label="دی‌ان‌اس"
              aria-describedby="tab-hosts"
              required
            />
            <div className="mt-2 me-0 ms-2">
              <ToggleBtns
                options={[
                  {
                    value: 0,
                    label: "MONITORING.HOSTS.DNS",
                  },
                  {
                    value: 1,
                    label: "IP",
                  },
                ]}
                data={`interface.${index}.useip`}
                setData={setValue}
                initialData={watch(`interface.${index}.useip`)}
              />
            </div>
            <input
              {...register(`interface[${index}].port`)}
              type="text"
              className="form-control rounded-start-2 rounded-end-0"
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.HOST.PORT",
              })}
              aria-label="پورت"
              aria-describedby="tab-hosts"
              required
            />

            <button
              type="button"
              className="btn btn-danger me-2 py-2"
              onClick={() => remove(index)}
            >
              {intl.formatMessage({
                id: "DELETE",
              })}
            </button>
          </div>
        ))}

        {/* <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {intl.formatMessage({
              id: "ADD",
            })}{" "}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="Agent" href="#/action-1">
              Agent
            </Dropdown.Item>
            <Dropdown.Item eventKey="SNMP" href="#/action-2">
              SNMP
            </Dropdown.Item>
            <Dropdown.Item eventKey="JMX" href="#/action-3">
              JMX
            </Dropdown.Item>
            <Dropdown.Item eventKey="IPMI" href="#/action-4">
              IPMI
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        <button
          type="button"
          className="btn btn-success py-2 d-flex justify-content-end mt-3 mb-3"
          onClick={() => {
            append({
              label: "",
              ip: "127.0.0.1",
              dns: "",
              useip: 0,
              port: "10050",
            });
          }}
        >
          {intl.formatMessage({
            id: "ADD",
          })}
        </button>
        <div className="row mt-3 position-relative" style={{ zIndex: 0 }}>
          <div className="col">
            <div dir="rtl" className="form-floating">
              <textarea
                {...register(`description`)}
                className="form-control"
                title="توضیحات را اینجا وارد کنید"
                id="floatingTextarea2"
                style={{ height: 100 }}
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
