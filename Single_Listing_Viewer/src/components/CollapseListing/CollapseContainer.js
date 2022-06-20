import React, { useState } from 'react'
// mantine
import { Button, Collapse, Box, Text, Divider } from '@mantine/core';
import { ArrowNarrowRight } from 'tabler-icons-react';
// css
import styles from './styles.cl.module.scss'

const defaultChildren = (
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quo, voluptas, officia natus perferendis veritatis voluptatum est quia eligendi nisi excepturi earum dolores expedita. Ad enim distinctio modi incidunt aliquam!
    </p>
)

const CollapseContainer = (props) => {
    const [opened, setOpen] = useState(false)
    const {
        title = 'text title',
        children = defaultChildren,
        delayAnimatio = '300',
        index = '01'
    } = props

    return (
        <>
            <Box
                data-aos-once="true"
                data-aos-delay={delayAnimatio}
                data-aos-duration='2000'
                data-aos="fade-right"
                className={styles.container}>
                <Text component='span' className={styles.textIndex}>{index}</Text>
                <Text
                    onClick={() => setOpen(!opened)}
                    component='p'
                    className={styles.titleCollapse}
                >
                    {title}
                </Text>
                <Button
                    radius="xl"
                    color="yellow"
                    className='border-0'
                    size="2xl"
                    compact
                    variant="outline"
                    onClick={() => setOpen(!opened)}
                >
                    <ArrowNarrowRight
                        className={`${styles.ArrowRight} ${opened ? styles.ArrowRight_active : ''}`}
                        size={69}
                        strokeWidth={1.5}
                        color={'#FFB839'}
                    />
                </Button>
            </Box>
            <Collapse
                in={opened}
                transitionDuration={500}
                transitionTimingFunction="linear"
            >
                <Box className={styles.collapseListing}>
                    {children}
                </Box>
            </Collapse>
            <Divider
                data-aos-once="true"
                data-aos-delay={delayAnimatio}
                data-aos-duration='2000'
                data-aos="zoom-in"
                className={styles.dividerListing}
                my="sm"
            />
        </>
    )
}

export default CollapseContainer