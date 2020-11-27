import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Content, Container } from "native-base";

import { Header } from "../../components";

import moment from "moment";
import { NewsDetailsPic, BBqsUi, BgSpiral } from "../../../assets";
import { fonts } from "../../theme";

export default class NewsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }
  render() {
    const { news } = this.props.route.params;

    console.log("NEWS", news);
    return (
      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <ImageBackground
          resizeMode="cover"
          source={BgSpiral}
          style={styles.bgSpirals}
        >
          <Header
            heading={"News Details"}
            navigation={this.props.navigation}
            back
            bgHeader={"#f1f1f1"}
          />
          <Content>
            <View style={styles.img}>
              <Image
                source={NewsDetailsPic}
                resizeMode="contain"
                style={{ width: "100%" }}
              />
            </View>
            <View style={styles.heading}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 22,
                  color: "#252525",
                }}
              >
                {news.heading}
              </Text>
            </View>
            <View style={styles.text}>
              <Text
                style={{ textAlign: "auto", lineHeight: 20, color: "#252525" }}
              >
                {news.news}

                {"\n\n"}
                <Text style={{ fontFamily: fonts.medium, fontSize: 13 }}>
                  PUBLISHED {moment.utc(news.createdAt).format("LLLL")}
                  EDT
                </Text>
              </Text>
              <Image
                style={{ height: 40, width: 40, resizeMode: "contain" }}
                source={BBqsUi}
              />
            </View>
          </Content>
        </ImageBackground>
        {/* Continue */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    borderWidth: 0,
  },
  heading: {
    borderWidth: 0,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    paddingRight: 10,
  },
  text: { borderWidth: 0, width: "90%", alignSelf: "center", marginTop: 10 },
  bgSpirals: {
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});
