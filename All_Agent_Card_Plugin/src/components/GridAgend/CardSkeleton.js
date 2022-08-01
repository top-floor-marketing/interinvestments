import React from 'react'
// mantine dev
import { Card, Box, Button, Skeleton } from '@mantine/core';
// styles
import styles from './styles.GA.module.scss'


const CardSkeleton = () => {
    return (
        <Card shadow={null} p="lg" radius={null} withBorder={false}>
            <Card.Section className='p-[20px] flex justify-center items-center'>
                <Skeleton height={170} width={170} circle mb="xl" />
            </Card.Section>
            <Box className='flex flex-col justify-center items-center gap-2'>
                <Skeleton height={30} width='80%' radius="xl" />
                <Skeleton height={26} radius="xl" />
                <Button
                    disabled
                    className={styles.ButtonProfileAgent}
                    variant="light"
                    radius="xl"
                    size="md"
                >
                    View Profile
                </Button>
            </Box>
        </Card>
    )
}

export default CardSkeleton