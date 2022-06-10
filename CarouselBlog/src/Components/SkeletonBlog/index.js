import { Skeleton } from "@mantine/core";

<<<<<<< HEAD
import styles from "./blog_grid_styles.module.scss";
=======
import styles from "./styles.cb.module.scss";
>>>>>>> e695d59bd466a9d4a55fa894ee3a3ee47ec9fc42

const SkeletonBlog = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gridContent}>
        <Skeleton visible className="w-2/3">
          <div className="h-[25px]"></div>
        </Skeleton>
        <Skeleton visible>
          <div className="w-full h-[90px]"></div>
        </Skeleton>
        <Skeleton visible>
          <div className="w-full h-[120px]"></div>
        </Skeleton>
        <Skeleton visible className="w-[125px]">
          <div className="w-full h-[45px]"></div>
        </Skeleton>
      </div>
      <div className={styles.imageContainer}>
        <Skeleton visible>
          <div className={styles.image}></div>
        </Skeleton>
      </div>
    </div>
  );
};

export default SkeletonBlog;
