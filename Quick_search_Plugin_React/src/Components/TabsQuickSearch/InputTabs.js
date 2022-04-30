import React from 'react'

import { Input } from '@mantine/core';
import { Search } from 'tabler-icons-react';

// css
import './styles.css'

const InputTabs = (props) => {
    const { className: classNameprops } = props
    return (
        <Input
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