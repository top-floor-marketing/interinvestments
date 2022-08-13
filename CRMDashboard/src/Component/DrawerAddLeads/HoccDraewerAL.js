import React, { useState, cloneElement } from 'react'
// components
import DrawerAddLeads from './DrawerAddLeads'

const HoccDraewerAL = ({ children, title }) => {
    const [opened, setOpened] = useState(false);

    const onOpenDrawe = () => {
        setOpened(true)
    }

    const onCloseDrawer = () => {
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