import { Page, View, StyleSheet, Text, Link } from '@react-pdf/renderer';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { FONT_FAMILY, PADDING_FOR_PAGES } from './utils';

const PageFive = ({ listing, agent }) => {

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        containerPageFive: {
            ...PADDING_FOR_PAGES
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
            fontFamily: FONT_FAMILY
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
            marginBottom: "32px",
            fontFamily: FONT_FAMILY
        },
        table: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: "auto",
            width: '90%',
            heigth: "100%",
            paddingRight: "5%",
        },
        width28: {
            width: "28%",
            fontFamily: FONT_FAMILY
        },
        width14: {
            width: "14.5%",
            fontFamily: FONT_FAMILY
        },
        thRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            paddingTop: '8px',
            paddingBottom: '8px',
            marginTop: '8px',
            marginBottom: '8px',
        },
        borderTh: {
            borderBottom: '0.5px solid #34495e',
        },
        textTable: {
            fontSize: "14px",
            paddingRight: "8px",
            paddingLeft: "8px",
        },
        linkPdf: {
            textTransform: 'capitalize',
            fontWeight: 300,
            color: '#34495e',
        },
        textInfo: {
            fontSize: "11px",
            paddingRight: "8px",
            paddingLeft: "8px",
        }
    });

    const photosList = get(listing, ["floorplans", "allFloorplans"], []).slice(0, 42);
    const arrayPages = new Array(Math.ceil(photosList.length / 7)).fill(0);

    const paginationInfo = arrayPages.map((val, index) => {
        return photosList.slice(index * 7, (index * 7) + 7);
    });

    return (
        paginationInfo.map((val, index) => (
            <Page
                key={index}
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
                        <View style={{ ...styles.thRow, ...styles.borderTh }}>
                            <Text style={{ ...styles.width28, ...styles.textTable }}>Name</Text>
                            <Text style={{ ...styles.width28, ...styles.textTable }}>Pdf File</Text>
                            <Text style={{ ...styles.width14, ...styles.textTable }}>Bed/Bath</Text>
                            <Text style={{ ...styles.width14, ...styles.textTable }}>AC Sqft</Text>
                            <Text style={{ ...styles.width14, ...styles.textTable }}>Total Sqft</Text>
                        </View>
                        
                        {
                            val.map((valFloor, indexFloor) => (
                                <View key={indexFloor} style={styles.thRow}>
                                    <Text style={{ ...styles.width28, ...styles.textInfo }}>
                                        {
                                            get(valFloor, ["floorplans", "name"], "")
                                        }
                                    </Text>
                                    {
                                        (get(valFloor, ["floorplans", "pdf", "mediaItemUrl"], null))
                                            ?
                                            <Link style={{ ...styles.width28, ...styles.textInfo, ...styles.linkPdf }}
                                                src={get(valFloor, ["floorplans", "pdf", "mediaItemUrl"], "")}>
                                                <Text>
                                                    {
                                                        get(valFloor, ["floorplans", "pdf", "title"], "")
                                                    }
                                                </Text>
                                            </Link>
                                            : <Text style={{ ...styles.width28, ...styles.textInfo, ...styles.linkPdf }}>
                                                N/A
                                            </Text>
                                    }
                                    <Text style={{ ...styles.width14, ...styles.textInfo }}>
                                        {
                                            get(valFloor, ["floorplans", "bedbath"], "-")
                                        }
                                        {
                                            get(valFloor, ["floorplans", "den"], false)
                                            && " + Den"
                                        }
                                    </Text>
                                    <Text style={{ ...styles.width14, ...styles.textInfo }}>
                                        {
                                            get(valFloor, ["floorplans", "acSqft"], "-")
                                        }
                                    </Text>
                                    <Text style={{ ...styles.width14, ...styles.textInfo }}>
                                        {
                                            get(valFloor, ["floorplans", "totalSqft"], "-")
                                        }
                                    </Text>
                                </View>
                            ))
                        }

                    </View>
                </View>
                <HeaderDinamic listing={listing} agent={agent} />
                <FooterDinamic listing={listing} agent={agent} />
            </Page>
        ))
    )
}

export default PageFive;