import { Select } from "@react-md/form";
import React from "react";
import { worlds } from "zwift-data";
import { useLocationState } from "../../hooks/useLocationState";
import styles from "./WorldSelect.module.scss";

const options = [...worlds]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((world) => ({
    label: world.name,
    value: world.slug,
  }));

export function WorldSelect() {
  const [locationState, setLocationState] = useLocationState();

  return (
    <div className={styles.Container}>
      <Select
        id="world-select"
        options={options}
        value={locationState.world.slug}
        listboxStyle={{ zIndex: 3000 }}
        onChange={(newWorldSlug) => {
          setLocationState({
            world: worlds.find((w) => w.slug === newWorldSlug)!,
            query: "",
            type: "default",
          });
        }}
      />
    </div>
  );
}
