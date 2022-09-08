import React from 'react'
// componen
import SelectStateLeads from '../../Component/SelectStateLeads'
// mantine dev
import { Box, Textarea } from '@mantine/core';

const BodyModal = ({ valueSelect, setvalueSelect }) => {
    return (
        <>
            <Box>
                <label>New Status</label>
                <SelectStateLeads
                    value={valueSelect}
                    onChange={(idState) => setvalueSelect(idState)}
                />
            </Box>
            <Box>
                <label htmlFor="">New comment</label>
                <Textarea
                    placeholder="Your name"
                    label={null}
                />
            </Box>
        </>
    )
}

export default BodyModal