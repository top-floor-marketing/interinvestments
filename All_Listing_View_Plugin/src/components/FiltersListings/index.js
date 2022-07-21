import React from 'react'
// components
import SegmentedTypeListing from './SegmentedTypeListing'
import SkeletonFilters from './SkeletonFilters'
// mantine dev
import { TextInput, Box, Select } from '@mantine/core';
import { Search } from 'tabler-icons-react';
// redux
import { useSelector, useDispatch } from 'react-redux'
import { actionslices } from '../store'
// styles 
import styles from './styles_FL_.module.scss'

const FiltersListings = () => {
    const dispatch = useDispatch()
    const { search, neighborhood, categoy } = useSelector((state) => state.filter)
    const { dataCategory, dataNei, isLoading } = useSelector((state) => state.statusQuery)
    const { setSearch, setneighborhood, setcategoy } = actionslices

    if (isLoading) {
        return (
            <SkeletonFilters />
        )
    }

    return (
        <Box className={styles.ContainerFilters}>
            <TextInput
                className={styles.inputsearch}
                name='search'
                value={search}
                onChange={(valueInpu) => (
                    dispatch(setSearch(valueInpu.target.value))
                )}
                classNames={{
                    rightSection: 'm-[10px] opacity-50',
                    input: '!pr-[45px]'
                }}
                rightSection={<Search size={21} />}
                placeholder="conde name, or zip code"
                radius="xl"
                size="md"
            />
            <Select
                value={neighborhood}
                onChange={(value) => dispatch(setneighborhood(value))}
                className={styles.inputsearch}
                placeholder="select Neighborhood"
                radius="xl"
                size="md"
                data={dataNei.map(
                    (value) => (
                        {
                            value: `${value.databaseId}`,
                            label: value.name
                        }
                    )
                )}
            />
            <SegmentedTypeListing
                value={categoy}
                onChange={(value) => dispatch(setcategoy(value))}
                dataCategory={dataCategory.map(
                    (value) => (
                        {
                            value: `${value.databaseId}`,
                            label: value.name
                        }
                    )
                )}
            />
        </Box>
    )
}

export default FiltersListings