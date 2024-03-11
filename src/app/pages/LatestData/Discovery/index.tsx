// import { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { Controller, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
// import { useNavigate } from "react-router-dom";
import BTN from "../../../../_metronic/layout/components/BTN";
import ToggleBtns from "../../../../_metronic/layout/components/ToggleBtn/ToggleBtn";
import { KTIcon } from "../../../../_metronic/helpers";
import { DataDiscoveryTable } from "../../../../_metronic/partials/widgets/tables/DataCollections/Discovery";
import { instance } from "../../../../services/axiosInstance";
import { ApiError } from "../../../../_metronic/partials/content/Tabs/Headers/Host";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DiscoveryCreate } from "../../../../_metronic/layout/components/DiscoveryData/Create";

export interface DiscoveryRullData {
  name: string;
  iprange: string;
  selectDChecks: string;
  proxy_hostid: string;
  delay: string;

  dchecks: { type: number; ports: string }[];
  search: {
    name: string;
  };
  filter: { status: string };
  uniq: string;
  host_source: string;
  name_source: string;
  status: string;
}

export function DiscoveryData() {
  const intl = useIntl();
  const navigate = useNavigate();

  const [dRule, setdRule] = useState<DiscoveryRullData[]>();
  const [isLoaded, setIsLoaded] = useState(false);

  const { control, watch, setValue, handleSubmit, register, reset } =
    useForm<DiscoveryRullData>({
      defaultValues: {
        selectDChecks: "extend",
        search: { name: "" },
        filter: { status: "" },
        uniq: "1",
        host_source: "2",
        name_source: "0",
      },
    });

  // const currentName = watch("search.name") ? watch("search.name") : [];

  useEffect(() => {
    fetchData(watch());
  }, []);

  async function fetchData(e: object) {
    console.log(e);
    isLoaded && setIsLoaded(false);
    const params = e ? e : watch();
    try {
      const response = await instance.post("/core/drule/get", params);
      setdRule(response.data);
      console.log(response.data);
    } catch (error) {
      if ((error as ApiError).response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        console.error("Error fetching host data:", error);
      }
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
          {intl.formatMessage({ id: "DATA.DISCOVERY.RULES" })}
        </h3>
        <div className="d-flex gap-5 align-items-center">
          <BTN
            id="create-drull"
            label={intl.formatMessage({ id: "DATA.DISCOVERY.CREATE" })}
            className="btn-light-primary"
          />
          <DiscoveryCreate
            control={control}
            watch={watch}
            register={register}
            handleSubmit={handleSubmit}
            fetchData={fetchData}
            setValue={setValue}
          />
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
                <div className="d-flex gap-3 justify-content-center">
                  <div className="d-flex align-items-center gap-7 w-75">
                    <div className="w-100">
                      <Controller
                        control={control}
                        name={`search.name`}
                        render={({ field }) => (
                          <div className={`input-group`}>
                            <span className="input-group-text rounded-start-0 rounded-end-2 p-3">
                              <KTIcon iconName="user" className="fs-3" />
                            </span>
                            <input
                              type="text"
                              className="form-control py-0 rounded-start-2 rounded-end-0"
                              placeholder={intl.formatMessage({
                                id: "NAME",
                              })}
                              {...field}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-3 text-end w-100">
                      <p className="mt-2">
                        {intl.formatMessage({
                          id: "STATUS",
                        })}
                        :
                      </p>
                      <ToggleBtns
                        options={[
                          {
                            value: "",
                            label: "ALL",
                          },
                          {
                            value: "0",
                            label: "ACTIVE",
                          },
                          {
                            value: "1",
                            label: "DISABLED",
                          },
                        ]}
                        data="filter.status"
                        setData={setValue}
                        initialData={watch("filter.status")}
                      />
                    </div>
                  </div>
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
      <DataDiscoveryTable data={dRule} isLoaded={isLoaded} />
    </Content>
  );
}
