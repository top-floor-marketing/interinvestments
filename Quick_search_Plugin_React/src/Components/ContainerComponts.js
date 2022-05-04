import React from 'react'

import QuickSearch from '../Components/QuickSearch'
import MenuQuickSearch from '../Components/MenuQuickSearch'

// store
import useStore from '../Store/useStore';

const ContainerComponts = (props) => {
    const { setFocusCard } = useStore();
    return (
        <div
            onFocus={() => setFocusCard(true)}
            onBlur={() => setFocusCard(false)}
        >
            <QuickSearch />
            <MenuQuickSearch />
        </div>
    )
}

export default ContainerComponts