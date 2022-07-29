import React, { useCallback } from 'react';

import { Box, Card, createStyles, Avatar, Text } from '@mantine/core';
import { MapPin } from "tabler-icons-react";

import { ShareListing, ViewLandingListing, IconDownloadPdf, IconRemove } from '../ActionButtons';

import classNames from 'classnames';

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => {
    const { width } = _params;
    const widthReserved = (width<600) ? 270 : (width>1200) ? 350 : 400;
    const infoWidth = Math.round((width - widthReserved) / 4);
    return {
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
        gap: theme.other.spacing.p4,
      },
      avatarImageContainer: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        marginRight: "auto",
        width: "60px",
      },
      titleWithIcon: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        gap: theme.other.spacing.p2,
      },
      items: {
        minWidth: `${infoWidth}px`,
        fontSize: "14px",
        fontWeight: 400,
        textAlign: "text-left",
      },
      itemTitle: {
        fontWeight: "600 !important",
      },
      responsiveInfo: {
        display: "block",
        [`${theme.fn.smallerThan(650)}`]: {
          display: "none",
        },
      },
      containerActions: {
        width: "100%",
        minWidth: "130px",
        height: "auto",
        display: "flex",
        marginLeft: "auto",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignContent: "center",
        gap: theme.other.spacing.p2,
        paddingRight: theme.other.spacing.p2,
        [`${theme.fn.smallerThan(650)}`]: {
          minWidth: "100px",
        },
      },
    };
})

const ItemListingVirtual = (props) => {

    const { width, idAgent, uri } = props;

    const { classes } = useStyles({ width });

    const getPhoto = useCallback(() => {
        return get(props, ["listingData", "newDevelopment", "photos", "0", "sourceUrl"], "");
    }, [props]);

    const getTitle = useCallback(() => {
        return get(props, ["title"], "");
    }, [props]);

    const getNeighborhood = useCallback(() => {
      return get(props, ["neighborhoods", "nodes", "0", "name"], "");
    }, [props]);

    const getViews = useCallback(() => {
      return get(props, ["listingData", "newDevelopment", "views"], "");
    }, [props]);

    const getLivingArea = useCallback(() => {
      return get(props, ["listingData", "newDevelopment", "livingArea"], "");
    }, [props]);

    return (
      <Card className={classes.containerItemListing}>
        <Avatar radius="_40px" size="60px" src={getPhoto()} />
        <Text className={classNames(classes.items, classes.itemTitle)}>
          {getTitle()}
        </Text>
        <Box className={classes.titleWithIcon}>
          <MapPin size={20} />
          <Text
            className={classNames(classes.items, classes.responsiveInfo)}
            lineClamp={3}
            title={`${getNeighborhood()} neighborhood`}
          >
            {getNeighborhood()}
          </Text>
        </Box>

        <Text
          className={classNames(classes.items, classes.responsiveInfo)}
          lineClamp={3}
        >
          {getViews()}
        </Text>
        <Text
          className={classNames(classes.items, classes.responsiveInfo)}
          lineClamp={3}
        >
          {getLivingArea()}
        </Text>
        <Box className={classes.containerActions}>
          <ViewLandingListing
            variant="filled"
            labelTooltip="Open listing"
            id={idAgent}
            uri={uri}
            radius="_40px"
            size={20}
          />
          <ShareListing
            variant="filled"
            color="primary"
            id={idAgent}
            uri={uri}
            radius="_40px"
            size={20}
          />
          <IconDownloadPdf
            variant="filled"
            color="gray"
            id={idAgent}
            radius="_40px"
            size={20}
          />
          <IconRemove
            variant="filled"
            position="top-end"
            color="error"
            id={idAgent}
            radius="_40px"
            size={20}
          />
        </Box>
      </Card>
    );
}

export default React.memo(ItemListingVirtual);