import React from 'react'
// css
import styles from './styles.dl.module.scss'
// mantine
import { Box, Text, Spoiler } from '@mantine/core';

const DescriptionListing = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const show_more = urlParams.get('showmore')
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
        <Spoiler
          initialState={show_more || false}
          maxHeight={520}
          showLabel="Show more"
          hideLabel="Hide"
        >
          <Box
            id='status_show_more'
            dangerouslySetInnerHTML={descriptionHTMLDangerous()}
            data-aos-once="true"
            data-aos-duration='2000'
            data-aos="fade-up"
            className={styles.textDescription}
          />
        </Spoiler>
      </Box>
    </Box>
  )
}

export default DescriptionListing