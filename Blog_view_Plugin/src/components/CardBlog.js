import React from 'react'

// mantine 
import { Card, Text, Button, Box } from '@mantine/core';
import dayjs from 'dayjs';

// scss
import styles from "../blogStyles.module.scss";

const CardBlog = (props) => {
    const { valueCard } = props
    return (
        <Box {...props.Attr} data-aos-duration="2000" data-aos="zoom-in" className={styles.divCard}>
            <Card className='h-full' shadow="sm">
                <Card.Section>
                    <img
                        src={valueCard.featuredImage.node.sourceUrl}
                        className={styles.imageCard}
                        alt={`imageBlog_${valueCard.featuredImage.node.altText}`}
                    />
                </Card.Section>
                <Card.Section className={styles.contendCard}>
                        <Text className={styles.textTag}>
                            {dayjs(valueCard.date).format('MM.DD.YYYY')} - <span>{valueCard.categories.nodes[0].name}</span>
                        </Text>
                        <Box className={styles.divTitle}>
                            <Text component='span' className={styles.titleCard}>
                                {valueCard.title}
                            </Text>
                        </Box>
                        <Box>
                            <Button
                                component="a"
                                href={valueCard.uri}
                                className={styles.buttonCard}
                                variant="default"
                                radius="xl"
                                size="md"
                            >
                                View Post
                            </Button>
                        </Box>
                </Card.Section>
            </Card>
        </Box>
    )
}

export default CardBlog