import React, { useState, useRef } from 'react'
//mantine
import { Box, Image, HoverCard, Text } from '@mantine/core';
// assets
import imagePin from './asset/Pin.svg'
// styles 
import style from './styles.ML.module.scss'

const Marker = (props) => {
    const { lat, lng } = props
    const [opened, setOpened] = useState(false);
    const refImagen = useRef(null);
    return (
        <Box
            lat={lat}
            lng={lng}
            className={style.containerMarker}
        >
            <HoverCard
                width={280}
                shadow="md"
                position='right'
            >
                <HoverCard.Target>
                    <Image
                        ref={refImagen}
                        onClick={() => setOpened(!opened)}
                        width={28}
                        height={35}
                        radius={null}
                        src={imagePin}
                        alt="PinMap_"
                    />
                </HoverCard.Target>
                <HoverCard.Dropdown
                    className='!cursor-auto'
                >
                    <Text size="sm">
                        Hover card is revealed when user hovers over target element, it will be hidden once
                        mouse is not over both target and dropdown elements
                    </Text>
                </HoverCard.Dropdown>
            </HoverCard>
        </Box>
    )
}

export default Marker