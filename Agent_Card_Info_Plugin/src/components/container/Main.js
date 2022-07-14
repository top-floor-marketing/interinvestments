import React from 'react'
// components
import CardAgent from '../CardAgent'
// mantine
import { Box, Text } from '@mantine/core';
// styles
import style from '../../blogStyles.module.scss'

const Main = () => {
    return (
        <Box className={style.containerMain}>
            <Box className={style.containerCard}>
                <Box className={style.titleCard}>
                    <Text component='h4'>Your agent</Text>
                </Box>
                <Box className='w-full lg:w-3/4'>
                    <CardAgent />
                </Box>
            </Box>
        </Box>
    )
}

export default Main