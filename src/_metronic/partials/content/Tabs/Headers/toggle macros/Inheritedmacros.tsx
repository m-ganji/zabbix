import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { Loader } from "../../../../../layout/components/loader/Loader";
import { useNavigate } from "react-router-dom";
import UpdateInheritedMacros from "./Inherited/UpdateInheritedMacros";
import AddInheritedMacros from "./Inherited/AddInheritedMacros";
import { Select } from "../../../../../layout/components/Select";
import { instance } from "../../../../../../services/axiosInstance";

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
  macroids?: string | string[];
}

const Inheritedmacros: React.FC<Macro> = () => {
  const { handleSubmit, watch, setValue } = useForm<Macro>({
    defaultValues: {
      macroids: "",
    },
  });
  const intl = useIntl();
  const [globalUserMacro, setGlobalUserMacro] = useState<ItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const macroidsToDelete = (watch("macroids") || []).map(String);
  console.log(macroidsToDelete);
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
  }, [navigate]);

  const [editedItem, setEditedItem] = useState<ItemType | null>(null);
  const [editedAddItem, setAddEditedItem] = useState<ItemType | null>(null);
  const [isInheritedModalOpen, setIsInheritedModalOpen] = useState(false);
  const [isAddInheritedModalOpen, setIsAddInheritedModalOpen] = useState(false);

  const openModalForEdit = (index: number) => {
    const itemToEdit = globalUserMacro[index];
    setEditedItem(itemToEdit);
    console.log(itemToEdit);
    setIsInheritedModalOpen(true);
  };

  const openModalForAdd = () => {
    setIsAddInheritedModalOpen(true);
  };

  const closeModal = () => {
    setIsInheritedModalOpen(false);
    setEditedItem(null);
  };

  const closeAddModal = () => {
    setIsAddInheritedModalOpen(false);
    setAddEditedItem(null);
  };

  const handleUpdate = (updatedItem: ItemType) => {
    console.log("Updated item:", updatedItem);
  };
  const handleDeleteUi = (item: ItemType) => {
    const updatedMacroList = globalUserMacro.filter(
      (macro) => macro.macro !== item.macro
    );

    setValue("macroids", [...watch("macroids"), item.globalmacroid]);
    setGlobalUserMacro(updatedMacroList);
  };

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
                  disabled
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
                    disabled
                  />
                  <div>
                    <Select
                      value={e.type}
                      onChange={(e) => console.log(e)}
                      options={[
                        { label: "text", value: "0" },
                        { label: "secret text", value: "1" },
                        { label: "vault secret", value: "2" },
                      ]}
                      disabled
                    />
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
                  disabled
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
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-light-primary w-50"
          onClick={() =>
            handleSubmit((data: Macro) =>
              handleDeleteRequest(data.macroids as string[])
            )
          }
        >
          {intl.formatMessage({
            id: "SUBMIT",
          })}
        </button>
        <button
          type="button"
          className="btn btn-success w-50"
          onClick={() => openModalForAdd()}
        >
          {intl.formatMessage({
            id: "ADD",
          })}
        </button>
      </div>
      <AddInheritedMacros
        show={isAddInheritedModalOpen}
        item={editedAddItem}
        onHide={closeAddModal}
      />
    </div>
  );
};

export default Inheritedmacros;
