import React, { useState } from 'react'
// mantine 
import { Button, Box, Text } from '@mantine/core';
// components
import CardBlog from './CardBlog'
import SkeletonCard from './SkeletonCard'
import AlertError from './AlertError'
// scss
import styles from "../blogStyles.module.scss";
// react-query
import { useQueryHelper } from '../GraphqlClient/useRequest';
import { POST_BY_ID, otherInterestingBlogs } from '../GraphqlClient/GQL';

const ContainerBlogView = () => {
    const [tagIn, setTagIn] = useState([])
    const [enableQUeryTags, setEnableQUeryTags] = useState(false)
    const uri = window.location.pathname
    const slugPost = uri.split('/')[uri.split('/').length - 2]

    const { isLoading, } = useQueryHelper({
        name: 'POST_BY_ID',
        gql: POST_BY_ID,
        variables: {
            slug: slugPost
        },
        config: {
            onSuccess: (req) => {
                if (req.postBy) {
                    const tags = req.postBy.tags.nodes.map(value => value.databaseId)
                    setEnableQUeryTags(true)
                    setTagIn(tags)
                } else {
                    setEnableQUeryTags(true)
                }
            },
            onError: () => {
                setEnableQUeryTags(true)
            }
        }
    });

    const { isLoading: isLoadingTags, data, isError } = useQueryHelper({
        name: 'otherInterestingBlogs',
        gql: otherInterestingBlogs,
        variables: {
            first: 3,
            tagIn: tagIn
        },
        config: {
            enabled: enableQUeryTags
        }
    });

    if (isError) {
        return (
            <AlertError
                label='Error!'
                description='Please wait a few minutes before you try again'
            />
        )
    }

    return (
        <Box className={styles.container}>
            <Text data-aos-duration="2000" data-aos="zoom-in" component='h3' className={styles.titleComponet}>
                Related to this topic
            </Text>
            {
                ((isLoading || isLoadingTags) && !data) ? (
                    <Box className={styles.divContent}>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </Box>
                )
                    : (
                        <>
                            <Box className={styles.divContent}>
                                {
                                    data.posts.nodes.map((value, index) => (
                                        <CardBlog valueCard={value} key={index} />
                                    ))
                                }
                            </Box>
                            <Box className='flex flex-col items-center justify-center mt-5'>
                                <Button
                                    component="a"
                                    href='/blog'
                                    className={styles.buttonAll}
                                >
                                    View All Blogs
                                </Button>
                            </Box>
                        </>
                    )
            }
        </Box>
    )
}

export default ContainerBlogView