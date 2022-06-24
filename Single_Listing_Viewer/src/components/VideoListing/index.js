import React from 'react'
// mantine
import { Box } from '@mantine/core';
// video 
import { Player, BigPlayButton } from 'video-react';
// css
import styles from './styles.vl.module.scss'
import "video-react/dist/video-react.css";

const VideoListing = (props) => {
    const { data } = props

    if (data.video) {
        return (
            <Box className={styles.containerVideoListing}>
                <Player
                    playsInline
                    poster={data.photos[0].sourceUrl}
                    src={data.video.mediaItemUrl}
                >
                    <BigPlayButton position="center" />
                </Player>
            </Box>
        )
    } else {
        return (<div />)
    }
}

export default VideoListing