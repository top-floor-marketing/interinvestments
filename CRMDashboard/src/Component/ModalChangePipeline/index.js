import React from 'react'
// mantine 
import { Box, createStyles, Modal } from '@mantine/core';
// components
import BodyModal from '../ModalChangePipeline/BodyModal'

const useStyles = createStyles((theme, _params) => {
    return {
        modalBody: {
            padding: '16px !important'
        },
        ContainerModalBody: {
            display: "flex",
            flexDirection: 'column',
            gap: theme.other.spacing.p4,
        }
    }
});


const ModalChangePipeline = (props) => {
    const { classes } = useStyles();
    const {
        openedMOdal,
        setOpenedModal,
        valueSelect,
        setvalueSelect,
        valueUserPipeline,
        setValueUserPipeline,
        refechPipeline
    } = props

    const destroyModal = () => {
        setvalueSelect(null)
        setValueUserPipeline(null)
        setOpenedModal(false)
    }

    return (
        <Modal
            withCloseButton={false}
            size='lg'
            opened={openedMOdal}
            onClose={() => destroyModal()}
            title={null}
            classNames={{
                body: classes.modalBody
            }}
        >
            <Box className={classes.ContainerModalBody}>
                <BodyModal
                    refechPipeline={refechPipeline}
                    onClose={() => destroyModal()}
                    valueUserPipeline={valueUserPipeline}
                    valueSelect={valueSelect}
                    setvalueSelect={setvalueSelect}
                />
            </Box>
        </Modal>
    )
}

export default ModalChangePipeline