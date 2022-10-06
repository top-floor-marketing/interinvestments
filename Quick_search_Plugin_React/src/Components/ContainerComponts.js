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

const PLUGIN_ID_NAME = "#quickSearchParent";

const ContainerComponts = (props) => {
    const containerRef = useRef(null);
    const [{ y }] = useWindowScroll();
    const { state: { focusMenu }, setFocusMenu } = useStore();

    // et_pb_section_1 home
    // id sectionsearch
    useEffect(() => {
        if (focusMenu) {
            const boxContainer = document.querySelector(PLUGIN_ID_NAME);
            console.log("offsetTop", boxContainer?.offsetTop)
            console.log("clientHeight", boxContainer?.clientHeight)
            if (y > (boxContainer?.offsetTop + containerRef?.current?.clientHeight) && focusMenu && boxContainer) {
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