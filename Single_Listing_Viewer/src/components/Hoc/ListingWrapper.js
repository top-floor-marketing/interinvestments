import React, { useEffect } from 'react'
// components
import AlertError from '../AlertError'

// mantine
import { Box, Overlay, createStyles } from "@mantine/core";
// animation lottie
import lottie from "lottie-web";
import IntroLoading from "../../assets/Lottie/IntroLoading.json";

// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { LISTINGS_BY_SLOG, ACF_OPTIONS_GlOBAL_OPTIONS } from '../../GraphqlClient/GQL';

const useStyles = createStyles((theme, _params) => ({
    box: {
        position: "absolute",
        height: "100vh",
        width: "100%",
        backgroundColor: "transparent",
        zIndex: 9999,
        display: _params.isLoading ? "block" : "none",
    },
    lottieContainer: {
        position: "fixed",
        backgroundColor: "transparent",
        width: "300px",
        height: "300px",
        zIndex: 9999,
        top: "50%",
        left: "50%",
        marginTop: "-150px",
        marginLeft: "-150px",
        display: _params.isLoading ? "block" : "none",
    },
}));


const ListingWrapper = (props) => {
    const { classes } = useStyles({ isLoading: true });
    const { setValueListing, children, setOptionTheme } = props

    const id = "wp-loading-full-single-listing";
    const uri = window.location.pathname
    const slugLIsting = uri.split('/')[2]

    console.log('slugLIsting', slugLIsting)

    const { isLoading, error, data } = useQueryHelper({
        name: 'LISTINGS_BY_SLOG',
        gql: LISTINGS_BY_SLOG,
        variables: {
            "title": slugLIsting ? slugLIsting.replace(/-/g, ' ') : '_null_'
        },
        config: {
            enabled: !!(slugLIsting),
            onSuccess: (req) => {
                setValueListing(...req.listings.nodes)
            }
        }
    });

    const { isLoading: isLoadingTheme, error: errorTheme, data: dataTheme } = useQueryHelper({
        name: 'ACF_OPTIONS_GlOBAL_OPTIONS',
        gql: ACF_OPTIONS_GlOBAL_OPTIONS,
        config: {
            onSuccess: (req) => {
                //console.log('ThemeData', { ...req.acfOptionsGlobalOptions })
                setOptionTheme({ ...req.acfOptionsGlobalOptions.optionPage })
            }
        }
    });

    useEffect(() => {
        if (id && (isLoading || isLoadingTheme)) {
            lottie.loadAnimation({
                container: document.querySelector(`#${id}`),
                animationData: IntroLoading,
                renderer: "svg",
                loop: true,
                width: "200px",
                height: "200px",
                autoplay: true,
                name: id,
            });
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
        } else if (id) {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            lottie.destroy(id);
        }
        return () => {
            document.getElementsByTagName("body")[0].style.overflow = "auto";
            lottie.destroy(id);
        };
    }, [isLoading, isLoadingTheme]);

    if (isLoading || isLoadingTheme) {
        return (
            <Box className={classes.box}>
                <Overlay zIndex={9998} color="#000" opacity={0.4} />
                <Box id={id} className={classes.lottieContainer} />
            </Box>
        );
    }

    if ((error || errorTheme) || (data.listings.nodes.length === 0 || dataTheme.acfOptionsGlobalOptions.optionPage.mapApiKey === null)) {
        return (
            <Box className='flex items-center justify-center w-full h-screen'>
                <Box className='max-w-screen-md'>
                    <AlertError
                        label='Error!'
                        description='Please wait a few minutes before you try again'
                    />
                </Box>
            </Box>
        )
    }

    return (children)
}

export default ListingWrapper