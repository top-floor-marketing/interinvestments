import React from 'react'
// mantine
import { Card } from '@mantine/core';
// componest
import TabsQuickSearch from '../TabsQuickSearch'
// css
import styles from './styles.qs.module.scss'

const QuickSearch = () => {
  return (
    <Card
      radius={10}
      className={styles.cardQuickSearch}
    >
      <div className={styles.gridQuickSearch}>
        <div className={styles.containerQuickSearch}>
          <h3 className={styles.labelQuickSearch}>
            Search for new
            <br className={styles.brlabelQuickSearch} />
            properties:
          </h3>
        </div>
        <div className={styles.menuQuickSearch}>
          <TabsQuickSearch />
        </div>
      </div>
    </Card>
  )
}

export default QuickSearch