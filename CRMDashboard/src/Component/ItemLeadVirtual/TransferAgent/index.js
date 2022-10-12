import { useState, forwardRef, useRef, useImperativeHandle } from "react";
import { useDebouncedState } from '@mantine/hooks';
import { Box, createStyles, Text, Checkbox, TextInput } from "@mantine/core";
import AvatarText from "../../AvatarText";
import { FixedSizeGrid as Grid } from "react-window";

import { useId, useElementSize } from "@mantine/hooks";

import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import random from 'lodash/random';

import { Search } from "tabler-icons-react";

import { INPUT_BORDER_BOTTOM } from "../../../MatineProvider/stylesProvider";

const GUTTER_SIZE = 8;
const ROW_HEIGHT = 60;

const useStyles = createStyles((theme, _params) => {
    return {
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.other.spacing.p4,
            minHeight: "300px",
        },
        textTitle: {
            fontSize: "16px",
            fontWeight: 500
        },
        virtualContainer: {
            backgroundColor: theme.colors.gray[0],
        },
        inputSearch: {
            width: "100%",
            maxWidth: "600px !important",
            ...INPUT_BORDER_BOTTOM,
        },
        containerAgent: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            borderBottom: `1px solid ${theme.colors.gray[5]}`,
            padding: theme.other.spacing.p2,
            alignItems: "center",
            gap: theme.other.spacing.p4,
            '&:hover': {
                cursor: "pointer",
                backgroundColor: theme.colors.primary[0],
                'span': {
                    color: theme.colors.white[0]
                }
            }
        },
        infoAgent: {
            display: "flex",
            flexDirection: "column",
            width: "calc(100% - 72px)",
            fontSize: "12px"
        }
    };
});

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
        ref={ref}
        style={{
            ...style,
            maxWidth: "100%",
        }}
        {...rest}
    />
));


const TransferAgent = forwardRef(({ textTitle, data, checkList, checkAgent }, ref) => {

    const { cx, classes } = useStyles();

    const {
        ref: refParentBox,
        width: widthParent,
        height: heightParent,
    } = useElementSize();

    const [idGrid] = useState(`${useId()}_${random(100, 10000)}`);

    // filters values
    const [searchText, setSearchText] = useDebouncedState('', 700);
    const [dataFiltered, setDataFiltered] = useState([]);

    const refInputSearch = useRef(null);

    useImperativeHandle(ref, () => ({
        clearSearchText() {
            setSearchText('');
            setDataFiltered([]);
            if(refInputSearch.current) {
                refInputSearch.current.value = '';
            }
        },
    }));

    const filterData = (e) => {
        const val = e.currentTarget.value;
        setSearchText(e.currentTarget.value);
        if (!val || val.length < 3) return setDataFiltered([]);
        const getData = filter(data, (item) =>
            includes(toLower(item?.label), toLower(val))
            ||
            includes(toLower(item?.email), toLower(val))
            ||
            findIndex(checkList, (e) => e === item?.value) > -1
        )
        setDataFiltered(getData);
    }

    const totalData = (searchText.length > 2) ? dataFiltered.length : data.length;
    const dataForVirtualList = (searchText.length > 2) ? dataFiltered : data;

    return (
        <Box className={classes.container}>
            <Text className={classes.textTitle}>{textTitle}</Text>
            <TextInput 
                ref={refInputSearch}
                className={classes.inputSearch}
                rightSection={<Search size={14} />}
                placeholder="Search ..."
                defaultValue={searchText}
                onChange={(event) =>
                    filterData(event)
                }
            />
            <Box ref={refParentBox} className={cx("parentContainerInfinite", classes.virtualContainer)}>
                <Grid
                    itemData={dataForVirtualList}
                    className={`containerInfinite ${idGrid}`}
                    columnCount={1}
                    columnWidth={widthParent}
                    height={heightParent}
                    innerElementType={innerElementType}
                    rowCount={totalData}
                    rowHeight={ROW_HEIGHT + GUTTER_SIZE}
                    width={widthParent}
                >
                    {({ rowIndex, style }) => {
                        return (
                            <div
                                key={rowIndex}
                                style={{
                                    ...style,
                                    width: style.width,
                                    maxWidth: "100%",
                                    top: style.top,
                                    height: style.height - GUTTER_SIZE,
                                }}
                            >
                                <Box onClick={() => checkAgent(dataForVirtualList[rowIndex]?.value)} className={classes.containerAgent}>
                                    <AvatarText src={dataForVirtualList[rowIndex]?.image} />
                                    <Box className={classes.infoAgent}>
                                        <Text component="span">{dataForVirtualList[rowIndex]?.label}</Text>
                                        <Text component="span">{dataForVirtualList[rowIndex]?.email}</Text>
                                    </Box>
                                    <Checkbox defaultChecked={findIndex(checkList, (e) => e === dataForVirtualList[rowIndex]?.value) > -1} />
                                </Box>
                            </div>
                        );
                    }}
                </Grid>
            </Box>
        </Box>
    )

})

export default TransferAgent;