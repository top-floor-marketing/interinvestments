import React, { useState } from 'react'
// mantine 
import { Box, Text, createStyles, Modal } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
// components
import PipelineItem from './PipelineItem'
import BodyModal from './BodyModal'
import { PipelineColumnVirtual } from '../../Component/VirtualListContainer';
// hook
import useGetPipelineLeads from './hook/useGetPipelineLeads'


const useStyles = createStyles((theme, _params) => {

    // total de pixles del gap
    const gapTotal = theme.other.spacing.p4 * 4

    const validateWidthPipeline = () => {
        const { width } = _params
        if (width >= 764 && width <= 1000) {
            // min width
            return {
                width: '210px',
                minWidth: "210px"
            }
        }

        if (width >= 1001) {
            // total del (width - total del gap) / la cantidad de columnas
            return {
                width: `${(width - gapTotal) / 5}px`,
                minWidth: `${(width - gapTotal) / 5}px`,
            }
        }

        return {
            width: "100%",
        }
    }

    return {
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.other.spacing.p4,
            position: "relative"
        },
        titlePipeline: {
            fontSize: '24px',
            fontWeight: '12px'
        },
        containerPipeline: {
            display: 'flex',
            width: "100%",
            gap: theme.other.spacing.p4,
            flexDirection: "column",
            height: '400px',
            overflow: 'auto',
            [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                flexDirection: 'row',
            }
        },
        modalBody: {
            display: "flex",
            flexDirection: 'column',
            gap: theme.other.spacing.p4,
        },
        containerColPipeline: {
            ...validateWidthPipeline()
        }
    }
});


const Pipeline = () => {
    const [openedMOdal, setOpenedModal] = useState(false);
    const [valueSelect, setvalueSelect] = useState(false);
    const { ref, width } = useElementSize();
    const { classes } = useStyles({ width })
    const valuesPipeline = useGetPipelineLeads({ agentID: 33 })

    const defaultData = [
        {
            state: 6,
            nameLeads: 'Name 1'
        },
        {
            state: 6,
            nameLeads: 'Name 2'
        },
        {
            state: 6,
            nameLeads: 'Name 4'
        }
    ]


    return (
        <Box className={classes.container}>

            <Modal
                opened={openedMOdal}
                onClose={() => setOpenedModal(false)}
                title="Lorem ipsum dolor sit amet,"
            >
                <Box className={classes.modalBody}>
                    <BodyModal valueSelect={valueSelect} setvalueSelect={setvalueSelect} />
                </Box>
            </Modal>

            <Text className={classes.titlePipeline} component='h3'>Pipeline</Text>
            <Box className={classes.containerPipeline} ref={ref}>

                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={defaultData}
                        totalData={defaultData.length}
                        color='error'
                        title='Not Contacted'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>

                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={defaultData}
                        totalData={defaultData.length}
                        color='primary'
                        title='Contacted'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>


                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={defaultData}
                        totalData={defaultData.length}
                        color='info'
                        title='Ask Referrals'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>

                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={defaultData}
                        totalData={defaultData.length}
                        color='success'
                        title='Contract'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>

                <Box className={classes.containerColPipeline}>
                    <PipelineColumnVirtual
                        data={defaultData}
                        totalData={defaultData.length}
                        color='secondary'
                        title='Showing'
                    >
                        <PipelineItem onClick={() => setOpenedModal(true)} />
                    </PipelineColumnVirtual>
                </Box>

            </Box>
        </Box>
    )
}

export default Pipeline