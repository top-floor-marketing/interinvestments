import { Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

import RectanglePageTwo from '../../Assets/img/rectanglePageTwo.png';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { numFormatter, FONT_FAMILY, addParamsToUrl, removeTags, PADDING_FOR_PAGES, DOMAIN_PROD } from './utils';

const PageTwo = ({ listing, agent }) => {

    console.log("---------------")
    console.log("PageTwo")
    console.log("listing ", listing);
    console.log("agent ", agent);
    console.log("---------------")

    const description = removeTags(get(listing, ["listingData", "newDevelopment", "description"], ""));
    const status = removeTags(get(listing, ["listingData", "newDevelopment", "status"], ""));

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
        },
        containerPageTwo: {
            ...PADDING_FOR_PAGES
        },
        description: {
            paddingTop: "16px",
            paddingBottom: "16px",
            alignSelf: "center",
            width: (description.length > 600) ? '90%' : "70%",
            height: (description.length > 600) ? "62%" : "50%",
            fontFamily: FONT_FAMILY,
            fontSize: (description.length > 600) ? "18px" : "24px",
            display: "flex",
            flexDirection: "column",
            alignContent: "space-between",
            overflowWrap: 'break-word'
        },
        status: {
            textTransform: 'capitalize',
            alignSelf: "flex-start",
            marginBottom: "16px"
        },
        linkMore: {
            fontWeight: 700,
            color: "#ffb839",
            marginTop: "auto",
            textDecoration: "none"
        }
    });

    const urlListing = get(listing, ["uri"], null);

    const isMaxExceed = (get(listing, ["listingData", "newDevelopment", "description"], "").length > description.length)

    return (
        <Page size="A4" style={styles.page} orientation={"landscape"}>
            <View style={styles.containerPageTwo}>
                <View style={styles.description} >
                    <Text style={styles.status}>{status}</Text>
                    <Text>
                        {
                        description.concat((isMaxExceed) ? " ..." : "")
                        }
                    </Text>
                    {
                        isMaxExceed
                        &&
                        <Link style={styles.linkMore} src={addParamsToUrl(DOMAIN_PROD, agent, urlListing)}><Text>View More</Text></Link>
                    }
                </View>
            </View>
            <HeaderDinamic listing={listing} agent={agent} />
            <FooterDinamic listing={listing} agent={agent} />
        </Page>
    )
}

export default PageTwo;