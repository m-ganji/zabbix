import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

export default function Tags() {
  const intl = useIntl();

  const { control, watch, setValue, handleSubmit, reset } = useForm<FormValues>(
    { tags: [] }
  );

  const {
    fields: tagsField,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  return (
    <div>
      {tagsField.map((item, index) => (
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
              <select
                className="form-select form-select-sm"
                id={`floatingSelect${item.id}`}
                aria-label="Floating label select example"
                style={{ width: "33%" }}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10);
                  field.onChange(newValue);
                }}
              >
                <option value={4}>
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.OPTION1",
                  })}
                </option>
                <option value={1}>
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.OPTION2",
                  })}
                </option>
                <option selected value={0}>
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.OPTION3",
                  })}
                </option>
                <option value={5}>
                  {" "}
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.OPTION4",
                  })}
                </option>
                <option value={3}>
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.OPTION5",
                  })}
                </option>
                <option value={2}>
                  {intl.formatMessage({
                    id: "MONITORING.HOSTS.ADDTAG.OPTION6",
                  })}
                </option>
              </select>
            )}
          />

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
    </div>
  );
}
