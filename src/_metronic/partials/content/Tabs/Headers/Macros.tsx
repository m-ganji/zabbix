import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";

export default function Macros() {
  const intl = useIntl();

  const [activeMacro, setActiveMacro] = useState<string>("");
  const { control, watch, setValue, handleSubmit, reset } = useForm<FormValues>(
    {
      defaultValues: {
        tags: [
          {
            tag: "",
            value: "",
          },
        ],
      },
    }
  );

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
      <div className="btn-group py-2" role="group" aria-label="Basic example">
        <Controller
          name="filter.status"
          control={control}
          defaultValue=""
          render={() => (
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
          )}
        />
        <Controller
          name="filter.status"
          control={control}
          defaultValue=""
          render={() => (
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
          )}
        />
      </div>
      {macrosField.map((item, index) => (
        <div className="d-flex mb-3 gap-3" key={item.id}>
          <div style={{ width: "33%" }}>
            <Controller
              name={`tags[${index}].tag`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
                  id={`exampleInputEmail${item.id}`}
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
              )}
            />
          </div>
          <Controller
            name={`tags[${index}].operator`}
            control={control}
            render={({ field }) => (
              <div className="d-flex">
                <input
                  {...field}
                  type="text"
                  className="form-control py-2 w-75"
                  id={`exampleInputEmailValue${item.id}`}
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
                <select
                  className="form-select form-select-sm w-25 "
                  id={`floatingSelect${item.id}`}
                  aria-label="Floating label select example"
                  style={{ width: "33%" }}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    field.onChange(newValue);
                  }}
                >
                  <option value={1}>&#x0054; متن 1</option>
                  <option value={2}>🅿️&#x0054; متن 2</option>
                  <option value={2}>🔏 متن 2</option>
                </select>
              </div>
            )}
          />
          {/* <option value={1}>&#x0054; متن 1</option>
                  <option value={2}>&#x1F512;&#x0054; متن 2</option> */}
          <div style={{ width: "33%" }}>
            <Controller
              name={`tags[${index}].value`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
                  id={`exampleInputEmailValue${item.id}`}
                  aria-describedby="emailHelp"
                  placeholder={intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.VALUE",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
              )}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger me-2 py-2"
            onClick={() => tagsRemove(index)}
          >
            {intl.formatMessage({
              id: "MONITORING.HOSTS.ADDTAG.REMOVEBUTTON",
            })}
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-success py-2"
        onClick={() => {
          macrosAppend({ tag: "", value: "" });
        }}
      >
        {intl.formatMessage({
          id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
        })}
      </button>
    </div>
  );
}
