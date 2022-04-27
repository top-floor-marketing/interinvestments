import React from 'react'
import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

import './styles.css'

const SelectTabs = (props) => {
    const { className: classNameprops, data = [], value, onChange } = props
    return (
        <Select
            value={value}
            onChange={(value) => onChange(parseInt(value))}
            className={classNameprops}
            classNames={{
                input: 'categorySelect',
            }}
            rightSection={<ChevronDown size={14} />}
            placeholder="New Construction"
            data={data}
        />
    )
}

export default SelectTabs