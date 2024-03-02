import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import Hostmacros from "./toggle macros/Hostmacros";
import Inheritedmacros from "./toggle macros/Inheritedmacros";
interface HostProps {
  control: object;
  watch: () => void;
}

const Macros: React.FC<HostProps> = ({ control, watch }) => {
  const intl = useIntl();

  const [activeMacro, setActiveMacro] = useState<string>("HOSTMACROS");

  const {
    fields: macrosField,
    append: macrosAppend,
    remove: macrosRemove,
  } = useFieldArray({
    control,
    name: "macros",
  });

  return (
    <div>
      <div className="btn-group py-2 " role="group" aria-label="Basic example">
        <button
          type="button"
          className={
            "btn btn-primary rounded-end-2 py-2" +
            (activeMacro === "HOSTMACROS" ? " active" : "")
          }
          onClick={() => {
            // setValue("filter.status", [0, 1]);
            setActiveMacro("HOSTMACROS");
          }}
          data-bs-toggle="button"
        >
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.MACROS.HOSTMACROS",
          })}
        </button>

        <button
          type="button"
          className={
            "btn btn-primary rounded-start-2 py-2" +
            (activeMacro === "INHERITED" ? " active" : "")
          }
          onClick={() => {
            // setValue("filter.status", 1);
            setActiveMacro("INHERITED");
          }}
          data-bs-toggle="button"
        >
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED",
          })}
        </button>
      </div>
      {activeMacro == "HOSTMACROS" && (
        <Hostmacros
          macrosField={macrosField}
          control={control}
          macrosRemove={macrosRemove}
        />
      )}
      {activeMacro == "INHERITED" && (
        <Inheritedmacros
          macrosField={macrosField}
          control={control}
          macrosRemove={macrosRemove}
          macrosAppend={macrosAppend}
        />
      )}
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
    </div>
  );
};

export default Macros;
