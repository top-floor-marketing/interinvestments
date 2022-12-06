import React, { useState } from "react";
// mantine dev
import { createStyles, Box, Loader } from "@mantine/core";

import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_SERVICES_FORM } from "../../../GraphqlClient/services.gql";

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: theme.other.spacing.p2,
        height: "100%",
        minHeight: "700px",
        overflow: "auto"
    },
    loader: {
        margin: 'auto'
    },
    itemService: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
        marginBottom: theme.other.spacing.p4,
        p: {
            margin: 0,
            fontSize: "16px",
            fontWeight: 700
        }
    }
}));

const QUEMADO_DEFINICIONES_FORM_SERVICIOS = {
    'buyers': [
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
            title: 'Type of financing',
            key: 'typeOfFinancing',
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
    ],
    'renters': [
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
    ],
    'commercial': [
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
    ],
    'invest':
        [
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
        ],
    "List": [
        {
            title: 'Are you looking to sell or rent your property?',
            key: 'areYouLookingToSellOrRentYourProperty',
            type: 'select'
        },
        {
            title: 'If renting, are you interested in Management Services?',
            key: 'ifRentingAreYouInterestedInManagementServices',
            type: 'select'
        },
        {
            title: 'When would you like to list your property?',
            key: 'whenWouldYouLikeToListYourProperty',
            type: 'text'
        },
        {
            title: 'Property address (optional)',
            key: 'propertyAddressOptional',
            type: 'text'
        },
        {
            title: 'Message',
            key: 'message',
            type: 'text'
        },
    ]
}

const TYPE_SERVICE = {
    BUYERS: "buyers",
    RENTERS: 'renters',
    COMMERCIAL: "commercial",
    INVEST: "invest", // INCOME PROPERTIES,
    LIST: "List"
}

const TabsServiceFormsBody = ({ idService, tabKey }) => {

    const { classes } = useStyles();

    const [typeService, setTypeService] = useState({
        name: null,
        data: null
    });

    const { isLoading } = useQueryHelper({
        name: `get-services-form-${idService}`,
        gql: GET_SERVICES_FORM,
        config: {
            cacheTime: 300000,
            onSuccess: (response) => {
                const getResponse = get(response, ["iRServiceBy"], null);

                if (get(getResponse, ["databaseId"], null)) {

                    let splitTitle = getResponse?.title || '';
                    let serviceName = '';

                    try {
                        splitTitle = splitTitle.split("–")

                        if(splitTitle?.length > 1) {
                            serviceName = splitTitle[splitTitle.length-1].trim().toLowerCase();
                        }
                    } catch(e) {

                    }

                    const buyers = get(getResponse, ["buyers"], null);
                    const commercial = get(getResponse, ["commercial"], null);
                    const invest = get(getResponse, ["invest"], null);
                    const renters = get(getResponse, ["renters"], null);
                    const list = get(getResponse, ["List"], null);

                    const tabDoom = document.getElementById(tabKey);

                    if (serviceName.includes("buyers")) {
                        setTypeService({
                            name: TYPE_SERVICE.BUYERS,
                            data: buyers
                        });
                        tabDoom.innerText = "BUYERS";
                        return;
                    }
                    if (serviceName.includes("commercials")) {
                        setTypeService({
                            name: TYPE_SERVICE.COMMERCIAL,
                            data: commercial
                        });
                        tabDoom.innerText = "COMMERCIAL";
                        return;
                    }
                    if (serviceName.includes("income properties") || serviceName.includes("invest")) {
                        setTypeService({
                            name: TYPE_SERVICE.INVEST,
                            data: invest
                        });
                        tabDoom.innerText = "INCOME PROPERTIES";
                        return;
                    }
                    if (serviceName.includes("renters")) {
                        setTypeService({
                            name: TYPE_SERVICE.RENTERS,
                            data: renters
                        });
                        tabDoom.innerText = "RENTERS";
                        return;
                    }
                    if (serviceName.includes("list")) {
                        setTypeService({
                            name: TYPE_SERVICE.LIST,
                            data: list
                        });
                        tabDoom.innerText = "LIST";
                        return;
                    }

                }

            },
        },
        variables: {
            iRServiceId: idService
        },
    });

    return (
        <Box className={classes.container}>
            {
                (isLoading || !typeService.name)
                    ?
                    <Loader variant="bars" color='secondary' />
                    :
                    QUEMADO_DEFINICIONES_FORM_SERVICIOS[typeService.name].map((value, index) => {
                        return <div key={index} className={classes.itemService}>
                            <p>{value.title}</p>
                            <span style={{ marginLeft: "10px" }}>
                                {
                                    typeService.data[value.key] || "N/A"
                                }</span>
                        </div>
                    })
            }
        </Box>
    );
};


export default TabsServiceFormsBody;
