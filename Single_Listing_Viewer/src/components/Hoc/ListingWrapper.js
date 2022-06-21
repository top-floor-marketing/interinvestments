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
import { LISTINGS_BY_SLOG } from '../../GraphqlClient/GQL';

const useStyles = createStyles((theme, _params, getRef) => ({
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
    const { setValueListing, children } = props
    const id = "wp-loading-full-single-listing";

    const { isLoading, error } = useQueryHelper({
        name: 'LISTINGS_BY_SLOG',
        gql: LISTINGS_BY_SLOG,
        variables: {
            "title": "test"
        },
        config: {
            onSuccess: (req) => {
                setValueListing(...req.listings.nodes)
            },
            // onError: () => {
            //     console.log('error data')
            // }
        }
    });

    useEffect(() => {
        if (id && isLoading) {
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
    }, [isLoading]);

    if (isLoading) {
        return (
            <Box className={classes.box}>
                <Overlay zIndex={9998} color="#000" opacity={0.4} />
                <Box id={id} className={classes.lottieContainer} />
            </Box>
        );
    }

    if (error) {
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