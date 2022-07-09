import React from 'react'
import { Avatar } from '@mantine/core';

const AvatarAgent = () => {
    return (
        <Avatar
            classNames={{
                root: 'mx-auto'
            }}
            radius={90}
            size={170}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
    )
}

export default AvatarAgent