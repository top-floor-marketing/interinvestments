import React, { forwardRef, useState, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import PropTypes from 'prop-types';

import { useId } from '@mantine/hooks';

import AutoSizer from "react-virtualized-auto-sizer";

import { Box, Card, createStyles, scopedSlots } from '@mantine/core';
import { ScrollArea } from '@mantine/core';

import random from 'lodash/random';
import get from 'lodash/get';

import './styles_crm.css';

// 1.25rem === p5
const GUTTER_SIZE = 20;
const ROW_HEIGHT = 80;

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
            maxWidth: "99.8%",
        }}
        {...rest}
    />
));

const LoadInfiniteScroll = ({ name, data, isLoading, refetch, totalData, parentClassname }) => {

    const { classes } = useStyles();

    const idGrid = useId("_" + random(1, 1000) + "_" + name);
    const refParentBox = useRef(null);

    const [isLazyLoading, setIsLazyLoading] = useState(false);

    const parentHeight = get(refParentBox, ["current", "clientHeight"], null);

    const onScroll = (e) => {
        const { scrollTop } = e;
        const gridContainer = document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight || null;
        if (!isLazyLoading && refetch !== undefined && !isLoading) {
            if (parentHeight + scrollTop === gridContainer) {
                setIsLazyLoading(true);
                setTimeout(() => {
                    refetch();
                    setIsLazyLoading(false);
                }, 700);
            }
        }
    };

    return (
        <Box ref={refParentBox} className={ parentClassname}>
            <AutoSizer>
                {({ height, width }) => (
                        <Grid
                        itemData={data}
                        className={"containerInfinite " + idGrid}
                        onScroll={onScroll}
                        columnCount={1}
                        columnWidth={width}
                        height={height}
                        innerElementType={innerElementType}
                        rowCount={totalData}
                        rowHeight={ROW_HEIGHT + GUTTER_SIZE}
                        width={width}
                    >
                        {({ data, rowIndex, style }) => {
                            return <div
                                key={rowIndex}
                                style={{
                                    ...style,
                                    width: style.width,
                                    maxWidth: "99.8%",
                                    top: style.top,
                                    height: style.height - GUTTER_SIZE
                                }}
                            >
                                <Card className={classes.itemScroll}>

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