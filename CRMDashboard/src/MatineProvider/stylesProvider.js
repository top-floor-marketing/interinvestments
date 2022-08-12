// import { COLOR_SCHEME_DARK } from "../Store/themeSlice"

const BORDER_INPUT = '1px solid #83837C';
const BORDER_FOCUS = '#5398ff';

const stylesProvider = () => {
    return {
        TextInput: {
            styles: (theme) => ({
                input: {
                    border: BORDER_INPUT,
                    backgroundColor: theme.colors.white[0],
                    color: "#000",
                    "&:disabled": {
                        backgroundColor: theme.colors.gray[6],
                    },
                    "&:focus": {
                        borderColor: `${BORDER_FOCUS} !important`
                    },
                    "&::-webkit-input-placeholder": {
                        color: theme.colors.dark[0],
                        opacity: 0.7
                    },

                    "&:-ms-input-placeholder": {
                        color: theme.colors.dark[0],
                        opacity: 0.7
                    },

                    "&::placeholder": {
                        color: theme.colors.dark[0],
                        opacity: 0.7
                    }
                }
            })
        },
        Textarea: {
            styles: (theme) => ({
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
            })
        },
        Button: {
            styles: (theme) => ({
                root: {
                    "&:disabled": {
                        backgroundColor: theme.colors.gray[6],
                        opacity: "0.8 !important"
                    },
                },
                filled: {
                    "&::before": {
                        backgroundColor: theme.fn.rgba(theme.colors.gray[6], 0.5),
                    },
                }
            })
        },
        Pagination: {
            styles: (theme) => ({
                item: {
                    backgroundColor: theme.colors.white[0],
                    border: BORDER_INPUT,
                },
                active: {
                    backgroundColor: theme.colors.primary[0],
                }
            })
        },
        Avatar: {
            styles: (theme) => ({
                placeholder: {
                    fontWeight: "700"
                }
            })
        },
        Accordion: {
            styles: (theme) => ({
                pitem: {
                    borderBottom: "none",
                },
            })
        },
        ActionIcon: {
            styles: (theme, params) => {
                const _color = params?.color || 'dark';
                const _variant = params?.variant || 'hover';
                const filledColor = _color === "gray" ? theme.colors.dark[0] : theme.colors.white[0];
                const filledBackground = _color === "gray" ? theme.colors.gray[4] : theme.colors[_color][0];
                return {
                    root: {
                        transition: "all",
                        transitionDuration: "600",
                        transitionTimingFunction: "ease-in-out",
                        color: (_variant === "filled") ? filledColor : theme.colors[_color][0],
                        backgroundColor: (_variant === "filled") ? filledBackground : "transparent",
                        "&:hover": {
                            backgroundColor: (_variant === "filled") ? theme.colors[_color][9] : "transparent",
                            color: (_variant === "filled") ? theme.colors.white[1] : theme.colors[_color][6],
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
            }
        },
        Tooltip: {
            styles: (theme, params) => {
                return {
                    root: {
                        zIndex: 999,
                        color: theme.colors.white[1],
                        fontWeight: (params.color === "success") ? 700 : "normal",
                        backgroundColor: (params.color === "success") ? theme.colors.success[0] : theme.colors.dark[1],
                    },
                    arrow: {
                        backgroundColor: (params.color === "success") ? theme.colors.success[0] : theme.colors.dark[1],
                    }
                }
            }
        },
        Modal: {
            styles: (theme, params) => {
                return {
                    modal: {
                        backgroundColor: theme.colors.white[0],
                        padding: "16px !important",
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
            }
        },
        RichTextEditor: {
            styles: (theme, params) => {
                return {
                    root: {
                        border: BORDER_INPUT,
                        backgroundColor: theme.colors.white[0],
                        ".mantine-ActionIcon-root": {
                            transition: "all",
                            transitionDuration: "600",
                            transitionTimingFunction: "ease-in-out",
                            "&:hover": {
                                backgroundColor: theme.colors.primary[0],
                                color: theme.colors.dark[9],
                                transform: "scale(1) !important"
                            },
                        },
                        "&:disabled": {
                            backgroundColor: theme.colors.gray[6],
                        },
                    },
                    toolbar: {
                        backgroundColor: theme.colors.white[0],
                    },
                    toolbarGroup: {
                        backgroundColor: theme.colors.white[0],

                    },
                    toolbarControl: {
                        backgroundColor: theme.colors.white[0],
                        border: "0 !important",
                        borderRadius: "0px !important"
                    },
                }
            }
        },
        ScrollArea: {
            styles: (theme, params) => {
                return {
                    root: {
                    },
                    scrollbar: {
                        backgroundColor: theme.colors.gray[0],
                        "&:hover": {
                            backgroundColor: theme.colors.gray[0],
                        },
                    },
                    thumb: {
                        backgroundColor: theme.colors.gray[9],
                        "&:hover": {
                            backgroundColor: `${theme.colors.gray[9]} !important`,
                            opacity: "1 !important"
                        },
                    }
                }
            }
        },
     /*    Select: {
            styles: (theme, params) => {
                return {
                    root: {
                        position: "relative",
                        zIndex: '9999 !important'
                    },
                    dropdown: {
                        border: BORDER_INPUT,
                        backgroundColor: "transparent",
                        "&:disabled": {
                            backgroundColor: theme.colors.gray[6],
                        },
                        zIndex: '9999 !important'
                    },
                    wrapper: {
                        backgroundColor: "transparent",
                        zIndex: '9999 !important'
                    },
                    item: {
                        backgroundColor: "transparent",
                        zIndex: '9999 !important'
                    },
                    input: {
                        border: BORDER_INPUT,
                        backgroundColor: "transparent",
                        "&:focus": {
                            borderColor: `${BORDER_FOCUS} !important`
                        }
                    }
                }
            }
        }, */
        SegmentedControl: {
            styles: (theme, params) => {
                return {
                    root: {
                        backgroundColor: "transparent",
                        gap: theme.other.spacing.p2,
                        ".__mantine-ref-control": {
                            border: "0 !important"
                        },
                        ".mantine-SegmentedControl-labelActive.mantine-SegmentedControl-disabled": {
                            backgroundColor: `${theme.colors.dark[0]} !important`,
                            color: `${theme.colors.white[0]} !important`,
                        },
                    },
                    label: {
                        backgroundColor: theme.colors.gray[6]
                    },
                    labelActive: {
                        backgroundColor: theme.colors.dark[6],
                    },
                    control: {
                        backgroundColor: "transparent",
                    },
                    controlActive: {
                        backgroundColor: "transparent",
                    },
                }

            }
        },
        Card: {
            styles: (theme, params) => {
                return {
                    root: {
                        backgroundColor: theme.colors.white[0],
                        borderRadius: theme.radius.sm,
                        boxShadow: theme.shadows.md,
                        padding: theme.other.spacing.p4
                    }
                }
             }
        },
        Paper: {
            styles: (theme, params) => {
                return {
                    root: {
                        backgroundColor: theme.colors.white[0],
                        borderRadius: theme.radius.sm,
                        boxShadow: theme.shadows.md,
                        padding: theme.other.spacing.p4
                    }
                }
             }
        },
        Select: {
            styles: (theme, params) => {
                return {
                    input: {
                        borderRadius: "10px",
                        backgroundColor: theme.colors.white[0],
                        border: BORDER_INPUT
                    },
                    dropdown: {
                        backgroundColor: theme.colors.white[0],
                        border: BORDER_INPUT
                    },
                    item: {
                        backgroundColor: "transparent",
                        borderRadius: "10px",
                        '&[data-hovered]': {
                            backgroundColor: theme.colors.primary[6],
                            color: theme.colors.white[0],
                        },
                        '&:hover': {
                            color: theme.colors.white[0],
                            backgroundColor: theme.colors.primary[6],
                        }, 
                    }
                }
             }
        }
    }
}

export default stylesProvider;