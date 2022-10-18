import React from 'react'
// mantine
import { Box } from '@mantine/core';
// video 
import ReactPlayer from 'react-player/lazy'
// css
import styles from './styles.vl.module.scss'

const VideoListing = (props) => {
    const { data } = props

    if (!data?.video)
         return null
    return (
        <Box className={styles.containerVideoListing}>
            <div className={styles.itemVideo}>
            <ReactPlayer
                controls
                light
                width={"100%"}
                heigth={"100%"}
                url={data.video.mediaItemUrl}
            />
            </div>
            
        </Box>
    )

}

export default VideoListing