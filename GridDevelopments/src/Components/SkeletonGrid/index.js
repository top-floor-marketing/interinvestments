import { Skeleton } from "@mantine/core";

<<<<<<< HEAD
import styles from "./grid_developments_styles.module.scss";
=======
import styles from "./styles.gd.module.scss";
>>>>>>> e695d59bd466a9d4a55fa894ee3a3ee47ec9fc42

const SkeletonGrid = () => {
  const listItems = new Array(8).fill(0);
  return (
    <div className={styles.container}>
      {listItems.map((val, index) => (
        <Skeleton visible key={index + val}>
          <div className={styles.skeletonDiv}></div>
        </Skeleton>
      ))}
    </div>
  );
};

export default SkeletonGrid;
