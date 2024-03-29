import React, { forwardRef, useState, memo } from "react";
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

const LeadsVirtual = (props) => {
  const {
    data,
    isLoading,
    refetch,
    totalData,
    isShortLead,
    isAdminLeadView
  } = props;

  const {
    ref: refParentBox,
    width: widthParent,
    height: heightParent,
  } = useElementSize();

  const [idGrid] = useState(`${useId()}_${random(100, 10000)}`);

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
        columnCount={1}
        columnWidth={widthParent - GUTTER_SIZE / 1.5}
        height={heightParent}
        innerElementType={innerElementType}
        rowCount={totalData}
        rowHeight={ROW_HEIGHT + (isAdminLeadView ? 30 : 0) + GUTTER_SIZE}
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
              <ItemLeadVirtual
                {...data[rowIndex]}
                width={style.width}
                height={style.height - GUTTER_SIZE}
                isShortLead={isShortLead}
                isAdminLeadView={isAdminLeadView}
                refetch={refetch}
              />
            </div>
          );
        }}
      </Grid>
    </Box>
  );
};

LeadsVirtual.defaultProps = {
  data: [],
  isLoading: false,
  refetch: null,
  totalData: 0,
  isShortLead: false,
  isAdminLeadView: false
};

LeadsVirtual.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  isShortLead: PropTypes.bool,
  isAdminLeadView: PropTypes.bool
};

export default memo(LeadsVirtual);
