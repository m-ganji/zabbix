import { useState } from "react";
import { Control } from "react-hook-form";
import { useIntl } from "react-intl";
interface HostProps {
  control: Control;
  watch: CallableFunction;
  register: CallableFunction;
}

const Encryption: React.FC<HostProps> = ({ register }) => {
  const intl = useIntl();
  const [activeEncryption, setActiveEncryption] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleCheckboxChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <div
        className="btn-group py-2 d-flex align-items-baseline w-50"
        role="group"
        aria-label="Basic example"
      >
        <p className="w-25">
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.ENCRYPTION.TO",
          })}
        </p>
        <button
          type="button"
          className={`btn btn-primary rounded-end-2 py-2 ${
            activeEncryption === "NOENCRYPTION" ? "active" : ""
          }`}
          onClick={() => {
            setActiveEncryption("NOENCRYPTION");
          }}
          data-bs-toggle="button"
        >
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.ENCRYPTION.NOENCRYPTION",
          })}
        </button>
        <button
          type="button"
          className={`btn btn-primary py-2 ${
            activeEncryption === "PSK" ? "active" : ""
          }`}
          onClick={() => {
            setActiveEncryption("PSK");
          }}
          data-bs-toggle="button"
        >
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.ENCRYPTION.PSK",
          })}
        </button>
        <button
          type="button"
          className={`btn btn-primary rounded-start-2 py-2 ${
            activeEncryption === "CERTIFICATE" ? "active" : ""
          }`}
          onClick={() => {
            setActiveEncryption("CERTIFICATE");
          }}
          data-bs-toggle="button"
        >
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.ENCRYPTION.CERTIFICATE",
          })}
        </button>
      </div>

      <div className="d-flex gap-2 W-50 align-items-center">
        <p className="mt-xl-5 me-3">
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.ENCRYPTION.FROM",
          })}
        </p>
        <div className="d-flex justify-content-end gap-2">
          <input
            type="checkbox"
            checked={selectedOption === "noencryption"}
            onChange={() => handleCheckboxChange("noencryption")}
            value="1"
          />
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.ENCRYPTION.NOENCRYPTION",
          })}
          <input
            type="checkbox"
            checked={selectedOption === "psk"}
            onChange={() => handleCheckboxChange("psk")}
            value="1"
          />
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.ENCRYPTION.PSK",
          })}
          <input
            type="checkbox"
            checked={selectedOption === "certificate"}
            onChange={() => handleCheckboxChange("certificate")}
            value="1"
          />
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.ENCRYPTION.CERTIFICATE",
          })}
          <input type="hidden" value="1" />
        </div>
      </div>
      {activeEncryption == "CERTIFICATE" &&
        selectedOption !== "certificate" && (
          <div className="d-flex gap-5 ">
            <input
              {...register(`tls_issuer`)}
              type="text"
              className="form-control rounded-start-2 rounded-end-0 mt-3 mb-3"
              placeholder="صادر کننده"
              aria-describedby="tab-hosts"
              required
            />
            <input
              {...register(`tls_subject`)}
              type="text"
              className="form-control rounded-start-2 rounded-end-0 mt-3 mb-3"
              placeholder="موضوع"
              aria-describedby="tab-hosts"
              required
            />
          </div>
        )}
      {activeEncryption == "PSK" && selectedOption !== "psk" && (
        <div className="d-flex gap-5 ">
          <input
            {...register(`tls_psk_identity`)}
            type="text"
            className="form-control rounded-start-2 rounded-end-0 mt-3 mb-3"
            placeholder="هویت PSK"
            aria-describedby="tab-hosts"
            required
          />

          <input
            {...register(`tls_psk`)}
            type="text"
            className="form-control rounded-start-2 rounded-end-0 mt-3 mb-3"
            placeholder="PSK"
            aria-describedby="tab-hosts"
            required
          />
        </div>
      )}
      {selectedOption == "certificate" && (
        <div className="d-flex gap-5 ">
          <input
            {...register(`tls_issuer`)}
            type="text"
            className="form-control rounded-start-2 rounded-end-0 mt-3 mb-3"
            placeholder="صادر کننده"
            aria-describedby="tab-hosts"
            required
          />
          <input
            {...register(`tls_subject`)}
            type="text"
            className="form-control rounded-start-2 rounded-end-0 mt-3 mb-3"
            placeholder="موضوع"
            aria-describedby="tab-hosts"
            required
          />
        </div>
      )}
      {selectedOption == "psk" && (
        <div className="d-flex gap-5 ">
          <input
            {...register(`tls_psk_identity`)}
            type="text"
            className="form-control rounded-start-2 rounded-end-0 mt-3 mb-3"
            placeholder="هویت PSK"
            aria-describedby="tab-hosts"
            required
          />

          <input
            {...register(`tls_psk`)}
            type="text"
            className="form-control rounded-start-2 rounded-end-0 mt-3 mb-3"
            placeholder="PSK"
            aria-describedby="tab-hosts"
            required
          />
        </div>
      )}
    </div>
  );
};
export default Encryption;
