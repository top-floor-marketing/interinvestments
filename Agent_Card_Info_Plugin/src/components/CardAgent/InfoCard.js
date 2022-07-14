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
                data-aos-once="true"
                data-aos-duration='900'
                data-aos-delay="700"
                data-aos="fade-left"
                component='h3'
                className={styles.titleNameAgent}
            >
                {dataAgent.name}
            </Text>
            <Text
                data-aos-once="true"
                data-aos-duration='900'
                data-aos-delay="900"
                data-aos="fade-left"
                component='span'
                className={styles.PositionAgent}
            >
                {dataAgent.position}
            </Text>
            <Box
                data-aos-once="true"
                data-aos-duration='900'
                data-aos-delay="1100"
                data-aos="fade-left"
                dangerouslySetInnerHTML={descriptionHTMLDangerous()}
                className={styles.contentCArdAgent}
            >

            </Box>
            <Box className={styles.contactAgent}>
                <Text
                    data-aos-once="true"
                    data-aos-duration='900'
                    data-aos-delay="1300"
                    data-aos="fade-left"
                    component='a'
                    href='mailto: emilio@interinvestments.us'
                >
                    {dataAgent.email}
                </Text>
                <br />
                {
                    dataAgent.phone && (
                        <Text
                            data-aos-once="true"
                            data-aos-duration='900'
                            data-aos-delay="1500"
                            data-aos="fade-left"
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
                            data-aos-once="true"
                            data-aos-duration='900'
                            data-aos-delay="1700"
                            data-aos="fade-left"
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
                            data-aos-once="true"
                            data-aos-duration='900'
                            data-aos-delay="1700"
                            data-aos="fade-left"
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
                            data-aos-once="true"
                            data-aos-duration='900'
                            data-aos-delay="1700"
                            data-aos="fade-left"
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
                            data-aos-once="true"
                            data-aos-duration='900'
                            data-aos-delay="1700"
                            data-aos="fade-left"
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