import React, { useState } from 'react'
// componest
import ButtonTabs from './ButtonTabs';
import SelectTabs from './SelectTabs'
import InputTabs from './InputTabs'
// mantine
import { useMediaQuery } from '@mantine/hooks';

const BUTTONS_TABS = [
    {
        id: 0,
        label: 'New Construction',
    },
    {
        id: 1,
        label: 'New Homes',
    },
    {
        id: 2,
        label: 'Rental Community',
    }
]

const SELECT_TABS = BUTTONS_TABS.map(value => {
    return ({
        value: value.id.toString(),
        label: value.label
    })
})


const TapsQuickSearch = () => {
    const [searchActive, setSearchActive] = useState(BUTTONS_TABS[0].id);
    const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-4'}>
            {
                (matches) ? (
                    BUTTONS_TABS.map((val, index) =>
                        <ButtonTabs
                            key={index}
                            id={val.id}
                            onChageActive={setSearchActive}
                            active={(val.id === searchActive)}
                            text={val.label}
                        />
                    )
                ) : (
                    <SelectTabs
                        onChange={setSearchActive}
                        value={searchActive.toString()}
                        data={SELECT_TABS}
                        className='w-full col-span-3'
                    />
                )

            }
            <SelectTabs className='col-span-3 md:col-span-1' />
            <InputTabs className='col-span-3 md:col-span-2' />
        </div>
    )
}

export default TapsQuickSearch