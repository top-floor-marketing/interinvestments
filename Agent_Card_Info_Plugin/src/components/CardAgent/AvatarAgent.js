import React from 'react'
import { Avatar } from '@mantine/core';

const AvatarAgent = (props) => {
    const { dataAgent } = props
    return (
        <Avatar
            classNames={{
                root: 'mx-auto'
            }}
            radius={90}
            size={170}
            src={dataAgent.avatar}
        />
    )
}

export default AvatarAgent