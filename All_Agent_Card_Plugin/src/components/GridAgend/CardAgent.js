import React from 'react'
// mantine dev
import { Card, Avatar, Box, Text, Button } from '@mantine/core';
// styles
import styles from './styles.GA.module.scss'

const CardAgent = ({ data }) => {

    console.log('data', data)

    return (
        <Card shadow={null} p="lg" radius={null} withBorder={false}>
            <Card.Section className='p-[20px] flex justify-center items-center'>
                <Avatar
                    radius={80}
                    size={170}
                    src={data.avatarProfile}
                />
            </Card.Section>
            <Box className='flex flex-col items-center justify-center gap-2'>
                <Text className={styles.titleAgent} component='p'>
                    {`${data.firstName} ${data.lastName}`}
                </Text>
                <Text className={styles.subTitleAgent} component='span'>
                    {data.position}
                </Text>
                <Button
                    component='a'
                    href={`/agent/?id=${data.id}`}
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