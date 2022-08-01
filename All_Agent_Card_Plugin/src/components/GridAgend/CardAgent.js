import React from 'react'
// mantine dev
import { Card, Avatar } from '@mantine/core';

const CardAgent = () => {
    return (
        <Card shadow={null} p="lg" radius="md" withBorder={false}>
            <Card.Section className='p-[20px] flex justify-center items-center'>
                <Avatar
                    radius={50}
                    size="xl"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
            </Card.Section>
            <p>info agent</p>
        </Card>
    )
}

export default CardAgent