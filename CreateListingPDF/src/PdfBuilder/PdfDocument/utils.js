const numFormatter = (num) => {
    const temp = parseInt(num);
    if (temp > 999 && temp < 1000000) {
        // convert to K for number from > 1000 < 1 million 
        return `${parseInt((temp / 1000).toFixed(1))}K`;
    } else if (temp > 1000000) {
        // convert to M for number from > 1 million 
        return `${parseInt((temp / 1000000).toFixed(1))}M`;
    } else if (temp < 900) {
        // if value < 1000, nothing to do
        return temp
    }
}

export {
    numFormatter
}