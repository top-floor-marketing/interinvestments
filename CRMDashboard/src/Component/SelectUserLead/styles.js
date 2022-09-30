// mantine
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
    textdropdown: {
        marginTop: "5px",
        marginBottom: "5px",
    },
    selectLead: {
        ".mantine-ActionIcon-root": {
            color: theme.colors.dark[0],
            "&:hover": {
                color: theme.colors.dark[8],
                [`.${getRef('colorAvatar')}`]: {
                    color: theme.colors.white,
                }
            },
        },
    },
    colorAvatar: {
        ref: getRef('colorAvatar'),
        color: theme.colors.gray[8],
    }
}));

export default useStyles