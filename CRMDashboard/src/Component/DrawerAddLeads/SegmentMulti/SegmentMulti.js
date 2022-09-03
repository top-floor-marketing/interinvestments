import React from 'react'
// components
import PaperItem from './PaperItem'

const SegmentMulti = ({ data, value, onChange }) => {

    const isActive = (index) => {
        return (value.indexOf(index) > -1)
    }

    const changeValues = (valueItemPaper) => {
        let newValues = [...value]
        if (isActive(valueItemPaper)) {
            newValues = newValues.filter((item) => item !== valueItemPaper)
        } else {
            newValues.push(valueItemPaper)
        }
        onChange(newValues)
    }



    return (
        data.map((valueItem, key) => {
            return (
                <PaperItem
                    onChange={(valItem) => changeValues(valItem)}
                    active={isActive(valueItem.value)}
                    value={valueItem}
                    key={key}
                />
            )
        })
    )
}

export default SegmentMulti