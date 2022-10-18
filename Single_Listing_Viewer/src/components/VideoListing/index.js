import React from 'react'
// mantine
import { Box } from '@mantine/core';
// video 
// css
import styles from './styles.vl.module.scss'

const VideoListing = (props) => {
    const { data } = props
   
    if (!data?.video)
         return null 

    const videoProps = {
        src: data ? data?.video?.mediaItemUrl : '',
        type: data ? data?.video?.mimeType : ''
    }

    return (
        <Box className={styles.containerVideoListing}>
            <div className={styles.itemVideo}>
                <video width="2000" height="8000" controls>
                    <source
                        {...videoProps}
                    />
                </video>
            </div>
        </Box>
    )

}

export default VideoListing