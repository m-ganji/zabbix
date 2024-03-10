import { useIntl } from "react-intl";
import { instance } from "../../../../../../services/axiosInstance";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { Loader } from "../../../../../layout/components/loader/Loader";
import { getCSSVariableValue } from "../../../../../assets/ts/_utils";
import { KTIcon } from "../../../../../helpers";
import { useNavigate } from "react-router-dom";
import Update from "./Inherited/Update";

interface ItemType {
  description?: string;
  globalmacroid?: string;
  macro?: string;
  type?: string;
  value?: string;
}

interface Macro {
  macrosField: object[];
  control: Control;
  macrosRemove: CallableFunction;
  macrosAppend: CallableFunction;
  setValue: CallableFunction;
}
const Inheritedmacros: React.FC<Macro> = () => {
  const intl = useIntl();
  const [globalUserMacro, setGlobalUserMacro] = useState<ItemType[]>([]);
  const [isInheritedModalOpen, setisInheritedModalOpen] =
    useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const secondaryColor = getCSSVariableValue("--bs-gray-300");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(false);
    const fetchData = async () => {
      try {
        const response = await instance.post("/core/usermacro/get", {
          output: "extend",
          globalmacro: true,
        });

        setGlobalUserMacro(response.data || []);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error during Zabbix request:", error);
        navigate("/");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column">
      {isLoaded && (
        <p
          className="d-flex justify-content-center align-content-center btn btn-light-primary w-25"
          style={{ marginRight: "70%" }}
          // onClick={() => setisInheritedModalOpen(true)}
        >
          پیکربندی مقدار
        </p>
      )}
      {(!isLoaded && (
        <div className="d-flex pt-7 w-100 justify-content-center">
          <Loader />
        </div>
      )) ||
        globalUserMacro.map((e, index) => (
          <div key={index}>
            <div className="row mb-2 ">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={e.macro}
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
                  })}
                  key={index}
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="col">
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control "
                    aria-describedby="emailHelp"
                    placeholder={intl.formatMessage({
                      id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
                    })}
                    defaultValue={e.value}
                    style={{
                      cursor: "not-allowed",
                    }}
                  />
                  <div
                    className={`custom-dropdown border border-${secondaryColor} border-2`}
                    style={{
                      cursor: "not-allowed",
                    }}
                  >
                    <div className="selected-option mt-2">
                      {e.type == "0" && (
                        <span>
                          <KTIcon
                            iconName="text"
                            className="fs-2 d-flex justify-content-center justify-content-end gap-2"
                          />
                        </span>
                      )}
                      {e.type == "1" && (
                        <span>
                          <KTIcon
                            iconName="eye-slash"
                            className="fs-2 d-flex justify-content-center justify-content-end "
                          />
                        </span>
                      )}
                      {e.type == "2" && (
                        <span>
                          <KTIcon
                            iconName="lock-2"
                            className="fs-2 d-flex justify-content-center justify-content-end gap-2"
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control "
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
                  })}
                />
              </div>
              <div className="col">
                <button
                  type="button"
                  onClick={() => setisInheritedModalOpen(true)}
                  className="btn btn-light-warning w-100"
                >
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.UPDATE",
                  })}
                </button>
              </div>
            </div>
          </div>
        ))}
      {isInheritedModalOpen && (
        <Update
          isInheritedModalOpen={isInheritedModalOpen}
          setisInheritedModalOpen={setisInheritedModalOpen}
        />
      )}
    </div>
  );
};

export default Inheritedmacros;
