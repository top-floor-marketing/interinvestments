import React from 'react'

// mantine 
import { Card, Text, Button } from '@mantine/core';
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
                    <Text size="sm">
                        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                        activities on and around the fjords of Norway
                    </Text>
                    <Button variant="light" color="blue" fullWidth>
                        Book classic tour now
                    </Button>
                </Card.Section>
            </Card>
        </div>
    )
}

export default CardBlog