import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Container, Button, Content } from "native-base";
import {
  BgSpiral,
  Logo,
  Westren,
  MoneyGram,
  Ria,
  Xpress,
} from "../../../assets";
import { SignInButton, Icons } from "../../components";
import { fonts } from "../../theme";

export default class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceproviders: [
        { Name: "Western Union", img: Westren, rate: "44.34" },
        { Name: "Money Gram", img: MoneyGram, rate: "44.50", width: 45 },
        { Name: "XPRESS Money", img: Ria, rate: "44.34" },
        { Name: "Ria Money Transfer", img: Xpress, rate: "42.10" },
      ],
    };
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <Image resizeMode="cover" source={BgSpiral} style={styles.bgSpirals} />
        <Content
          bounces={false}
          contentContainerStyle={{
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={styles.crossbutton}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                <Icons.Entypo name="cross" size={35} color="#E8041D" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginHorizontal: "7%",
                marginBottom: 40,
                marginTop: 20,
              }}
            >
              <Text style={styles.title}>
                Compare the benefits{"\n"}
                of the service provider
              </Text>
            </View>
            <View style={styles.compareBoxesMainCon}>
              {this.state.serviceproviders.map((a) => {
                return (
                  <View style={styles.button}>
                    <View style={styles.buttonMainCon}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ select: !this.state.select });
                        }}
                        style={[
                          styles.selectablebutton,
                          {
                            borderWidth: this.state.select ? 0 : 3,
                            backgroundColor: this.state.select
                              ? "#E8041D"
                              : "white",
                            justifyContent: "center",
                            alignItems: "center",
                          },
                        ]}
                      >
                        {this.state.select && (
                          <Icons.MaterialCommunityIcons
                            name="check-bold"
                            color="white"
                            size={15}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.serviceCon}>
                      <View
                        style={{
                          flex: 0.4,
                          justifyContent: "center",
                          alignItems: "center",
                          // borderWidth: 1,
                        }}
                      >
                        <Image
                          source={a.img}
                          resizeMode="contain"
                          style={{ width: 60 }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1.25,
                          justifyContent: "center",
                          paddingLeft: 5,
                        }}
                      >
                        <Text
                          style={[
                            styles.servicetitle,
                            { textAlignVertical: "center" },
                          ]}
                        >
                          {a.Name}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.ratesCon}>
                      <Text style={styles.rate}>
                        {a.rate} {""}
                        <Text
                          style={{
                            fontFamily: fonts.semibold,
                          }}
                        >
                          PKR
                        </Text>
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </Content>
        <View style={{ width: "95%", alignSelf: "center", marginBottom: 20 }}>
          <SignInButton
            disabled={this.state.select ? false : true}
            text={"Compare"}
            navigation={this.props.navigation}
            link={"Table"}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bgSpirals: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  mainCon: {
    width: "95%",
  },
  logoCon: {
    width: 175,
    height: 175,
    alignSelf: "center",
  },
  buttonCon: {
    width: "100%",
    marginTop: 55,
    alignItems: "center",
  },
  bottomText: { fontFamily: fonts.regular, fontSize: 13.75 },
  bottomRows: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bottompart: {
    width: "95%",
    position: "absolute",
    bottom: 35,
  },
  crossbutton: {
    width: "100%",

    // marginTop: 50,
  },
  compareBoxesMainCon: {
    width: "100%",
    height: 300,
    backgroundColor: "white",
    paddingHorizontal: "3.5%",
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 19.5,
    color: "#252525",
  },
  button: { flex: 1, flexDirection: "row" },
  buttonMainCon: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  selectablebutton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderColor: "#252525",
  },
  serviceCon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  servicetitle: {
    fontFamily: fonts.regular,
    color: "#252525",
    fontSize: 15,
    marginLeft: 10,
  },
  ratesCon: {
    flex: 0.45,
    //   borderWidth: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  rate: {
    fontSize: 17,
    color: "#252525",
    fontFamily: fonts.regular,
  },
});
