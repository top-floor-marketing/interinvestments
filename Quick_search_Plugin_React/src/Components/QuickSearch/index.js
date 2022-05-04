import React from 'react'
// mantine
import { Card } from '@mantine/core';
// componest
import TabsQuickSearch from '../TabsQuickSearch'
// css
import './stylesQuickSearch.css'


const QuickSearch = () => {
  return (
    <Card
      radius={10}
      className='py-8 bg-base-100 z-10 max-w-[1280px] mx-auto relative shadow-cards'
    >
      <div className='gridQuickSearch'>
        <div className='containerQuickSearch'>
          <h3 className='labelQuickSearch'>
            Search for new
            <br />
            properties:
          </h3>
        </div>
        <div className='col-span-2 pr-5'>
          <TabsQuickSearch />
        </div>
      </div>
    </Card>
  )
}

export default QuickSearch