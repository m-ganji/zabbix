import React, { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../../layout/components/loader/Loader";
import { Select } from "../../../../../layout/components/Select";
import { instance } from "../../../../../../services/axiosInstance";
import UpdateInheritedMacros from "./Inherited/UpdateInheritedMacros";
import AddInheritedMacros from "./Inherited/AddInheritedMacros";

interface ItemType {
  description?: string;
  globalmacroid?: string;
  macro?: string;
  type?: string;
  value?: string;
}

interface Macro {
  macrosField: ItemType[];
  control: Control;
  macrosRemove: CallableFunction;
  macrosAppend: CallableFunction;
  macroids?: string | string[];
}

const Inheritedmacros: React.FC<Macro> = ({ macrosField }) => {
  const { handleSubmit, watch, setValue } = useForm<Macro>({
    defaultValues: {
      macroids: "",
    },
  });
  
  const intl = useIntl();
  const [globalUserMacro, setGlobalUserMacro] =
    useState<ItemType[]>(macrosField);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
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

  const handleDeleteRequest = async () => {
    const macroids = watch("macroids");
    console.log(macroids);
    try {
      const response = await instance.post(
        "/core/usermacro/delete_global",
        macroids
      );
      setValue("macroids", []);
      console.log(response);
    } catch (error) {
      console.error("Error during Zabbix request:", error);
    }
  };

  const delUi = (id: string, index: number) => {
    const macroidsToDelete = watch("macroids") ?? [];
    const updatedMacroList = globalUserMacro.filter((_, idx) => idx !== index);
    console.log(macroidsToDelete);
    setValue("macroids", [...macroidsToDelete, id]);
    setGlobalUserMacro(updatedMacroList);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-3 mb-4">
        <button
          type="button"
          className="btn btn-light-primary px-5"
          onClick={handleSubmit(handleDeleteRequest)}
        >
          {intl.formatMessage({
            id: "SUBMIT",
          })}
        </button>
        <button
          type="button"
          className="btn btn-success px-5"
          onClick={() => openModalForAdd()}
        >
          {intl.formatMessage({
            id: "ADD",
          })}
        </button>
      </div>
      {(!isLoaded && (
        <div className="d-flex pt-7 w-100 justify-content-center">
          <Loader />
        </div>
      )) ||
        globalUserMacro.map((e, index) => (
          <div key={index}>
            <div className="row gap-3 px-3 ">
              <div className="col p-0">
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
              <div className="col p-0">
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control "
                    aria-describedby="emailHelp"
                    placeholder={intl.formatMessage({
                      id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.EFFECTIVE",
                    })}
                    value={e.globalmacroid}
                    disabled
                  />
                </div>
              </div>
              <div className="col-2 p-0">
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

            <div className="row gap-3 px-3 mt-3 mb-5">
              <div className="col p-0">
                <input
                  type="text"
                  className="form-control "
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.DESC",
                  })}
                  disabled
                  value={e.description}
                />
              </div>
              <div className="col-3 d-flex gap-3 p-0">
                <button
                  type="button"
                  onClick={() => openModalForEdit(index)}
                  className="btn btn-light-warning w-100"
                >
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED.UPDATE",
                  })}
                </button>
                <button
                  type="button"
                  className="btn btn-light-danger w-100"
                  onClick={() => delUi(e.globalmacroid, index)}
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
      />

      <AddInheritedMacros
        show={isAddInheritedModalOpen}
        item={editedAddItem}
        onHide={closeAddModal}
      />
    </div>
  );
};

export default Inheritedmacros;
