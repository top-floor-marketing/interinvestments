import React from 'react'
import { Avatar } from '@mantine/core';

const AvatarAgent = (props) => {
    const { dataAgent } = props

    return (
        <Avatar
            data-aos-once="true"
            data-aos-duration='1000'
            // data-aos-delay="700"
            data-aos="zoom-in"
            className={{
                root: 'mx-auto',
                image: 'border-solid border-1 border-[#D1D1D1]'
            }}
            radius={90}
            size={170}
            src={dataAgent?.avatarProfile}
        />
    )
}

export default AvatarAgent