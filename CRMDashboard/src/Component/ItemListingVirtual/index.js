import React, { useCallback } from 'react';

import { Box, Card, createStyles, Avatar, Text, Badge, Paper } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { MapPin, Check } from "tabler-icons-react";

import { ShareListing, ViewLandingListing, IconDownloadPdf, IconRemove, IconAddListing } from '../ActionButtons';

import classNames from 'classnames';

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => {
  const { width } = _params;
  const widthReserved = (width < 600) ? 250 : (width > 1200) ? 380 : 360;
  const infoWidth = Math.round((width - widthReserved) / 4);
  return {
    containerItemListing: {
      width: "100%",
      boxShadow: theme.shadows.lg,
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
      margin: "0px !important"
    },
    badgeFeatured: {
      '.mantine-Badge-rightSection': {
        display: "flex !important",
        flexDirection: "column !important",
        '.icon-tabler': {
          marginTop: "auto !important",
          marginBottom: "auto !important"
        }
      }
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
    boxDialog: {
      display: "flex",
      flexDirection: "column",
      gap: theme.other.spacing.p2,
      width: "100%",
      minHeight: "100px",
      alignItems: "center",
      'h4': {
        textAlign: "text-center",
        margin: 0,
        width: "auto"
      }
    }
  };
})

const ItemListingVirtual = (props) => {

  const { usingAddAndRemove, width, idAgent, uri, isFeatured, onConfirmAdd, onConfirmRemove, databaseId } = props;

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
    return get(props, ["listingData", "newDevelopment", "contentLivingArea", "livingArea"], "");
  }, [props]);

  const onClickAddListing = () => {
   openConfirmModal({
      title: null,
      children: (
        <Box className={classes.boxDialog}>
           <Text component='h5' size="sm">
            Are you sure you want to add this listing?
           </Text>
           <Avatar radius="_40px" size="100px" src={getPhoto()} />
           <Text component='h6' className={classes.itemTitle}>{getTitle()}</Text>
        </Box>
      ),
      labels: { confirm: 'Add', cancel: 'Cancel' },
      confirmProps: { color: 'success' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => onConfirmAdd(databaseId),
      zIndex: 9999
    });
  }

  const onClickRemoveListing = () => {
    openConfirmModal({
      title: null,
      children: (
        <Box className={classes.boxDialog}>
           <Text component='h4' size="sm">
            Are you sure you want to remove this listing?
           </Text>
           <Avatar radius="_40px" size="60px" src={getPhoto()} />
           <Text className={classes.itemTitle}>{getTitle()}</Text>
        </Box>
      ),
      labels: { confirm: 'Remove', cancel: 'Cancel' },
      confirmProps: { color: 'error' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => onConfirmRemove(databaseId),
      zIndex: 9999
    });
  }

  return (
    <Paper className={classes.containerItemListing}>
      <Avatar radius="_40px" size="60px" src={getPhoto()} />
      <Box className={classNames(classes.items)}>
        <Text className={classes.itemTitle}>{getTitle()}</Text>
        {
          (isFeatured)
          &&
          <Badge
            className={classes.badgeFeatured}
            color="success"
            variant="filled"
            sx={{ paddingRight: 3 }}
            rightSection={<Check size={14} />}>
            Featured
          </Badge>
        }
      </Box>

      <Box className={classes.titleWithIcon}>
        <MapPin size={24} />
        <Text
          className={classNames(classes.items, classes.responsiveInfo)}
          lineClamp={3}
          title={`Neighborhood:\n${getNeighborhood()}`}
        >
          {getNeighborhood()}
        </Text>
      </Box>

      <Text
        className={classNames(classes.items, classes.responsiveInfo)}
        lineClamp={2}
        title={`Views:\n${getViews()}`}
      >
        {getViews()}
      </Text>
      <Text
        className={classNames(classes.items, classes.responsiveInfo)}
        lineClamp={2}
        title={`Living area:\n${getLivingArea()}`}
      >
        {getLivingArea()}
      </Text>
      <Box className={classes.containerActions}>
        {
          (!isFeatured && usingAddAndRemove)
          &&
          <IconAddListing
            variant="filled"
            position="top-end"
            color="success"
            id={idAgent}
            radius="_40px"
            onClick={onClickAddListing}
            size={24}
          />
        }
        <ViewLandingListing
          variant="filled"
          labelTooltip="Open listing"
          id={idAgent}
          uri={uri}
          radius="_40px"
          size={24}
        />
        <ShareListing
          variant="filled"
          color="primary"
          id={idAgent}
          uri={uri}
          radius="_40px"
          size={24}
        />
        <IconDownloadPdf
          variant="filled"
          color="gray"
          id={idAgent}
          radius="_40px"
          size={24}
        />
        {
          (isFeatured && usingAddAndRemove)
          &&
          <IconRemove
            variant="filled"
            position="top-end"
            color="error"
            id={idAgent}
            radius="_40px"
            size={24}
            onClick={onClickRemoveListing}
          />
        }

      </Box>
    </Paper>
  );
}

export default React.memo(ItemListingVirtual);