import React from 'react'

import { Input } from '@mantine/core';
import { Search } from 'tabler-icons-react';


const InputTabs = (props) => {
    const { className: classNameprops } = props
    return (
        <Input
            className={classNameprops}
            classNames={{
                input: 'border-t-0 border-l-0 border-r-0 text-neutral rounded-none border-neutral focus:border-neutral',
            }}
            rightSection={<Search />}
            placeholder="City, condo name, or zip code"
        />
    )
}

export default InputTabs