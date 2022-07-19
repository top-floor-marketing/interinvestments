import React from 'react'
// mantine dev
import { TextInput, Box, Select } from '@mantine/core';
import { Search } from 'tabler-icons-react';
// styles 
import styles from './styles_FL_.module.scss'

const FiltersListings = () => {
    return (
        <Box className={styles.ContainerFilters}>
            <TextInput
                className={styles.inputsearch}
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
                placeholder="Pick one"
                radius="xl"
                size="md"
                data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
            />
            <p>radio</p>
        </Box>
    )
}

export default FiltersListings