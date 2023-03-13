import React from "react";

import { TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";

// css
import styles from "./styles.tqs.module.scss";

const InputTabs = (props) => {
  const { className: classNameprops, value = "", onChange } = props;
  return (
    <TextInput
      onChange={(text) => onChange(text.target.value)}
      value={value}
      className={`${classNameprops}`}
      classNames={{
        input: styles.InputTabsMantine,
      }}
      rightSection={<Search />}
      placeholder="Condo name, or zip code"
    />
  );
};

export default InputTabs;
