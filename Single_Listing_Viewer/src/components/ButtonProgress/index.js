import React from 'react'
// mantine
import { Progress, Box, Button } from '@mantine/core';
import { FileDownload } from 'tabler-icons-react';
// Hooks
import useCouter from '../../Hook/useCouter'

// styles
import stylesGlobal from '../../styles.global.module.scss'

const ButtonProgress = () => {
    const { counterState, isActivate, activateCounter } = useCouter()

    const createPDFListing = () => {
        activateCounter()
    }

    return (
        <Box className={stylesGlobal.genericLisFlex}>
            <Box>
                <Button
                    onClick={() => createPDFListing()}
                    className={stylesGlobal.buttonAll}
                    radius="lg"
                    size="lg"
                    disabled={isActivate}
                    rightIcon={<FileDownload />}
                    uppercase
                >
                    create PDF
                </Button>
            </Box>
            {
                (isActivate) && (
                    <Box className='w-full max-w-[450px]'>
                        <Progress
                            value={counterState}
                            color="dark"
                            radius="xs"
                            size="xs"
                        />
                    </Box>
                )
            }

        </Box>
    )
}

export default ButtonProgress