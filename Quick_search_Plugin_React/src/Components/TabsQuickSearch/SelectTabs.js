import React from 'react'
import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

const SelectTabs = (props) => {
    const { className: classNameprops, data = [], value, onChange } = props
    return (
        <Select
            value={value}
            onChange={(value) => onChange(parseInt(value))}
            className={classNameprops}
            classNames={{
                input: 'border-t-0 border-l-0 border-r-0 text-neutral rounded-none border-neutral focus:border-neutral',
            }}
            rightSection={<ChevronDown size={14} />}
            placeholder="New Construction"
            data={data}
        />
    )
}

export default SelectTabs