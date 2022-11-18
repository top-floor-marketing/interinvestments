import React from 'react'

// mantine 
import { Button } from '@mantine/core';
// styles
import styles from './styles_CF.module.scss'

const ButtonForm = (props) => {
    const { isLoading, isDisabled } = props
    return (
        <Button
            loading={isLoading}
            disabled={isDisabled}
            type="submit"
            className={`${styles.buttonSubmit} ${isDisabled && 'opacity-40'}`}
            radius={0}
            size="md"
            styles={{
                loading: {
                    backgroundColor: '#5c5e62c4 !important',
                    opacity: 0.40
                }
            }}
        >
            Submit
        </Button>
    )
}

export default ButtonForm