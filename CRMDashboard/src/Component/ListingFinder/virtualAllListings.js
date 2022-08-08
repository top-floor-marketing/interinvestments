import React, { forwardRef, useRef } from "react";
import PropTypes from 'prop-types';

import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { useId } from '@mantine/hooks';
import { Box } from '@mantine/core';

import ItemListingVirtual from "../ItemListingVirtual";

import useClientGlobalStore from '../../GlobalStore/useClientGlobalStore';

import random from 'lodash/random';
import get from 'lodash/get';

import '../../styles_crm_scroll.css';

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

const VirtualAllListings = ({ name, data, isLoading, refetch, totalData, parentClassname, isAddListing, useTagFeatured }) => {

    const { state: { user: { infoUser: { databaseId } } } } = useClientGlobalStore();

    const idGrid = useId("_" + random(1, 1000) + "_" + name);
    const refParentBox = useRef(null);

    const onScroll = (e) => {
        const { scrollTop } = e;
        const gridContainer = document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight || null;
        if (refetch !== undefined && !isLoading) {
            const parentHeight = get(refParentBox, ["current", "clientHeight"], null);
            if (parentHeight + scrollTop === gridContainer) {
                    refetch();
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
                                <ItemListingVirtual
                                    {...data[rowIndex]}
                                    width={style.width}
                                    height={style.height - GUTTER_SIZE}
                                    idAgent={databaseId}
                                    isAddListing={isAddListing}
                                    useTagFeatured={useTagFeatured}
                                />
                            </div>
                        }}
                    </Grid>
                )}
            </AutoSizer>
        </Box>
    )
}

VirtualAllListings.defaultProps = {
    name: "scroll",
    data: [],
    isLoading: false,
    refetch: null,
    totalData: 0,
    columnCount: 1,
    parentClassname: "",
    isAddListing: false,
    useTagFeatured: false
};

VirtualAllListings.propTypes = {
    name: PropTypes.string,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    refetch: PropTypes.func,
    totalData: PropTypes.number,
    columnCount: PropTypes.number,
    parentClassname: PropTypes.string,
    isAddListing: PropTypes.bool,
    useTagFeatured: PropTypes.bool,
};

export default VirtualAllListings;