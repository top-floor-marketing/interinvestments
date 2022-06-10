import { Skeleton } from "@mantine/core";

import styles from "./styles.cb.module.scss";

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
