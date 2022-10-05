import React from 'react'
import DOMPurify from 'dompurify'
// mantine
import { Box, Text, Spoiler, Group } from '@mantine/core'
import { AlertTriangle } from 'tabler-icons-react';
// styles
import styles from './styles.DL.module.scss'
// utils
import get from 'lodash/get'

const DisclaimerListing = (props) => {
    const { data } = props

    const disclainerHTMLDangerous = () => {
        return { __html: DOMPurify.sanitize(get(data, ['propertyDisclaimer'], '<p />')) }
    }

    return (
        <Box className={styles.containerDisclaimerListing}>
            <Group spacing="xs">
                <Text
                    data-aos-once="true"
                    data-aos-duration='2000'
                    data-aos="fade-up"
                    className={styles.titleDisclaimer}
                    component='span'
                >
                    <AlertTriangle
                        size={48}
                        strokeWidth={2}
                        color={'black'}
                    />
                </Text>
                <Text
                    data-aos-once="true"
                    data-aos-duration='2000'
                    data-aos="fade-up"
                    className={styles.titleDisclaimer}
                    component='h3'
                >
                    Properties Disclaimer
                </Text>
            </Group>
            <Spoiler
                maxHeight={520}
                showLabel="Show more"
                hideLabel="Hide"
            >
                <Box
                    id='disclaimer_Listing'
                    dangerouslySetInnerHTML={disclainerHTMLDangerous()}
                    data-aos-once="true"
                    data-aos-duration='2000'
                    data-aos="fade-up"
                    className={styles.textDescription}
                />

            </Spoiler>
        </Box>
    )
}

export default DisclaimerListing