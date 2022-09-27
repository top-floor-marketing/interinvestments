import { Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

import RectanglePageTwo from '../../Assets/img/rectanglePageTwo.png';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { numFormatter, INTERINVESTMENT, FONT_FAMILY, addParamsToUrl, removeTags, PADDING_FOR_PAGES, DOMAIN_PROD } from './utils';

dayjs.extend(customParseFormat);

const PageTwo = ({ listing, agent }) => {

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
            ...PADDING_FOR_PAGES,
            height: (description.length > 600) ? "62%" : "50%",
        },
        viewDescription: {
            fontWeight: 400,
            paddingTop: "16px",
            paddingBottom: "16px",
            alignSelf: "center",
            width: (description.length > 600) ? '90%' : "76%",
            height: "100%",
            fontFamily: FONT_FAMILY,
            fontSize: (description.length > 600) ? "16px" : "22px",
            display: "flex",
            flexDirection: "column",
            alignContent: "space-between",
            overflowWrap: 'break-word'
        },
        status: {
            fontWeight: 400,
            fontSize: "22px",
            textTransform: 'capitalize',
            alignSelf: "flex-start",
            marginBottom: "16px"
        },
        linkMore: {
            fontWeight: 700,
            color: "#ffb839",
            marginTop: "auto",
            textDecoration: "none"
        },
        viewPrice: {
            position: "relative",
            width: "100%",
            height: (description.length > 600) ? "38%" : "50%",
        },
        imageRectangle: {
            objectFit: 'cover',
            padding: 0,
            position: "absolute",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100%',
        },
        contentPrice: {
            width: "76%",
            fontFamily: FONT_FAMILY,
            paddingTop: PADDING_FOR_PAGES.paddingTop,
            paddingBottom: PADDING_FOR_PAGES.paddingBottom,
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-around",
            alignContent: "center",
            height: "100%",
        },
        itemPrice: {
            alignSelf: "center",
            width: "100%",
            height: "auto",
            flex: "1",
            marginLeft: "16px",
            marginRight: "16px",
            display: "flex",
            flexDirection: "column"
        },
        priceBigValue: {
            fontWeight: 400,
            fontFamily: FONT_FAMILY,
            fontSize: "26px",
            textAlign: "left"
        },
        priceTextLabel: {
            marginTop: "16px",
            fontWeight: 400,
            fontFamily: FONT_FAMILY,
            fontSize: "10px",
            textAlign: "left"
        }
    });
    const urlListing = get(listing, ["uri"], null);
    const isMaxExceed = (get(listing, ["listingData", "newDevelopment", "description"], "").length > 800)
    const estDate = dayjs(get(listing, ["listingData", "newDevelopment", "estimatedDateOfCompletion"], ""), ["DD-MM-YY"]).format("MM.YYYY");

    return (
        <Page size="A4" style={styles.page} orientation={"landscape"}>
            <View style={styles.containerPageTwo}>
                <View style={styles.viewDescription} >
                    <Text style={styles.status}>{status}</Text>
                    <Text>
                        {description}
                    </Text>
                    {
                        isMaxExceed
                        &&
                        <Link style={styles.linkMore} src={addParamsToUrl(DOMAIN_PROD, agent, urlListing)}><Text>View More</Text></Link>
                    }
                </View>

            </View>
            <View style={styles.viewPrice}>
                <Image style={styles.imageRectangle} src={RectanglePageTwo} alt={INTERINVESTMENT} />
                <View style={styles.contentPrice}>

                    <View style={styles.itemPrice}>
                        <Text style={styles.priceBigValue}>{estDate}</Text>
                        <Text style={styles.priceTextLabel}>Est. Date of Completion</Text>
                    </View>

                    <View style={styles.itemPrice}>
                        <Text style={styles.priceBigValue}>
                            ${numFormatter(get(listing, ["listingData", "newDevelopment", "priceMin"], ""))}</Text>
                        <Text style={styles.priceTextLabel}>Price Min</Text>
                    </View>

                    <View style={styles.itemPrice}>
                        <Text style={styles.priceBigValue}>
                            ${numFormatter(get(listing, ["listingData", "newDevelopment", "priceMax"], ""))}</Text>
                        <Text style={styles.priceTextLabel}>Price Max</Text>
                    </View>
                    {
                        numFormatter(get(listing, ["listingData", "newDevelopment", "totalUnits"], null))
                        &&
                        <View style={styles.itemPrice}>
                            <Text style={styles.priceBigValue}>
                                {numFormatter(get(listing, ["listingData", "newDevelopment", "totalUnits"], ""))}</Text>
                            <Text style={styles.priceTextLabel}>Total Units</Text>
                        </View>
                    }
                </View>
            </View>
            <HeaderDinamic listing={listing} agent={agent} />
            <FooterDinamic listing={listing} agent={agent} />
        </Page>
    )
}

export default PageTwo;