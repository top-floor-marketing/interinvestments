// assets
import fondoLogin from './assets/images/fondoLogin.jpg'
// mantine
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({

    containerLogin: {
        width: '100%',
        margin: 'auto',
        height: '100%',
        padding: '12px',
        [`@media (min-width: ${theme.breakpoints.xs}px) and (max-width: 1500px)`]: {
            width: '65%',
        },

        [`@media (min-width: 1501px)`]: {
            width: '55%',
        }

    },

    contentLogin: {
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        },
    },
    contentFom: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '22px',
        [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
            padding: '44px',
        }
    },
    titleForm: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '40px'
    },
    containerSocialMedia: {
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
        gridGap: '1rem',
        marginTop: '0.70rem',
        marginBottom: '0.70rem'
    },
    InputForm: {
        ref: getRef('InputForm'),
    },
    containerForm: {
        width: '100%',
        [`.${getRef('InputForm')}`]: {
            width: '100%',
            marginTop: '25px',
            marginBottom: '25px'
        }
    },
    buttonPassword: {
        color: 'black',
        [`&:hover`]: {
            backgroundColor: 'transparent',
            color: '#5398FF',
        },
    },
    imageLogin: {
        position: 'relative',
        width: '100%'
    },

    ParallaxCroma: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        zIndex: 1,
        opacity: 0.1
    },

    ParallaxContain: {
        height: '100%',
        width: '100%',
        background: `url(${fondoLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLogin: {
        width: '100%',
        fontSize: '20px',
        lineHeight: '1.7em',
        borderWidth: '1px',
        padding: '0.3em 1em',
    }
}))

export default useStyles