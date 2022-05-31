import React from 'react'

// mantine 
import { Card, Text, Button, Box } from '@mantine/core';
import image from './asset/Hero_Image-min.jpg'

// scss
import styles from "../blogStyles.module.scss";

const CardBlog = () => {
    return (
        <div className={styles.divCard}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <img src={image} className={styles.imageCard} alt="Norway" />
                </Card.Section>
                <Card.Section className={styles.contendCard}>
                    <Text className={styles.textTag}>04.25.2022 - <span>News</span></Text>
                    <Text className={styles.titleCard}>
                        Celebrations Of Earth Day In South Florida
                    </Text>
                    <Box>
                        <Button className={styles.buttonCard} variant="default" radius="xl" size="md">
                            View Post
                        </Button>
                    </Box>
                </Card.Section>
            </Card>
        </div>
    )
}

export default CardBlog