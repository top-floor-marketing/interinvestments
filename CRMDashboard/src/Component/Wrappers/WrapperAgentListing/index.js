import { useState, cloneElement, isValidElement, memo, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

const WrapperAgentListing = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 10000)
    }, [])

    return (
        <>
            {
                (isValidElement(children))
                    ? cloneElement(children, { isLoading })
                    : children
            }
        </>
    )
}

WrapperAgentListing.propTypes = {
    children: PropTypes.node
}

export default memo(WrapperAgentListing);