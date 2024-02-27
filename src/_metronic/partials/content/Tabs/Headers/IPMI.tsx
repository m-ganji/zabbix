import React, { useState } from "react";

export default function IPMI() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            defaultValue="-1"
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
            name="AuthenticationAlgorithm"
            id="AuthenticationAlgorithm"
            defaultValue="-1"
          >
            <option value="-1">پیش فرض</option>
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
  );
}
