import React from 'react'
// mantine
import { Button } from '@mantine/core';
// css
import './styles.css'

const ButtonTabs = (props) => {
    const { text = 'Settings', active: activeButton, onChageActive, id } = props

    const chageActive = () => {
        if (activeButton) {
            return 'ButtonTabsActive'
        }
        return 'text-disableColor border-disableColor'
    }

    return (
        <Button
            classNames={{
                label: 'ButtonTabslabel'
            }}
            variant="outline"
            onClick={() => onChageActive(id)}
            className={`ButtonTabs ${chageActive()}`}>
            {text}
        </Button>
    )
}

export default ButtonTabs


