import React, { useRef } from 'react'
//mantine
import { Box, Image, HoverCard, Text, Avatar } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// assets
import imagePin from '../../assets/PinMap.svg'
// styles 
import style from './styles.ml.module.scss'

const Marker = (props) => {
    const { lat, lng, title, subTitle, price, urlImagen, uri, opened = true } = props
    const refImagen = useRef(null);
    const matches = useMediaQuery('(min-width: 1024px)');

    if (lat && lng) {
        return (
            <Box
                lat={lat}
                lng={lng}
                className={style.containerMarker}
            >
                <HoverCard
                    width={!matches ? 217 : 340}
                    shadow="md"
                    position={matches ? 'right' : 'bottom'}
                    radius='lg'
                    opened={opened}
                >
                    <HoverCard.Target>
                        <Image
                            className={style.imagenPin}
                            ref={refImagen}
                            width={28}
                            height={35}
                            radius={null}
                            src={imagePin}
                            alt={`PinMap_${title}`}
                        />
                    </HoverCard.Target>
                    <HoverCard.Dropdown
                        className='!cursor-grab px-3'
                    >
                        <Box className={style.contendInfoListing}>
                            <Avatar
                                className={style.avatarListing}
                                radius="xs"
                                alt={`ImagenListing_${title}`}
                                src={urlImagen}
                            />
                            <Box id='infoListing'>
                                {
                                    title && (
                                        <Text
                                            title={title}
                                            className={style.titleListingMap}
                                            lineClamp={1}
                                            component='a'
                                            href={uri}
                                        >
                                            {title}
                                        </Text>
                                    )
                                }
                                <Box className={style.containerInfoListing}>
                                    {
                                        subTitle && (
                                            <Text
                                                title={subTitle}
                                                component='span'
                                                lineClamp={1}
                                            >
                                                {subTitle}
                                            </Text>
                                        )
                                    }
                                    {
                                        price && (
                                            <Text title={`Price ${price}`} component='span' lineClamp={1}>
                                                Price {price}
                                            </Text>
                                        )
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </HoverCard.Dropdown>
                </HoverCard>
            </Box>
        )
    } else {
        return null
    }
}

export default Marker