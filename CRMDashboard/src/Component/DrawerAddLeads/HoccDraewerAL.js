import React, { useState, cloneElement } from 'react'
// components
import DrawerAddLeads from './DrawerAddLeads'
// global store
import useClientGlobalStore from '../../GlobalStore/useClientGlobalStore'

const HoccDraewerAL = ({ children, title }) => {
    const { actions: { setAllField } } = useClientGlobalStore()
    const [opened, setOpened] = useState(false);

    const onOpenDrawe = () => {
        setOpened(true)
    }

    const onCloseDrawer = () => {
        setAllField()
        setOpened(false)
    }

    return (
        <>
            <DrawerAddLeads
                title={title}
                opened={opened}
                onClose={onCloseDrawer}
            />
            {
                cloneElement(children, { onClick: onOpenDrawe })
            }
        </>
    )
}

export default HoccDraewerAL