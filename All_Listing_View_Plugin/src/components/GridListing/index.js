import React, { forwardRef, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import PropTypes from 'prop-types';

// mantine devs
import { useId } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';
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

const GridListing = ({ name, data, isLoading, refetch, totalData, parentClassname, openModalQuickView }) => {

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
      {
        (data.length) ? (
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                itemData={data}
                className={"containerInfinite " + idGrid}
                onScroll={onScroll}
                columnCount={totalData > 1 ? 2 : 1}
                columnWidth={(width / 2)}
                height={height}
                innerElementType={innerElementType}
                rowCount={totalData > 2 ? Math.ceil(totalData / 2) : 1}
                rowHeight={ROW_HEIGHT + GUTTER_SIZE}
                width={width}
              >
                {({ rowIndex, columnIndex, style }) => {
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
                    <GridQuickView
                      data={{
                        ...data[(rowIndex * 2) + columnIndex].listingData.newDevelopment,
                        uri: data[(rowIndex * 2) + columnIndex].uri,
                        title: data[(rowIndex * 2) + columnIndex].title,
                        subTitle: data[(rowIndex * 2) + columnIndex].neighborhoods.nodes[0].name,
                        id: data[(rowIndex * 2) + columnIndex].databaseId
                      }}
                      openModalQuickView={(id) => openModalQuickView(id)}
                      index={(rowIndex * 2) + columnIndex}
                    />
                  </div>
                }}
              </Grid>
            )}
          </AutoSizer>
        ) : (
          <Box className="flex items-center justify-center w-full h-full">
            <Text>No Data</Text>
          </Box >
        )
      }

    </Box >
  )
}

GridListing.defaultProps = {
  name: "scroll",
  data: [],
  isLoading: false,
  refetch: null,
  totalData: 0,
  columnCount: 1,
  parentClassname: "",
  openModalQuickView: () => { }
};

GridListing.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  columnCount: PropTypes.number,
  parentClassname: PropTypes.string,
  openModalQuickView: PropTypes.func
};

export default GridListing;