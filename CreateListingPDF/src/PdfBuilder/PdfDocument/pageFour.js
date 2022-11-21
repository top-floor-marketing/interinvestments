import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { FONT_FAMILY, INTERINVESTMENT, PADDING_FOR_PAGES } from './utils';

const PageFour = ({ listing, agent }) => {

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        containerPageFour: {
            ...PADDING_FOR_PAGES,
        },
        infoPageFour: {
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            height: '90%',
            margin: "auto",
        },
        textNumber: {
            fontWeight: 300,
            color: "#fab005",
            fontSize: "20px",
            fontFamily: FONT_FAMILY,
            width: "30%",
        },
        dataContainer: {
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: "16px",
            paddingRight: "16px",
            width: "100%"
        },
        textTitle: {
            fontWeight: 600,
            fontSize: "48px",
            fontFamily: FONT_FAMILY,
            marginBottom: "32px"
        },
        rowData: {
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
            borderTop: '0.5px solid #34495e',
            paddingTop: '16px',
            paddingBottom: '16px',
        },
        textRowDataTitle: {
            fontWeight: 200,
            fontSize: "18px",
            fontFamily: FONT_FAMILY,
            width: "50%",
            paddingLeft: "8px",
            paddingRight: "8px"
        },
        textRowDataInfo: {
            fontWeight: 'normal',
            fontSize: "16px",
        }
    });

    const specs = {
        bath: get(listing, ["listingData", "newDevelopment", "specs", "bath"], null),
        bedrooms: get(listing, ["listingData", "newDevelopment", "specs", "bedrooms"], null),
        sqft: get(listing, ["listingData", "newDevelopment", "specs", "sqft"], null)
    }

    return (
        <Page
            size="A4"
            style={styles.page}
            orientation={"landscape"}>
            <View style={styles.containerPageFour}>
                <View style={styles.infoPageFour}>
                    <Text style={styles.textNumber}>01</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.textTitle}>Specs</Text>
                        {
                            (specs.bath)
                            &&
                            <View style={styles.rowData}>
                                <Text style={styles.textRowDataTitle}>
                                    Bathrooms
                                </Text>
                                <Text style={styles.textRowDataInfo}>
                                    {specs.bath}
                                </Text>
                            </View>
                        }
                        {
                            (specs.bedrooms)
                            &&
                            <View style={styles.rowData}>
                                <Text  style={styles.textRowDataTitle}>
                                    Bedrooms
                                </Text>
                                <Text style={styles.textRowDataInfo}>
                                    {specs.bedrooms}
                                </Text>
                            </View>
                        }
                        {
                            (specs.sqft)
                            &&
                            <View style={styles.rowData}>
                                <Text  style={styles.textRowDataTitle}>
                                    Living SqFt
                                </Text>
                                <Text style={styles.textRowDataInfo}>
                                    {specs.sqft}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
            <HeaderDinamic listing={listing} agent={agent} />
            <FooterDinamic listing={listing} agent={agent} />
        </Page>
    )
}

export default PageFour;