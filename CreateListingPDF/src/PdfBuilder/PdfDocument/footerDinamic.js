import { Page, Text, Link, View, StyleSheet, Image } from '@react-pdf/renderer';

import LogoInter from '../../Assets/img/logo-inter.png';

import get from 'lodash/get';

import { removeHttp } from './utils';

const FONT_FAMILY = 'Outfit';
const INTERINVESTMENT = 'Interinvestments';
const DOMAIN_PROD = process.env.REACT_APP_DOMAIN_PROD;

const FooterDinamic = ({ listing }) => {

    console.log("listing ", listing);

    const LINK_DOMAIN = {
            fontSize: "10px",
            fontWeight: 300,
            fontFamily: FONT_FAMILY,
            color: '#FFFFFF',
            textDecoration: 'none'
    }

    const styles = StyleSheet.create({
        footerDinamic: {
            bottom: "0px",
            position: "absolute",
            width: "100%",
            height: "20px",
            paddingRight: "2%",
            paddingLeft: "2%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        linkDomain: LINK_DOMAIN
    });

    return (
        <View style={styles.footerDinamic}>
            <Link style={styles.linkDomain} src={DOMAIN_PROD}><Text>{removeHttp(DOMAIN_PROD)}</Text></Link>
        </View>
    ) 
}

export default FooterDinamic;