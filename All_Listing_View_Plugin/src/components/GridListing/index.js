import React, { forwardRef, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import PropTypes from 'prop-types';

// mantine devs
import { useId } from '@mantine/hooks';
import { Box, Card, createStyles } from '@mantine/core';
// componets
import AutoSizer from "react-virtualized-auto-sizer";
import GridQuickView from '../GridQuickView'
// utils
import get from 'lodash/get';
import random from 'lodash/random';

import './styles_all_listing.css';

// 1.25rem === p5
const GUTTER_SIZE = 20;
const ROW_HEIGHT = 300;

const useStyles = createStyles((theme, _params) => ({
  itemScroll: {
    width: "100%",
    boxShadow: theme.shadows.sm,
    height: "100%",
    backgroundColor: theme.colors.gray[2]
  },
}));

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

const LoadInfiniteScroll = ({ name, data, isLoading, refetch, totalData, parentClassname }) => {

  const { classes } = useStyles();

  const idGrid = useId("_" + random(1, 1000) + "_" + name);
  const refParentBox = useRef(null);



  const onScroll = (e) => {
    const { scrollTop } = e;
    const gridContainer = document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight || null;
    const parentHeight = get(refParentBox, ["current", "clientHeight"], null);
    if (refetch !== undefined && !isLoading) {
      if (parentHeight + scrollTop === gridContainer) {
        setTimeout(() => {
          refetch();
        }, 700);
      }
    }
  };

  return (
    <Box ref={refParentBox} className={parentClassname}>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            itemData={data}
            className={"containerInfinite " + idGrid}
            onScroll={onScroll}
            columnCount={2}
            columnWidth={(width / 2)}
            height={height}
            innerElementType={innerElementType}
            rowCount={Math.ceil(totalData / 2)}
            rowHeight={ROW_HEIGHT + GUTTER_SIZE}
            width={width}
          >
            {({ data, rowIndex, columnIndex, style }) => {
              return <div
                key={rowIndex.toString().concat(columnIndex)}
                style={{
                  ...style,
                  maxWidth: "100%",
                  top: style.top,
                  width: style.width - GUTTER_SIZE,
                  height: style.height - GUTTER_SIZE
                }}
              >
                <Card
                  className={classes.itemScroll}
                  classNames={{
                    root: '!p-0'
                  }}
                >
                  {
                    // (rowIndex * 2) + columnIndex
                    // console.log(data.listingData)
                  }
                  {
                    <GridQuickView
                      data={data[(rowIndex * 2) + columnIndex].listingData.newDevelopment}
                      index={(rowIndex * 2) + columnIndex}
                    />
                  }
                </Card>
              </div>
            }}
          </Grid>
        )}
      </AutoSizer>
    </Box>
  )
}

LoadInfiniteScroll.defaultProps = {
  name: "scroll",
  data: [],
  isLoading: false,
  refetch: null,
  totalData: 0,
  columnCount: 1,
  parentClassname: ""
};

LoadInfiniteScroll.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  columnCount: PropTypes.number,
  parentClassname: PropTypes.string,
};

export default LoadInfiniteScroll;