import React from 'react'

import { TextInput } from '@mantine/core';
import { Search } from 'tabler-icons-react';

// css
import './styles.css'

const InputTabs = (props) => {
    const { className: classNameprops, value = '', onChange, onFocusChange } = props
    return (
        <TextInput
            onFocus={() => onFocusChange(true)}
            onBlur={() => onFocusChange(false)}
            onChange={(text) => onChange(text.target.value)}
            value={value}
            className={classNameprops}
            classNames={{
                input: 'InputTabs',
            }}
            rightSection={<Search />}
            placeholder="City, condo name, or zip code"
        />
    )
}

export default InputTabs