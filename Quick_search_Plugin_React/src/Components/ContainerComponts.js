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
import useWindowDimensions from '../hook/useWindowDimensions.'

const ContainerComponts = (props) => {
    const { height } = useWindowDimensions();
    const containerRef = useRef(null);
    const [{ y }] = useWindowScroll();
    const { state: { focusMenu }, setFocusMenu } = useStore();


    useEffect(() => {
        if (y > (height + containerRef?.current?.clientHeight) && focusMenu) {
            console.log('setFocusMenu : false')
            setFocusMenu(false)
        }
    }, [y, focusMenu, setFocusMenu, height])

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
    console.log('screen.height', height)

    return (
        <Box ref={containerRef}>
            <QuickSearch />
            <MenuQuickSearch />
        </Box>
    )
}




export default ContainerComponts