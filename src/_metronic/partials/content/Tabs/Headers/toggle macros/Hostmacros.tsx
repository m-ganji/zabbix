import { Control, Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import { Select } from "../../../../../layout/components/Select";

interface Macro {
  macrosField: object[];
  control: Control;
  macrosRemove: CallableFunction;
  macrosAppend: CallableFunction;
  setValue: CallableFunction;
}

const Hostmacros: React.FC<Macro> = ({
  macrosField,
  control,
  macrosRemove,
  macrosAppend,
  setValue,
}) => {
  const intl = useIntl();

  return (
    <div>
      {macrosField.map((item, index) => (
        <div className="d-flex mb-3 gap-3 m-5" key={index}>
          <div style={{ width: "33%" }}>
            <Controller
              name={`macros[${index}].macro`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.TAGS.MACRO",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
              )}
            />
          </div>
          <Controller
            name={`macros[${index}].value`}
            control={control}
            render={({ field }) => (
              <div className="d-flex">
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                />
              </div>
            )}
          />

          <Select
            onChange={(e) => setValue(`macros[${index}].type`, e)}
            options={[
              { label: "text", value: "0" },
              { label: "secret text", value: "1" },
              { label: "vault secret", value: "2" },
            ]}
          />

          <div style={{ width: "33%" }}>
            <Controller
              name={`macros[${index}].description`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.CREATEHOST.TAGS.DESC",
                  })}
                />
              )}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger me-2 py-2"
            onClick={() => macrosRemove(index)}
          >
            {intl.formatMessage({
              id: "DELETE",
            })}
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-success py-2 d-block mt-5 "
        onClick={() => {
          macrosAppend({ macro: "", value: "", type: "0", description: "" });
        }}
      >
        {intl.formatMessage({
          id: "ADD",
        })}
      </button>
    </div>
  );
};

export default Hostmacros;
