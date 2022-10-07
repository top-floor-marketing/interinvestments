import React from 'react'
// mantine
import { Button, Text } from '@mantine/core';
// css
import styles from './styles.tqs.module.scss'

const ButtonTabs = (props) => {
    const { text = 'Settings', active: activeButton, onChageActive, id, onClick: onClickComponet } = props

    return (
        <Button
            classNames={{
                label: styles.ButtonTabslabel
            }}
            variant="outline"
            onClick={() => {
                onClickComponet()
                onChageActive(id)
            }}
            className={`${styles.ButtonTabs} ${(activeButton) ? styles.ButtonTabsActive : styles.ButtonTabsDiable}`}>
            <Text
                title={text}
                lineClamp={1}
                component='span'
            >
                {text}
            </Text>
        </Button>
    )
}

export default ButtonTabs


