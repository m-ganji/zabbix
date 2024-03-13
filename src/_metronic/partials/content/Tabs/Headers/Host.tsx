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
import Input from "../../../../layout/components/Input";
import { Dropdown } from "react-bootstrap";
import { CheckBox } from "./../../../../layout/components/CheckBox/index";
import TextArea from "./../../../../layout/components/TextArea/index";
import { KTIcon } from "../../../../helpers";
import Badge from "./../../../../layout/components/Badge/index";

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

  useEffect(() => {
    handleGetTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleGetTemplates = async () => {
    try {
      const response = await instance.post("/core/templates/get", {});
      const mapped = response.data.map(
        (e: { name: string; templateid: string }) => ({
          label: e.name,
          value: e.templateid,
        })
      );
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "interface",
  });

  const handleAddInterface = (e: string | null) => {
    console.log(e);
    let port;
    let type;

    // Set port based on selected Item
    if (e === "Agent") {
      type = "1";
      port = "10050";
    } else if (e === "JMX") {
      type = "4";
      port = "12345";
    } else if (e === "IPMI") {
      type = "3";
      port = "623";
    } else if (e === "SNMP") {
      type = "2";
      port = "161";
    }
    const length = watch("interface")?.length;

    append({
      interfaceid: length,
      label: e,
      ip: "127.0.0.1",
      main: 1,
      dns: "",
      useip: 0,
      type,
      port,
    });
  };

  return (
    <>
      <div className="d-grid gap-3 text-center">
        <div className="row gap-3">
          <Input
            iconName="user"
            register={register("host")}
            placeholder={intl.formatMessage({
              id: "HOST.NAME",
            })}
            required
            className="col p-0"
          />
          <Input
            value={watch("visiblename")}
            placeholder={
              watch("host") === ""
                ? "نام نمایشی"
                : `نام نمایشی : ${watch("host")}`
            }
            onChange={(e) => setValue("visiblename", e.currentTarget.value)}
            iconName="eye"
            className="col p-0"
          />
        </div>
        <div className="row gap-3">
          <div className="col p-0">
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
              required
            />
          </div>
          <div className="col p-0">
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
          <div
            className="d-flex gap-3 bg-light-primary rounded-3 shadow-lg p-3"
            key={value.id}
          >
            <Badge title={watch(`interface.${index}.label`)} bg="primary" />
            <Input
              register={register(`interface[${index}].ip`)}
              placeholder={intl.formatMessage({
                id: "IP",
              })}
            />
            <Input
              register={register(`interface[${index}].dns`)}
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.DNS",
              })}
            />
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
            <Input
              register={register(`interface[${index}].port`)}
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.PORT",
              })}
            />
            <div className="d-flex align-items-center px-2">
              <input className="form-check-input" type="radio" checked />
            </div>
            <button
              type="button"
              className="btn btn-danger p-5"
              onClick={() => remove(index)}
            >
              <KTIcon iconName="trash" className="fs-1" />
            </button>
          </div>
        ))}
        <div className="row">
          <>
            <Dropdown className="w-fit p-0" onSelect={handleAddInterface}>
              <Dropdown.Toggle variant="success">
                {intl.formatMessage({
                  id: "ADD",
                })}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="text-center" eventKey="Agent">
                  Agent
                </Dropdown.Item>
                <Dropdown.Item className="text-center" eventKey="SNMP">
                  SNMP
                </Dropdown.Item>
                <Dropdown.Item className="text-center" eventKey="JMX">
                  JMX
                </Dropdown.Item>
                <Dropdown.Item className="text-center" eventKey="IPMI">
                  IPMI
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        </div>
        <div className="row">
          <div className="col p-0">
            <TextArea
              iconName="abstract-27"
              placeholder="توضیحات را اینجا وارد کنید"
              register={register(`description`)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2 p-0">
            <CheckBox
              label={intl.formatMessage({
                id: "ACTIVED",
              })}
              checked
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Host;
