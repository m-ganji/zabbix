// import { useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
// import { useNavigate } from "react-router-dom";
import BTN from "../../../../_metronic/layout/components/BTN";
import { CreateTemplateGroup } from "../../../../_metronic/layout/components/CreateTemplateGroup";
import Input from "../../../../_metronic/layout/components/Input";
import { TemplatesGpTable } from "../../../../_metronic/partials/widgets/tables/TemplatesGpTable";

interface FormValues {
  search: {
    name: string;
  };
  URLs: {
    name: string;
    URL: string;
    Element: string;
  }[];
}

export default function DataTemplatesGroups() {
  const intl = useIntl();
  // const navigate = useNavigate();

  // const [resetMultiSelect, setResetMultiSelect] = useState(false);

  const { watch, handleSubmit, reset } =
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
          {intl.formatMessage({ id: "DATA.TEMPLATE.GP" })}
        </h3>
        <div className="d-flex gap-5 align-items-center">
          <BTN
            id="create_template_gp"
            label={intl.formatMessage({ id: "DATA.TEMPLATE.CREATE" })}
            className="btn-light-primary"
          />

          <CreateTemplateGroup />
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
                <Input
                  className=""
                  iconName="user"
                  placeholder={intl.formatMessage({ id: "NAME" })}
                  value=""
                />
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
      <TemplatesGpTable />
    </Content>
  );
}
