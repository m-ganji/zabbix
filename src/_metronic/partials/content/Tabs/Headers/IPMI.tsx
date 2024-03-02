import React, { useState } from "react";
import { Controller } from "react-hook-form";
interface HostProps {
  control: object;
  watch: () => void;
}

const IPMI: React.FC<HostProps> = ({ control, watch, setValue }) => {
  const [authAlgorithm, setAuthAlgorithm] = useState("-1");
  const [accessLevel, setAccessLevel] = useState("-1");

  const handleAuthAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAuthAlgorithm(event.target.value);
    setValue("ipmi_authtype", event.target.value);
  };

  const handleAccessLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAccessLevel(event.target.value);
    setValue("ipmi_privilege", event.target.value);
  };

  return (
    <div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="AuthenticationAlgorithm" className="form-label">
            الگوریتم احراز هویت
          </label>
          <select
            className="form-select form-select-lg"
            name="AuthenticationAlgorithm"
            id="AuthenticationAlgorithm"
            value={authAlgorithm}
            onChange={handleAuthAlgorithmChange}
          >
            <option value="-1">پیش فرض</option>
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
            name="AccessLevel"
            id="AccessLevel"
            value={accessLevel}
            onChange={handleAccessLevelChange}
          >
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
          <label className="form-label">نام کاربری</label>

          <Controller
            name={`ipmi_username`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="form-control"
                autoComplete="off"
                placeholder="نام کاربری را اینجا وارد نمایید"
              />
            )}
          />
        </div>
        <form className="col">
          <label htmlFor="password" className="form-label">
            رمز عبور
          </label>
          <div className="input-group">
            <Controller
              name={`ipmi_password`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control rounded-end-2 rounded-start-0 "
                  id="password"
                  placeholder="رمز عبور را اینجا وارد نمایید"
                  autoComplete="off"
                />
              )}
            />

            {/* <button
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
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IPMI;
