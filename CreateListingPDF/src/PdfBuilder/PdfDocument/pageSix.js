import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { FONT_FAMILY, PADDING_FOR_PAGES } from './utils';

const PageSix = ({ listing, agent }) => {

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        containerPageFive: {
            ...PADDING_FOR_PAGES,
        },
        infoPageFive: {
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
        bath: parseInt(get(listing, ["listingData", "newDevelopment", "finishes", "bathrooms"], null)),
        appliances: get(listing, ["listingData", "newDevelopment", "finishes", "appliances"], null),
        kitchenCabinets: get(listing, ["listingData", "newDevelopment", "finishes", "kitchenCabinets"], null),
        flooring: parseInt(get(listing, ["listingData", "newDevelopment", "finishes", "flooring"], null)),
    }

    return (
        <Page
            size="A4"
            style={styles.page}
            orientation={"landscape"}>
             <View style={styles.containerPageFive}>
                <View style={styles.infoPageFive}>
                    <Text style={styles.textNumber}>03</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.textTitle}>Finishes</Text>
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
                            (specs.flooring)
                            &&
                            <View style={styles.rowData}>
                                <Text style={styles.textRowDataTitle}>
                                    Flooring
                                </Text>
                                <Text style={styles.textRowDataInfo}>
                                    {specs.flooring}
                                </Text>
                            </View>
                        }
                        {
                            (specs.kitchenCabinets)
                            &&
                            <View style={styles.rowData}>
                                <Text style={styles.textRowDataTitle}>
                                Kitchen Cabinets
                                </Text>
                                <Text style={styles.textRowDataInfo}>
                                    {specs.kitchenCabinets}
                                </Text>
                            </View>
                        }
                         {
                            (specs.appliances)
                            &&
                            <View style={styles.rowData}>
                                <Text style={styles.textRowDataTitle}>
                                Appliances
                                </Text>
                                <Text style={styles.textRowDataInfo}>
                                    {specs.appliances}
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

export default PageSix;