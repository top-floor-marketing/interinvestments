import React, { forwardRef, useRef } from "react";
import PropTypes from 'prop-types';

import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useId } from '@mantine/hooks';
import { Box } from '@mantine/core';

import ItemListingCard from "./itemListingCard";

import { useSelector } from "react-redux";

import random from 'lodash/random';
import get from 'lodash/get';

import './styles_crm.css';

// 1.25rem === p5
const GUTTER_SIZE = 16;
const ROW_HEIGHT = 90;

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

    const { infoUser: { databaseId } } = useSelector((state) => state.user);

    const idGrid = useId("_" + random(1, 1000) + "_" + name);
    const refParentBox = useRef(null);

    const onScroll = (e) => {
        const { scrollTop } = e;
        const gridContainer = document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight || null;
        if (refetch !== undefined && !isLoading) {
            const parentHeight = get(refParentBox, ["current", "clientHeight"], null);
            if (parentHeight + scrollTop === gridContainer) {
                setTimeout(() => {
                    refetch();
                }, 700);
            }
        }
    };

    return (
        <Box ref={refParentBox} className={ parentClassname }>
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
                        {({ rowIndex, style }) => {
                            return <div
                                key={rowIndex}
                                style={{
                                    ...style,
                                    width: style.width,
                                    maxWidth: "100%",
                                    top: style.top,
                                    height: style.height - GUTTER_SIZE
                                }}
                            >
                                <ItemListingCard 
                                {...data[rowIndex]}
                                width={style.width}
                                height={style.height-GUTTER_SIZE}
                                idAgent={databaseId}
                                />
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