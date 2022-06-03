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
import './stylesMenuQuickSearch.css'

const MenuQuickSearch = () => {
    const {
        state: {
            searchListing,
            activeCategory,
            activeNeighborhoods,
            focusCard,
            focusMenu
        },
        // setFocusMenu
    } = useStore();

    const { isLoading, isError, data, refetch: refetchListing, isFetching } = useQueryHelper({
        name: 'ALL_LISTING',
        gql: ALL_LISTING,
        variables: {
            "categoryIn": activeCategory,
            "search": searchListing,
            "slug": activeNeighborhoods
        },
        config: { enabled: false }
    });

    useEffect(() => {
        if (searchListing.length >= 4) {
            refetchListing()
        }
    }, [searchListing, refetchListing, activeCategory, activeNeighborhoods])


    if ((searchListing.length >= 4)) {
        return (
            <div className={`MenuQuickSearch z-1 ${focusCard || focusMenu ? '' : ''}`}>
                <Card
                    radius={10}
                    className='max-w-[1200px] w-[90%] mx-auto border-0 pt-[3rem] shadow-cards'>
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
                                        // setFocusMenu={setFocusMenu}
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