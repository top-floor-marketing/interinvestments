import React, { forwardRef, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Box } from '@mantine/core';

// 1.25rem === p5
const GUTTER_SIZE = 20;
// for grid multi column
// const COLUMN_WIDTH = 100;

const ROW_HEIGHT = 100;

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
        ref={ref}
        style={{
            ...style,
            maxWidth: "99.8%",
            paddingLeft: GUTTER_SIZE,
            paddingTop: GUTTER_SIZE,
        }}
        {...rest}
    />
));

const ScrollComponent = ({ id, parentHeight, data, isLoading, refetch, totalData, children }) => {

    const [isLazyLoading, setIsLazyLoading] = useState(false);

    const onScroll = (e) => {
        const { scrollTop } = e;
        const gridContainer = document.getElementsByClassName("inf_" + id)[0]?.firstChild?.clientHeight || null;
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
        <AutoSizer>
            {({ height, width }) => (
                <Grid
                    itemData={data}
                    className={"inf_" + id}
                    onScroll={onScroll}
                    columnCount={1}
                    columnWidth={width}
                    height={height}
                    innerElementType={innerElementType}
                    rowCount={totalData}
                    rowHeight={ROW_HEIGHT + GUTTER_SIZE}
                    width={width}
                >
                    {({ data, rowIndex, columnIndex, style }) => {
                        return <div
                            key={rowIndex}
                            style={{
                                ...style,
                                width: style.width,
                                maxWidth: "99.8%",
                                top: style.top + GUTTER_SIZE,
                                height: style.height - GUTTER_SIZE
                            }}
                        >
                            {React.cloneElement(children, { text: "Hello, Universe" }, "Ciao")}
                        </div>
                    }}

                </Grid>
            )}
        </AutoSizer>
    )
}

export default ScrollComponent;