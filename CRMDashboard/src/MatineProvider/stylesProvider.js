
export const BORDER_INPUT = '1px solid #83837C';
export const BORDER_FOCUS = '1px solid #5398ff';

export const INPUT_BORDER_BOTTOM = {
    'input': {
        border: "none !important",
        borderRadius: "0 !important",
        borderBottom: `${BORDER_INPUT} !important`,
        animation: "ease-in-out",
        '&:focus': {
            borderBottom: `${BORDER_FOCUS} !important`,
        },
        '&:hover': {
            borderBottom: `${BORDER_FOCUS} !important`,
        }
    }
}

const stylesProvider = () => {
    return {
        TextInput: {
            styles: (theme) => ({
                root: {
                    '.mantine-Input-withIcon': {
                        paddingLeft: '36px !important',
                        paddingRight: '12px !important'
                    }
                },
                input: {
                    border: BORDER_INPUT,
                    backgroundColor: theme.colors.white[0],
                    color: "#000",
                    "&:disabled": {
                        backgroundColor: theme.colors.gray[6],
                        borderRadius: "10px !important",
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
            styles: (theme, params) => {
                const _color = params?.color || 'dark';
                return {
                    root: {
                        backgroundColor: theme.colors[_color][0],
                        "&:disabled": {
                            backgroundColor: theme.colors.gray[6],
                            opacity: "0.7 !important",
                            "&:hover": {
                                backgroundColor: theme.colors.gray[8],
                            },
                        },
                        "&:hover": {
                            backgroundColor: theme.colors[_color][5],
                        },
                    },
                    filled: {
                        "&::before": {
                            backgroundColor: theme.fn.rgba(theme.colors.gray[5], 0.5),
                        },
                    }
                }
            }
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
                            backgroundColor: (_variant === "filled") ? theme.colors[_color][6] : "transparent",
                            color: (_variant === "filled") ? theme.colors.white[1] : theme.colors[_color][6],
                            transform: "scale(1.15)"
                        },
                        "&:disabled": {
                            backgroundColor: "transparent",
                            color: theme.colors.gray[7],
                            border: 0
                        },
                        ".icon-tabler-logout": {
                            "&:hover": {
                                color: theme.colors.error[6],
                            },
                        },
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
                    scrollbar: {
                        backgroundColor: theme.colors.white[0],
                        "&:hover": {
                            backgroundColor: theme.colors.gray[0],
                        },
                    },
                    thumb: {
                        backgroundColor: theme.colors.gray[6],
                        "&:hover": {
                            backgroundColor: `${theme.colors.gray[9]} !important`,
                            opacity: "1 !important"
                        },
                    },
                    /* viewport: {
                        '&:first-child': {
                            height: "100% !important",
                        }
                    } */
                }
            }
        },
        SegmentedControl: {
            styles: (theme, params) => {
                return {
                    root: {
                        backgroundColor: 'transparent',
                        gap: theme.other.spacing.p2,
                        ".__mantine-ref-control": {
                            border: "0 !important"
                        },
                        ".mantine-SegmentedControl-labelActive.mantine-SegmentedControl-disabled": {
                            backgroundColor: `${theme.colors.primary[9]} !important`,
                            color: `${theme.colors.white[0]} !important`,
                        },
                    },
                    label: {
                        backgroundColor: theme.colors.gray[0],
                        color: `${theme.colors.dark[0]} !important`,
                        "&:hover": {
                            backgroundColor: `${theme.colors.gray[5]} !important`,
                        },
                    },
                    labelActive: {
                        backgroundColor: theme.colors.primary[0],
                        color: `${theme.colors.white[0]} !important`,
                        "&:hover": {
                            backgroundColor: `${theme.colors.primary[5]} !important`,
                        },
                    },
                    control: {
                        backgroundColor: "transparent !important",
                    },
                    controlActive: {
                        backgroundColor: "transparent !important",
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
        Stepper: {
            styles: (theme, params) => {
                return {
                    stepIcon: {
                        backgroundColor: theme.colors.gray[3],
                        borderColor: 'transparent',
                        color: theme.colors.gray[9],
                        borderRadius: theme.radius.lg,
                        '[data-progress]': {
                            borderColor: `${theme.colors.primary[0]} !important`,
                            color: 'color: #000 !important'
                        }
                    },
                    separator: {
                        backgroundColor: theme.colors.gray[6]
                    }
                }
            }
        },
        Timeline: {
            styles: (theme, params) => {
                return {
                    itemBullet: {
                        '&[data-with-child]': {
                            backgroundColor: theme.colors[params.color],
                            border: '0px'
                        }
                    },
                    item: {
                        "&::before": {
                            borderLeft: `2px solid ${theme.colors.gray[5]}`
                        }
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
                        border: BORDER_INPUT,
                        "&:disabled": {
                            borderRadius: "10px !important",
                            backgroundColor: theme.colors.gray[6],
                        },
                    },
                    dropdown: {
                        backgroundColor: theme.colors.white[0],
                        border: BORDER_INPUT,
                        '.mantine-ScrollArea-scrollbar': {
                            borderRadius: "10px !important",
                            height: "97% !important",
                            marginTop: "auto !important",
                            marginBottom: "auto !important",
                            width: "10px !important"
                        }
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
        },
        Spoiler: {
            styles: (theme, params) => {
                return {
                    control: {
                        fontSize: "14px",
                        margin: "0px !important",
                        color: theme.colors.primary[0],
                        "&:hover": {
                            color: theme.colors.primary[9],
                        }
                    }
                }
            }
        },
        Tabs: {
            styles: (theme, params) => {
                return {
                    tab: {
                        color: theme.colors.black[0],
                        "&:hover": {
                          backgroundColor: theme.colors.gray[1],
                          color: `${theme.colors.blue[6]} !important`,
                          borderColor: `${theme.colors.blue[6]} !important`,
                        },
                        "&[data-active]": {
                          color: theme.colors.secondary[6],
                          borderColor: theme.colors.secondary[6],
                        },
                    },
                    tabsList: {
                        borderColor: theme.colors.gray[1],
                    }
                }
            }
        },
        Checkbox: {
            styles: (theme, params) => {
                const _color = params?.color || 'secondary';
                return {
                    input: {
                        backgroundColor: `${theme.colors[_color][0]} !important`,
                        border: `1px solid ${theme.colors[_color][9]} !important`,
                    }
                }
            }
        }
    }
}

export default stylesProvider;