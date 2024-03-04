import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "../../../../_metronic/layout/components/MultiSelect/MultiSelect";
import { Form, Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../../services/axiosInstance";
import { Loader } from "../../../../_metronic/layout/components/loader/Loader";
import BTN from "../../../../_metronic/layout/components/BTN";
import { Content } from "../../../../_metronic/layout/components/content";
import { BusiestTriggersTabel } from "../../../../_metronic/partials/widgets/tables/BusiestTriggersTabel";
import Severities from "../../../modules/profile/components/hosts/severities/Index";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

interface FormValues {
  selectTags: string;
  selectHosts: string;
  hostids: number[];
  search: {
    name: string;
  };
  tag_name_format: number;
  time_from: string;
  age_state: string;
  recent: string;
  acknowledged: boolean;
  suppressed: boolean;
  symptom: boolean;
  tag_priority: string;
  evaltype: string;
  tags: {
    tag: string;
    operator: number;
    value: string;
  }[];
  inventory: {
    field: string;
    value: string;
    [index: number]: {
      field: string;
    };
  }[];
  severities: number[];
  objectids: [];
  groupids: [];
}
interface HostsData {
  id: number;
  name: string;
  host: string;
  hostid: string;
}
interface hostGroupItems {
  value: string;
  label: string;
}
interface HostGroupData {
  payload: [];
  meta: {
    requestStatus: string;
  };
}
const BusiestTriggers = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isHostsModalOpen, setisHostsModalOpen] = useState<boolean>(false);
  const [isHostsDataLoading, setIsHostsDataLoading] = useState<boolean>(false);
  const [selectedHosts, setSelectedHosts] = useState<hostGroupItems[]>([]);
  const [hostsData, setHostsData] = useState<HostsData[]>([]);
  const [hostGroupWithoutParam, setHostGroupWithoutParam] =
    useState<HostGroupData | null>(null);
  const [resetMultiSelect, setresetMultiSelect] = useState(false);

  const { control, watch, setValue, handleSubmit, reset, unregister } =
    useForm<FormValues>({
      defaultValues: {
        selectTags: "extend",
        selectHosts: "extend",
        search: { name: "" },
        tag_name_format: 0,
        time_from: "14",
        age_state: "0",
        acknowledged: false,
        suppressed: false,
        symptom: false,
        tag_priority: "",
        evaltype: "0",
        tags: [],
        inventory: [],
        hostids: [],
        recent: "1",
      },
    });

  const currentHostids = watch("hostids") ? watch("hostids") : [];
  const currentGroupids = watch("groupids") ? watch("groupids") : [];

  const fetchHostsData = async (params: string, with_triggers: boolean) => {
    console.log(with_triggers);

    setIsHostsDataLoading(true);
    const param =
      Number(params) === -1
        ? with_triggers
          ? { with_triggers: "extend" }
          : {}
        : with_triggers
        ? { groupids: [params], with_triggers: "extend" }
        : { groupids: [params] };

    try {
      const response = await instance.post("/core/hosts/get", param);
      setHostsData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsHostsDataLoading(false);
  };
  const handleCheckboxChange = (host) => {
    if (currentHostids.includes(host.hostid)) {
      const newData = selectedHosts.filter((id) => id.value != host.hostid);
      setSelectedHosts(newData);
      setValue(
        "hostids",
        newData.map((i) => i.value)
      );
      console.log(newData);
    } else {
      setSelectedHosts([
        ...selectedHosts,
        { label: host.host, value: host.hostid },
      ]);
      setValue("hostids", [...currentHostids, host.hostid]);
    }
  };

  const resetData = () => {
    setResetMultiSelect(true);
    reset();
    setSelectedHosts([]);
    resetMultiSelect && setResetMultiSelect(false);
  };

  const submit = () => {
    currentHostids.length === 0 && unregister("hostids");
    currentGroupids.length === 0 && unregister("groupids");
    handleSubmit(fetchPromsListData)();
  };

  return (
    <>
      <Content>
        <PageTitle breadcrumbs={[]}>
          {intl.formatMessage({ id: "REPORTS.BUSIEST_TRIGGERS" })}
        </PageTitle>
        <ToolbarWrapper />

        <div>
          <div
            className="accordion "
            style={{ boxShadow: "0 0 10px -10px black" }}
            id="monitoring-hosts"
          >
            <div className="accordion-item ">
              <button
                className="accordion-button px-5 py-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <span className="w-100 text-end">فیلتر</span>
              </button>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#monitoring-hosts"
              >
                <div className="accordion-body">
                  <div className="d-flex flex-column align-items-center gap-3">
                    <div className="w-50">
                      <MultiSelect
                        reset={resetMultiSelect}
                        addAll={false}
                        title="MENU.SELECT.HOSTS.GP"
                        options={
                          hostGroupWithoutParam
                            ? hostGroupWithoutParam.payload
                            : []
                        }
                        Loading={
                          hostGroupWithoutParam &&
                          hostGroupWithoutParam.meta &&
                          hostGroupWithoutParam.meta.requestStatus !==
                            "fulfilled"
                        }
                        DataName="groupids"
                        setData={setValue}
                        currentData={currentGroupids}
                      />
                    </div>
                    <div className="w-50 d-flex gap-3">
                      <div className="w-100">
                        <MultiSelect
                          reset={false}
                          addAll={true}
                          title="MENU.SELECT.HOSTS"
                          options={selectedHosts}
                          Loading={false}
                          DataName="hostids"
                          setData={setValue}
                          currentData={currentHostids}
                        />
                      </div>
                      <button
                        className="btn h-25 py-3 btn-light-primary px-10"
                        onClick={() => setisHostsModalOpen(true)}
                      >
                        {intl.formatMessage({
                          id: "MENU.SELECT",
                        })}
                      </button>
                    </div>
                    <div className="w-50">
                      <p>
                        {intl.formatMessage({
                          id: "MONITORING.HOSTS.SEVERITY",
                        })}
                      </p>
                      <Severities watch={watch} setValue={setValue} />
                    </div>
                  </div>
                </div>
                <Modal
                  show={isHostsModalOpen}
                  onHide={() => setisHostsModalOpen(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {intl.formatMessage({ id: "MENU.SELECT.HOSTS" })}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body dir="rtl">
                    <Form.Select
                      defaultValue={-1}
                      onChange={(e) =>
                        fetchHostsData(e.currentTarget.value, false)
                      }
                    >
                      <option value={-1}>
                        {intl.formatMessage({ id: "MENU.SELECT.ALL" })}
                      </option>
                      {hostGroupWithoutParam?.payload?.map(
                        (item: hostGroupItems, index: number) => {
                          return (
                            <option value={item.value} key={index}>
                              {item.label}
                            </option>
                          );
                        }
                      )}
                    </Form.Select>
                    <div className=" h-350px overflow-y-scroll mt-2">
                      {!isHostsDataLoading ? (
                        hostsData.map((host) => (
                          // console.log(currentHostids, host),
                          <div
                            key={host.hostid}
                            className="w-100 justify-content-end my-3 gap-2 d-flex"
                          >
                            <label
                              className="form-check-label"
                              htmlFor={`host-${host.hostid}`}
                            >
                              {host.host}
                            </label>
                            <input
                              type="checkbox"
                              id={`host-${host.hostid}`}
                              checked={currentHostids.includes(host.hostid)}
                              onChange={() => handleCheckboxChange(host)}
                            />
                          </div>
                        ))
                      ) : (
                        <div className="d-flex pt-7 w-100 justify-content-center">
                          <Loader />
                        </div>
                      )}
                    </div>

                    <div className="d-flex justify-content-center mt-2">
                      <button
                        type="button"
                        onClick={() => setisHostsModalOpen(false)}
                        className="btn py-2 btn-light-danger"
                      >
                        بستن
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
                <div className="row">
                  <div className="col-4">
                    <div></div>
                  </div>
                  <div className="d-flex w-100 justify-content-center mt-10 column-gap-5">
                    <BTN
                      label={intl.formatMessage({ id: "SUBMIT" })}
                      className="btn-light-success"
                      onClick={submit}
                    />
                    <BTN
                      label="باز نشانی"
                      className="btn-light-danger"
                      onClick={resetData}
                    />
                    <BTN
                      label="ذخیره"
                      className="btn-light-primary"
                      // onClick={resetData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BusiestTriggersTabel />
      </Content>
    </>
  );
};

export default BusiestTriggers;
