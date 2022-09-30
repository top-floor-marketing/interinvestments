import PropTypes from "prop-types"
import React from 'react'
// mantine
import { Box, Group, Avatar, Text } from "@mantine/core";
// iconst
import { User, Mail } from 'tabler-icons-react';
// styles
import useStyles from './styles'

const SelectItem = (props) => {
    const { classes } = useStyles();
    const { label, email, avatarProfile, typeDropdow, ...others } = props

    if (typeDropdow === "Avatar") {
        return (
            <Box {...others}>
                <Group spacing="sm">
                    <Avatar
                        classNames={{
                            placeholderIcon: classes.colorAvatar
                        }}
                        ariant="filled"
                        radius="xl"
                        src={avatarProfile}
                        alt={`Avatar_Agent_${label}`}
                    />
                    <Box>
                        <Text className={classes.textdropdown} component='h3'>{label}</Text>
                        <Text size="xs">
                            {email}
                        </Text>
                    </Box>
                </Group>

            </Box>
        )
    }

    return (
        <Box {...others}>
            <Group spacing="sm">
                <User />
                <Text className={classes.textdropdown} component='h3'>{label}</Text>
            </Group>
            <Group spacing="sm">
                <Mail />
                <Text size="xs">
                    {email}
                </Text>
            </Group>
        </Box>
    )
}

SelectItem.defaultProps = {
    typeDropdow: 'icon'
}


SelectItem.propTypes = {
    avatarProfile: PropTypes.string,
    email: PropTypes.string,
    label: PropTypes.string,
    typeDropdow: PropTypes.oneOf(['icon', 'Avatar']),
}

export default SelectItem