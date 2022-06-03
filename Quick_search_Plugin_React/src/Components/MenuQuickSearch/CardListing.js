import React from 'react'
//mantine
import { Divider } from '@mantine/core';
import { DatabaseOff } from 'tabler-icons-react';

//css
import './stylesMenuQuickSearch.css'

const CardListing = (props) => {
    const {
        data,
        // setFocusMenu
    } = props

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

    const heightContainerMenu = () => {
        if (data.length >= 3) {
            return 'containerMenu'
        }
        return 'h-full'
    }

    const redirectListing = (page) => {
        window.location.replace(page)
    }

    return (
        <div
            // onFocus={() => setFocusMenu(true)}
            // onBlur={() => setFocusMenu(false)}
            className={heightContainerMenu()}
        >
            {
                data.map((val, index) => {
                    const { newDevelopment } = val.listingData
                    return (
                        <div onClick={() => redirectListing(val.uri)} className='cardListing' key={index}>
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

                                <div style={{ height: 'inherit' }} className=' dataListing'>
                                    <h4 className='font-outfit titleListing'>
                                        {val.title}
                                    </h4>
                                    <div className='mt-auto'>
                                        <h4 style={{ fontWeight: 500 }} className='font-outfit decriptionListing'>
                                            {newDevelopment.nameOfDevelopment}
                                        </h4>
                                        <span style={{ fontWeight: 300 }} className='font-outfit decriptionListing'>
                                            {`Price $ ${newDevelopment.priceMin}m`} - {`$ ${newDevelopment.priceMax}m`}
                                        </span>
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