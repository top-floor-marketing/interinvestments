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

const InfoCard = (props) => {
    const { dataAgent } = props
    const descriptionHTMLDangerous = () => {
        return { __html: dataAgent.content }
    }
    return (
        <>
            <Text
                component='h3'
                className={styles.titleNameAgent}
            >
                {dataAgent.name}
            </Text>
            <Text
                component='span'
                className={styles.PositionAgent}
            >
                {dataAgent.position}
            </Text>
            <Box
                dangerouslySetInnerHTML={descriptionHTMLDangerous()}
                className={styles.contentCArdAgent}
            >

            </Box>
            <Box className={styles.contactAgent}>
                <Text
                    component='a'
                    href='mailto: emilio@interinvestments.us'
                >
                    {dataAgent.email}
                </Text>
                <br />
                {
                    dataAgent.phone && (
                        <Text
                            component='a'
                            href='tel:305-456-6839'
                        >
                            {dataAgent.phone}
                        </Text>
                    )
                }

            </Box>
            <Box className={styles.containerSocialMedia}>
                {
                    dataAgent.facebook && (
                        <Image
                            component='a'
                            target="_blank"
                            href={dataAgent.facebook}
                            className={styles.imageIcon}
                            src={facebookIcon}
                            alt="facebookIcon"
                        />
                    )
                }
                {
                    dataAgent.twitter && (
                        <Image
                            component='a'
                            target="_blank"
                            href={dataAgent.twitter}
                            className={styles.imageIcon}
                            src={twitterIcon}
                            alt="twitterIcon"
                        />
                    )
                }

                {
                    dataAgent.instagram && (
                        <Image
                            component='a'
                            target="_blank"
                            href={dataAgent.instagram}
                            className={styles.imageIcon}
                            src={instagramIcon}
                            alt="instagramIcon"
                        />
                    )
                }
                {
                    dataAgent.linkedin && (
                        <Image
                            component='a'
                            target="_blank"
                            href={dataAgent.linkedin}
                            className={styles.imageIcon}
                            src={linkedinIcon}
                            alt="linkedinIcon"
                        />
                    )
                }
            </Box>
        </>
    )
}

export default InfoCard