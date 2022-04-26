import React from 'react'
// componest
import ButtonTabs from './ButtonTabs'

const TapsQuickSearch = () => {

    return (
        <div className='grid grid-cols-3 gap-4'>
            <ButtonTabs text='New Construction' />
            <ButtonTabs text='New Homes' />
            <ButtonTabs text='Rental Community' /> 
        </div>
    )
}

export default TapsQuickSearch