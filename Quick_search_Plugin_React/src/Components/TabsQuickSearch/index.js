import React, { useState } from 'react'
// componest
import ButtonTabs from './ButtonTabs'

const TapsQuickSearch = () => {
    const [searchActive, setSearchActive] = useState('newConst')
    return (
        <div className='grid grid-cols-3 gap-4'>
            <ButtonTabs
                onChageActive={setSearchActive}
                active={!!(searchActive === 'newConstruction')}
                text='New Construction'
            />
            {
                //    <ButtonTabs text='New Homes' />
                // <ButtonTabs text='Rental Community' />
            }
        </div>
    )
}

export default TapsQuickSearch