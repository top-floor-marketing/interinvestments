import React from 'react'
//mantine
import { Box, Text } from '@mantine/core'

// css
import styles from './styles.ml.module.scss'

const MapListing = () => {
  return (
    <Box className={styles.containerMap}>
      <Box className={styles.BoxContainer}>
        <Text className={styles.titleMap} component='h4'>Neighborhood</Text>
        <Text className={styles.NameNeighborhood} component='p'>Downtown Miami</Text>
      </Box>
    </Box>
  )
}

export default MapListing