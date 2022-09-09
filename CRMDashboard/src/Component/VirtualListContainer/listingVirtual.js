import React, { forwardRef, useState, memo } from "react";
import PropTypes from "prop-types";

import { FixedSizeGrid as Grid } from "react-window";

import { useId, useElementSize } from "@mantine/hooks";
import { Box } from "@mantine/core";

import ItemListingVirtual from "../ItemListingVirtual";

// global Store
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

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

const ListingVirtual = (props) => {
  const {
    usingAddAndRemove,
    isCheck,
    onConfirmRemove,
    onConfirmAdd,
    data,
    isLoading,
    refetch,
    totalData,
  } = props;
  const {
    ref: refParentBox,
    width: widthParent,
    height: heightParent,
  } = useElementSize();
  const {
    state: {
      user: {
        infoUser: { databaseId },
      },
    },
  } = useClientGlobalStore();

  const [idGrid] = useState(`${useId()}_${random(100, 10000)}`);

  const onScroll = (e) => {
    const { scrollTop } = e;
    const gridContainer =
      document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight ||
      null;
    if (gridContainer && refetch && !isLoading && heightParent) {
      if (heightParent + scrollTop === gridContainer) {
        refetch();
      }
    }
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
              <ItemListingVirtual
                {...data[rowIndex]}
                width={style.width}
                height={style.height - GUTTER_SIZE}
                idAgent={databaseId}
                usingAddAndRemove={usingAddAndRemove}
                isCheck={isCheck}
                onConfirmRemove={onConfirmRemove}
                onConfirmAdd={onConfirmAdd}
              />
            </div>
          );
        }}
      </Grid>
    </Box>
  );
};

ListingVirtual.defaultProps = {
  data: [],
  isLoading: false,
  refetch: null,
  totalData: 0,
  columnCount: 1,
  parentClassname: "",
  isCheck: false,
  usingAddAndRemove: true,
};

ListingVirtual.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  columnCount: PropTypes.number,
  parentClassname: PropTypes.string,
  onConfirmAdd: PropTypes.func,
  onConfirmRemove: PropTypes.func,
  usingAddAndRemove: PropTypes.bool,
  isCheck: PropTypes.bool,
};

export default memo(ListingVirtual);
