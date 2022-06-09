import React from 'react'
import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

// css
import styles from './styles.tqs.module.scss'

const SelectTabs = (props) => {
    const { type, data = [], value, onChange, placeholder = '' } = props

    // function isNumeric(num) {
    //     return !isNaN(num)
    // }

    // const OnchageSelect = (valueSelect) => {
    //     if (isNumeric(valueSelect)) {
    //         return onChange(parseInt(valueSelect))
    //     } else {
    //         onChange(valueSelect)
    //     }
    // }

    return (
        <Select
            value={value}
            onChange={(value) => (onChange) && onChange(value)}
            className={`${(type === 'SelectTabsCategory') ? styles.SelectTabsCategory : styles.SelectTabsNeighborhoods}`}
            classNames={{
                input: `${styles.categorySelect}`,
            }}
            rightSection={<ChevronDown size={14} />}
            placeholder={placeholder}
            data={data}
        />
    )
}

export default SelectTabs