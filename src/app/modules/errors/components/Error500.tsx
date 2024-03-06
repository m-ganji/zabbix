import { FC } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useIntl } from "react-intl";

const Error500: FC = () => {
  const intl = useIntl();

  return (
    <>
      {/* begin::Text */}
      <div className="fw-semibold fs-6 text-gray-500 mb-7">
        {intl.formatMessage({
          id: "MONITORING.ERROR.500.TITLE",
        })}
      </div>
      {/* end::Text */}

      {/* begin::Illustration */}
      <div className="mb-11">
        <img
          src={toAbsoluteUrl("media/auth/500-error.png")}
          className="mw-100 mh-300px theme-light-show"
          alt=""
        />
        <img
          src={toAbsoluteUrl("media/auth/500-error-dark.png")}
          className="mw-100 mh-300px theme-dark-show"
          alt=""
        />
      </div>
      {/* end::Illustration */}

      {/* begin::Link */}
      <div className="mb-0">
        <Link to="/dashboard" className="btn btn-sm btn-primary">
          {intl.formatMessage({
            id: "MONITORING.ERROR.404.RETURN",
          })}{" "}
        </Link>
      </div>
      {/* end::Link */}
    </>
  );
};

export { Error500 };
