import React from 'react'
import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

import './styles.css'

const SelectTabs = (props) => {
    const { className: classNameprops, data = [], value, onChange, placeholder = '' } = props

    function isNumeric(num) {
        return !isNaN(num)
    }

    const OnchageSelect = (valueSelect) => {
        if (isNumeric(valueSelect)) {
            return onChange(parseInt(valueSelect))
        } else {
            onChange(valueSelect)
        }
    }


    return (
        <Select
            value={value}
            onChange={(value) => (onChange) && OnchageSelect(value)}
            className={classNameprops}
            classNames={{
                input: 'categorySelect',
            }}
            rightSection={<ChevronDown size={14} />}
            placeholder={placeholder}
            data={data}
        />
    )
}

export default SelectTabs