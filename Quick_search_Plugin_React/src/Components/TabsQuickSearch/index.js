import React, { useState } from 'react'
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
// css
import './styles.css'

const BUTTONS_TABS = [
    {
        id: 0,
        label: 'New Construction',
    },
    {
        id: 1,
        label: 'New Homes',
    },
    {
        id: 2,
        label: 'Rental Community',
    }
]

// const SELECT_TABS = BUTTONS_TABS.map(value => {
//     return ({
//         value: value.id.toString(),
//         label: value.label
//     })
// })


const TapsQuickSearch = () => {
    const [searchActive, setSearchActive] = useState();
    const matches = useMediaQuery('(min-width: 1024px)');

    const { isLoading, isError, data } = useQueryHelper({
        name: 'LISTINGS_CATEGORY',
        gql: LISTINGS_CATEGORY,
        variables: {
            first: 3
        },
        config: {
            onSuccess: (req) => {
                setSearchActive(req.categories.nodes[0].databaseId)
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
                        data.categories.nodes.map((val, index) =>
                            <ButtonTabs
                                key={index}
                                id={val.databaseId}
                                onChageActive={setSearchActive}
                                active={(val.databaseId === searchActive)}
                                text={val.name}
                            />
                        )
                    ) : (
                        <SelectTabs
                            placeholder='Select category'
                            onChange={setSearchActive}
                            value={searchActive.toString()}
                            data={SELECT_TABS(data.categories.nodes)}
                            className='w-full col-span-3'
                        />
                    )
                }
                <SelectTabs placeholder='Select Location' className='col-span-3 md:col-span-1' />
                <InputTabs className='col-span-3 md:col-span-2' />
            </div>
        )
    }


}

export default TapsQuickSearch