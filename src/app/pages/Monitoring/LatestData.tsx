import { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { useForm, Controller } from "react-hook-form";
// import { ProblemTable } from "../../../_metronic/partials/widgets";
import { PageTitle } from "../../../_metronic/layout/core";
import { useIntl } from "react-intl";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { MultiSelect } from "../../../_metronic/layout/components/MultiSelect/MultiSelect";
// import { fetchHostGroup } from "../../../hostGroupSlice/hostGroupReducer";
// import { useDispatch } from "react-redux";
// import { Loader } from "../../../_metronic/layout/components/loader/Loader";
import BTN from "../../../_metronic/layout/components/BTN";
import { Modal } from "react-bootstrap";
import Input from "../../../_metronic/layout/components/Input";
import Tags from "../../modules/profile/components/hosts/tags/Index";

interface HostGroupData {
  payload: [];
  meta: {
    requestStatus: string;
  };
}

interface FormValues {
  selectProblems: string;
  selectGraphs: string;
  selectTags: string;
  selectDashboards: string;
  selectInterfaces: string;
  status: string;
  evaltype: string;
  maintenance_status: string;
  show_suppressed: string;
  name: string;
  ip: string;
  dns: string;
  port: string;
  severities: number[];
  groupids: string[];
  filter: [];
  tags: string[];
  inventory: { field: string; value: string }[];
  search: { name: string };
}

// interface HostsData {
//   id: number;
//   name: string;
//   host: string;
//   hostid: string;
// }

export function LatestData() {
  const { control, watch, setValue, reset } = useForm<FormValues>({
    defaultValues: {
      selectProblems: "extend",
      selectGraphs: "extend",
      selectTags: "extend",
      selectDashboards: "extend",
      selectInterfaces: "extend",
      evaltype: "",
      maintenance_status: "",
      show_suppressed: "",
      search: { name: "" },
      tags: [],
    },
  });

  const intl = useIntl();

  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);
  // const [hostsData, setHostsData] = useState<HostsData[]>([]);
  // const [hostGroupWithoutParam, setHostGroupWithoutParam] =
  useState<HostGroupData | null>(null);
  // const [activeButtonTag, setActiveButtonTag] = useState<string>("");
  // const [activeSituation, setActiveSituation] = useState<string>("");
  // const [hostGroups, setHostGroups] = useState([]);
  // const currentGroupids = watch("groupids") ? watch("groupids") : [];
  // const dispatch = useDispatch();
  const [isHostsModalOpen, setisHostsModalOpen] = useState<boolean>(false);
  // const [isHostsDataLoading, setIsHostsDataLoading] = useState<boolean>(false);
  // const [resetMultiSelect, setresetMultiSelect] = useState(false);
  // const [selectedHosts, setSelectedHosts] = useState([]);
  const [showTags, setShowTags] = useState<number>(3);
  const [tagNameVisible, setTagNameVisible] = useState<number>(0);

  // const currentHostids = watch("hostids") ? watch("hostids") : [];

  // const {
  //   fields: tagsField,
  //   append: tagsAppend,
  //   remove: tagsRemove,
  // } = useFieldArray({
  //   control,
  //   name: "tags",
  // });

  // const dataHost = async (data) => {
  //   // console.log(data);
  //   setIsLoaded(true);
  //   // setIsError(false);
  //   try {
  //     const response = await instance.post("/core/hosts/get", data);
  //     setData(response);
  //     setIsLoaded(false);
  //     console.log(response.data);
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching host data:", error);
  //     setIsError(true);
  //     throw error;
  //   }
  // };

  const resetData = () => {
    reset();
    // dataHost(watch());
  };

  // useEffect(() => {
  //   dataHost(watch());
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchHostGroup({})).then((response) => setHostGroups(response));
  // }, []);

  // const handleCheckboxChange = (host) => {
  //   if (currentHostids.includes(host.hostid)) {
  //     const newData = selectedHosts.filter((id) => id.value != host.hostid);
  //     setSelectedHosts(newData);
  //     setValue(
  //       "hostids",
  //       newData.map((i) => i.value)
  //     );
  //     console.log(newData);
  //   } else {
  //     setSelectedHosts([
  //       ...selectedHosts,
  //       { label: host.host, value: host.hostid },
  //     ]);
  //     setValue("hostids", [...currentHostids, host.hostid]);
  //   }
  // };

  return (
    <Content>
      <form>
        <PageTitle breadcrumbs={[]}>
          {intl.formatMessage({ id: "MENU.LATESTDATA" })}
        </PageTitle>
        <ToolbarWrapper />
        <div
          className="accordion"
          style={{ boxShadow: "0 0 10px -10px black" }}
          id="monitoring-hosts"
        >
          <div className="accordion-item">
            <button
              className="accordion-button w-100"
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
                <div className="row gap-5">
                  <div className="col">
                    <div
                      className="btn-group btn-group-toggle d-flex flex-column"
                      data-toggle="buttons"
                    >
                      <MultiSelect
                        // reset={resetMultiSelect}
                        addAll={false}
                        title="MENU.SELECT.HOSTS.GP"
                        options={
                          // hostGroupWithoutParam
                          //   ? hostGroupWithoutParam.payload
                          //   : []
                          []
                        }
                        Loading={false}
                        DataName="groupids"
                        setData={setValue}
                        currentData={[]}
                        reset={false}
                      />
                      <div className="row column-gap-3 m-0 my-3">
                        <div className="col p-0">
                          <MultiSelect
                            reset={false}
                            addAll={true}
                            title="MENU.SELECT.HOSTS.GP"
                            options={[]}
                            Loading={false}
                            DataName="hostids"
                            setData={setValue}
                            currentData={[]}
                          />
                        </div>
                        <button
                          className="btn h-25 py-3 btn-light-primary px-0 col-2"
                          onClick={() => setisHostsModalOpen(true)}
                        >
                          {intl.formatMessage({
                            id: "MENU.SELECT",
                          })}
                        </button>
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
                          {/* <Form.Select
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
                          </Form.Select> */}
                          <div className=" h-350px overflow-y-scroll mt-2">
                            {/* {!true ? (
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
                                    checked={currentHostids.includes(
                                      host.hostid
                                    )}
                                    onChange={() => handleCheckboxChange(host)}
                                  />
                                </div>
                              ))
                            ) : (
                              <div className="d-flex pt-7 w-100 justify-content-center">
                                <Loader />
                              </div>
                            )} */}
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
                        <div className="col">
                          <Controller
                            name="search.name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Input
                                iconName="price-tag"
                                placeholder={intl.formatMessage({
                                  id: "MONITORING.PROBLEMS.TAGS.SHOW.TITLE.PRIORITY",
                                })}
                                value={field.value.toString()}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                        <div className="col">
                          <Input
                            className=""
                            iconName="user"
                            placeholder={intl.formatMessage({ id: "NAME" })}
                            value=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col d-grid gap-3">
                    <div className="row">
                      <p className="m-0">
                        {intl.formatMessage({
                          id: "MONITORING.PROBLEMS.TAGS",
                        })}
                        :
                      </p>
                      {/* {tagsField.map((item, index) => (
                        <div className="row gap-3" key={item.id}>
                          <div className="col p-0">
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
                                />
                              )}
                            />
                          </div>
                          <div className="col p-0">
                            <Controller
                              name={`tags[${index}].operator`}
                              control={control}
                              render={({ field }) => (
                                <select
                                  className="form-select form-select-sm"
                                  id={`floatingSelect${item.id}`}
                                  onChange={(e) => {
                                    const newValue = parseInt(
                                      e.target.value,
                                      10
                                    );
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
                          </div>

                          <div className="col p-0">
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
                                />
                              )}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-danger me-2 py-2 col-2"
                            onClick={() => tagsRemove(index)}
                          >
                            {intl.formatMessage({
                              id: "DELETE",
                            })}
                          </button>
                        </div>
                      ))} */}
                    </div>
                    <div className="row">
                      <BTN
                        label={intl.formatMessage({ id: "ADD" })}
                        className="btn-light-success py-2 m-0 col-3"
                        // onClick={() => {
                        //   tagsAppend({ tag: "", operator: 0, value: "" });
                        // }}
                      />
                    </div>

                    <div className="row">
                      <div className="w-100">
                        <p>
                          {intl.formatMessage({
                            id: "MONITORING.PROBLEMS.SHOWBASEDON",
                          })}
                        </p>
                        <Tags
                          showTags={showTags}
                          setShowTags={setShowTags}
                          tagNameVisible={tagNameVisible}
                          setTagNameVisible={setTagNameVisible}
                          setValue={setValue}
                          activeButtonTag={watch("evaltype")}
                          // control={control}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mb-5 gap-5 ">
                <BTN
                  label={intl.formatMessage({ id: "SUBMIT" })}
                  className="btn-light-success"
                  // onClick={submit}
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
        {/* {data.length == 0 && <p>هاستی یافت نشد</p>} */}
        {/* {!isLoaded ? (
          <ProblemTable ProblemsData={[]} isLoaded={true} />
        ) : (
          <div className="d-flex pt-7 w-100 justify-content-center">
            <Loader />
          </div>
        )} */}
      </form>
    </Content>
  );
}
