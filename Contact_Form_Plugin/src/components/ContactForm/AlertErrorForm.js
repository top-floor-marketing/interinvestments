import React from 'react'
// mantine
import { Text, Box, List } from '@mantine/core';
// styles
import styles from './styles.cf.module.scss'

const AlertErrorForm = (props) => {
    const { errorForm = {} } = props
    return (
        <Box className={styles.BoxListError}>
            {
                (Object.entries(errorForm).length > 0) && (
                    <>
                        {
                            (errorForm.fullName === 'empty' || errorForm.email === 'empty' || errorForm.messageContact === 'empty') && (
                                <>
                                    <Text component='p'>Please, fill in the following fields:</Text>
                                    <List withPadding listStyleType="disc">
                                        {
                                            (errorForm.fullName === 'empty') && (
                                                <List.Item className='my-2'>
                                                    Full Name
                                                </List.Item>
                                            )
                                        }
                                        {
                                            (errorForm.email === 'empty') && (
                                                <List.Item className='my-2'>
                                                    Email
                                                </List.Item>
                                            )
                                        }
                                        {
                                            (errorForm.messageContact === 'empty') && (
                                                <List.Item className='my-2'>
                                                    Contact Message
                                                </List.Item>
                                            )
                                        }
                                    </List>
                                </>
                            )
                        }

                        {
                            ((errorForm.email && errorForm.email !== 'empty') || (errorForm.messageContact && errorForm.messageContact !== 'empty'))
                            && (
                                <>
                                    <Text component='p'>Please, fix the following errors:</Text>
                                    <List withPadding listStyleType="disc">
                                        {
                                            (errorForm.email !== 'empty' && errorForm.email) ? (
                                                <List.Item className='my-2'>
                                                    {errorForm.email}
                                                </List.Item>
                                            ) : null
                                        }
                                        {
                                            (errorForm.messageContact !== 'empty' && errorForm.messageContact) ? (
                                                <List.Item className='my-2'>
                                                    {errorForm.messageContact}
                                                </List.Item>
                                            ) : null
                                        }
                                    </List>
                                </>
                            )
                        }

                    </>
                )
            }
        </Box>
    )
}

export default AlertErrorForm