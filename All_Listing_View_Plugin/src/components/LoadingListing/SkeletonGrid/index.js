import { Skeleton } from "@mantine/core";

import styles from "./styles_gd_ALV.module.scss";

const SkeletonGrid = () => {
  const listItems = new Array(4).fill(0);
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
