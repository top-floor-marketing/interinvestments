import React from 'react'
// mantine
import { Card } from '@mantine/core';
// componest
import TabsQuickSearch from '../TabsQuickSearch'
// css
import './stylesQuickSearch.css'

const QuickSearch = () => {
  return (
    <Card className='py-8 bg-white'>
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