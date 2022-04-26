import React from 'react'
// mantine
import { Card } from '@mantine/core';
// componest
import TabsQuickSearch from '../TabsQuickSearch'


const QuickSearch = () => {
    return (
        <div className='w-full h-full'>
            <Card className='py-8'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className='flex items-center justify-center w-full h-full'>
                        <h3 className='font-normal text-left text-[30px] xl:text-[40px] leading-10 w-full md:w-1/2'>
                            Search for new properties:
                        </h3>
                    </div>
                    <div className='mx-5'>
                        <TabsQuickSearch />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default QuickSearch