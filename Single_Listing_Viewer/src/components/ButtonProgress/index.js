import React, { useState, useEffect } from 'react'
// mantine
import { Progress, Box } from '@mantine/core';

const ButtonProgress = () => {
    const [counterState, setCounter] = useState(0)
    const [goCount, setGoCount] = useState(false)
    let timer;
    useEffect(() => {
        if (goCount) {
            clearInterval(timer)
            // eslint-disable-next-line react-hooks/exhaustive-deps
            timer = setInterval(() => {
                if (counterState === 100) {
                    clearInterval(timer)
                    return
                }
                setCounter(prev => prev + 1)
            }, 10)

            return () => clearInterval(timer)
        }

    }, [counterState, goCount])

    return (
        <Box>
            <Progress value={counterState} label={`${counterState}%`} size="xl" radius="xl" />
            <br />
            <button onClick={() => setGoCount(true)}>go</button>
        </Box>
    )
}

export default ButtonProgress