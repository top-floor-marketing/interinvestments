const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
        // convert to K for number from > 1000 < 1 million 
        return {
            number: parseInt((num / 1000).toFixed(1)),
            tag: 'K'
        }
    } else if (num > 1000000) {
        // convert to M for number from > 1 million 
        return {
            number: parseInt((num / 1000000).toFixed(1)),
            tag: 'M'
        }
    } else if (num < 900) {
        // if value < 1000, nothing to do
        return {
            number: num,
            tag: null
        }
    }
}

export {
    numFormatter
}