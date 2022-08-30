import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme, _params) => {
    return (
        {
            StepperContainer: {
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            },
            Stepper: {
                borderRadius: '50px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                '.mantine-Stepper-content': {
                    paddingTop: '0px',
                    width: '100%'
                },
            },
            steps: {
                overflow: 'auto',
                width: '1010px'
            },
            titleStep: {
                fontWeight: 700,
                color: theme.colors.gray[6]
            },
            containerDescriptionStep: {
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'start'
            },
            descriptionStep: {
                fontWeight: 700,
                fontSize: '15px'
            },
            stepsIcon: {
                '.mantine-Stepper-stepIcon': {
                    borderRadius: '65px',
                    '&[data-progress]': {
                        backgroundColor: theme.colors.white[0],
                        'svg': {
                            backgroundColor: theme.colors[_params.color],
                        }
                    },
                    '&[data-completed]': {
                        backgroundColor: `${theme.colors.white[0]} !important`,
                        borderColor: `${theme.colors.primary[9]} !important`,
                        'svg': {
                            backgroundColor: theme.colors.primary[9],
                        }
                    }
                }
            },
            icon: {
                'svg': {
                    borderRadius: '50px',
                    padding: '5px',
                }
            },
            GroupControllers: {
                alignContent: 'center',
                height: '100%',
                marginBottom: '40px',
                'Button': {
                    backgroundColor: theme.colors.white[0],
                    '&:hover': {
                        backgroundColor: theme.colors.primary[9],
                        color: theme.colors.white
                    }
                }
            },
            CancelButton: {
                backgroundColor: `${theme.colors.error[6]} !important`,
                borderColor: `${theme.colors.error[6]} !important`,
                color: theme.colors.white[0],
                '&:hover': {
                    backgroundColor: `${theme.colors.error[3]} !important`,
                    borderColor: `${theme.colors.error[3]} !important`,
                }
            },
            ButtonSteps: {
                backgroundColor: `${theme.colors.black[0]} !important`,
                borderColor: `${theme.colors.black[0]} !important`,
                color: theme.colors.white[0],
                '&:hover': {
                    backgroundColor: `${theme.colors.gray[9]} !important`,
                    color: `${theme.colors.black[0]} !important`,
                    borderColor: `${theme.colors.gray[3]} !important`,
                }
            },
            BadgeSteps: {
                color: `${theme.colors.black[0]}`,
                backgroundColor: `${theme.colors.gray[4]}`,
                fontSize: '12px',
                'span': {
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }
            },
            BadgeInProgress: {
                color: theme.colors.white[0],
                backgroundColor: theme.colors.secondary[4],
                fontSize: '12px',
                'span': {
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }
            },
            BadgeCompleted: {
                fontSize: '12px',
                'span': {
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }
            }
        }
    )
});

export default useStyles