import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native";
import { Container, Button, Content } from "native-base";
import { BgSpiral, Westren, Xpress } from "../../../assets";
import { SignInButton, Header, Icons } from "../../components";
import { fonts } from "../../theme";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

import Image from "react-native-fast-image";

export default class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["", Westren, Xpress],
      tableData: [
        [
          <Text style={styles.headingsLeft}>Exchange Rate</Text>,
          <Text style={{ textAlign: "center" }}>
            44.34 <Text style={styles.headingsLeft}>PKR</Text>
          </Text>,
          <Text style={{ textAlign: "center" }}>
            43.50 <Text style={styles.headingsLeft}>PKR</Text>
          </Text>,
        ],
        [
          <Text style={styles.headingsLeft}>Transfer Fee</Text>,
          <Text style={{ textAlign: "center" }}>
            5 <Text style={styles.headingsLeft}>AED</Text>
          </Text>,
          <Text style={{ textAlign: "center" }}>
            10 <Text style={styles.headingsLeft}>AED</Text>
          </Text>,
        ],
        [
          <Text style={styles.headingsLeft}>Transfer Type</Text>,
          "Intl.",
          "Intl.",
        ],
        [
          <Text style={styles.headingsLeft}>Nearest Loc.</Text>,
          <Text style={styles.hyperlinkStyle}>Find Here</Text>,
          <Text style={styles.hyperlinkStyle}>Find Here</Text>,
        ],
        [
          <Text style={styles.headingsLeft}>Company Type</Text>,
          "Remittance",
          "Remittance",
        ],
        [<Text style={styles.headingsLeft}>Mobile App</Text>, "Yes", "Yes"],
        [
          <Text style={styles.headingsLeft}>Key Feature</Text>,
          "Competitive",
          "Competitive",
        ],
        [
          <Text
            style={[styles.headingsLeft, { top: -40, position: "absolute" }]}
          >
            Document
          </Text>,
          //   ["Org. Passport", "CNIC", "Photograph", "Legal Doc."],
          <Text style={{ marginLeft: 15 }}>
            Org. Passport{"\n"}CNIC{"\n"}Photograph{"\n"}Legal Doc.
          </Text>,
          <Text style={{ marginLeft: 15 }}>
            Org. Passport{"\n"}CNIC{"\n"}Photograph{"\n"}Legal Doc.
          </Text>,
        ],
        [
          <Text style={styles.headingsLeft}>Rating</Text>,
          [
            <Text style={{}}>
              5{" "}
              <Icons.MaterialCommunityIcons
                name="star"
                color={"#E8041D"}
                size={20}
              />
            </Text>,
          ],
          [
            "5",
            <Icons.MaterialCommunityIcons
              name="star"
              color={"#E8041D"}
              size={18}
            />,
          ],
        ],
        [
          <Text style={styles.headingsLeft}>Website</Text>,

          <Text
            style={styles.hyperlinkStyle}
            onPress={() =>
              Linking.openURL("https://www.westernunion.com/pk/en/home.html")
            }
          >
            Western Union
          </Text>,
          <Text
            style={styles.hyperlinkStyle}
            onPress={() =>
              Linking.openURL("https://www.westernunion.com/pk/en/home.html")
            }
          >
            Xpress
          </Text>,
        ],
      ],
    };
  }

  generateRows = (partner_1, partner_2) => {
    console.log('partner_1, partner_2=>', partner_1, partner_2)
    let partner_1_details = false;
    let partner_2_details = false;

    if (partner_1.partner_details) {
      if (partner_1.partner_details[0]) {
        partner_1_details = partner_1.partner_details[0];
      }
    }

    if (partner_2.partner_details) {
      if (partner_2.partner_details[0]) {
        partner_2_details = partner_2.partner_details[0];
      }
    }
    console.log("IMAGE FIND", partner_2_details, partner_1_details);

    return [
      [
        <Text style={styles.headingsLeft}>Exchange Rate</Text>,
        <Text style={{ textAlign: "center" }}>
          {partner_1.rate.toFixed(3)}{" "}
          <Text style={styles.headingsLeft}>{partner_1.base_currency}</Text>
        </Text>,
        <Text style={{ textAlign: "center" }}>
          {partner_2.rate.toFixed(3)}{" "}
          <Text style={styles.headingsLeft}>{partner_2.base_currency}</Text>
        </Text>,
      ],
      [
        <Text style={styles.headingsLeft}>Transfer Fee</Text>,
        <Text style={{ textAlign: "center" }}>
          {partner_1.payment_fees.toFixed(3)}{" "}
          <Text style={styles.headingsLeft}>{partner_2.base_currency}</Text>
        </Text>,
        <Text style={{ textAlign: "center" }}>
          {partner_2.payment_fees.toFixed(3)}{" "}
          <Text style={styles.headingsLeft}>{partner_2.base_currency}</Text>
        </Text>,
      ],
      // [
      //   <Text style={styles.headingsLeft}>Transfer Type</Text>,
      //   "Intl.",
      //   "Intl.",
      // ],
      // [
      //   <Text style={styles.headingsLeft}>Nearest Loc.</Text>,
      //   <Text style={styles.hyperlinkStyle}>Find Here</Text>,
      //   <Text style={styles.hyperlinkStyle}>Find Here</Text>,
      // ],
      [
        <Text style={styles.headingsLeft}>Company Type</Text>,
        partner_1_details.company_type,
        partner_2_details.company_type,
      ],
      [<Text style={styles.headingsLeft}>Mobile App</Text>,
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        {(partner_1_details.android_url && partner_1_details.android_url.indexOf('http') !== -1) ? <TouchableOpacity onPress={() => Linking.openURL(partner_1_details.android_url)}>
          <Image style={{ height: 37, width: 31, resizeMode: 'contain' }} source={{ uri: "https://rapidremituser.firebaseapp.com/static/media/play-playstore-icon.fa8ca871.png" }} />
        </TouchableOpacity> : <Text>Not available</Text>}
        {(partner_1_details.ios_url && partner_1_details.ios_url.indexOf('http') !== -1) ? <TouchableOpacity onPress={() => Linking.openURL(partner_1_details.ios_url)}>
          <Image style={{ height: 37, width: 31, resizeMode: 'contain' }} source={{ uri: "https://rapidremituser.firebaseapp.com/static/media/iOS-Apple-icon.37e3402c.png" }} />
        </TouchableOpacity> : <Text>Not available</Text>}
      </View>,
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        {(partner_2_details.android_url && partner_2_details.android_url.indexOf('http') !== -1) ? <TouchableOpacity onPress={() => Linking.openURL(partner_2_details.android_url)}>
          <Image style={{ height: 37, width: 31, resizeMode: 'contain' }} source={{ uri: "https://rapidremituser.firebaseapp.com/static/media/play-playstore-icon.fa8ca871.png" }} />
        </TouchableOpacity> : <Text>Not available</Text>}
        {(partner_2_details.ios_url && partner_2_details.ios_url.indexOf('http') !== -1) ? <TouchableOpacity onPress={() => Linking.openURL(partner_2_details.ios_url)}>
          <Image style={{ height: 37, width: 31, resizeMode: 'contain' }} source={{ uri: "https://rapidremituser.firebaseapp.com/static/media/iOS-Apple-icon.37e3402c.png" }} />
        </TouchableOpacity> : <Text>Not available</Text>}
      </View>],
      [
        <Text style={styles.headingsLeft}>Key Feature</Text>,
        partner_1_details.key_features.length > 0
          ? partner_1_details.key_features[0]
          : "",
        partner_2_details.key_features.length > 0
          ? partner_2_details.key_features[0]
          : "",
      ],
      [
        <Text style={[styles.headingsLeft, { top: -40, position: "absolute" }]}>
          Document
        </Text>,
        <Text style={{ marginLeft: 15 }}>
          {partner_1_details.documents &&
            partner_1_details.documents.map((doc, index) => {
              let aaa =
                partner_1_details.documents.length - 1 !== index ? ", " : "";
              return doc + aaa;
            })}
        </Text>,
        <Text style={{ marginLeft: 15 }}>
          {partner_2_details.documents &&
            partner_2_details.documents.map((doc, index) => {
              let aaa =
                partner_2_details.documents.length - 1 !== index ? ", " : "";
              return doc + aaa;
            })}
        </Text>,
      ],
      [
        <Text style={styles.headingsLeft}>Rating</Text>,
        [
          <Text style={{}}>
            {partner_1_details.rating}{" "}
            <Icons.MaterialCommunityIcons
              name="star"
              color={"#E8041D"}
              size={20}
            />
          </Text>,
        ],
        [
          partner_2_details.rating,
          <Icons.MaterialCommunityIcons
            name="star"
            color={"#E8041D"}
            size={18}
          />,
        ],
      ],
      [
        <Text style={styles.headingsLeft}>Website</Text>,

        <Text
          style={styles.hyperlinkStyle}
          onPress={() => Linking.openURL(partner_1_details.website_url)}
        >
          {(partner_1.partner_name + "").toUpperCase()}
        </Text>,
        <Text
          style={styles.hyperlinkStyle}
          onPress={() => Linking.openURL(partner_2_details.website_url)}
        >
          {(partner_2.partner_name + "").toUpperCase()}
        </Text>,
      ],
      [
        <Text style={styles.headingsLeft}>
          {console.log('partner_1_details.map_coordinates=>', partner_1.location, partner_1.location)}
          Location
          </Text>,
        partner_1.location && partner_1.location['0'] ? <TouchableOpacity
          onPress={() => {
            let location = partner_1.location;
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${location['0'].location.coordinates[0]},${location['0'].location.coordinates[1]}`;
            const url = Platform.select({
              ios: `${scheme}@${latLng}`,
              android: `${scheme}${latLng}`
            });
            Linking.openURL(url);
          }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icons.MaterialIcons
            name="location-on"
            size={30}
            color="#E8041D"
          />
        </TouchableOpacity> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Not available</Text>
          </View>,
        partner_2.location && partner_2.location['0'] ? <TouchableOpacity
          onPress={() => {
            let location = partner_2.location;
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${location['0'].location.coordinates[0]},${location['0'].location.coordinates[1]}`;
            const url = Platform.select({
              ios: `${scheme}@${latLng}`,
              android: `${scheme}${latLng}`
            });
            Linking.openURL(url);
          }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icons.MaterialIcons
            name="location-on"
            size={30}
            color="#E8041D"
          />
        </TouchableOpacity> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Not available</Text>
          </View>,

      ],
    ];
  };

  render() {
    const { selected_partner } = this.props.route.params;

    console.log("IMAGE FIND selected_partner", selected_partner);
    return (
      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <Header
          navigation={this.props.navigation}
          back
          heading={"Comparison"}
          bgHeader={"f1f1f1"}
        />
        <ImageBackground
          resizeMode="cover"
          source={BgSpiral}
          style={styles.bgSpirals}
        >
          <Content contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.tableCon}>
              <Table
                borderStyle={{
                  borderWidth: 0,
                  borderColor: "#c8e1ff",
                }}
              >
                <Row
                  data={[
                    "",
                    <Image
                      source={{
                        uri:
                          selected_partner[0] &&
                          selected_partner[0].partner_details[0].img,
                      }}
                      resizeMode="contain"
                      style={{ width: 60, alignSelf: "center", height: "100%" }}
                    />,
                    <Image
                      source={{
                        uri:
                          selected_partner[1] &&
                          selected_partner[1].partner_details[0].img,
                      }}
                      resizeMode="contain"
                      style={{ width: 60, alignSelf: "center", height: "100%" }}
                    />,
                  ]}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <Rows
                  data={this.generateRows(
                    selected_partner[0],
                    selected_partner[1]
                  )}
                  style={styles.data}
                  textStyle={styles.datatext}
                  selected_partner={selected_partner}
                />
              </Table>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const element = (data, index) => (
  <TouchableOpacity onPress={() => this._alertIndex(index)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>button</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  bgSpirals: {
    // position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
  },
  tableCon: {
    width: "100%",
    flex: 1,
    alignSelf: "center",
    paddingHorizontal: 10,
    // borderWidth: 1,
    backgroundColor: "white",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },

  headingstext: {
    textAlign: "center",
  },
  data: {
    borderBottomWidth: 0.175,
    borderBottomColor: "gray",
    minHeight: 80,
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },
  datatext: {
    textAlign: "center",
    fontFamily: fonts.regular,
    fontSize: 14,
    color: "#252525",
  },
  hyperlinkStyle: {
    color: "#E8041D",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  headingsLeft: {
    fontFamily: fonts.semibold,
    fontSize: 14.2,
    color: "#252525",
  },
  head: {
    height: 80,
    borderBottomColor: "gray",
    borderBottomWidth: 0.175,
  },
});
