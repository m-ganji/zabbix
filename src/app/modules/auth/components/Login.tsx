import { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { instance } from "../../../../services/axiosInstance";
import { useIntl } from "react-intl";

const initialValues = {};
interface LoginValues {
  email: string;
  password: string;
}
export function Login() {
  const intl = useIntl();

  const [loading, setLoading] = useState(false);

  console.log(initialValues);

  const formik = useFormik({
    initialValues,
    // validationSchema: loginSchema,
    onSubmit: async (values: LoginValues) => {
      setLoading(true);
      try {
        const response = await instance.post(
          "/auth/login",
          `username=${values.email}&password=${values.password}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        window.location.href = "/dashboard";
        if (
          document.referrer.includes("https://persian-zabbix-frontend.com") ||
          document.referrer.includes("http://localhost:")
        ) {
          // User came from another page within our domain, so go back in history
          // window.history.back();
        } else {
          // User directly accessed the login page, so redirect to dashboard
        }

        localStorage.setItem("token", response.data.access_token);
      } catch (error) {
        console.error("Error logging in:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
      dir="rtl"
    >
      {/* begin::Heading */}
      <div className="text-center mb-11">
        <h1 className="text-gray-900 fw-bolder mb-3">ورود</h1>
        <div className="text-gray-500 fw-semibold fs-6">
          فناوران توسعه امن ناجی
        </div>
      </div>

      {/* end::Login options */}

      {/* begin::Form group */}
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">
          {intl.formatMessage({
            id: "MENU.LOGIN.USERNAME",
          })}
        </label>
        <input
          placeholder={intl.formatMessage({
            id: "MENU.LOGIN.USERNAME",
          })}
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          {intl.formatMessage({
            id: "MENU.LOGIN.PASSWORD",
          })}
        </label>
        <input
          placeholder={intl.formatMessage({
            id: "MENU.LOGIN.PASSWORD",
          })}
          type="password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.password && formik.errors.password,
            },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />

        {/* begin::Link */}
        <Link to="/auth/forgot-password" className="link-primary">
          فراموشی رمز عبور
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">ورود</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              صبر کنید...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  );
}
