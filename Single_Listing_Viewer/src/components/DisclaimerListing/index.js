import React from 'react'
import DOMPurify from 'dompurify'
// mantine
import { Box, Text, Group } from '@mantine/core'
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
                    component='h3'
                >
                    *Disclaimer
                </Text>
            </Group>
            <Box
                    id='disclaimer_Listing'
                    dangerouslySetInnerHTML={disclainerHTMLDangerous()}
                    data-aos-once="true"
                    data-aos-duration='2000'
                    data-aos="fade-up"
                    className={styles.textDisclaimer}
                />
        </Box>
    )
}

export default DisclaimerListing