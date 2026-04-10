// mantine
import { createStyles, getStylesRef } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
    textdropdown: {
        marginTop: "5px",
        marginBottom: "5px",
    },
    selectLead: {
        ".mantine-ActionIcon-root": {
            color: theme.colors.dark[0],
            "&:hover": {
                color: theme.colors.dark[8],
                [`.${getStylesRef('colorAvatar')}`]: {
                    color: theme.colors.white,
                }
            },
        },
    },
    colorAvatar: {
        ref: getStylesRef('colorAvatar'),
        color: theme.colors.gray[8],
    }
}));

export default useStyles