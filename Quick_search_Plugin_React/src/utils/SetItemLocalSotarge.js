export const getActivePageLocalStore = (page = 'home') => {
    const activePageLocalStore = localStorage.getItem('activePage')
    if (activePageLocalStore) {
        return activePageLocalStore
    } else {
        localStorage.setItem('activePage', page)
        return page
    }
}


export const setActivePageLocalStore = (page = 'home') => {
    localStorage.setItem('activePage', page)
}