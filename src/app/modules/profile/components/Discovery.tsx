import { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "../../../../_metronic/layout/components/multiple-select/MultiSelect";
import { DiscoveryTable } from "../../../../_metronic/partials/widgets";

interface FormValues {
  search: {
    name: string;
  };
}

export function Discovery() {
  const intl = useIntl();
  const navigate = useNavigate();

  const [resetMultiSelect, setResetMultiSelect] = useState(false);

  const { control, watch, setValue, handleSubmit, reset, unregister } =
    useForm<FormValues>({
      defaultValues: {
        search: { name: "" },
      },
    });

  const currentName = watch("search.name") ? watch("search.name") : [];

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
    setResetMultiSelect(true);
    reset();
    fetchPromsListData(watch());
  };

  const submit = () => {
    handleSubmit(fetchPromsListData)();
  };

  return (
    <Content>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MONITORING.DISCOVERY" })}
      </PageTitle>
      <ToolbarWrapper />
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
                <MultiSelect
                  title="MONITORING.DISCOVERY.SELECT"
                  reset={false}
                  options={[]}
                  Loading={false}
                  addAll={true}
                  DataName="objectids"
                  setData={setValue}
                  currentData={[]}
                />
                <div className="d-flex w-100 justify-content-center mt-10 column-gap-5">
                  <button
                    type="button"
                    onClick={submit}
                    className="btn py-2 btn-light-success"
                  >
                    تایید
                  </button>
                  <button
                    type="button"
                    onClick={resetData}
                    className="btn py-2 btn-light-danger"
                  >
                    باز نشانی
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <DiscoveryTable/>
    </Content>
  );
}
