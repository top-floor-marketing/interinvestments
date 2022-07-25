import { COLOR_SCHEME_DARK } from "../Store/themeSlice"

const BORDER_INPUT = '1px solid #83837C';
const BORDER_FOCUS = '#5398ff';

const stylesProvider = () => {
    return {
        Card: (theme, params) => ({
            root: {
                backgroundColor: theme.colors.white[0]
            }
        }),
        TextInput: (theme, params) => ({
            input: {
                border: BORDER_INPUT,
                backgroundColor: theme.colors.white[0],
                color: "#000",
                "&:disabled": {
                    backgroundColor: theme.colors.gray[6],
                },
                "&:focus": {
                    borderColor: `${BORDER_FOCUS} !important`
                }
            }
        }),
        Button: (theme, params) => ({
            filled: {
                "&::before": {
                    backgroundColor: theme.fn.rgba(theme.colors.gray[6], 0.5),
                },
            }
        }),
        Select: (theme, params) => ({
            input: {
                "&:focus": {
                    borderColor: `${BORDER_FOCUS} !important`
                }
            },
            filledVariant: {
                border: BORDER_INPUT,
                backgroundColor: theme.colors.white[0],
                color: "#000",
                "&:disabled": {
                    backgroundColor: theme.colors.gray[6],
                },
            },
            dropdown: {
                backgroundColor: theme.colors.white[0],
                border: BORDER_INPUT,
            },
            item: {
                backgroundColor: theme.colors.white[0],
            },
            hovered: {
                backgroundColor: theme.colors.primary[6],
                color: theme.colors.white[0]
            },
            selected: {
                backgroundColor: theme.colors.primary[0],
            }
        }),
        Pagination: (theme, params) => ({
            item: {
                backgroundColor: theme.colors.white[0],
                border: BORDER_INPUT,
            },
            active: {
                backgroundColor: theme.colors.primary[0],
            }
        }),
        Avatar: (theme, params) => ({
            placeholder: {
                fontWeight: "700"
            }
        }),
        Accordion: (theme, params) => ({
            item: {
                borderBottom: "none",
            },
        }),
        ActionIcon: (theme, params) => {
            const _color =  params.color || 'dark'
            return {
                root: {
                    transition: "all",
                    transitionDuration: "600",
                    transitionTimingFunction: "ease-in-out",
                    "&:disabled": {
                        backgroundColor: "transparent",
                        color: theme.colors.gray[7],
                        border: 0
                    },
                    ".icon-tabler-logout": {
                        "&:hover": {
                            color: theme.colors.error[0],
                        },
                    }
                },
                hover: {
                    color: theme.colors[_color][0],
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: theme.colors[_color][6],
                        transform: "scale(1.1)"
                    },
                },
                filled: {
                    color: _color === "gray" ?  theme.colors.dark[0] : theme.colors.white[0],
                    backgroundColor: _color === "gray" ? theme.colors.gray[4]:  theme.colors[_color][0],
                    "&:hover": {
                        backgroundColor: theme.colors[_color][6],
                        color:_color === "gray" ? theme.colors.dark[0] :  theme.colors.white[1],
                        transform: "scale(1.1)"
                    },
                }
            }
        },
        Tooltip: (theme, params) => {
            return {
                body: {
                    color: theme.colors.white[1],
                    fontWeight: (params.color === "success") ? 700 : "normal",
                    backgroundColor: (params.color === "success") ? theme.colors.success[0] : theme.colors.dark[1],
                },
                arrow: {
                    backgroundColor: (params.color === "success") ? theme.colors.success[0] : theme.colors.dark[1],
                }
            }
        },
        ScrollArea: (theme, params) => {
            return {
            }
        },
        Modal: (theme, params) => {
            return {
                root: {
                    padding: theme.other.spacing.p2
                },
                modal: {
                    backgroundColor: theme.colors.white[0],
                    padding: "16px !important",
                    minWidth: "55% !important",
                    maxWidth: "80% !important"
                },
                close: {
                    color: theme.colors.dark[0],
                    transition: "all !important",
                    transitionDuration: "600 !important",
                    transitionTimingFunction: "ease-in-out !important",
                    "&:hover": {
                        backgroundColor: theme.colors.dark[0],
                        color: theme.colors.white[1],
                        transform: "scale(1.1) !important"
                    },
                },
            }
        },
    }
}

export default stylesProvider;