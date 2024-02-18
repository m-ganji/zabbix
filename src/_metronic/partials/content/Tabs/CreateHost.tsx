import { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { instanceZabbix } from "../../../../services/axiosInstance";
import Select, { ValueType } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface ZabbixRequest {
  jsonrpc: string;
  auth: string;
  method: string;
  params: {
    output: string;
  };
  id: number;
}
interface ApiItem {
  groupid: string;
  name: string;
}
interface Option {
  label: string;
  value: string;
}

interface OptionType {
  value: string;
  label: string;
}

const CreateHost: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [hostGroup, setHostGroup] = useState<Option[]>([]); // Correctly typed state
  const [selectedHost, setSelectedHost] = useState<OptionType[] | null>([]);

  const [IsHostGpFetchLoading, setIsHostGpFetchLoading] =
    useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsHostGpFetchLoading(true);
    try {
      const requestData: ZabbixRequest = {
        jsonrpc: "2.0",
        auth: "00adfa66232686959999fc40d1ab81edf3ff547181ad7e52df819b19031bb391",
        method: "hostgroup.get",
        params: {
          output: "extend",
        },
        id: 1,
      };
      const response: AxiosResponse<{ result: ApiItem[] }> =
        await instanceZabbix.post("/", requestData);
      const apiData: ApiItem[] = response.data.result;

      const transformedData = apiData.map((item) => ({
        label: item.name,
        value: item.groupid,
      }));

      setHostGroup(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsHostGpFetchLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (selectedOptions: ValueType<OptionType>) => {
    setSelectedHost(selectedOptions as OptionType[]);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "white", // Set background color of the control (the input)
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "white", // Set background color of the dropdown menu
    }),
  };

  return (
    <div dir="rtl">
      <div className="card-header border-0 pt-5 w-100 ">
        <div className="card-toolbar">
          <ul className="nav">
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
                data-bs-toggle="tab"
                href="#tab-hosts"
              >
                هاست
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4 me-1"
                data-bs-toggle="tab"
                href="#tab-ipmi"
              >
                IPMI
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-tags"
              >
                تگ ها
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-macro"
              >
                ماکرو ها
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-inventory"
              >
                فهرست
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-encription"
              >
                رمز گذاری
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab"
                href="#tab-set-value"
              >
                تعیین مقدار
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="tab-content">
          <div className="tab-pane active show" id="tab-hosts">
            <div className="container text-center">
              <div className="row">
                <div className="input-group mb-3 col">
                  <span
                    className="input-group-text rounded-start-0 rounded-end-2"
                    id="tab-hosts"
                  >
                    <i className="bi bi-hdd-network" />
                  </span>
                  <input
                    type="text"
                    className="form-control rounded-start-2 rounded-end-0"
                    placeholder="نام هاست"
                    aria-label="نام هاست"
                    aria-describedby="tab-hosts"
                    required
                  />
                </div>
                <div className="input-group mb-3 col">
                  <span
                    className="input-group-text rounded-start-0 rounded-end-2"
                    id="tab-hosts"
                  >
                    <i className="bi bi-bullseye" />
                  </span>
                  <input
                    type="text"
                    className="form-control rounded-start-2 rounded-end-0"
                    placeholder="نام نمایشی"
                    aria-label="نام نمایشی"
                    aria-describedby="tab-hosts"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col w-50">
                  <Select
                    isMulti
                    options={hostGroup}
                    value={selectedHost}
                    onChange={handleChange}
                    className="basic-multi-select"
                    classNamePrefix="گروه های هاست"
                    placeholder="گروه های هاست"
                    components={animatedComponents}
                    styles={customStyles} // Apply custom styles
                  />
                </div>
                <div className="col">
                  <select
                    className="form-select form-select-lg"
                    name="AuthenticationAlgorithm"
                    id="AuthenticationAlgorithm"
                  >
                    <option value="-1" selected>
                      پیش فرض
                    </option>
                    <option value="0">هیچکدام</option>
                    <option value="1">MD2</option>
                    <option value="2">MD5</option>
                    <option value="4">Straight</option>
                    <option value="5">OEM</option>
                    <option value="6">RMCP+</option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <div dir="rtl" className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="توضیحات را اینجا وارد کنید"
                      id="floatingTextarea2"
                      style={{ height: 100 }}
                    />
                    <label htmlFor="floatingTextarea2">توضیحات</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane container" id="tab-ipmi">
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="AuthenticationAlgorithm" className="form-label">
                  الگوریتم احراز هویت
                </label>
                <select
                  className="form-select form-select-lg"
                  name="AuthenticationAlgorithm"
                  id="AuthenticationAlgorithm"
                >
                  <option value="-1" selected>
                    پیش فرض
                  </option>
                  <option value="0">هیچکدام</option>
                  <option value="1">MD2</option>
                  <option value="2">MD5</option>
                  <option value="4">Straight</option>
                  <option value="5">OEM</option>
                  <option value="6">RMCP+</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="AuthenticationAlgorithm" className="form-label">
                  سطح دسترسی
                </label>
                <select
                  className="form-select form-select-lg"
                  name="AuthenticationAlgorithm"
                  id="AuthenticationAlgorithm"
                >
                  <option value="-1" selected>
                    پیش فرض
                  </option>
                  <option value="0">CallBack</option>
                  <option value="1">کاربر</option>
                  <option value="2">اپراتور</option>
                  <option value="4">ادمین</option>
                  <option value="5">OEM</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label className="form-label">اسم</label>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  placeholder="اسم را اینجا وارد نمایید"
                />
              </div>
              <form className="col">
                <label htmlFor="password" className="form-label">
                  رمز عبور
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control rounded-end-2 rounded-start-0 "
                    id="password"
                    placeholder="رمز عبور را اینجا وارد نمایید"
                    autoComplete="off"
                  />
                  <button
                    className="btn border rounded-start-2 rounded-end-0"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    <div>
                      {showPassword ? (
                        <i className="bi bi-eye-slash" />
                      ) : (
                        <i className="bi bi-eye" />
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="tab-pane" id="tab-tags">
            <p>Content for tab-Tags tab goes here.</p>
          </div>
          <div className="tab-pane" id="tab-macro">
            <p>Content for Macros tab goes here.</p>
          </div>
          <div className="tab-pane" id="tab-inventory">
            <p>Content for List tab goes here.</p>
          </div>
          <div className="tab-pane" id="tab-encription">
            <p>Content for Encryption tab goes here.</p>
          </div>
          <div className="tab-pane" id="tab-set-value">
            <p>Content for Set Value tab goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateHost };
