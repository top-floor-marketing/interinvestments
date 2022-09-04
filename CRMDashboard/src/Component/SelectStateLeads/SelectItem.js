// mantine
import { Group, Text, Box } from "@mantine/core";
// styles
import useStyles from './styles'

const SelectItem = ({ label, color, ...others }) => {
    const { classes } = useStyles();
    return (
      <Box
        {...others}
        className={`${classes.dropdownSelect} ${classes[color]}`}
      >
        <Group noWrap>
          <Box>
            <Text size="sm">{label}</Text>
          </Box>
        </Group>
      </Box>
    );
}

export default SelectItem