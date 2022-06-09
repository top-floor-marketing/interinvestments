import { Text } from "@mantine/core";

<<<<<<< HEAD
import styles from "./blog_grid_styles.module.scss";
=======
import styles from "./styles.cb.module.scss";
>>>>>>> e695d59bd466a9d4a55fa894ee3a3ee47ec9fc42

const EmptyBlog = () => {
  return (
    <div className={styles.container}>
      <Text className={styles.noData}>No data</Text>
    </div>
  );
};

export default EmptyBlog;
