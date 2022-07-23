import React from 'react';

import { Box, Card, createStyles } from '@mantine/core';

import random from 'lodash/random';
import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
    containerItemListing: {
        width: "100%",
        boxShadow: theme.shadows.md,
        height: "100%",
        backgroundColor: theme.colors.gray[0],
        display: "flex",
        flexDirection: "row",
        padding: theme.other.spacing.p4,
        gap: theme.other.spacing.p4
    },
    avatarImageContainer: {
        width: "100px",
         backgroundColor: theme.colors.success[4]
    },
    categoryContainer: {
        width: "100px",
         backgroundColor: theme.colors.error[4]
    },
    neiContainer: {
        width: "100%",
         backgroundColor: theme.colors.primary[4]
    }
}));

const ItemListingCard = (props) => {

    const { classes } = useStyles();

    return (
        <Card className={classes.containerItemListing}>
            <Box className={classes.avatarImageContainer}>

            </Box>
            <Box className={classes.categoryContainer}>
                
            </Box>
            <Box className={classes.neiContainer}>
                
            </Box>
        </Card>
    )
}

export default ItemListingCard;