import { Text } from "@mantine/core";

import styles from "./blog_grid_styles.module.scss";

const EmptyBlog = () => {
  return (
    <div className={styles.container}>
      <Text className={styles.noData}>No data</Text>
    </div>
  );
};

export default EmptyBlog;
