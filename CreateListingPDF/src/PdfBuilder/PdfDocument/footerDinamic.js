import { Text, Link, View, StyleSheet } from '@react-pdf/renderer';

import { removeHttp, addParamsToUrl, FONT_FAMILY, DOMAIN_PROD } from './utils';

const FooterDinamic = ({ agent }) => {

    const LINK_DOMAIN = {
            textTransform: 'capitalize',
            fontSize: "8px",
            fontWeight: 300,
            fontFamily: FONT_FAMILY,
            color: '#34495e',
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
            <Link style={styles.linkDomain} src={addParamsToUrl(DOMAIN_PROD, agent)}>
                <Text>{removeHttp(DOMAIN_PROD)}</Text>
            </Link>
        </View>
    ) 
}

export default FooterDinamic;