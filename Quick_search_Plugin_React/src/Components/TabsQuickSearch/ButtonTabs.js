import React from 'react'
// mantine
import { Button } from '@mantine/core';
// css
import './styles.css'

const ButtonTabs = (props) => {
    const { text = 'Settings', active: activeButton, onChageActive, id } = props

    return (
        <Button
            classNames={{
                label: 'ButtonTabslabel'
            }}
            variant="outline"
            onClick={() => onChageActive(id)}
            className={`ButtonTabs ${(activeButton) ? 'ButtonTabsActive' : 'ButtonTabsDiable'}`}>
            {text}
        </Button>
    )
}

export default ButtonTabs


