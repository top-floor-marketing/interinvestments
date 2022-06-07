export const SELECT_TABS_CATEGORY = (req) => {
    return req.map(value => {
        return ({
            value: value.databaseId.toString(),
            label: value.name
        })
    })
}

export const SELECT_NEIGHBORHOODS = (req) => {
    return req.map(value => {
        return ({
            value: value.databaseId.toString(),
            label: value.name
        })
    })
}