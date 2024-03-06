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

const Macros: React.FC<HostProps> = ({ control, watch, setValue }) => {
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
          macrosAppend={macrosAppend}
          setValue={setValue}
        />
      )}
      {activeMacro == "INHERITED" && (
        <div style={{ maxHeight: "65vh", overflow: "auto" }} className="mt-3">
          <Inheritedmacros
            macrosField={macrosField}
            control={control}
            macrosRemove={macrosRemove}
            macrosAppend={macrosAppend}
            setValue={setValue}
          />
        </div>
      )}
    </div>
  );
};

export default Macros;
