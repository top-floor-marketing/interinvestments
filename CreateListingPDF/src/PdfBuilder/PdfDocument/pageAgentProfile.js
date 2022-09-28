import { Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

import TwitterIcon from '../../Assets/img/twitter-icon.png';
import FacebookIcon from '../../Assets/img/facebook-icon.png';
import InstagramIcon from '../../Assets/img/instagram-icon.png';
import LinkedinIcon from '../../Assets/img/linkedin-icon.png';

import get from 'lodash/get';

import { FONT_FAMILY, removeTags, PADDING_FOR_PAGES, INTERINVESTMENT } from './utils';

import FooterDinamic from './footerDinamic';
import HeaderDinamic from './headerDinamic';

const PageAgentProfile = ({ listing, agent }) => {

    const fullNameAgent = get(agent, ["firstName"], "").concat(" ").concat(get(agent, ["lastName"], ""));
    const content = removeTags(get(agent, ["content"], ""));

    const styles = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        },
        containerProfileAgent: {
            ...PADDING_FOR_PAGES,
        },
        infoPageAgent: {
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            maxHeight: "90%",
            margin: "auto",
            alignItems: "center"
        },
        textAgent: {
            fontWeight: "300",
            height: "100%",
            color: "#fab005",
            fontSize: (fullNameAgent.length > 20) ? "16px" : "20px",
            fontFamily: FONT_FAMILY,
            width: (fullNameAgent.length > 20) ? "15%" : "30%",
        },
        dataContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: "100%",
            paddingLeft: "16px",
            paddingRight: "16px",
        },
        textAgentName: {
            height: "auto",
            padding: "0px",
            fontWeight: 600,
            fontSize: (fullNameAgent.length > 20) ? "30px" : "48px",
            fontFamily: FONT_FAMILY,
            marginBottom: "0px"
        },
        textPosition: {
            fontWeight: 600,
            fontSize: "14px",
            fontFamily: FONT_FAMILY,
            marginBottom: "32px"
        },
        textContent: {
            fontWeight: 600,
            fontSize: "12px",
            fontFamily: FONT_FAMILY,
            marginBottom: "32px"
        },
        textEmail: {
            fontWeight: 600,
            fontSize: "14px",
            fontFamily: FONT_FAMILY,
            marginBottom: "8px"
        },
        textPhone: {
            fontWeight: 600,
            fontSize: "14px",
            fontFamily: FONT_FAMILY,
            marginBottom: "8px"
        },
        logoContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
        },
        logoImg: {
            width: "16px",
            height: "16px",
            marginRight: '8px'
        }
    });

    console.log("agent ", agent);

    return (
        <Page size="A4" style={styles.page} orientation={"landscape"}>
            <View style={styles.containerProfileAgent}>
                <View style={styles.infoPageAgent}>
                    <Text style={styles.textAgent}>AGENT</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.textAgentName}>
                            {
                                fullNameAgent
                            }
                        </Text>
                        <Text style={styles.textPosition}>
                            {
                                get(agent, ["position"], "")
                            }
                        </Text>
                        <Text style={styles.textContent}>
                            {
                                content
                            }
                        </Text>
                        <Text style={styles.textEmail}>
                            {
                                get(agent, ["email"], "")
                            }
                        </Text>
                        <Text style={styles.textPhone}>
                            {
                                get(agent, ["phone"], "")
                            }
                        </Text>
                        <View style={styles.logoContainer}>
                            {
                                (get(agent, ["facebook"], null))
                                &&
                                <Link src={get(agent, ["facebook"], null)}>
                                    <Image src={FacebookIcon} style={styles.logoImg} alt={INTERINVESTMENT} />
                                </Link>
                            }
                            {
                                (get(agent, ["twitter"], null))
                                &&
                                <Link src={get(agent, ["twitter"], null)}>
                                    <Image src={TwitterIcon} style={styles.logoImg} alt={INTERINVESTMENT} />
                                </Link>
                            }
                            {
                                (get(agent, ["instagram"], null))
                                &&
                                <Link src={get(agent, ["instagram"], null)}>
                                    <Image src={InstagramIcon} style={styles.logoImg} alt={INTERINVESTMENT} />
                                </Link>
                            }
                            {
                                (get(agent, ["linkedin"], null))
                                &&
                                <Link src={get(agent, ["linkedin"], null)}>
                                    <Image src={LinkedinIcon} style={styles.logoImg} alt={INTERINVESTMENT} />
                                </Link>
                            }
                        </View>
                    </View>
                </View>
            </View>
            <HeaderDinamic listing={listing} agent={agent} />
            <FooterDinamic listing={listing} agent={agent} />
        </Page>
    )
}

export default PageAgentProfile;