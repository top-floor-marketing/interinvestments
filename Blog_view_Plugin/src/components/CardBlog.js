import React from 'react'

// mantine 
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import image from './asset/Hero_Image-min.jpg'

// scss
import styles from "../blogStyles.module.scss";

const CardBlog = () => {
    return (
        <div className={styles.divCard}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image src={image} width={370} height={245} alt="Norway" />
                </Card.Section>

                <Group position="apart">
                    <Text weight={500}>Norway Fjord Adventures</Text>
                    <Badge color="pink" variant="light">
                        On Sale
                    </Badge>
                </Group>

                <Text size="sm">
                    With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                    activities on and around the fjords of Norway
                </Text>

                <Button variant="light" color="blue" fullWidth>
                    Book classic tour now
                </Button>
            </Card>
        </div>
    )
}

export default CardBlog