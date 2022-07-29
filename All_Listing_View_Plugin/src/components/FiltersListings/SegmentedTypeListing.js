import React from 'react'
// mantine dev
import { SegmentedControl, Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// styles 
import styles from './styles_FL_.module.scss'


const SegmentedTypeListing = (props) => {

    const matches = useMediaQuery('(min-width: 1200px)');
    const {
        dataCategory = [
            { label: 'test 1', value: 'tes1' },
            { label: 'tes  2', value: 'tes2' },
        ],
        value,
        onChange: onChangeSegmente = () => { }
    } = props

    if (!matches) {
        return (
            <Select
                value={value}
                onChange={(value) => onChangeSegmente(value)}
                className={styles.inputsearch}
                placeholder="Select category"
                radius="xl"
                size="md"
                data={dataCategory}
            />
        )
    }

    return (
        <SegmentedControl
            className='w-full lg:max-w-[550px]'
            size="md"
            data={dataCategory}
            onChange={(value) => onChangeSegmente(value)}
            value={value}
            classNames={{
                root: '!border-none transition duration-150 gap-5 bg-transparent ',
                control: '!border-none',
                active: "!shadow-none",
                label: 'text-[#ced4da] hover:text-black',
                controlActive: 'rounded-none !border-none !shadow-none',
                labelActive: 'border border-b-black border-t-0 border-l-0 border-r-0 rounded-none !text-black'
            }}
        />
    )
}

export default SegmentedTypeListing