import React from "react";
import { useIntl } from "react-intl";
import inputsTitle from "../../../../../app/modules/profile/components/InventoryList";
import { useState } from "react";
import { Controller } from "react-hook-form";

interface HostProps {
  control: object;
  watch: () => void;
}

const Inventory: React.FC<HostProps> = ({ control, watch }) => {
  const intl = useIntl();
  const [activeInventory, setActiveInventory] = useState<string>("");

  const pairs = [];
  for (let i = 0; i < inputsTitle.length; i += 2) {
    pairs.push(inputsTitle.slice(i, i + 2));
  }

  return (
    <div>
      <div className="btn-group py-2" role="group" aria-label="Basic example">
        <button
          type="button"
          className={
            "btn btn-primary rounded-end-2 py-2" +
            (activeInventory === "DISABLED" ? " active" : "")
          }
          onClick={() => {
            setActiveInventory("DISABLED");
          }}
          data-bs-toggle="button"
        >
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.INVENTORY.DISABLED",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-primary py-2" +
            (activeInventory === "MANUAL" ? " active" : "")
          }
          onClick={() => {
            setActiveInventory("MANUAL");
          }}
          data-bs-toggle="button"
        >
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.INVENTORY.MANUAL",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-primary rounded-start-2 py-2" +
            (activeInventory === "AUTOMATIC" ? " active" : "")
          }
          onClick={() => {
            setActiveInventory("AUTOMATIC");
          }}
          data-bs-toggle="button"
        >
          {intl.formatMessage({
            id: "MONITORING.HOSTS.CREATEHOST.INVENTORY.AUTOMATIC",
          })}
        </button>
      </div>

      {pairs.map((pair, index) => (
        <div key={index} className="d-flex">
          {pair.map((input) => (
            <div key={input.id} className="w-50 p-2">
              <label
                htmlFor={`exampleInputEmail${input.id}`}
                className="form-label"
              >
                {input.title}
              </label>
              <Controller
                name={`Inventory.${input.name}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={input.isTextArea ? "textarea" : "text"}
                    disabled={activeInventory === "DISABLED"}
                    className="form-control py-2"
                    id={`exampleInputEmail${input.id}`}
                    aria-describedby="emailHelp"
                    placeholder={input.title}
                    style={{ direction: "rtl" }}
                    dir="rtl"
                  />
                )}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Inventory;
