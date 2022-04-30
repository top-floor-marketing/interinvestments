import React from 'react'
import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

import './styles.css'

const SelectTabs = (props) => {
    const { className: classNameprops, data = [], value, onChange, placeholder = '' } = props
    return (
        <Select
            value={value}
            onChange={(value) => onChange(parseInt(value))}
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