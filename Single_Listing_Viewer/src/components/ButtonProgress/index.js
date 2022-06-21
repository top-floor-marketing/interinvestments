import React from 'react'
// mantine
import { Progress, Box, Button } from '@mantine/core';
import { FileDownload } from 'tabler-icons-react';
// Hooks
import useCouter from '../../Hook/useCouter'

// styles
import stylesGlobal from '../../styles.global.module.scss'

const ButtonProgress = () => {
    const { counterState, isActivate, activateCounter, colorBar } = useCouter()

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
                    <Box className='w-full'>
                        <Progress
                            color={colorBar}
                            value={counterState}
                            label={`Generate PDF ${counterState}%`}
                            size={20}
                            radius="xl"
                            striped
                            animate
                        />
                    </Box>
                )
            }

        </Box>
    )
}

export default ButtonProgress