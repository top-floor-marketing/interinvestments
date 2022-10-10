import ChipStatusLead from "./chipStatusLead";
import { ScrollArea, Box } from "@mantine/core";
import AvatarText from "../AvatarText";

import get from 'lodash/get';

const BadgeContainer = ({ isAdminLeadView, isShortLead, setLeadDetail, classes, currentStatus, allAgentsStatus }) => {

    return (
        (isAdminLeadView)
            ?
            <Box component={ScrollArea} className={classes.adminLeadViewStatus}>
                <Box className={classes.contentAllStatus}>
                    {
                        allAgentsStatus.map((val, index) => (
                            <Box key={index} className={classes.itemStatus}>
                                <ChipStatusLead 
                                isShort={false} 
                                status={val?.currentStatus} 
                                onClick={null} />
                                <AvatarText
                                    size={"30px"}
                                    firstName={get(val, ["firstName"], null)}
                                    lastName={get(val, ["lastName"], null)}
                                    src={get(val, ["avatarProfile"], null)}
                                    tooltipLabel={`Agent: ${get(val, ["firstName"], "")} ${get(val, ["lastName"], "")}`}
                                />
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            :
            <ChipStatusLead 
            isShort={isShortLead} 
            status={currentStatus} 
            onClick={isShortLead ? null : setLeadDetail} />
    )

}

export default BadgeContainer;