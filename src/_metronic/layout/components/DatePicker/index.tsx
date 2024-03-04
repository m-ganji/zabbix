import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface DateRangePickerProps {
  defaultValue?: Date;
  onChange: (e: any) => void;
  range: boolean;
}

const DatePickerSelect: React.FC<DateRangePickerProps> = ({
  defaultValue,
  onChange,
  range,
}) => {
  return (
    <DatePicker
      range={range}
      inputClass="form-control"
      dateSeparator=" تا "
      multipleRangeSeparator="&"
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      value={defaultValue}
      onChange={onChange}
    />
  );
};

export default DatePickerSelect;
