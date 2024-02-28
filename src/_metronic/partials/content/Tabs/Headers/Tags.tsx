import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

export default function Tags() {
  const intl = useIntl();

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
    fields: tagsField,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  return (
    <>
      {tagsField.map((item, index) => (
        <div className="d-flex mb-3 gap-3" key={item.id}>
          <div style={{ width: "50%" }}>
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
                    id: "MONITORING.HOSTS.CREATEHOST.HOST.NAME",
                  })}
                  style={{ direction: "rtl" }}
                  dir="rtl"
                />
              )}
            />
          </div>

          <div style={{ width: "50%" }}>
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
          tagsAppend({ tag: "", value: "" });
        }}
      >
        {intl.formatMessage({
          id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
        })}
      </button>
    </>
  );
}
