import React from 'react'
// mantine
import { TextInput } from '@mantine/core';

const InputForm = (props) => {
    const { placeholder, propsForm } = props

    const borderInput = 'border-t-transparent border-r-transparent border-l-transparent'

    const classNamesInput = {
        input: `text-white bg-transparent font-outfit ${!propsForm.error && borderInput}`,
        error: 'hidden'
    }

    return (
        <TextInput
            {...propsForm}
            classNames={{ ...classNamesInput }}
            radius={0}
            size="lg"
            placeholder={placeholder}
        />
    )
}

export default InputForm