import React from 'react'
// mantine
import { Text, Box, Image } from '@mantine/core';
// styles 
import styles from './styles.ca.module.scss'
// Icons
import facebookIcon from '../../assets/faceIcon.svg'
import twitterIcon from '../../assets/twitterIcon.svg'
import instagramIcon from '../../assets/instagramIcon.svg'
import linkedinIcon from '../../assets/linkedinIcon.svg'

const InfoCard = () => {
    return (
        <>
            <Text
                component='h3'
                className={styles.titleNameAgent}
            >
                Emilio Cardenal
            </Text>
            <Text
                component='span'
                className={styles.PositionAgent}
            >
                Real Estate Broker / Founder
            </Text>
            <Text
                component='p'
                className={styles.contentCArdAgent}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Box className={styles.contactAgent}>
                <Text
                    component='a'
                    href='mailto: emilio@interinvestments.us'
                >
                    emilio@interinvestments.us
                </Text>
                <br />
                <Text
                    component='a'
                    href='tel:305-456-6839'
                >
                    305-456-6839
                </Text>
            </Box>
            <Box className={styles.containerSocialMedia}>
                <Image
                    component='a'
                    target="_blank"
                    href='https://mantine.dev/core/image/'
                    className={styles.imageIcon}
                    src={facebookIcon}
                    alt="facebookIcon"
                />
                <Image
                    component='a'
                    target="_blank"
                    href='https://mantine.dev/core/image/'
                    className={styles.imageIcon}
                    src={twitterIcon}
                    alt="twitterIcon"
                />
                <Image
                    component='a'
                    target="_blank"
                    href='https://mantine.dev/core/image/'
                    className={styles.imageIcon}
                    src={instagramIcon}
                    alt="instagramIcon"
                />
                <Image
                    component='a'
                    target="_blank"
                    href='https://mantine.dev/core/image/'
                    className={styles.imageIcon}
                    src={linkedinIcon}
                    alt="linkedinIcon"
                />
            </Box>

        </>
    )
}

export default InfoCard