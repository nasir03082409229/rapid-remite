import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Container, Button, Content } from "native-base";
import { BgSpiral, Logo } from "../../../assets";
import { SignInButton } from "../../components";
import { fonts } from "../../theme";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Image resizeMode="cover" source={BgSpiral} style={styles.bgSpirals} />
        <Content
          bounces={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View style={styles.mainCon}>
            <View style={styles.logoCon}>
              <Image
                source={Logo}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View style={styles.buttonCon}>
              <SignInButton
                link={"SignUp"}
                navigation={this.props.navigation}
              />
              <Button
                onPress={() => this.props.navigation.navigate("Login")}
                transparent
                style={{ marginTop: 10 }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 15 }}>
                  Already have an account?
                </Text>
              </Button>
            </View>
          </View>
          <View style={styles.bottompart}>
            <View style={styles.bottomRows}>
              <Text style={[styles.bottomText]}>
                By signing up, you agree with the {""}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("TermsConditions")
                }
              >
                <Text
                  style={[
                    styles.bottomText,
                    { textDecorationLine: "underline", color: "#E8041D" },
                  ]}
                >
                  Terms of Services
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomRows}>
              <Text style={styles.bottomText}> and </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
              >
                <Text
                  style={[
                    styles.bottomText,

                    {
                      textDecorationLine: "underline",
                      color: "#E8041D",
                      // alignSelf: 'center',
                    },
                  ]}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
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
});
