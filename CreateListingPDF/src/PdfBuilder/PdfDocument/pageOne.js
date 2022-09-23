import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import LogoInter from '../../Assets/img/logo-inter.png';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { numFormatter, FONT_FAMILY, INTERINVESTMENT } from './utils';

const PageOne = ({ listing, agent }) => {

    const getFeaturedImage = () => {
        return 'https://i.postimg.cc/Wzhqpy9b/Cipriani-Residences-Miami-Restaurant.jpg';
        /* let url = get(listing, ["featuredImage", "node", "sourceUrl"], null);
        if(!url) url = get(listing, ["listingData", "newDevelopment", "photos", "0", "sourceUrl"], null);
        return url; */
    }

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
        },
        containerImage: {
            width: '100%',
            height: '100%',
            padding: 0,
            display: 'column',
            position: "relative"
        },
        imageFeatured: {
            objectFit: 'cover',
            padding: 0,
            position: "absolute",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100%',
        },
        filterImage: {
            backgroundColor: "#141313",
            position: "absolute",
            width: '100%',
            height: '100%',
            opacity: 0.4,
        },
        imageLogo: {
            top: "20%",
            left: "43%",
            transform: "translate(-43%, -43%)",
            width: '24%',
            height: '2.5%',
            padding: 0,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: "absolute",
        },
        containerTitle: {
            width: '85%',
            height: '35%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            padding: '32px',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textTitle: {
            color: 'white',
            fontWeight: 700,
            fontFamily: FONT_FAMILY,
            fontSize: get(listing, ["title"], INTERINVESTMENT).length < 30 ? '50px' : '30px'
        },
        containerSubTitle: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textSubtitle: {
            marginLeft: '16px',
            marginRight: '16px',
            marginTop: '8px',
            fontFamily: FONT_FAMILY,
            fontSize: '14px',
            color: 'white',
            fontWeight: 300,
        },
        textNei: {
            flex: '1 0 100%',
            textAlign: 'center'
        },
        pointDivider: {
            fontSize: '16px',
            fontFamily: FONT_FAMILY,
            alignSelf: 'center',
            color: 'white',
            fontWeight: 700,
        }
    });

    return (
        <Page size="A4" style={styles.page} orientation={"landscape"}>
            <View style={styles.containerImage}>
                <Image style={styles.imageFeatured} src={getFeaturedImage()} alt={INTERINVESTMENT} />
                <View style={styles.filterImage} />
                <Image style={styles.imageLogo} src={LogoInter} alt={INTERINVESTMENT} />
                <View style={styles.containerTitle} wrap>
                    <Text style={styles.textTitle}>{get(listing, ["title"], INTERINVESTMENT)}</Text>
                    <View style={styles.containerSubTitle}>
                        <Text style={(get(listing, ["neighborhoods", "nodes", "0", "name"], 'Neighborhood').length > 30) ? { ...styles.textSubtitle, ...styles.textNei } : { ...styles.textSubtitle }}>
                            {get(listing, ["neighborhoods", "nodes", "0", "name"], 'Neighborhood')}
                        </Text>
                        <Text style={styles.pointDivider}>.</Text>
                        <Text style={styles.textSubtitle}>
                            {numFormatter(get(listing, ["listingData", "newDevelopment", "priceMin"], 0))}
                        </Text>
                        <Text style={styles.pointDivider}>.</Text>
                        <Text style={styles.textSubtitle}>
                            {numFormatter(get(listing, ["listingData", "newDevelopment", "priceMax"], 0))}
                        </Text>
                    </View>
                </View>
            </View>
        </Page>
    )
}

export default PageOne;