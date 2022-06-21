import React from 'react'
// css
import styles from './styles.dl.module.scss'
// mantine
import { Box, Text } from '@mantine/core';

const DescriptionListing = (props) => {
  const { data } = props

  const descriptionHTMLDangerous = () => {
    return { __html: data.description }
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.containerDescription}>
        <Text
          data-aos-once="true"
          data-aos-duration='2000'
          data-aos="fade-up"
          className={styles.title}
          component='span'
        >
          {data.status}
        </Text>
        <Box
          dangerouslySetInnerHTML={descriptionHTMLDangerous()}
          data-aos-once="true"
          data-aos-duration='2000'
          data-aos="fade-up"
          className={styles.textDescription}
        />
      </Box>
    </Box>
  )
}

export default DescriptionListing