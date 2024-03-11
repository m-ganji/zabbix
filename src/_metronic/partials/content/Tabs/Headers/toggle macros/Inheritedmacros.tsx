import { useIntl } from "react-intl";
import { instance } from "../../../../../../services/axiosInstance";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { Loader } from "../../../../../layout/components/loader/Loader";
import { getCSSVariableValue } from "../../../../../assets/ts/_utils";
import { KTIcon } from "../../../../../helpers";
import { useNavigate } from "react-router-dom";
import UpdateInheritedMacros from "./Inherited/UpdateInheritedMacros";

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

  const [editedItem, setEditedItem] = useState<ItemType | null>(null);
  const [isInheritedModalOpen, setIsInheritedModalOpen] = useState(false);

  const openModalForEdit = (index: number) => {
    const itemToEdit = globalUserMacro[index];
    setEditedItem(itemToEdit);
    setIsInheritedModalOpen(true);
    console.log(itemToEdit);
  };

  const closeModal = () => {
    setIsInheritedModalOpen(false);
    setEditedItem(null);
  };

  const handleUpdate = (updatedItem: ItemType) => {
    console.log("Updated item:", updatedItem);
  };
  console.log(globalUserMacro);

  const handleDeleteUi = (item: ItemType) => {
    const updatedMacroList = globalUserMacro.filter(
      (macro) => macro.macro !== item.macro
    );
    console.log(item.globalmacroid);

    setGlobalUserMacro(updatedMacroList);
  };

  // const handleDeleteRequest = (item: ItemType) => {
  //   console.log(item);

  //   const fetchData = async () => {
  //     try {
  //       const response = await instance.post(
  //         "/core/usermacro/update_global",
  //         {}
  //       );
  //     } catch (error) {
  //       console.error("Error during Zabbix request:", error);
  //     }
  //   };
  //   fetchData();
  // };

  return (
    <div className="d-flex flex-column">
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
                  value={e.macro}
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.MACRO",
                  })}
                  key={index}
                  // readonly
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
                    value={e.value}
                    // readonly
                  />
                  <div
                    className={`custom-dropdown border border-${secondaryColor} border-2 `}
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
            <div className="row mt-5 mb-5">
              <div className="col">
                <input
                  type="text"
                  className="form-control "
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
                  })}
                  // readonly
                />
              </div>
              <div className="col d-flex gap-5">
                <button
                  type="button"
                  onClick={() => openModalForEdit(index)}
                  className="btn btn-light-warning w-50"
                >
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.UPDATE",
                  })}
                </button>
                <button
                  type="button"
                  className="btn btn-light-danger w-50"
                  onClick={() => {
                    handleDeleteUi(e);
                  }}
                >
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DELETE",
                  })}
                </button>
              </div>
            </div>
          </div>
        ))}

      <UpdateInheritedMacros
        show={isInheritedModalOpen}
        item={editedItem}
        onHide={closeModal}
        onUpdate={handleUpdate}
      />
      <button
        type="button"
        className="btn btn-light-primary w-50"
        // onClick={() => {
        //   handleDelete;
        // }}
      >
        {intl.formatMessage({
          id: "SUBMIT",
        })}
      </button>
    </div>
  );
};

export default Inheritedmacros;
