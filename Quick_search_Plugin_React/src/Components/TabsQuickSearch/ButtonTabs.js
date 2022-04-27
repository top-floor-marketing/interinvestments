import React from 'react'
// mantine
import { Button } from '@mantine/core';

const ButtonTabs = (props) => {
    const { text = 'Settings', active: activeButton, onChageActive, id } = props

    const chageActive = () => {
        if (activeButton) {
            return 'text-neutral border-neutral'
        }
        return 'text-disableColor border-disableColor'
    }

    return (
        <Button
            classNames={{
                label: 'w-full text-base font-normal'
            }}
            variant="outline"
            onClick={() => onChageActive(id)}
            className={`transition duration-500 border-t-0 text-left  border-l-0 border-r-0 rounded-none ${chageActive()}`}>
            {text}
        </Button>
    )
}

export default ButtonTabs


