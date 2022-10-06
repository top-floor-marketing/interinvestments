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
        if (focusMenu) {
            const boxContainer = document.querySelector("#boxContainerSearch");
            if (y > (boxContainer?.parentNode?.offsetTop + containerRef?.current?.clientHeight) && focusMenu) {
                setFocusMenu(false)
            }
        }
    }, [y, focusMenu, setFocusMenu])

    useHotkeys([
        ['Escape', () => {
            if (focusMenu) {
                setFocusMenu(false)
            }
        }],
    ]);

    return (
        <Box id="boxContainerSearch" ref={containerRef}>
            <QuickSearch />
            <MenuQuickSearch />
        </Box>
    )
}




export default ContainerComponts