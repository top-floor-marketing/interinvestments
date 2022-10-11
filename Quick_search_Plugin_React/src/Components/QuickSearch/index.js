import React from 'react'
// mantine
import { Paper, Box } from '@mantine/core';
// componest
import TabsQuickSearch from '../TabsQuickSearch'
// css

import styles from './styles.qs.module.scss'

const QuickSearch = () => {
  return (
    <Paper
      radius={10}
      className={styles.cardQuickSearch}
    >
      <Box className={styles.gridQuickSearch}>
        <Box className={styles.containerQuickSearch}>
          <h3 className={styles.labelQuickSearch}>
            Search for new
            <br className={styles.brlabelQuickSearch} />
            properties:
          </h3>
        </Box>
        <Box className={styles.menuQuickSearch}>
          <TabsQuickSearch />
        </Box>
      </Box>
    </Paper>
  )
}

export default QuickSearch