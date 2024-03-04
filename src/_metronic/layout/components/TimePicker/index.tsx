import React from "react";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

interface DateRangePickerProps {
  defaultValue?: Date;
  onChange?: (e: any) => void;
}

const TimePickerSelect: React.FC<DateRangePickerProps> = ({
  defaultValue,
  onChange,
}) => {
  return (
    <DatePicker
      className="bg-light-primary "
      disableDayPicker
      format="HH:mm"
      plugins={[<TimePicker hideSeconds />]}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      inputClass="form-control"
    />
  );
};

export default TimePickerSelect;
