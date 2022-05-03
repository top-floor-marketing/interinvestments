import React from 'react'
//mantine
import { Divider } from '@mantine/core';
import { DatabaseOff } from 'tabler-icons-react';

const CardListing = (props) => {
    const { data } = props
 
    if (data.length === 0) {
        return (
            <div className='h-[80px] flex justify-center items-center'>
                <DatabaseOff
                    size={48}
                    strokeWidth={2}
                    color={'black'}
                />
                <p>No data</p>
            </div>
        )
    }

    return (
        <div className='h-[350px] overflow-auto'>
            {
                data.map((val, index) => {
                    const { newDevelopment } = val.listingData
                    return (
                        <div className='hover:bg-[#F6F6F6] cursor-pointer' key={index}>
                            <div className='flex flex-col gap-3 sm:flex-row'>
                                {
                                    (newDevelopment.photos) ? (
                                        <img
                                            className='min-w-[187px] h-[200px] sm:h-[120px] my-auto'
                                            src={newDevelopment.photos[0].sourceUrl}
                                            alt={`ImageListing_${index}`}
                                        />
                                    ) : (
                                        <div className='min-w-[187px] h-[200px] sm:h-[120px] flex justify-center'>
                                            <p className='my-auto text-center'>No Image</p>
                                        </div>
                                    )
                                }

                                <div style={{ height: 'inherit' }} className='flex flex-col w-full'>
                                    <h4 className='text-xl sm:text-3xl font-normal leading-[26px]'>
                                        {val.title}
                                    </h4>
                                    <div className='mt-auto'>
                                        <p className='text-[20px] leading-[26px]'>{newDevelopment.nameOfDevelopment}</p>
                                        <span>{`Price $ ${newDevelopment.priceMin}m`} - {`$ ${newDevelopment.priceMax}m`}</span>
                                    </div>
                                </div>
                            </div>
                            <Divider my="sm" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardListing