import { useState, useEffect } from "react";

const useCouter = (InitialValue = 0, endValue = 100) => {
    const [counterState, setCounter] = useState(InitialValue)
    const [goCount, setGoCount] = useState(false)
    let colorBar;

    let timer = () => { };
    useEffect(() => {
        if (goCount) {
            clearInterval(timer)
            // eslint-disable-next-line react-hooks/exhaustive-deps
            timer = setInterval(() => {
                if (counterState === endValue) {
                    clearInterval(timer)
                    setTimeout(() => {
                        setGoCount(false)
                        setCounter(InitialValue)
                    }, 600);

                    return
                }
                setCounter(prev => prev + 1)
            }, 10)
        }
        return () => clearInterval(timer)
    }, [counterState, goCount])

    colorBar = (counterState <= 25) ? 'red' : (counterState <= 75) ? 'yellow' : 'blue'

    const activateCounter = () => {
        setGoCount(true)
    }

    const ResetCouter = () => {
        setGoCount(false)
        setCounter(InitialValue)
        clearInterval(timer)
    }

    return { counterState, activateCounter, ResetCouter, isActivate: goCount, colorBar }
}

export default useCouter