import React, { useRef, useState } from 'react'
// components
import AvatarInput from './AvatarInput'
import { notificationError } from "../../../../Component/Notifications";
// mantine
import { Box, Text, Divider, Button, ScrollArea, TextInput, FileInput } from "@mantine/core";
import { useForm, joiResolver } from '@mantine/form';
import { RichTextEditor } from '@mantine/rte';
import {Edit} from "tabler-icons-react";
// utils
import { get } from "lodash";
// echema
import schemaEditAgent from './eschemaEditProfile'
// styles 
import useStyles from './stylesProfileAction'

const FormEditProfile = ({ isLoading, dataAgent, onSubmit }) => {
    const { classes } = useStyles();
    const refInputAvatar = useRef(null);
    const [tempAvatar64, setTempAvatar64] = useState(null);
    const [newAvatarFile, setnewAvatarFile] = useState(null);

    const form = useForm({
        validate: joiResolver(schemaEditAgent),
        initialValues: {
            content: get(dataAgent, ["content"], ""),
            email: get(dataAgent, ["email"], ""),
            facebook: get(dataAgent, ["facebook"], ""),
            instagram: get(dataAgent, ["instagram"], ""),
            linkedin: get(dataAgent, ["linkedin"], ""),
            twitter: get(dataAgent, ["twitter"], ""),
            position: get(dataAgent, ["position"], ""),
            firstName: get(dataAgent, ["firstName"], ""),
            lastName: get(dataAgent, ["lastName"], ""),
            phone: get(dataAgent, ["phone"], ""),
            tiktok: get(dataAgent, ["tiktok"], ""),
            youtube: get(dataAgent, ["youtube"], ""),
            rumble: get(dataAgent, ["rumble"], ""),
        },
    });

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onChangeAvatar = async (e) => {
        try {
            const typeImagen = e.type
            if (typeImagen === 'image/png' || typeImagen === 'image/jpeg' || typeImagen === 'image/jpg') {
                setnewAvatarFile(e)
                const newBase64 = await toBase64(e);
                setTempAvatar64(newBase64);
            } else {
                notificationError({
                    id: 'edit-agent-profile',
                    position: 'top-right',
                    title: "Error",
                    color: 'secondary',
                    message: 'invalid type imagen'
                })
            }
        } catch (e) {
            setTempAvatar64(null)
        }
    }

    const validationSumitForm = (valuesForm) => {
        if (newAvatarFile) {
            return onSubmit({
                ...valuesForm,
                avatarProfile: newAvatarFile
            })
        } else {
            return onSubmit(valuesForm)
        }
    }

    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={form.onSubmit((values) => validationSumitForm(values))}>

                <ScrollArea offsetScrollbars scrollbarSize={6}>
                    <Box className={classes.containerForm}>
                        <AvatarInput
                            urlImagen={
                                tempAvatar64 || get(dataAgent, ["avatarProfile"], "")
                            }
                            refInputForm={refInputAvatar}
                        />
                        <FileInput
                            accept="image/png,image/jpeg,image/jpg"
                            className={`${classes.gridColumnFull} ${classes.inputAvatar}`}
                            disabled={isLoading}
                            label={null}
                            ref={refInputAvatar}
                            placeholder={null}
                            onChange={onChangeAvatar}
                        />
                        <TextInput
                            disabled={isLoading}
                            label="First Name"
                            placeholder="First Name"
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            disabled={isLoading}
                            label="Last Name"
                            placeholder="Last Name"
                            {...form.getInputProps('lastName')}
                        />

                        <TextInput
                            disabled={isLoading}
                            label="Phone"
                            placeholder="Phone"
                            {...form.getInputProps('phone')}
                        />

                        <TextInput
                            disabled={isLoading}
                            label="Position"
                            placeholder="Position"
                            {...form.getInputProps('position')}
                        />

                        <TextInput
                            className={classes.gridColumnFull}
                            disabled={isLoading}
                            label="Email"
                            placeholder="Email"
                            {...form.getInputProps('email')}
                        />


                        <Box className={classes.gridColumnFull}>
                            <Text component="label" htmlFor="content" className={classes.labelAboutMe}>About me</Text>
                            <RichTextEditor
                                controls={[]}
                                readOnly={isLoading}
                                placeholder="About me"
                                {...form.getInputProps('content')}
                            />
                        </Box>

                        <TextInput
                            disabled={isLoading}
                            label="Facebook"
                            placeholder="Facebook profile"
                            {...form.getInputProps('facebook')}
                        />

                        <TextInput
                            disabled={isLoading}
                            label="Instagram"
                            placeholder="Instagram profile"
                            {...form.getInputProps('instagram')}
                        />

                        <TextInput
                            disabled={isLoading}
                            label="Twitter"
                            placeholder="Twitter profile"
                            {...form.getInputProps('twitter')}
                        />

                        <TextInput
                            disabled={isLoading}
                            label="Linkedin"
                            placeholder="Linkedin profile"
                            {...form.getInputProps('linkedin')}
                        />

                        <TextInput
                            disabled={isLoading}
                            label="Youtube"
                            placeholder="Youtube channel"
                            {...form.getInputProps('youtube')}
                        />

                        <TextInput
                            disabled={isLoading}
                            label="TikTok"
                            placeholder="TikTok profile"
                            {...form.getInputProps('tiktok')}
                        />

                        <TextInput
                            disabled={isLoading}
                            label="Rumble"
                            placeholder="Rumble profile"
                            {...form.getInputProps('rumble')}
                        />

                    </Box>
                </ScrollArea>

                <Divider style={{marginTop: '16px', marginBottom: '16px'}} />

                <Button
                    className={classes.buttonSubmit}
                    color="secondary"
                    disabled={isLoading}
                    loading={isLoading}
                    leftIcon={<Edit size={14} />}
                    type="submit">
                    Save
                </Button>

            </form>
        </>
    )
}

FormEditProfile.defaultProps = {
    dataAgent: null,
    onSubmit: () => { },
    isLoading: false
};

export default FormEditProfile