import { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { useIntl } from "react-intl";
import Hostmacros from "./toggle macros/Hostmacros";
import Inheritedmacros from "./toggle macros/Inheritedmacros";
import ToggleBtns from "../../../../layout/components/ToggleBtn/ToggleBtn";
interface HostProps {
  control: Control;
  watch: CallableFunction;
  setValue: CallableFunction;
}

const Macros: React.FC<HostProps> = ({ control, setValue }) => {
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
      <ToggleBtns
        options={[
          {
            label: "MONITORING.HOSTS.CREATEHOST.MACROS.HOSTMACROS",
            value: "HOSTMACROS",
          },
          {
            label: "MONITORING.HOSTS.CREATEHOST.MACROS.INHERITED",
            value: "INHERITED",
          },
        ]}
        setData={setActiveMacro}
        initialData={activeMacro}
      />
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
        <div className="mt-3">
          <Inheritedmacros
            macrosField={macrosField}
            control={control}
            macrosRemove={macrosRemove}
            macrosAppend={macrosAppend}
          />
        </div>
      )}
    </div>
  );
};

export default Macros;
