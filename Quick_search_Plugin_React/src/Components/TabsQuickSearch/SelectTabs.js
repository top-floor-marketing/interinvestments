import React, { useRef } from 'react'
import { Select, Box } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

// css
import styles from './styles.tqs.module.scss'

const SelectTabs = (props) => {
    const { type, data = [], value, onChange, placeholder = '', onClick: onClickComponet } = props

    const refSelect = useRef(null)

    const IconSelct = ({ refProps }) => {
        return (
            <Box
                className={styles.ContainerIconSelect}
                onClick={() => refProps.current.click()}
            >
                <ChevronDown size={14} />
            </Box>
        )
    }

    return (
        <Select
            value={value}
            onChange={(value) => {
                onChange(value)
                onClickComponet()
            }}
            className={`${(type === 'SelectTabsCategory') ? styles.SelectTabsCategory : styles.SelectTabsNeighborhoods}`}
            classNames={{
                input: `${styles.categorySelect}`,
            }}
            dropdownPosition="bottom"
            zIndex={100}
            ref={refSelect}
            rightSection={<IconSelct refProps={refSelect} />}
            placeholder={placeholder}
            data={data}
        />
    )
}

export default SelectTabs