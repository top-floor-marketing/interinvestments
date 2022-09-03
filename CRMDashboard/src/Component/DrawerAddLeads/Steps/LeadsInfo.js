import React from 'react'
// mantine
import {
    TextInput,
    NumberInput,
    Divider
} from '@mantine/core';
// icons
import { User, Mail, Phone } from 'tabler-icons-react';
// styles
import useStyles from './styles'


const LeadsInfo = ({ form, onSubmitForm, refForm }) => {
    const { classes } = useStyles();

    return (
        <form
            onSubmit={form.onSubmit((values) => onSubmitForm(values))}
            className={classes.containerMain}
        >
            <TextInput
                {...form.getInputProps("nameLeads")}
                className={classes.input}
                placeholder={null}
                label="Name leads"
                icon={<User />}
            />
            <TextInput
                {...form.getInputProps("email")}
                className={classes.input}
                placeholder={null}
                label="Email client"
                icon={<Mail />}
            />
            <NumberInput
                {...form.getInputProps("phoneNumber")}
                className={classes.input}
                classNames={{
                    input: classes.NumberInput,
                    control: classes.controllNumberInput
                }}
                placeholder={null}
                label="Phone Number"
                icon={<Phone />}
            />
            {
                // <Textarea
                //     {...form.getInputProps("note")}
                //     className={`${classes.input} ${classes.inputFull}`}
                //     placeholder={null}
                //     icon={<Note />}
                //     label="Note"
                // />
            }

            <Divider
                my="xs"
                label="Optional info"
                className={`${classes.title} ${classes.inputFull}`}
            />

            <TextInput
                {...form.getInputProps("otherNameLeads")}
                className={classes.input}
                placeholder={null}
                label="Other name"
                icon={<User />}
            />
            <TextInput
                {...form.getInputProps("otherEmail")}
                className={classes.input}
                placeholder={null}
                label="Other Email"
                icon={<Mail />}
            />
            <NumberInput
                {...form.getInputProps("otherPhoneNumber")}
                className={classes.input}
                classNames={{
                    input: classes.NumberInput,
                    control: classes.controllNumberInput
                }}
                placeholder={null}
                label="Other Phone"
                icon={<Phone />}
            />
            <button
                style={{ display: 'none' }}
                type="submit"
                ref={refForm}
            />
        </form>
    )
}

export default LeadsInfo