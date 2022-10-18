import React from 'react'
// mantine
import { Box } from '@mantine/core';
// video 
import ReactPlayer from 'react-player/lazy'
// css
import styles from './styles.vl.module.scss'

const VideoListing = (props) => {
    const { data } = props
 // https://interinvestments.bytfm.com/wp-content/uploads/2022/04/Cinematic-Real-estate-video-tour-example-4K-Laowa-12mm-Sony-A7III.mp4
    if (!data?.video)
         return null
    return (
        <Box className={styles.containerVideoListing}>
            <div className={styles.itemVideo}>
            <ReactPlayer
               
                width={"100%"}
                heigth={"100%"}
                url={data.video.mediaItemUrl}
            />
            </div>
            
        </Box>
    )

}

export default VideoListing