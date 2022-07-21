import React, { useRef } from "react";
import PropTypes from 'prop-types';

import { useId } from '@mantine/hooks';
import { Box } from '@mantine/core';

import random from 'lodash/random';
import get from 'lodash/get';

import ScrollComponent from "./scrollComponent";

const LoadInfiniteScroll = ({ name, children, data, isLoading, refetch, totalData, columnCount, parentClassname }) => {

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
                isLoading={isLoading} >
                {React.cloneElement(children)}
            </ScrollComponent>
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
    parentClassname: "",
    children: null
};

LoadInfiniteScroll.propTypes = {
    name: PropTypes.string,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    refetch: PropTypes.func,
    totalData: PropTypes.number,
    columnCount: PropTypes.number,
    parentClassname: PropTypes.string,
    children: PropTypes.node,
};

export default LoadInfiniteScroll;