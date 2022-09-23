import { Text, Link, View, StyleSheet, Image } from '@react-pdf/renderer';

import LogoInterBlack from '../../Assets/img/logo-inter-black.png';

import get from 'lodash/get';

import { addParamsToUrl, FONT_FAMILY, DOMAIN_PROD } from './utils';

const HeaderDinamic = ({ listing, agent }) => {

    const LINK_DOMAIN = {
        fontSize: "8px",
        fontWeight: 300,
        fontFamily: FONT_FAMILY,
        color: '#34495e',
        textTransform: "capitalize",
        textDecoration: 'none'
    }

    const styles = StyleSheet.create({
        headerDinamic: {
            top: "0px",
            position: "absolute",
            width: "100%",
            height: "20px",
            paddingRight: "2%",
            paddingLeft: "2%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: '0.5px solid #34495e',
        },
        imageLogo: {
            width: "12%",
            height: "auto",
            alignSelf: "center",
        },
        linkTitle: {
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "row",
            ...LINK_DOMAIN
        }
    });

    return (
        <View style={styles.headerDinamic}>
            <Link style={styles.imageLogo} src={addParamsToUrl(DOMAIN_PROD, agent)}>
                <Image src={LogoInterBlack} />
            </Link>
            <Link wrap style={styles.linkTitle} src={addParamsToUrl(DOMAIN_PROD, agent)}>
                <Text>
                    {
                        `${get(listing, ["title"], '')}`
                    }
                </Text>
                {
                    get(listing, ["neighborhoods", "nodes", "0", "name"], '').length > 0
                    &&
                    <>
                        <Text style={{ marginLeft: '4px', marginRight: '4px' }}>-</Text>
                        <Text>{get(listing, ["neighborhoods", "nodes", "0", "name"], '')}</Text>
                    </>
                }
            </Link>
        </View>
    )
}

export default HeaderDinamic;