import React, { useRef, useEffect } from 'react'
// mantine
import { Box } from '@mantine/core';
// componets
import QuickSearch from '../Components/QuickSearch'
import MenuQuickSearch from '../Components/MenuQuickSearch'
// store
import useStore from '../Store/useStore';
// utils
import { useWindowScroll, useHotkeys } from '@mantine/hooks';

const ContainerComponts = (props) => {
    const containerRef = useRef(null);
    const [{ y }] = useWindowScroll();
    const { state: { focusMenu }, setFocusMenu } = useStore();


    useEffect(() => {
        if (y > (containerRef?.current?.offsetTop + containerRef?.current?.clientHeight + 100) && focusMenu) {
            console.log('setFocusMenu : false')
            setFocusMenu(false)
        }
    }, [y, focusMenu, setFocusMenu])

    useHotkeys([
        ['Escape', () => {
            if (focusMenu) {
                setFocusMenu(false)
            }
        }],
    ]);

    console.log('useWindowScroll_Y : ', y)

    console.log('PositionComponen_Curren : ', containerRef?.current)
    console.log('PositionComponen_offsetTop : ', containerRef?.current?.offsetTop)
    console.log('PositionComponen_clientHeight : ', containerRef?.current?.clientHeight)

    console.log('PositionComponen_Y : ', containerRef?.current?.offsetTop + containerRef?.current?.clientHeight + 100)

    return (
        <Box ref={containerRef}>
            <QuickSearch />
            <MenuQuickSearch />
        </Box>
    )
}

export default ContainerComponts