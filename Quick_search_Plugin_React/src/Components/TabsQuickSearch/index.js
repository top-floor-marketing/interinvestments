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

// store
import useStore from '../../Store/useStore';
// css
import './styles.css'

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
                setCategories(req.categories.nodes)
                setActiveCategory(req.categories.nodes[0].databaseId)
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
            <div className='containerTabs'>
                <SkeletonQuickSearch />
            </div>
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
            <div className='containerTabs'>
                {
                    (matches) ? (
                        listCategories.map((val, index) =>
                            <ButtonTabs
                                key={index}
                                id={val.databaseId}
                                onChageActive={setActiveCategory}
                                active={(val.databaseId === activeCategory)}
                                text={val.name}
                            />
                        )
                    ) : (
                        <SelectTabs
                            placeholder='Select category'
                            onChange={setActiveCategory}
                            value={activeCategory.toString()}
                            data={SELECT_TABS_CATEGORY(listCategories)}
                            className='w-full col-span-3'
                        />
                    )
                }
                <SelectTabs
                    value={activeNeighborhoods}
                    data={listNeighborhoods}
                    onChange={setactiveNeighborhoods}
                    placeholder='Select Neighborhoods'
                    className='col-span-3 md:col-span-1'
                />
                <InputTabs
                    onFocusChange={(value) => setFocusInput(value)}
                    onChange={setSearchListing}
                    value={searchListing}
                    className='col-span-3 font-outfit md:col-span-2'
                />
            </div>
        )
    }
}

export default TapsQuickSearch