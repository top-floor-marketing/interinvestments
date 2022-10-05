import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { FONT_FAMILY, PADDING_FOR_PAGES } from './utils';

const PageFive = ({ listing, agent }) => {

    console.log("listing ", listing)

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        containerPageFive: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#f5f6fa',
            paddingTop: '22px',
            paddingBottom: '22px',
            paddingRight: "2%",
            paddingLeft: "2%",
        },
        infoPageFive: {
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
          	paddingTop: '22px',
            marginLeft: "auto",
            marginRight: "auto",
        },
        textNumber: {
            fontWeight: 300,
            color: "#fab005",
            fontSize: "20px",
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
            marginBottom: "32px"
        },
        table: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: "auto",
            width: '85%',
            heigth: "100%",
         	paddingRight: "5%",
        },
        width28: {
          width: "28%",
        },
        width14: {
          width: "14.5%",
        },
        thRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            paddingTop: '8px',
            paddingBottom: '8px',
            marginTop: '8px',
          	marginBottom: '8px',
            borderBottom: '0.5px solid #34495e',
        },
        textTable: {
            fontSize: "14px",
            paddingRight: "8px",
            paddingLeft: "8px",
        },
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
                    <Text style={styles.textNumber}>02</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.textTitle}>Floorplans</Text>
                    </View>
                </View>
                    <View style={styles.table}>
                        <View style={styles.thRow}>
                            <Text style={{ ...styles.width28, ...styles.textTable }}>Name</Text>
                            <Text style={{ ...styles.width28, ...styles.textTable }}>Pdf File</Text>
                            <Text style={{ ...styles.width14, ...styles.textTable }}>Bed/Bath</Text>
                            <Text style={{ ...styles.width14, ...styles.textTable }}>AC Sqft</Text>
                            <Text style={{ ...styles.width14, ...styles.textTable }}>Total Sqft</Text>
                        </View>
                    </View>
            </View>
            <HeaderDinamic listing={listing} agent={agent} />
            <FooterDinamic listing={listing} agent={agent} />
        </Page>
    )
}

export default PageFive;