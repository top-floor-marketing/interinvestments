import React, { useCallback } from 'react';

import { Box, Card, createStyles, Avatar, Text } from '@mantine/core';

import classNames from 'classnames';

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
    containerItemListing: {
        width: "100%",
        boxShadow: theme.shadows.md,
        height: "100%",
        backgroundColor: theme.colors.gray[0],
        display: "flex",
        flexDirection: "row",
        justifyItems: "start",
        alignItems: "center",
        padding: theme.other.spacing.p4,
        gap: theme.other.spacing.p4
    },
    avatarImageContainer: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        marginRight: "auto",
        width: "50px",
    },
    items: {
        minWidth: "160px",
        fontSize: "14px",
        fontWeight: 400,
        textAlign: "text-left",
    },
    itemTitle: {
        fontWeight: "600 !important",
    },
    containerInfo: {
        minWidth: "512px",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.other.spacing.p4,
    },
    containerActions: {
        width: "100%",
        minWidth: "110px",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        padding: theme.other.spacing.p4,
        gap: theme.other.spacing.p4
    }
}));

const ItemListingCard = (props) => {

    const { width } = props;

    const { classes } = useStyles({width});

    //console.log("props ", props)
    console.log("width ", width)

    const getPhoto = useCallback(() => {
        return get(props, ["listingData", "newDevelopment", "photos", "0", "sourceUrl"], "");
    }, [props]);

    const getTitle = useCallback(() => {
        return get(props, ["title"], "");
    }, [props]);

    return (
        <Card className={classes.containerItemListing}>
            <Avatar
                radius="_40px"
                size="50px"
                src={getPhoto()}
            />
            <Text className={classNames(classes.items, classes.itemTitle)}>
                {getTitle()}
            </Text>
                <Box className={classes.containerInfo}>
                    <Text className={classes.items} lineClamp={3}>
                        {getTitle()}
                    </Text>
                    <Text className={classes.items} lineClamp={3}>
                        {getTitle()}
                    </Text>
                    <Text className={classes.items} lineClamp={3}>
                        {getTitle()}
                    </Text>
                </Box>
                <Box className={classes.containerActions}>
                    <a>a</a>
                    <a>b</a>
                    <a>c</a>
                    <a>d</a>
                </Box>
        </Card>
    )
}

export default React.memo(ItemListingCard);