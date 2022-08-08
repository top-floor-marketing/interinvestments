import React, { useRef } from 'react'
// mantine
import { Group, Indicator, Avatar, Box, Text } from "@mantine/core";
import { FileImport } from 'tabler-icons-react';
// styles 
import useStyles from './stylesProfileAction'

const AvatarInput = ({ refInputForm, urlImagen }) => {
    const { classes } = useStyles();
    const refAvatar = useRef(null);

    const onClicAvatar = () => {
        refInputForm.current.click()
    }

    return (
        <Group
            className={`${classes.gridColumnFull} ${classes.avatarForm}`}
            position="center"
        >
            <Box
                className={classes.containerAvatar}
                onClick={() => onClicAvatar()}
            >
                <Indicator
                    inline
                    size={32}
                    offset={10}
                    position="top-end"
                    label={
                        <FileImport
                            size={32}
                            strokeWidth={2}
                            color={'white'}
                        />
                    }
                >
                    <Box className={classes.contentAvatar}>
                        <Box className={classes.avatarHover} />
                        <Text
                            className={classes.overlayLabel}
                            component='span'>
                            Edit Avatar
                        </Text>
                        <Avatar
                            ref={refAvatar}
                            radius={50}
                            size="xl"
                            src={urlImagen}
                        />
                    </Box>
                </Indicator>
            </Box>
        </Group>
    )
}

export default AvatarInput