//mantine
import { Box, Text } from "@mantine/core";
//css
import styles from "./styles.mqs.module.scss";

const NoImagen = () => {
  return (
    <Box className={`${styles.NoImageBox} ${styles.imageListing}`}>
      <Text component="p">No Image</Text>
    </Box>
  );
};

export default NoImagen;
