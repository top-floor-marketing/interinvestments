import React from 'react'
// css
import styles from './styles.dl.module.scss'
// mantine
import { Box, Text } from '@mantine/core';

const DescriptionListing = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.containerDescription}>
        <Text
          data-aos-duration='2000'
          data-aos="fade-up"
          className={styles.title}
          component='span'
        >
          a view from above
        </Text>
        <Text
          data-aos-duration='2000'
          data-aos="fade-up"
          className={styles.textDescription}
          component='p'
        >
          Waldorf Astoria is known for providing unforgettable experiences in landmark destinations worldwide. Rising 1,049 feet above Biscayne Bay, the striking tower will be the tallest building south of Manhattan, offering breathtaking views and signature experiences.
        </Text>
      </Box>
    </Box>
  )
}

export default DescriptionListing