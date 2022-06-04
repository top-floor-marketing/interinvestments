import React from 'react'
// mantine
import { Button } from '@mantine/core';
// css
import styles from './styles.tqs.module.scss'

const ButtonTabs = (props) => {
    const { text = 'Settings', active: activeButton, onChageActive, id } = props

    return (
        <Button
            classNames={{
                label: styles.ButtonTabslabel
            }}
            variant="outline"
            onClick={() => onChageActive(id)}
            className={`${styles.ButtonTabs} ${(activeButton) ? styles.ButtonTabsActive : styles.ButtonTabsDiable}`}>
            {text}
        </Button>
    )
}

export default ButtonTabs


