import React from 'react'
// mantine
import { Card } from '@mantine/core';
// componest
import TabsQuickSearch from '../TabsQuickSearch'


const QuickSearch = () => {
    return (
        <Card className='py-8 bg-[#fffffff2]'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='flex items-center justify-center w-full h-full col-span-1 px-5'>
                    <h3 className='font-normal text-left text-[30px] xl:text-[40px] leading-10 w-full'>
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