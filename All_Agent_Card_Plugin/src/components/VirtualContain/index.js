import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import CardAgent from "../GridAgend/CardAgent";
// mantine
import { Box } from "@mantine/core";
// styles
// import styles from "./styles.VC.module.scss";

const GridVirtualizerVariable = ({
  data,
  parentRef,
  rows,
  columns,
  widthParent,
}) => {
  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 385,
    overscan: 3,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns,
    getScrollElement: () => parentRef.current,
    estimateSize: () => widthParent / columns, //310,
    overscan: 3,
  });

  // console.log("widthParent", widthParent);

  return (
    <>
      <Box
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <React.Fragment key={virtualRow.index}>
            {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
              <Box
                key={virtualColumn.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: `${widthParent / columns}px`,
                  height: "375px",
                  transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                }}
              >
                {
                  <CardAgent
                    data={{
                      ...data[virtualRow.index * columns + virtualColumn.index],
                    }}
                  />
                }
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

export default GridVirtualizerVariable;
