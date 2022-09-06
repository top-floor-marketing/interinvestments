import React, { useState, forwardRef, cloneElement } from "react";
import PropTypes from "prop-types";

import { FixedSizeGrid as Grid } from "react-window";
import ItemLeadVirtual from "../ItemLeadVirtual";

import { useId, useElementSize } from "@mantine/hooks";
import { Box } from "@mantine/core";

import random from "lodash/random";

import "./styles_infinite.css";

// 1.25rem === p5
const GUTTER_SIZE = 16;
const ROW_HEIGHT = 110;

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      maxWidth: "100%",
    }}
    {...rest}
  />
));

const PipelineColumnVirtual = (props) => {

  const { refetch, totalData, data, children } = props;

  console.log("data ", data)

  const {
    ref: refParentBox,
    width: widthParent,
    height: heightParent,
  } = useElementSize();

  const [idGrid] = useState(`${useId()}_${random(100, 10000)}`);

  const onScroll = (e) => {
    const { scrollTop } = e;
    const gridContainer =
      document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight ||
      null;
    if (gridContainer && refetch && heightParent) {
      if (heightParent + scrollTop === gridContainer) {
        refetch();
      }
    }
  };

  // containerInfinite class for css-scrollbar styles
  // idGrid class for get clientHeight in scroll function
  return (
    <Box ref={refParentBox} className="parentContainerInfinite">
      <Grid
        itemData={data}
        className={`containerInfinite ${idGrid}`}
        onScroll={onScroll}
        columnCount={1}
        columnWidth={widthParent - GUTTER_SIZE / 1.5}
        height={heightParent}
        innerElementType={innerElementType}
        rowCount={totalData}
        rowHeight={ROW_HEIGHT + GUTTER_SIZE}
        width={widthParent}
      >
        {({ rowIndex, style }) => {
          return (
            <div
              key={rowIndex}
              style={{
                ...style,
                width: style.width,
                maxWidth: "100%",
                top: style.top,
                height: style.height - GUTTER_SIZE,
              }}
            >
              {cloneElement(children,  {...data[rowIndex]}, null)}
            </div>
          );
        }}
      </Grid>
    </Box>
  );
};

PipelineColumnVirtual.defaultProps = {
  totalData: 0,
  refetch: null,
  data: [],
  children: null,
  color: "gray",
  title: "null"
};

PipelineColumnVirtual.propTypes = {
  data: PropTypes.array,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  children: PropTypes.element,
  color: PropTypes.oneOf(["primary","secondary","error","success","info"]),
  title: PropTypes.string
};

export default PipelineColumnVirtual;
                                                            