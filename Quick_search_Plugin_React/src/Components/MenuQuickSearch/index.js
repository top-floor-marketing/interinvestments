import React, { useEffect } from 'react'
import { Card, Button } from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';
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
            focusMenu
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

    const urlVaribles = () => {
        const URL_ALL_LISTING = '/all-listings/'
        let vars = [];
        let finalVars = ''
        if (searchListing) {
            vars.push(`search=${searchListing}`)
        }
        if (activeNeighborhoods) {
            vars.push(`nei=${activeNeighborhoods}`)
        }
        if (activeCategory) {
            vars.push(`cat=${activeCategory}`)
        }
        if (vars.length) {
            finalVars = vars.reduce((acc, val) => {
                return (acc === '') ? val : ''.concat(acc).concat('&').concat(val)
            }, '');
            finalVars = URL_ALL_LISTING.concat('?').concat(finalVars);
        }

        return finalVars
    }

    if ((focusMenu)) {
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
                    <Button
                        component='a'
                        href={urlVaribles()}
                        variant='outline'
                        className="mx-auto mt-3 btn-wp-primary-icon"
                    >
                        view all result
                        <ChevronRight />
                    </Button>
                </Card>
            </div>
        )
    } else {
        return null
    }
}

export default MenuQuickSearch