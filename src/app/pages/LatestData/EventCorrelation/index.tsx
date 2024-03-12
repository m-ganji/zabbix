// import { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { Control, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
// import { useNavigate } from "react-router-dom";
import { MultiSelect } from "../../../../_metronic/layout/components/MultiSelect/MultiSelect";
import { MapsTable } from "../../../../_metronic/partials/widgets/tables/MapsTable";
import BTN from "../../../../_metronic/layout/components/BTN";
import ToggleBtns from "../../../../_metronic/layout/components/ToggleBtn/ToggleBtn";
import { EventCorrelationTabel } from "../../../../_metronic/partials/widgets/tables/DataCollections/EventCorrelation";

export interface FormValues {
  search: {
    name: string;
  };
  URLs: {
    name: string;
    URL: string;
    Element: string;
  }[];
}

export function EventCorrelation() {
  const intl = useIntl();
  // const navigate = useNavigate();

  // const [resetMultiSelect, setResetMultiSelect] = useState(false);

  const { control, watch, setValue, handleSubmit, register, reset } =
    useForm<FormValues>({
      defaultValues: {
        search: { name: "" },
        URLs: [
          {
            name: "",
            URL: "",
            Element: "",
          },
        ],
      },
    });

  // const currentName = watch("search.name") ? watch("search.name") : [];

  const fetchPromsListData = async (e: object) => {
    console.log(e);

    // const params = e ? e : watch();
    // setIsError(false);
    // setIsLoaded(false);
    // try {
    //   const response = await instance.post("core/problems/get", params);
    //   setProblemsData(response.data || []);
    //   console.log(response.data);
    // } catch (error) {
    //   interface ApiError {
    //     response?: {
    //       status: number;
    //     };
    //   }
    //   console.error(error);

    //   if ((error as ApiError).response?.status === 401) {
    //     localStorage.removeItem("token");
    //     navigate("/");
    //   }
    //   setIsError(true);
    // }
    // setIsLoaded(true);
  };
  const resetData = () => {
    // setResetMultiSelect(true);
    reset();
    fetchPromsListData(watch());
  };

  const submit = () => {
    handleSubmit(fetchPromsListData)();
  };

  return (
    <Content>
      <div className="d-flex flex-wrap flex-stack my-4">
        <h3 className="fw-bolder ">
          {intl.formatMessage({ id: "DATA.CORRECTION" })}
        </h3>
        <div className="d-flex gap-5 align-items-center">
          <BTN
            id="create-map"
            label={intl.formatMessage({ id: "DATA.CORRECTION.CREATE" })}
            className="btn-light-primary"
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
                      <MultiSelect
                        title="NAME"
                        reset={false}
                        options={[]}
                        Loading={false}
                        addAll={true}
                        DataName="objectids"
                        setData={setValue}
                        currentData={[]}
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
                            value: 0,
                            label: "ANY",
                          },
                          {
                            value: 1,
                            label: "ACTIVE",
                          },
                          {
                            value: 2,
                            label: "DISABLED",
                          }
                        ]}
                        data="status"
                        setData={setValue}
                        // initialData={showTags}
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
      <EventCorrelationTabel />
    </Content>
  );
}
