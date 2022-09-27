import React, { forwardRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import PropTypes from 'prop-types';

// mantine devs
import { useId, useElementSize } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';
// componets
import GridQuickView from '../GridQuickView';

import get from 'lodash/get';

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

  const idGrid = `${useId()}_${name})`;

  const {
    ref: refParentBox,
    width: widthParent,
    height: heightParent,
  } = useElementSize();

  const onScroll = (e) => {
    /*  const { scrollTop } = e;
     const gridContainer = document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight || null;
     const parentHeight = get(refParentBox, ["current", "clientHeight"], null);
     if (refetch !== undefined && !isLoading) {
       if (parentHeight + scrollTop === gridContainer) {
         setTimeout(() => {
           refetch();
         }, 700);
       }
     } */
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

  const getDataforGrid = (rowIndex, columnIndex) => {
    const dataItem = data[(rowIndex * 2) + columnIndex];
    if(!dataItem) return null;
    return {
      ...get(dataItem, ["listingData", "newDevelopment"], {}),
      uri: get(dataItem, ["uri"], null),
      title: get(dataItem, ["title"]),
      subTitle: get(dataItem, ["neighborhoods", "nodes", "0", "name"], null),
      id: get(dataItem, "databaseId")
    }
  }

  // containerInfinite class for css-scrollbar styles
  // idGrid class for get clientHeight in scroll function
  return (
    <Box ref={refParentBox} className={parentClassname}>
      {
        (data.length) ? (
          <Grid
            itemData={data}
            className={`containerInfinite ${idGrid}`}
            onScroll={onScroll}
            columnCount={totalData > 1 ? 2 : 1}
            columnWidth={(widthParent / 2)}
            height={heightParent}
            innerElementType={innerElementType}
            rowCount={totalData > 2 ? Math.ceil(totalData / 2) : 1}
            rowHeight={ROW_HEIGHT + GUTTER_SIZE}
            width={widthParent}
          >
            {({ rowIndex, columnIndex, style }) => {
              const dataItem = getDataforGrid(rowIndex, columnIndex);
              if(dataItem) {
                return <div
                key={`${rowIndex}_${columnIndex}`}
                style={{
                  ...style,
                  maxWidth: "100%",
                  top: style.top,
                  width: style.width - GUTTER_SIZE,
                  height: style.height - GUTTER_SIZE
                }}
              >
                <GridQuickView
                  data={getDataforGrid(rowIndex, columnIndex)}
                  openModalQuickView={(id) => openModalQuickView(id)}
                />
              </div>
              } 
              return null
            }}
          </Grid>
        ) : (
          <Box className="flex items-center justify-center w-full h-full">
            <Text>No Data</Text>
          </Box >
        )
      }
    </Box>
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