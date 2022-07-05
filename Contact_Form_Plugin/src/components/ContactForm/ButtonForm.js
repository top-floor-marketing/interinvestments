import React from 'react'

// mantine 
import { Button } from '@mantine/core';
// styles
import styles from './styles.cf.module.scss'

const ButtonForm = () => {
    return (
        <Button
            type="submit"
            className={styles.buttonSubmit}
            radius={0}
            size="md"
        >
            Submit
        </Button>
    )
}

export default ButtonForm