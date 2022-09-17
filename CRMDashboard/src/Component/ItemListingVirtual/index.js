import React, { useCallback } from "react";

import { Box, Checkbox, createStyles, Avatar, Text, Badge, Paper } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { MapPin, Check } from "tabler-icons-react";

import { ViewLandingListing, IconRemove, IconAddListing } from '../ActionButtons';

import useClientGlobalStore from '../../GlobalStore/useClientGlobalStore';

import PdfListener from "../PdfListener";

import classNames from 'classnames';

import get from 'lodash/get';
import filter from 'lodash/filter';

const useStyles = createStyles((theme, _params) => {
  const { width, _isCheckListing, usingCheck } = _params;

  // avatar reserved 60px,
  // gap reservered 16px
  // padding reserved 32px l + r
  // icon-actions 30px per icon
  let usingViewsAndLiving = (width > 550);
  let usingNei = (width>400);
  let paddingReserved= 32;
  let totalRows = 4;
  let checkBoxReserved = (usingCheck) ? 32 : 0;
  let avatarReserved = (!usingViewsAndLiving) ? 30 : 60;
  let iconsReserved = (usingCheck) ? 38 : 128;

  if(!usingViewsAndLiving || usingCheck)
    totalRows = 2;
  if(!usingNei)
    totalRows = 1; 

  let gapReserved = (totalRows+1) * 16;  
 
  const widthReserved = avatarReserved + iconsReserved + gapReserved + checkBoxReserved + paddingReserved;
  const infoWidth = Math.round((width - widthReserved) / totalRows);

  return {
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      gap: theme.other.spacing.p4,
    },
    containerItemListing: {
      width: "100%",
      boxShadow:
        _isCheckListing && usingCheck
          ? theme.other.shadow.lgPrimary
          : theme.shadows.lg,
      height: "100%",
      backgroundColor:
        _isCheckListing && usingCheck
          ? theme.colors.gray[4]
          : theme.colors.gray[0],
      display: "flex",
      flexDirection: "row",
      justifyItems: "start",
      alignItems: "center",
      padding: theme.other.spacing.p4,
      gap: theme.other.spacing.p4,
      cursor: usingCheck ? "pointer" : "",
    },
    items: {
      minWidth: `${infoWidth}px`,
      fontSize: !usingViewsAndLiving ? "12px" : "14px",
      fontWeight: 400,
      textAlign: "text-left",
      wordWrap: width < 700 ? "break-word" : "normal",
    },
    neiItem: {
      display: !usingNei ? "none !important" : "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    viewsAndLivingItem: {
      display: !usingViewsAndLiving ? "none !important" : "flex",
    },
    itemTitle: {
      fontWeight: "600 !important",
      margin: "0px !important",
      fontSize: !usingViewsAndLiving ? "12px" : "14px",
    },
    badgeFeatured: {
      ".mantine-Badge-rightSection": {
        display: "flex !important",
        flexDirection: "column !important",
        ".icon-tabler": {
          marginTop: "auto !important",
          marginBottom: "auto !important",
        },
      },
      fontSize: width < 700 ? "8px" : "12px",
    },
    containerActions: {
      flex: 1,
      height: "auto",
      display: "flex",
      marginLeft: "auto",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignContent: "center",
      gap: theme.other.spacing.p2,
    },
    boxDialog: {
      display: "flex",
      flexDirection: "column",
      gap: theme.other.spacing.p8,
      width: "100%",
      minHeight: "100px",
      alignItems: "center",
    },
    boxDialogText: {
      fontWeight: "600 !important",
      margin: "0px !important",
      fontSize: "16px",
    },
  };
})

