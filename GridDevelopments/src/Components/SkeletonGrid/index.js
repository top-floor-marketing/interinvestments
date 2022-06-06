import { Skeleton } from "@mantine/core";

import styles from "./styles.gd.module.scss";

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
