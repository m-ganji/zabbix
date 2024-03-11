// import { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
// import { useNavigate } from "react-router-dom";
import BTN from "../../../../_metronic/layout/components/BTN";
import { CreateHostsGp } from "../../../../_metronic/layout/components/CreateHostsGp";
import { HostsGpTable } from "../../../../_metronic/partials/widgets/tables/HostsGpTable";
import { useEffect, useState } from "react";
import { instance } from "../../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../../../_metronic/partials/content/Tabs/Headers/Host";
import { KTIcon } from "../../../../_metronic/helpers";

interface FormValues {
  search: {
    name: string;
  };
  selectHosts: string;
  URLs: {
    name: string;
    URL: string;
    Element: string;
  }[];
}

export function DataHostGroups() {
  const intl = useIntl();
  const navigate = useNavigate();

  // const [resetMultiSelect, setResetMultiSelect] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [HostGps, setHostGps] = useState([]);

  const { watch, handleSubmit, reset, register } = useForm<FormValues>({
    defaultValues: {
      search: { name: "" },
      selectHosts: "extend",
    },
  });

  useEffect(() => {
    fetchData(watch());
  }, []);

  async function fetchData(e: object) {
    console.log(e);
    isLoaded && setIsLoaded(false);
    const params = e ? e : watch();

    try {
      const response = await instance.post("/core/hostgroup/get", params);
      setHostGps(response.data);
      console.log(response.data);
    } catch (error) {
      if ((error as ApiError).response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      console.error(error);
    }
    setIsLoaded(true);
  }

  const resetData = () => {
    // setResetMultiSelect(true);
    reset();
    fetchData(watch());
  };

  const submit = () => {
    handleSubmit(fetchData)();
  };

  return (
    <Content>
      <div className="d-flex flex-wrap flex-stack my-4">
        <h3 className="fw-bolder ">
          {intl.formatMessage({ id: "DATA.HOSTS.GP" })}
        </h3>
        <div className="d-flex gap-5 align-items-center">
          <BTN
            id="create_host_gp"
            label={intl.formatMessage({ id: "DATA.HOSTS.CREATE" })}
            className="btn-light-primary"
          />
          <CreateHostsGp />
        </div>
      </div>
      <div>
        <div
          className="accordion "
          style={{ boxShadow: "0 0 10px -10px black" }}
          id="monitoring-hosts"
        >
          <div className="accordion-item ">
            <button
              className="accordion-button px-5 py-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <span className="w-100 text-end">فیلتر</span>
            </button>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#monitoring-hosts"
            >
              <div className="accordion-body">
                <div className={`input-group`}>
                  <span className="input-group-text rounded-start-0 rounded-end-2 p-3">
                    <KTIcon iconName="user" className="fs-3" />
                  </span>
                  <input
                    type="text"
                    className="form-control py-0 rounded-start-2 rounded-end-0"
                    placeholder={intl.formatMessage({ id: "NAME" })}
                    {...register("search.name")}
                  />
                </div>

                <div className="d-flex w-100 justify-content-center mt-10 column-gap-5">
                  <BTN
                    label={intl.formatMessage({ id: "SUBMIT" })}
                    className="btn-light-success"
                    onClick={submit}
                  />
                  <BTN
                    label="باز نشانی"
                    className="btn-light-danger"
                    onClick={resetData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <HostsGpTable HostGps={HostGps} isLoaded={isLoaded} />
    </Content>
  );
}