const ItemListingVirtual = (props) => {

  const { usingAddAndRemove, isCheck: usingCheck, width, idAgent, uri, isFeatured, onConfirmAdd, onConfirmRemove, databaseId } = props;

  const { state: { addLeads: { listingData } },  actions: { setListingData } } = useClientGlobalStore();

  const getIsCheckedListing = useCallback(() => {
    return !!filter(listingData, (val) => {
      return val.databaseId === databaseId;
    }).length;
  }, [listingData, databaseId]);

  const _isCheckListing = getIsCheckedListing();

  const { classes } = useStyles({ width, _isCheckListing, usingCheck });

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
          <Text className={classes.boxDialogText}>
            Are you sure you want to add this property?
          </Text>
          <Avatar radius="_40px" size="100px" src={getPhoto()} />
          <Text className={classes.boxDialogText}>{getTitle()}</Text>
        </Box>
      ),
      labels: { confirm: "Add", cancel: "Cancel" },
      confirmProps: { color: "success" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => onConfirmAdd(databaseId),
      zIndex: 9999,
    });
  }

  const onClickRemoveListing = () => {
    openConfirmModal({
      title: null,
      children: (
        <Box className={classes.boxDialog}>
          <Text className={classes.boxDialogText}>
            Are you sure you want to remove this property?
          </Text>
          <Avatar radius="_40px" size="60px" src={getPhoto()} />
          <Text className={classes.boxDialogText}>{getTitle()}</Text>
        </Box>
      ),
      labels: { confirm: "Remove", cancel: "Cancel" },
      confirmProps: { color: "error" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => onConfirmRemove(databaseId),
      zIndex: 9999,
    });
  }

  const onChangeCheckBox = (e) => {
    const currentChecked = e?.currentTarget?.checked || !_isCheckListing;
    const removeId = filter(listingData, (val) => {
      return val.databaseId !== databaseId
    });
    if(currentChecked) {
      const newArrayListing = removeId.concat({ 
        databaseId,
        title: getTitle(),
        photo: getPhoto(),
        neighborhood: getNeighborhood()
      });
      setListingData(newArrayListing);
    } else {
      setListingData(removeId);
    }
  }

  /* useEffect(() => {
    return () => {
      console.log("listing ")
    }
  },[]) */

  return (
    <Box className={classes.container}>
      {usingCheck && (
        <Checkbox onChange={onChangeCheckBox} checked={_isCheckListing} />
      )}
      <Paper
        className={classes.containerItemListing}
        onClick={() => onChangeCheckBox()}
      >
        <Avatar
          radius="_40px"
          size={width < 600 ? "30px" : "60px"}
          src={getPhoto()}
        />
        <Box className={classes.items}>
          <Text className={classes.itemTitle}>{getTitle()}</Text>
          {isFeatured && (
            <PdfListener>
<Badge
              className={classes.badgeFeatured}
              color="success"
              variant="filled"
              sx={{ paddingRight: 3 }}
              rightSection={<Check size={width < 700 ? 10 : 14} />}
            >
              Featured
            </Badge>
            </PdfListener>
            
          )}
        </Box>
        <Box className={classNames(classes.items, classes.neiItem)}>
          <MapPin size={24} />
          <Text lineClamp={2} title={`Neighborhood:\n${getNeighborhood()}`}>
            {getNeighborhood()}
          </Text>
        </Box>
        {!usingCheck && (
          <Text
            className={classNames(classes.items, classes.viewsAndLivingItem)}
            lineClamp={2}
            title={`Views:\n${getViews()}`}
          >
            {getViews()}
          </Text>
        )}

        {!usingCheck && (
          <Text
            className={classNames(classes.items, classes.viewsAndLivingItem)}
            lineClamp={2}
            title={`Living area:\n${getLivingArea()}`}
          >
            {getLivingArea()}
          </Text>
        )}

        <Box className={classes.containerActions}>
          {!isFeatured && usingAddAndRemove && !usingCheck && (
            <IconAddListing
              variant="filled"
              position="top-end"
              color="success"
              id={idAgent}
              radius="_40px"
              onClick={onClickAddListing}
              size={24}
            />
          )}
          {isFeatured && usingAddAndRemove && !usingCheck && (
            <IconRemove
              variant="filled"
              position="top-end"
              color="error"
              id={idAgent}
              radius="_40px"
              size={24}
              onClick={onClickRemoveListing}
            />
          )}

          <ViewLandingListing
            variant="filled"
            labelTooltip="View property"
            id={idAgent}
            uri={uri}
            radius="_40px"
            size={24}
          />

          {/* {
            (!usingCheck)
            &&
            <ShareListing
              variant="filled"
              color="primary"
              id={idAgent}
              uri={uri}
              radius="_40px"
              size={24}
            />
          } */}
          {/* {
            (!usingCheck)
            &&
            <IconDownloadPdf
              variant="filled"
              color="gray"
              id={idAgent}
              radius="_40px"
              size={24}
            />
          } */}
        </Box>
      </Paper>
    </Box>
  );
}

export default React.memo(ItemListingVirtual);