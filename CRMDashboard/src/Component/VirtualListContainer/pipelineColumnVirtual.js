import React, { useState, forwardRef, cloneElement, memo } from "react";
import PropTypes from "prop-types";

import { FixedSizeGrid as Grid } from "react-window";

import { useId, useElementSize } from "@mantine/hooks";
import { Box, Paper, createStyles, Text } from "@mantine/core";

import random from "lodash/random";

import "./styles_infinite.css";

// 1.25rem === p5
const GUTTER_SIZE = 16;
const ROW_HEIGHT = 70;

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
  },
  paperStatus: {
    width: "100%",
    height: ROW_HEIGHT,
    display: "flex",
    flexDirection: "row",
    fontSize: "18px",
    fontWeight: 600,
    gap: theme.other.spacing.p4,
    padding: theme.other.spacing.p4,
    borderTop: `10px ${theme.colors[_params["color"]][6]} solid`,
    "&:hover": {
      borderTop: `10px ${theme.colors[_params["color"]][8]} solid`,
    },
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

const PipelineColumnVirtual = (props) => {

  const { refetch, totalData, data, children, title, color } = props;

  const { classes } = useStyles({ color });

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
    <Box className={classes.container}>
      <Paper className={classes.paperStatus}>
        <Text>{title}</Text>
      </Paper>
      <Box ref={refParentBox} className="parentContainerInfinite">
        <Grid
          itemData={data}
          className={`containerInfinite ${idGrid}`}
          onScroll={onScroll}
          columnCount={1}
          columnWidth={widthParent}
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
                {cloneElement(children, { ...data[rowIndex] }, null)}
              </div>
            );
          }}
        </Grid>
      </Box>
    </Box>
  );
};

PipelineColumnVirtual.defaultProps = {
  totalData: 0,
  refetch: null,
  data: [],
  children: null,
  color: "primary",
  title: "null",
};

PipelineColumnVirtual.propTypes = {
  data: PropTypes.array,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  children: PropTypes.element,
  color: PropTypes.oneOf(["primary","secondary","error","success","info"]),
  title: PropTypes.string
};

export default memo(PipelineColumnVirtual);
                                                            