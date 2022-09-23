import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import LogoInter from '../../Assets/img/logo-inter.png';

import get from 'lodash/get';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

import { numFormatter, FONT_FAMILY, INTERINVESTMENT } from './utils';

const PageTwo = ({ listing, agent }) => {

    console.log("listing ", listing);
    console.log("agent ", agent);

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: 'white',
        },
    });

    return (
        <Page size="A4" style={styles.page} orientation={"landscape"}>
            <View>
                <Text>TEST</Text>
            </View>
            <HeaderDinamic listing={listing} agent={agent} />
            <FooterDinamic listing={listing} agent={agent} />
        </Page>
    )
}

export default PageTwo;