import React from 'react'
//mantine
import { Divider } from '@mantine/core';
import { DatabaseOff } from 'tabler-icons-react';

//css
import './stylesMenuQuickSearch.css'

const CardListing = (props) => {
    const { data } = props

    if (data.length === 0) {
        return (
            <div className='nodata'>
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
        <div className='containerMenu'>
            {
                data.map((val, index) => {
                    const { newDevelopment } = val.listingData
                    return (
                        <div className='cardListing' key={index}>
                            <div className='contendCardListing'>
                                {
                                    (newDevelopment.photos) ? (
                                        <img
                                            className='object-cover my-auto imageListing'
                                            src={newDevelopment.photos[0].sourceUrl}
                                            alt={`ImageListing_${index}`}
                                        />
                                    ) : (
                                        <div className='flex justify-center imageListing'>
                                            <p className='my-auto text-center'>No Image</p>
                                        </div>
                                    )
                                }

                                <div style={{ height: 'inherit' }} className='dataListing'>
                                    <h4 className='titleListing'>
                                        {val.title}
                                    </h4>
                                    <div className='mt-auto'>
                                        <p className='decriptionListing'>{newDevelopment.nameOfDevelopment}</p>
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