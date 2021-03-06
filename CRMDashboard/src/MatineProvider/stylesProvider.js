import { COLOR_SCHEME_DARK } from "../Store/themeSlice"

const BORDER_INPUT = '1px solid #83837C';
const BORDER_FOCUS = '#5398ff';

const stylesProvider = () => {
    return {
        Card: (theme, params) => ({
            root: {
                backgroundColor: theme.colorScheme === COLOR_SCHEME_DARK ? theme.colors.white[0] : theme.colors.white[0]
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
                    color: theme.colors[_color][0],
                    transition: "all",
                    transitionDuration: "300",
                    transitionTimingFunction: "ease-in-out",
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: theme.colors[_color][9],
                        transform: "scale(1.1)"
                    },
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
        }
    }
}

export default stylesProvider;