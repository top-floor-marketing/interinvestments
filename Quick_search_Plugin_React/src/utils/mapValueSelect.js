export const SELECT_TABS_CATEGORY = (req) => {
    return req.map(value => {
        return ({
            value: value.slug,
            label: value.name
        })
    })
}

export const SELECT_NEIGHBORHOODS = (req) => {
    return req.map(value => {
        return ({
            value: value.slug,
            label: value.title
        })
    })
}