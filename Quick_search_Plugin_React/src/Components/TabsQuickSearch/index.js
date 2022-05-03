import React from 'react'
// componest
import ButtonTabs from './ButtonTabs';
import SelectTabs from './SelectTabs'
import InputTabs from './InputTabs'
import SkeletonQuickSearch from '../SkeletonQuickSearch'
import AlertError from '../AlertError'

// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { LISTINGS_CATEGORY } from '../../GraphqlClient/GQL';

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
            listLocation
        },
        setCategories,
        setActiveCategory,
        setSearchListing
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


    const SELECT_TABS = (req) => {
        return req.map(value => {
            return ({
                value: value.databaseId.toString(),
                label: value.name
            })
        })

    }

    if (isLoading && !data) {
        return (
            <div className='containerTabs'>
                <SkeletonQuickSearch />
            </div>
        )
    }

    if (isError) {
        return (
            <AlertError
                label='Error!'
                description='Please wait a few minutes before you try again'
            />
        )
    }

    if (data) {
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
                            data={SELECT_TABS(listCategories)}
                            className='w-full col-span-3'
                        />
                    )
                }
                <SelectTabs
                    value='1'
                    data={listLocation}
                    placeholder='Select Location'
                    className='col-span-3 md:col-span-1'
                />
                <InputTabs
                    onChange={setSearchListing}
                    value={searchListing}
                    className='col-span-3 md:col-span-2'
                />
            </div>
        )
    }
}

export default TapsQuickSearch