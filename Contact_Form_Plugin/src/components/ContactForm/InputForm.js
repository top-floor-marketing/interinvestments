import React from 'react'
// mantine
import { TextInput, Loader } from '@mantine/core';

const InputForm = (props) => {
    const { placeholder, propsForm, isLoading, isDisabled } = props

    const borderInput = '!border-t-transparent !border-r-transparent !border-l-transparent'

    const classNamesInput = {
        input: `!text-white !bg-transparent !font-outfit ${!propsForm.error && borderInput}`,
        error: '!hidden'
    }

    return (
        <TextInput
            rightSection={isLoading && <Loader size="xs" />}
            disabled={isDisabled}
            styles={{
                disabled: {
                    backgroundColor: '#5c5e62c4 !important'
                }
            }}
            {...propsForm}
            classNames={{ ...classNamesInput }}
            radius={0}
            size="lg"
            placeholder={placeholder}
        />
    )
}

export default InputForm