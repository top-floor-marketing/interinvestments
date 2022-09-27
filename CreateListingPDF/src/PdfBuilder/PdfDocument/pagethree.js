import { Page, View, StyleSheet, Image } from '@react-pdf/renderer';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { INTERINVESTMENT, PADDING_FOR_PAGES } from './utils';

const PageThree = ({ listing, agent }) => {

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        containerPageThree: {
            ...PADDING_FOR_PAGES,
        },
        containerImages: {
            width: "90%",
            height: "90%",
            display: 'flex',
            flexWrap: "wrap",
            margin: "auto"
        },
        imageItem: {
            display: "flex",
            flex: "1 0 50%",
            width: "50%",
            padding: "8px",
        },
        photo: {
            width: "100%",
            height: "100%",
            objectFit: 'cover',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }
    });

    const photosList = get(listing, ["listingData", "newDevelopment", "photos"], []).slice(0,16);
    const arrayPages = new Array(Math.ceil(photosList.length / 4)).fill(0);

    const paginationInfo = arrayPages.map((val, index) => {
        return photosList.slice(index * 4, (index * 4) + 4);
    })

    if (photosList.length > 0)
        return (
            <>
                {
                    paginationInfo.map((photosItems, index) => {
                        return (
                            <Page
                                key={`${index}`}
                                size="A4"
                                style={styles.page}
                                orientation={"landscape"}>
                                <View style={styles.containerPageThree}>
                                    <View style={styles.containerImages}>
                                        {
                                            photosItems.map((photoVal, photoIndex) => (
                                                <View
                                                    key={`${index}_${photoIndex}`}
                                                    style={
                                                        {
                                                            ...styles.imageItem,
                                                            width: (photosItems.length === 1) ? "90%" : (photosItems.length > 2) ? "50%" : "70%",
                                                            margin: "auto"
                                                        }
                                                    }>
                                                    <Image
                                                        style={styles.photo}
                                                        key={`${index}_${photoIndex}`}
                                                        //src={"https://i.postimg.cc/Dwhr1whW/World-of-Warcraft-Alliance-logo-video-games-127155.jpg"}
                                                        src={get(photoVal, ["sourceUrl"], "")}
                                                        alt={INTERINVESTMENT}
                                                    />
                                                </View>
                                            ))
                                        }
                                    </View>
                                </View>
                                <HeaderDinamic listing={listing} agent={agent} />
                                <FooterDinamic listing={listing} agent={agent} />
                            </Page>
                        )
                    })
                }
            </>
        )
    return null
}

export default PageThree;