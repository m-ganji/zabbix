import React from "react";
import inputsTitle from "../../../../../app/modules/profile/components/InventoryList";
import { useState } from "react";
import Input from "../../../../layout/components/Input";
import ToggleBtns from "../../../../layout/components/ToggleBtn/ToggleBtn";

interface HostProps {
  setValue: CallableFunction;
  watch: CallableFunction;
}

const Inventory: React.FC<HostProps> = ({ setValue, watch }) => {
  const [activeInventory, setActiveInventory] = useState<string>("DISABLED");

  return (
    <div>
      <ToggleBtns
        options={[
          { label: "DISABLED", value: "DISABLED" },
          {
            label: "MONITORING.HOSTS.CREATEHOST.INVENTORY.MANUAL",
            value: "MANUAL",
          },
          {
            label: "MONITORING.HOSTS.CREATEHOST.INVENTORY.AUTOMATIC",
            value: "AUTOMATIC",
          },
        ]}
        setData={setActiveInventory}
        initialData={activeInventory}
      />
      <div
        style={{ gridTemplateColumns: "1fr 1fr" }}
        className="mt-3 d-grid gap-2 mh-650px overflow-y-scroll p-2 "
      >
        {inputsTitle.map((input, key) => (
          <Input
            key={key}
            iconName="abstract-42"
            placeholder={input.title}
            value={watch(`inventory.${input.name}`)}
            onChange={(e) =>
              setValue(`inventory.${input.name}`, e.currentTarget.value)
            }
            disabled={activeInventory === "DISABLED"}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
