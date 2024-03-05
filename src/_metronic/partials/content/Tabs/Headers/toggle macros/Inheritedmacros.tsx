import { useIntl } from "react-intl";
import { instance } from "../../../../../../services/axiosInstance";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Loader } from "../../../../../layout/components/loader/Loader";
import { getCSSVariableValue } from "../../../../../assets/ts/_utils";
import { KTIcon } from "../../../../../helpers";

interface ItemType {
  description: string;
  globalmacroid: string;
  macro: string;
  type: string;
}

type Inputs = {
  macro: string;
  value: string;
  type: string;
  description: string;
};

const Inheritedmacros: React.FC = ({
  macrosField,
  control,
  macrosRemove,
  macrosAppend,
}) => {
  const intl = useIntl();
  const [globalUserMacro, setGlobalUserMacro] = useState<ItemType[]>([]);
  const [isInheritedModalOpen, setisInheritedModalOpen] =
    useState<boolean>(false);
  const [isInheritedCreateModalOpen, setIsInheritedCreateModalOpen] =
    useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const secondaryColor = getCSSVariableValue("--bs-gray-300");

  useEffect(() => {
    setIsLoaded(false);

    const fetchData = async () => {
      try {
        const response = await instance.post("/core/usermacro/get", {
          output: "extend",
          globalmacro: true,
        });
        globalUserMacro.map((e) => setGlobalUserMacro(e.macro));

        setGlobalUserMacro(response.data || []);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error during Zabbix request:", error);
      }
      // setIsLoaded(true);
    };

    fetchData();
  }, []);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const response = await instance.post(
        "/core/usermacro/create_global",
        data
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error during Zabbix request:", error);
    }
  };

  const [selectedOptions, setSelectedOptions] = useState(
    new Array(macrosField.length).fill(null)
  );

  return (
    <div className="d-flex flex-column">
      {isLoaded && (
        <p
          className="d-flex justify-content-center align-content-center btn btn-light-primary w-25"
          type="button"
          style={{ marginRight: "70%" }}
          onClick={() => setisInheritedModalOpen(true)}
        >
          پیکربندی مقدار
        </p>
      )}
      {/* first modal */}
      <Modal
        show={isInheritedModalOpen}
        onHide={() => setisInheritedModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>ها user macro لیست</Modal.Title>
        </Modal.Header>
        <Modal.Body dir="rtl">
          {globalUserMacro.map((e, index) => (
            <div className="d-flex py-2 mb-5 gap-5 " key={index}>
              <input
                type="text"
                className="form-control "
                defaultValue={e.macro}
                dir="rtl"
                style={{ width: "33%", direction: "rtl" }}
              />
              <div className="d-flex" style={{ width: "33%" }}>
                <input
                  type="text"
                  className="form-control py-2 w-75"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                  key={index}
                />
              </div>
              select
              <input
                type="text"
                className="form-control py-2"
                aria-describedby="emailHelp"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.ADDTAG.VALUE",
                })}
                style={{ width: "33%" }}
                dir="rtl"
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-success py-2 d-block mt-5 "
            onClick={() => setIsInheritedCreateModalOpen(true)}
          >
            {intl.formatMessage({
              id: "ADD",
            })}
          </button>
        </Modal.Body>
      </Modal>
      {/* second modal*/}
      <Modal
        show={isInheritedCreateModalOpen}
        onHide={() => setIsInheritedCreateModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>user macro ایجاد</Modal.Title>
        </Modal.Header>
        <Modal.Body dir="rtl">
          <form
            className="d-flex flex-column  py-2 mb-5 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex gap-5">
              <input
                {...register("macro")}
                type="text"
                className="form-control"
                dir="rtl"
                style={{ width: "33%", direction: "rtl" }}
              />
              <div className="d-flex" style={{ width: "33%" }}>
                <input
                  {...register("value")}
                  type="text"
                  className="form-control py-2 w-75"
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
                آخرین
                {/* <select
                  className="form-select form-select-sm w-25 "
                  aria-label="Floating label select example"
                  style={{ width: "33%" }}
                >
                  <option value={1}>&#x0054; متن 1</option>
                  <option value={2}>🅿️&#x0054; متن 2</option>
                  <option value={2}>🔏 متن 2</option>
                </select> */}
              </div>
              <input
                {...register("description")}
                type="text"
                className="form-control py-2"
                dir="rtl"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.ADDTAG.VALUE",
                })}
                style={{ width: "33%", direction: "rtl" }}
              />
            </div>
            <button type="submit" className="btn btn-success py-2 d-block mt-5">
              ساخت
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {(!isLoaded && (
        <div className="d-flex pt-7 w-100 justify-content-center">
          <Loader />
        </div>
      )) ||
        globalUserMacro.map((e) => (
          <div className="d-flex py-2 mb-5 gap-5 me-3">
            <input
              type="text"
              className="form-control "
              defaultValue={e.macro}
              dir="rtl"
              style={{ width: "33%", direction: "rtl" }}
            />
            <div className="d-flex" style={{ width: "33%" }}>
              <input
                type="text"
                className="form-control py-2 w-75"
                aria-describedby="emailHelp"
                placeholder={intl.formatMessage({
                  id: "MONITORING.HOSTS.ADDTAG.VALUE",
                })}
                style={{ direction: "rtl" }}
                dir="rtl"
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

            <input
              type="text"
              className="form-control py-2"
              aria-describedby="emailHelp"
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.ADDTAG.VALUE",
              })}
              style={{ width: "33%" }}
              dir="rtl"
            />
          </div>
        ))}
    </div>
  );
};

export default Inheritedmacros;
