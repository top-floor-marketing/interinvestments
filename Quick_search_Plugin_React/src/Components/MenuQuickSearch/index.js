import React, { useEffect } from 'react'
import { Card } from '@mantine/core';
// componet 
import LoadingMenu from './LoadingMenu'
import AlertError from '../AlertError'
import CardListing from './CardListing'
// store
import useStore from '../../Store/useStore';
// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { ALL_LISTING } from '../../GraphqlClient/GQL';

//css
import styles from './styles.mqs.module.scss'

const MenuQuickSearch = () => {
    const {
        state: {
            searchListing,
            activeCategory,
            activeNeighborhoods,
            focusCard
        },
    } = useStore();


    const { isLoading, isError, data, refetch: refetchListing, isFetching } = useQueryHelper({
        name: 'ALL_LISTING',
        gql: ALL_LISTING,
        variables: {
            "LISTINGCATEGORY": activeCategory,
            "search": searchListing,
            "NEIGHBORHOOD": activeNeighborhoods
        },
        config: { enabled: false }
    });
    useEffect(() => {
        if (activeCategory && activeNeighborhoods) {
            refetchListing()
        }
    }, [searchListing, refetchListing, activeCategory, activeNeighborhoods])

    if ((focusCard)) {
        return (
            <div className={`z-1 ${styles.MenuQuickSearch}`}>
                <Card
                    radius={10}
                    className={styles.CardInputMenuMenuQuickSearch}>
                    {
                        (isError) && (
                            <AlertError
                                label='Error!'
                                description='Please wait a few minutes before you try again'
                            />
                        )
                    }
                    {
                        (isLoading || isFetching)
                            ? (<LoadingMenu />)
                            : (
                                data && (
                                    <CardListing
                                        data={data.listings.nodes}
                                    />
                                )
                            )
                    }
                </Card>
            </div>
        )
    } else {
        return null
    }
}

export default MenuQuickSearch