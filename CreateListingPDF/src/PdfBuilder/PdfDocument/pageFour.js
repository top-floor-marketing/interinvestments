import { Page, View, StyleSheet, Image } from '@react-pdf/renderer';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { INTERINVESTMENT, PADDING_FOR_PAGES } from './utils';

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
    });

    return (
        <Page
            size="A4"
            style={styles.page}
            orientation={"landscape"}>
            <View style={styles.containerPageFour}>
                <View>
                  
                </View>
            </View>
            <HeaderDinamic listing={listing} agent={agent} />
            <FooterDinamic listing={listing} agent={agent} />
        </Page>
    )
}

export default PageFour;