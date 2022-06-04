import React from 'react'
// componest
import ButtonTabs from './ButtonTabs';
import SelectTabs from './SelectTabs'
import InputTabs from './InputTabs'
import SkeletonQuickSearch from '../SkeletonQuickSearch'
import AlertError from '../AlertError'
// utils
import { SELECT_TABS_CATEGORY, SELECT_NEIGHBORHOODS } from '../../utils/mapValueSelect'

// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { LISTINGS_CATEGORY, ALL_NEIGHBORHOODS } from '../../GraphqlClient/GQL';

// mantine
import { useMediaQuery } from '@mantine/hooks';

import { Box } from '@mantine/core';

// store
import useStore from '../../Store/useStore';
// css
import styles from './styles.tqs.module.scss'

const TapsQuickSearch = () => {
    const matches = useMediaQuery('(min-width: 1024px)');
    const {
        state: {
            listCategories,
            activeCategory,
            searchListing,
            listNeighborhoods,
            activeNeighborhoods
        },
        setCategories,
        setActiveCategory,
        setSearchListing,
        setFocusInput,
        setNeighborhoods,
        setactiveNeighborhoods
    } = useStore();

    const { isLoading, isError, data } = useQueryHelper({
        name: 'LISTINGS_CATEGORY',
        gql: LISTINGS_CATEGORY,
        variables: {
            first: 3
        },
        config: {
            onSuccess: (req) => {
                setCategories(req.listingCategories.nodes)
                setActiveCategory(req.listingCategories.nodes[0].slug)
            }
        }
    });

    const { isLoading: isLoadingNEIGHBORHOODS, isError: isErrorNEIGHBORHOODS, data: dataNEIGHBORHOODS } = useQueryHelper({
        name: 'ALL_NEIGHBORHOODS',
        gql: ALL_NEIGHBORHOODS,
        config: {
            onSuccess: (req) => {
                setNeighborhoods(SELECT_NEIGHBORHOODS(req.neighborhoods.nodes))
                setactiveNeighborhoods(SELECT_NEIGHBORHOODS(req.neighborhoods.nodes)[0].value)
            }
        }
    });



    if ((isLoading || isLoadingNEIGHBORHOODS) && (!data || !dataNEIGHBORHOODS)) {
        return (
            <Box className={styles.containerTabs}>
                <SkeletonQuickSearch />
            </Box>
        )
    }

    if (isError || isErrorNEIGHBORHOODS) {
        return (
            <AlertError
                label='Error!'
                description='Please wait a few minutes before you try again'
            />
        )
    }

    if (data && dataNEIGHBORHOODS) {
        return (
            <Box className={styles.containerTabs}>
                {
                    (matches) ? (
                        listCategories.map((val, index) =>
                            <ButtonTabs
                                key={index}
                                id={val.slug}
                                onChageActive={setActiveCategory}
                                active={(val.slug === activeCategory)}
                                text={val.name}
                            />
                        )
                    ) : (
                        <SelectTabs
                            placeholder='Select category'
                            onChange={setActiveCategory}
                            value={activeCategory}
                            data={SELECT_TABS_CATEGORY(listCategories)}
                            className={`${styles.SelectTabsCategory}`}
                        />
                    )
                }
                <SelectTabs
                    value={activeNeighborhoods}
                    data={listNeighborhoods}
                    onChange={setactiveNeighborhoods}
                    placeholder='Select Neighborhoods'
                    className={`${styles.SelectTabsNeighborhoods}`}
                />
                <InputTabs
                    onFocusChange={(value) => setFocusInput(value)}
                    onChange={setSearchListing}
                    value={searchListing}
                    className={`${styles.InputTabs}`}
                />
            </Box>
        )
    }
}

export default TapsQuickSearch