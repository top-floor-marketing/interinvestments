import React from 'react'
// mantine dev
import { Card, Avatar, Box, Text, Button } from '@mantine/core';
// styles
import styles from './styles.GA.module.scss'

const CardAgent = () => {
    return (
        <Card shadow={null} p="lg" radius={null} withBorder={false}>
            <Card.Section className='p-[20px] flex justify-center items-center'>
                <Avatar
                    radius={80}
                    size={170}
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
            </Card.Section>
            <Box className='flex flex-col justify-center items-center gap-2'>
                <Text className={styles.titleAgent} component='p'>
                    Emilio Cardenal
                </Text>
                <Text className={styles.subTitleAgent} component='span'>
                    Real Estate Broker / Founder
                </Text>
                <Button
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

export default CardAgent