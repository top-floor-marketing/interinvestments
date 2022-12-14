import React from "react";
import { Box, Loader } from "@mantine/core";
import { ChevronDown } from "tabler-icons-react";
// styles
import styles from "./styles_FL_.module.scss";

const IconSelect = ({ refProps, isLoading = false }) => {
  return (
    <Box
      className={styles.ContainerIconSelect}
      onClick={() => refProps.current.click()}
    >
      {isLoading ? (
        <Loader color="gray" size={14} />
      ) : (
        <ChevronDown size={14} />
      )}
    </Box>
  );
};

export default IconSelect;
