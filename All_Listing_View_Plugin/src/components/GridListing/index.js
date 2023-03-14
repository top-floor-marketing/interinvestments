import React, { forwardRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import PropTypes from "prop-types";

// mantine devs
import { useId, useElementSize } from "@mantine/hooks";
import { Box, Text } from "@mantine/core";
// componets
import GridQuickView from "../GridQuickView";

import get from "lodash/get";

import "./styles_all_listing.css";

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

const GridListing = ({
  name,
  data,
  isLoading,
  refetch,
  totalData,
  parentClassname,
  openModalQuickView,
}) => {
  const idGrid = `${useId()}_${name})`;

  const {
    ref: refParentBox,
    width: widthParent,
    height: heightParent,
  } = useElementSize();

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

  const getDataforGrid = (rowIndex, columnIndex, isOneColumn) => {
    const dataItem = isOneColumn
      ? data[rowIndex]
      : data[rowIndex * 2 + columnIndex];
    if (!dataItem) return null;
    return {
      ...get(dataItem, ["listingData", "newDevelopment"], {}),
      uri: get(dataItem, ["uri"], null),
      title: get(dataItem, ["title"]),
      subTitle: get(dataItem, ["neighborhoods", "nodes", "0", "name"], null),
      id: get(dataItem, "databaseId"),
    };
  };

  // containerInfinite class for css-scrollbar styles
  // idGrid class for get clientHeight in scroll function
  const responsiveColumn = widthParent < 550 ? 1 : totalData > 1 ? 2 : 1;
  const responsiveRowCount =
    responsiveColumn === 1
      ? totalData
      : totalData > 2
      ? Math.ceil(totalData / 2)
      : 1;
  return (
    <Box ref={refParentBox} className={parentClassname}>
      {!totalData && !isLoading ? (
        <Box className="flex items-center justify-center w-full h-full">
          <Text>No Data</Text>
        </Box>
      ) : (
        <Grid
          itemData={data}
          className={`containerInfinite ${idGrid}`}
          onScroll={onScroll}
          columnCount={responsiveColumn}
          columnWidth={
            responsiveColumn === 1
              ? widthParent > 400
                ? widthParent / 1.9
                : widthParent
              : widthParent > 1200
              ? 550
              : widthParent / 2
          }
          height={heightParent}
          innerElementType={innerElementType}
          rowCount={responsiveRowCount}
          rowHeight={ROW_HEIGHT + GUTTER_SIZE}
          width={widthParent}
        >
          {({ rowIndex, columnIndex, style }) => {
            const dataItem = getDataforGrid(
              rowIndex,
              columnIndex,
              responsiveColumn === 1
            );
            if (dataItem) {
              return (
                <div
                  key={`${rowIndex}_${columnIndex}`}
                  style={{
                    ...style,
                    maxWidth: "100%",
                    top: style.top,
                    width: style.width - GUTTER_SIZE,
                    height: style.height - GUTTER_SIZE,
                  }}
                >
                  <GridQuickView
                    data={getDataforGrid(
                      rowIndex,
                      columnIndex,
                      responsiveColumn === 1
                    )}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    openModalQuickView={(id) => openModalQuickView(id)}
                  />
                </div>
              );
            }
            return null;
          }}
        </Grid>
      )}
    </Box>
  );
};

GridListing.defaultProps = {
  name: "scroll",
  data: [],
  isLoading: false,
  refetch: null,
  totalData: 0,
  columnCount: 1,
  parentClassname: "",
  openModalQuickView: () => {},
};

GridListing.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  columnCount: PropTypes.number,
  parentClassname: PropTypes.string,
  openModalQuickView: PropTypes.func,
};

export default GridListing;
