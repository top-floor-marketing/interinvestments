import { Page, Text, View, Link, Document, StyleSheet, Image, Font  } from '@react-pdf/renderer';

import OutfitFont from '../../Assets/outfit-cdnfonts/OutfitRegular.ttf';
import LogoInter from '../../Assets/img/logo-inter.png';

import get from 'lodash/get';
import words from 'lodash/words';

import { numFormatter } from './utils';

const FONT_FAMILY = 'Outfit';
const INTERINVESTMENT = 'Interinvestments';

// Register font
Font.register({ family: FONT_FAMILY, fontStyle: "normal",
fontWeight: "normal", src: OutfitFont   });

const PdfDocument = ({ listing, agent }) => {
    /*console.log("listing ", listing)
    console.log("agent ", agent)*/

    const getFeaturedImage = () => {
        // return 'https://i.postimg.cc/Wzhqpy9b/Cipriani-Residences-Miami-Restaurant.jpg';
        let url = get(listing, ["featuredImage", "node", "sourceUrl"], null);
        if(!url) url = get(listing, ["listingData", "newDevelopment", "photos", "0", "sourceUrl"], null);
        return url;
    }

    const DOCUMENT_METADATA = {
        title: get(listing, ["title"], INTERINVESTMENT),
        author: "Interinvestments",
        subject: "",
        keywords: words(get(listing, ["title"], INTERINVESTMENT)),
        creator: "Interinvestments",
        producer: "Interinvestments",
        pdfVersion: "1.0",
        language: "en",
       /*  pageMode: "fullScreen",
        pageLayout: "singlePage" */
    }

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: 'white',
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
            //fontFamily: 'Outfit',
            width: '80%',
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
            fontFamily: 'Outfit',
            fontSize: get(listing, ["title"], INTERINVESTMENT).length < 30 ? '40px' : '30px'
        },
        textSubtitle: {
            marginTop: '8px',
            fontFamily: 'Outfit',
            fontSize: '12px',
            color: 'white',
            fontWeight: 300,
        }
      });

    return (
        <Document {...DOCUMENT_METADATA}>
            <Page size="A4" style={styles.page} orientation={"landscape"}>
                    <View style={styles.containerImage}>
                        <Image style={styles.imageFeatured}  src={getFeaturedImage()} alt={INTERINVESTMENT} />
                        <Image style={styles.imageLogo} src={LogoInter} alt={INTERINVESTMENT} />
                        <View style={styles.containerTitle} wrap>
                            <Text style={styles.textTitle}>{get(listing, ["title"], INTERINVESTMENT)}</Text>
                            <Text style={styles.textSubtitle}>{get(listing, ["title"], INTERINVESTMENT)}</Text>
                        </View>
                    </View>
            </Page>
        </Document>
    )
}

export default PdfDocument;