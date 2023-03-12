import React from "react";
//mantine
import { Skeleton } from "@mantine/core";

// css
import styles from "./styles.sqs.module.scss";

const SkeletonQuickSearch = () => {
  return (
    <>
      <Skeleton height={35} className="col-span-3 md:col-span-2" />
      <Skeleton className="hidden md:block col-span-2" height={35} />
      <Skeleton height={35} className="col-span-3 md:col-span-2" />
      <Skeleton height={35} className={styles.selectSkeleton} />
      <Skeleton className={styles.InputTabsSkeleton} height={35} />
    </>
  );
};

export default SkeletonQuickSearch;
