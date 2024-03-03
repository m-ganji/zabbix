import { useIntl } from "react-intl";
import { instance } from "../../../../../../services/axiosInstance";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

interface ItemType {
  description: string;
  globalmacroid: string;
  macro: string;
  type: string;
}

const Inheritedmacros: React.FC = ({
  macrosField,
  control,
  macrosRemove,
  macrosAppend,
}) => {
  const intl = useIntl();
  const [globalUserMacro, setGlobalUserMacro] = useState<ItemType[]>([]);
  const [isHostsModalOpen, setisHostsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.post("/core/usermacro/get", {
          output: "extend",
          globalmacro: true,
        });
        globalUserMacro.map((e) => setGlobalUserMacro(e.macro));
        setGlobalUserMacro(response.data || []);
        // setIsLoading(true);
      } catch (error) {
        console.error("Error during Zabbix request:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column">
      <p
        className="d-flex justify-content-center align-content-center btn btn-light-primary w-25 mr-75"
        type="button"
        style={{ marginRight: "75%" }}
        onClick={() => setisHostsModalOpen(true)}
      >
        پیکربندی مقدار
      </p>

      <Modal show={isHostsModalOpen} onHide={() => setisHostsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {intl.formatMessage({ id: "MENU.SELECT.HOSTS" })} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body dir="rtl">
          {globalUserMacro.map((e) => (
            <div className="d-flex py-2 mb-5 gap-5 ">
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
                <select
                  className="form-select form-select-sm w-25 "
                  aria-label="Floating label select example"
                  style={{ width: "33%" }}
                >
                  <option value={1}>&#x0054; متن 1</option>
                  <option value={2}>🅿️&#x0054; متن 2</option>
                  <option value={2}>🔏 متن 2</option>
                </select>
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
          <button
            type="button"
            className="btn btn-success py-2 d-block mt-5 "
            onClick={() => {
              macrosAppend({ tag: "", value: "" });
            }}
          >
            {intl.formatMessage({
              id: "ADD",
            })}
          </button>
        </Modal.Body>
      </Modal>
      {globalUserMacro.map((e) => (
        <div className="d-flex py-2 mb-5 gap-5 ">
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
            <select
              className="form-select form-select-sm w-25 "
              aria-label="Floating label select example"
              style={{ width: "33%" }}
            >
              <option value={1}>&#x0054; متن 1</option>
              <option value={2}>🅿️&#x0054; متن 2</option>
              <option value={2}>🔏 متن 2</option>
            </select>
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
