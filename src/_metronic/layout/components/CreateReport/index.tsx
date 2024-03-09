import React, { useState } from "react";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import BTN from "../BTN";
import Input from "../Input";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import ToggleBtns from "../ToggleBtn/ToggleBtn";
import { SwitchBTN } from "../Maps/SwitchBTN";
import TextArea from "../TextArea";
import TimePickerSelect from "../TimePicker";
import DatePickerSelect from "../DatePicker";

interface CreateMapProps {
  control: object;
  setValue: CallableFunction;
}

export const CreateReport: React.FC<CreateMapProps> = ({
  control,
  setValue,
}) => {
  const intl = useIntl();

  const [IsOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  // const [IsTimePicker, setIsTimePicker] = useState(false);

  // Remove this after saving data
  const [FakeData, setFakeData] = useState(false);

  const handleDateChange = (e) => {
    console.log(FakeData);
    console.log(e);
    // Your logic here
  };

  return (
    <div
      id="create_report-gp"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="create_report-gp"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '900px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#create_report_gp"
      data-kt-drawer-close="#create_report_gp_close"
      dir="rtl"
    >
      <div className="card shadow-none rounded-0 w-100 ">
        <div className="card-header" id="create_report_header">
          <h3 className="card-title fw-bolder text-gray-900">
            {intl.formatMessage({ id: "DATA.HOSTS.GP.NEW" })}
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary me-n5"
              id="create_report_gp_close"
            >
              <KTIcon iconName="cross" className="fs-1" />
            </button>
          </div>
        </div>

        <>
          <div className="card shadow-none rounded-0 w-100 ">
            <div dir="rtl">
              <div className="card-body ">
                <div className="d-grid gap-3 ">
                  <div className="d-flex gap-3">
                    <div className="w-100">
                      <MultiSelect
                        title="OWNER"
                        reset={false}
                        options={[]}
                        Loading={false}
                        addAll={true}
                        DataName="objectids"
                        setData={setValue}
                        currentData={[]}
                      />
                    </div>
                    <button
                      className="btn py-3 btn-light-primary px-0 col-2"
                      onClick={() => setIsOwnerModalOpen(true)}
                    >
                      {intl.formatMessage({
                        id: "MENU.SELECT",
                      })}
                    </button>
                  </div>
                  <Input
                    iconName="user"
                    placeholder={intl.formatMessage({ id: "NAME" })}
                    value=""
                  />
                  <div className="d-flex gap-3">
                    <div className="w-100">
                      <MultiSelect
                        title="MENU.DASHBOARD"
                        reset={false}
                        options={[]}
                        Loading={false}
                        addAll={true}
                        DataName="objectids"
                        setData={setValue}
                        currentData={[]}
                      />
                    </div>
                    <button
                      className="btn py-3 btn-light-primary px-0 col-2"
                      onClick={() => setIsOwnerModalOpen(true)}
                    >
                      {intl.formatMessage({
                        id: "MENU.SELECT",
                      })}
                    </button>
                  </div>
                  <div className="d-flex gap-5 justify-content-between">
                    <div className=" d-flex align-items-center gap-3 text-end ">
                      <p>
                        {intl.formatMessage({
                          id: "PERIOD",
                        })}
                        :
                      </p>
                      <ToggleBtns
                        options={[
                          {
                            value: 0,
                            label: "PREVIOUS_DAY",
                          },
                          {
                            value: 1,
                            label: "PREVIOUS_WEEK",
                          },
                          {
                            value: 2,
                            label: "PREVIOUS_MONTH",
                          },
                          {
                            value: 2,
                            label: "PREVIOUS_YEAR",
                          },
                        ]}
                        data=""
                        setData={setFakeData}
                        // initialData={showTags}
                      />
                    </div>
                    <div className=" d-flex align-items-center gap-3 text-end ">
                      <p>
                        {intl.formatMessage({
                          id: "CYCLE",
                        })}
                        :
                      </p>
                      <ToggleBtns
                        options={[
                          {
                            value: 0,
                            label: "DAILY",
                          },
                          {
                            value: 1,
                            label: "WEEKLY",
                          },
                          {
                            value: 2,
                            label: "MONTHLY",
                          },
                          {
                            value: 2,
                            label: "YEARLY",
                          },
                        ]}
                        data=""
                        setData={setFakeData}
                        // initialData={showTags}
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <div>
                      <p>
                        {intl.formatMessage({
                          id: "START_TIME",
                        })}
                        :
                      </p>
                      <TimePickerSelect
                      // onChange={handleDateChange}
                      />
                    </div>
                    <div>
                      <p>
                        {intl.formatMessage({
                          id: "DATE.START_END",
                        })}
                        :
                      </p>
                      <DatePickerSelect
                        range={true}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  <Input
                    iconName="book-open"
                    placeholder={intl.formatMessage({ id: "SUBJECT" })}
                    value=""
                  />
                  <TextArea
                    iconName="abstract-24"
                    placeholder={intl.formatMessage({ id: "MSG" })}
                    value=""
                  />
                  <TextArea
                    iconName="abstract-24"
                    placeholder={intl.formatMessage({ id: "DESC" })}
                    value=""
                  />
                  <SwitchBTN label={intl.formatMessage({ id: "ACTIVED" })} />
                </div>

                <div className="d-flex w-100 justify-content-center mt-5 column-gap-5">
                  <BTN
                    label={intl.formatMessage({ id: "ADD" })}
                    className="btn-light-success"
                    // onClick={submit}
                  />
                  <BTN
                    label={intl.formatMessage({ id: "CANCEL" })}
                    className="btn-light-danger"
                    id="create_report_gp_close"
                    // onClick={resetData}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
