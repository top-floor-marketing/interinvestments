import React, { useRef } from "react";
import PropTypes from 'prop-types';

import { useId } from '@mantine/hooks';
import { Box } from '@mantine/core';

import random from 'lodash/random';
import get from 'lodash/get';

import ScrollComponent from "./scrollComponent";

const LoadInfiniteScroll = ({ name, data, isLoading, refetch, totalData, columnCount, parentClassname }) => {

    const uuid = useId("_" + random(1, 1000) + "_" + name);
    const refParentBox = useRef(null);

    return (
        <Box ref={refParentBox} className={parentClassname}>
<ScrollComponent
            id={uuid}
            columnCount={columnCount}
            parentHeight={get(refParentBox, ["current", "clientHeight"], null)}
            data={data}
            totalData={totalData}
            refetch={refetch}
            isLoading={isLoading} />
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
    parentClassname: PropTypes.string
};

export default LoadInfiniteScroll;