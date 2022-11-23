import React from "react";
// mantine dev
import { createStyles, Box, Loader  } from "@mantine/core";

import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_SERVICES_FORM } from "../../../GraphqlClient/services.gql";

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: theme.other.spacing.p2
    },
    loader: {
        margin: 'auto'
    }
}));

const QUEMADO_DEFINICIONES_FORM_SERVICIOS = {
    'buyers': {
        title: 'Buyers',
        inputs: [
            {
                title: 'Budget',
                key: 'budget',
                type: 'text'
            },
            {
                title: 'Expected move-in',
                key: 'expectedMoveIn',
                type: 'text'
            },
            {
                title: 'Desired Locations?',
                key: 'desiredLocations',
                type: 'text'
            },
            {
                title: 'Type of financing',
                key: 'desiredLocations',
                type: 'check'
            },
            {
                title: 'Style of Architecture',
                key: 'styleOfArchitecture',
                type: 'check'
            },
            {
                title: 'If you are applying for a mortgage, have you been pre-approved?',
                key: 'ifYouAreApplyingForAMortgageHaveYouBeenPreApproved',
                type: 'select'
            },
            {
                title: 'Are you interested in New Construction or Resale?',
                key: 'areYouInterestedInNewConstructionOrResale',
                type: 'select'
            },
            {
                title: 'How did you hear about us?',
                key: 'howDidYouHearAboutUs',
                type: 'select'
            },
            {
                title: 'Do you have a preference in views?',
                key: 'doYouHaveAPreferenceInViews',
                type: 'text'
            },
            {
                title: 'Are you working with a Realtor?',
                key: 'areYouWorkingWithARealtor',
                type: 'select'
            },
            {
                title: 'Are you relocating to Miami?',
                key: 'areYouRelocatingToMiami',
                type: 'select'
            },
            {
                title: 'Special requirements/notes',
                key: 'specialRequirementsnotes',
                type: 'text'
            },
        ]
    },
    'renters': {
        title: 'Renters',
        inputs: [
            {
                title: 'How many bedrooms are you looking for?',
                key: 'howManyBedroomsAreYouLookingFor',
                type: 'check'
            },
            {
                title: 'What is your budget?',
                key: 'whatIsYourBudget',
                type: 'text'
            },
            {
                title: 'Move-in date',
                key: 'moveInDate',
                type: 'text'
            },
            {
                title: 'How long of a lease are you looking for?',
                key: 'howLongOfALeaseAreYouLookingFor',
                type: 'text'
            },
            {
                title: 'Credit History',
                key: 'creditHistory',
                type: 'select'
            },
            {
                title: 'Desired Location',
                key: 'desiredLocation',
                type: 'text'
            },
            {
                title: 'Are you working with a Realtor?',
                key: 'areYouWorkingWithARealtor',
                type: 'select'
            },
            {
                title: 'Do you have pets?',
                key: 'doYouHavePets',
                type: 'select'
            },
            {
                title: 'How did you hear about us?',
                key: 'doYouHavePets',
                type: 'select'
            },
            {
                title: 'Special requirements/comments',
                key: 'specialRequirementscomments',
                type: 'text'
            },
        ]
    },
    'commercial': {
        title: 'Commercials',
        inputs: [
            {
                title: 'Looking to Buy or Lease?',
                key: 'lookingToBuyOrLease',
                type: 'select'
            },
            {
                title: 'Are you working with a Realtor?',
                key: 'areYouWorkingWithARealtor',
                type: 'select'
            },
            {
                title: 'Aproximate Size',
                key: 'aproximateSize',
                type: 'text'
            },
            {
                title: 'Desired Locations?',
                key: 'desiredLocations',
                type: 'text'
            },
            {
                title: 'Types of Commercial Properties',
                key: 'typesOfCommercialProperties',
                type: 'select'
            },
            {
                title: 'Special requirements/notes',
                key: 'specialRequirementsnotes',
                type: 'text'
            }, 
        ]
    },
    'invest': {
        title: 'Income properties',
        inputs: [
            {
                title: 'Budget',
                key: 'budget',
                type: 'text'
            },
            {
                title: 'Are you interested in Property Management Services?',
                key: 'areYouInterestedInPropertyManagementServices',
                type: 'select'
            },
            {
                title: 'Are you looking for a short-term rental/Airbnb friendly property?',
                key: 'areYouLookingForAShortTermRentalairbnbFriendlyProperty',
                type: 'select'
            },
            {
                title: 'Message',
                key: 'message',
                type: 'text'
            },
        ]
    }
}

const TabsServiceFormsBody = ({ idService, tabKey }) => {

    const { classes } = useStyles();

    const { isError, isLoading } = useQueryHelper({
        name: `get-services-form-${idService}`,
        gql: GET_SERVICES_FORM,
        config: {
            cacheTime: 300000,
            onSuccess: (response) => {
                const getResponse = get(response, ["iRServiceBy"], null);

                const tabDoom = document.getElementById(tabKey);

                // tabDoom.innerText = 'gg';

                
                console.log("getResponse ", getResponse);
            },
        },
        variables: {
            iRServiceId: idService
        },
    });

    return (
        <Box className={classes.container}>
            {
                (isLoading)
                &&
                <Loader variant="bars" color='secondary' />
            }
        </Box>
    );
};


export default TabsServiceFormsBody;
