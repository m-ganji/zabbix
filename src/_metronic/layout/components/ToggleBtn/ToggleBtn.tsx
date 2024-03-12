import { FC } from "react";
import { useIntl } from "react-intl";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  options: Option[];
  initialData?: string | number | string[];
  data?: string;
  setData?: CallableFunction;
}

const ToggleBtns: FC<Props> = ({ options, setData, initialData, data }) => {
  const intl = useIntl();

  const handleClick = (newState: Option) => {
    console.log("newState",newState.value);
    console.log("initialData",initialData);
    
    if (setData) {
      if (data === "") {
        setData(data, newState.value);
      } else {
        setData(newState.value);
      }
    }
  };


  return (
    <div className="btn-group pb-2" role="group">
      {options.map((option, index) => (
        console.log(initialData == option.value),
        <button
          key={index}
          type="button"
          className={
            "btn btn-light-primary py-2" +
            (initialData === option.value ? " active" : "") +
            (index === 0 ? " rounded-end-2" : "") +
            (index + 1 === options.length ? " rounded-start-2" : "")
          }
          onClick={() => handleClick(option)}
          data-bs-toggle="button"
        >
          {intl.formatMessage({ id: option.label })}
        </button>
      ))}
    </div>
  );
};

export default ToggleBtns;
