import { useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useIntl } from "react-intl";

interface Tag {
  tag: string;
  value: string;
}

interface TagsProps {
  control: object;
}

const Tags: React.FC<TagsProps> = ({ control }) => {
  const intl = useIntl();

  const { fields, append, remove } = useFieldArray<Tag>({
    control,
    name: "tags",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ tag: "", value: "" });
    }
  }, [fields, append]);

  return (
    <>
      {fields.map((item, index) => (
        <div className="d-flex mb-3 gap-3" key={item.id}>
          <div style={{ width: "50%" }}>
            <Controller
              name={`tags[${index}].tag`}
              control={control}
              defaultValue={item.tag}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
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
              defaultValue={item.value}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control py-2"
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
            onClick={() => remove(index)}
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
          append({ tag: "", value: "" });
        }}
      >
        {intl.formatMessage({
          id: "MONITORING.HOSTS.ADDTAG.ADDBUTTON",
        })}
      </button>
    </>
  );
};

export default Tags;
