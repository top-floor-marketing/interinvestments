import { useState } from "react";
import { useDebouncedState } from '@mantine/hooks';
import { Group, Box, createStyles, Text, Checkbox, Skeleton, TransferList, TextInput } from "@mantine/core";
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { ADMIN_GET_ALL_AGENTS } from "../../../GraphqlClient/agentProfile.gql";
import AvatarText from "../../AvatarText";

import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';

import { Search } from "tabler-icons-react";

import { INPUT_BORDER_BOTTOM } from "../../../MatineProvider/stylesProvider";

const useStyles = createStyles((theme, _params) => {
    return {
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.other.spacing.p4,
            minHeight: "300px"
        },
        inputSearch: {
            width: "250px !important",
            ...INPUT_BORDER_BOTTOM,
            [`${theme.fn.smallerThan(600)}`]: {
                width: "70% !important",
            },
        },
    };
});

const TransferAgent = ({ data }) => {

    const { classes } = useStyles();

    // filters values
    const [searchText, setSearchText] = useDebouncedState('', 700);
    const [dataFiltered, setDataFiltered] = useState([]);

    const filterData = (e) => {
        const val = e.currentTarget.value;
        setSearchText(e.currentTarget.value);
        if (!val || val.length < 3) return setDataFiltered([]);
        const getData = filter(data, (item) =>
            includes(toLower(item?.label), toLower(val))
            ||
            includes(toLower(item?.email), toLower(val))
        )
        setDataFiltered(getData);
    }

    return (
        <Box className={classes.container}>
            <TextInput
                className={classes.inputSearch}
                rightSection={<Search size={14} />}
                placeholder="Search ..."
                defaultValue={searchText}
                onChange={(event) =>
                    filterData(event)
                }
            />
            <Box>
                {/* {
                    (searchText.length) ? `${dataFiltered.length}` : `${data.length}`
                } */}
            </Box>
        </Box>
    )

}

export default TransferAgent;