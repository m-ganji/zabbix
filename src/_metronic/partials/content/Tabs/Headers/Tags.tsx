import { Control, useFieldArray } from "react-hook-form";
import { useIntl } from "react-intl";

interface TagsProps {
  control: Control;
  watch: CallableFunction;
  register: CallableFunction;
}

const Tags: React.FC<TagsProps> = ({ control, register }) => {
  const intl = useIntl();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  return (
    <>
      {fields.map((item, index) => (
        <div className="d-flex mb-3 gap-3" key={item.id}>
          <div style={{ width: "50%" }}>
            <input
              {...register(`tags[${index}].tag`)}
              type="text"
              className="form-control py-2"
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.CREATEHOST.HOST.NAME",
              })}
            />
          </div>

          <div style={{ width: "50%" }}>
            <input
              {...register(`tags[${index}].value`)}
              type="text"
              className="form-control py-2"
              placeholder={intl.formatMessage({
                id: "MONITORING.HOSTS.CREATEHOST.HOST.VALUE",
              })}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger me-2 py-2"
            onClick={() => remove(index)}
          >
            {intl.formatMessage({
              id: "DELETE",
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
          id: "ADD",
        })}
      </button>
    </>
  );
};

export default Tags;
