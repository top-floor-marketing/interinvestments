import React, { forwardRef, useState, memo, cloneElement, useCallback } from "react";
import PropTypes from "prop-types";

import { FixedSizeGrid as Grid } from "react-window";

import { useId, useElementSize, useViewportSize } from "@mantine/hooks";
import { Box } from "@mantine/core";

import random from "lodash/random";

import "./styles_infinite.css";

// 1.25rem === p5
const GUTTER_SIZE = 16;
const ROW_HEIGHT = 350;

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      maxWidth: "100%",
      paddingLeft: GUTTER_SIZE,
      paddingTop: GUTTER_SIZE,
    }}
    {...rest}
  />
));

const AgentsVirtual = (props) => {
  const {
    data,
    totalData,
    children,
    openModal
  } = props;

  const {
    ref: refParentBox,
    width: widthParent,
    height: heightParent,
  } = useElementSize();

  const [idGrid] = useState(`${useId()}_${random(100, 10000)}`);

  const { width: viewportWidth } = useViewportSize();

  const getCountGrid = useCallback(() => {
    if (viewportWidth > 700 && viewportWidth < 1100)
      return 2;
    if (viewportWidth > 1100 && viewportWidth < 1400)
      return 3;
    if (viewportWidth > 1400 && viewportWidth < 2200)
      return 4;
    if (viewportWidth > 2200)
      return 5;
    return 1;
  }, [viewportWidth])

  const onScroll = (e) => {
    /* const { scrollTop } = e;
    const gridContainer =
      document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight ||
      null;
    if (gridContainer && refetch && !isLoading && heightParent) {
      if (heightParent + scrollTop === gridContainer) {
        refetch();
      }
    } */
  };

  // containerInfinite class for css-scrollbar styles
  // idGrid class for get clientHeight in scroll function
  return (
    <Box id={idGrid} ref={refParentBox} className="parentContainerInfinite">
      <Grid
        itemData={data}
        className={`containerInfinite ${idGrid}`}
        onScroll={onScroll}
        columnCount={getCountGrid()}
        columnWidth={Math.round(widthParent / getCountGrid())}
        innerElementType={innerElementType}
        rowCount={Math.ceil(totalData / getCountGrid())}
        rowHeight={ROW_HEIGHT + GUTTER_SIZE}
        height={heightParent}
        width={widthParent}
      >
        {({ rowIndex, columnIndex, style }) => {
          const dataItem = data[(rowIndex * getCountGrid()) + columnIndex];
          if (!dataItem)
            return null;
          return (
            <div
              key={rowIndex}
              style={{
                ...style,
                maxWidth: "100%",
                width: style.width - GUTTER_SIZE,
                height: style.height - GUTTER_SIZE,
              }}
            >
              {cloneElement(children, { ...data[(rowIndex * getCountGrid()) + columnIndex], openModal }, null)}
            </div>
          );
        }}
      </Grid>
    </Box>
  );
};

AgentsVirtual.defaultProps = {
  data: [],
  isLoading: false,
  refetch: null,
  totalData: 0,
  openModal: null
};

AgentsVirtual.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  openModal: PropTypes.func
};

export default memo(AgentsVirtual);
