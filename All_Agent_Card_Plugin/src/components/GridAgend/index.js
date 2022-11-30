import React from "react";
// components
import CardSkeleton from "./CardSkeleton";
import GridVirtualizerVariable from "../../components/VirtualContain";
// mantine
import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
// styles
import styles from "./styles.GA.module.scss";

const GridAgend = ({ listAgent, isLoading }) => {
  const { ref: refParentBox, width: widthParent } = useElementSize();

  const columnsVirtual = (widthContainer) => {
    if (widthContainer >= 640 && widthContainer <= 770) {
      return 2;
    }

    if (widthContainer >= 771 && widthContainer < 1265) {
      return 3;
    }

    if (widthContainer >= 1265) {
      return 4;
    }

    return 1;
  };

  const columns = columnsVirtual(widthParent);

  return (
    <Box
      ref={refParentBox}
      className={
        isLoading ? styles.ContainerGridSkeleton : styles.ContainerGridAllAGent
      }
    >
      {isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : listAgent.length === 0 ? (
        <Box className={styles.ContainerGridSkeleton}>
          <p className="col-span-4 text-center">no data</p>
        </Box>
      ) : (
        <GridVirtualizerVariable
          widthParent={widthParent}
          data={listAgent}
          parentRef={refParentBox}
          rows={Math.round(listAgent.length / columns)}
          columns={columns}
        />
      )}
    </Box>
  );
};

export default GridAgend;
