import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Container, Content } from "native-base";
import { Header, Icons, SignInButton, CountryPicker } from "../../components";
import { UAEFlag, BgSpiral } from "../../../assets";
import { fonts } from "../../../src/theme";
import { TextInput, ActivityIndicator } from "react-native-paper";
// import AnimatedField from "../calculator/animatedField";

class Remittance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country_of_origin: "AED",
      textinput: [
        {
          title: "Country of Origin",
          arrowdown: true,
          value: "United Arab Emirates",
          disabled: true,
        },
        { title: "You send exactly", key: "amount", redbar: true, field: true },
        // { title: "To Country", key: "to_country" },
        {
          title: "Receive Currency In",
          key: "recieve_currency",
          type: "currency",
        },
      ],
    };
  }
  getBestRates = () => {
    console.log("FORM DATA", this.state);
    this.props.getPatnerRates(
      this,
      this.state.country_of_origin,
      this.state.recieve_currency,
      this.state.amount
    );
  };
  onChangeCurrency = (currency, key) => {
    this.setState({
      [key]: currency,
    });
  };
  validateForm = () => {
    if (
      this.state.recieve_currency &&
      this.state.recieve_currency &&
      this.state.amount
    ) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <Header heading={"Remittance"} />
        <ImageBackground
          resizeMode="cover"
          source={BgSpiral}
          style={styles.bgSpirals}
        >
          <Content
            contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
            bounces={false}
          >
            <View style={styles.container}>
              <View style={{ width: "95%" }}>
                <Text style={styles.title}>Share remit details</Text>
                {this.state.textinput.map((a, index) => {
                  return (
                    <View
                      style={{
                        width: "97%",
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                    >
                      {a.field ? (
                        <TextInput
                          keyboardType="numeric"
                          value={
                            Platform.OS === "android" && this.state.character
                          }
                          returnKeyType="done"
                          onChangeText={(text) => {
                            this.setState({
                              amount: text,
                              character: text.replace(
                                /[- #*;,.<>\{\}\[\]\\\/]/gi,
                                ""
                              ),
                            });
                          }}
                          mode="outlined"
                          style={styles.textinput}
                          theme={{
                            colors: {
                              primary: "#979797",
                            },
                          }}
                          selectionColor="#008784"
                          placeholder={a.title}
                        />
                      ) : (
                          <CountryPicker
                            arrowdown={
                              a.arrowdown && a.arrowdown ? a.arrowdown : false
                            }
                            showflag={a.type ? true : false}
                            label={a.title}
                            showSelected={!a.value}
                            initialFlag={0}
                            type={a.type ? a.type : "country"}
                            disabled={a.disabled ? true : false}
                            data={this.props.countries}
                            value={a.value ? a.value : " "}
                            onChangeCurrency={(currency) =>
                              this.onChangeCurrency(currency, a.key)
                            }
                          />
                        )}
                      {a.redbar && (
                        <View style={styles.redbar}>
                          <Image
                            source={UAEFlag}
                            resizeMode="contain"
                            style={{ width: 27, height: "100%" }}
                          />
                          <Text
                            style={{
                              fontFamily: fonts.semibold,
                              color: "white",
                              fontSize: 18,
                              marginLeft: 10,
                            }}
                          >
                            AED
                          </Text>
                          {/* <Icons.MaterialIcons
                            name="keyboard-arrow-down"
                            size={35}
                            color="white"
                          /> */}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            <View
              style={{
                marginTop: 35,
                width: "95%",
                alignSelf: "center",
                marginBottom: 70,
              }}
            >
              <SignInButton
                text={"Find the best rates"}
                navigation={this.props.navigation}
                disabled={!this.validateForm()}
                onPress={() => this.getBestRates()}
                loading={this.state.loading}
              />
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectFlag } from "../../redux/actions/flags";
import { getNews } from "../../redux/actions/news";
import { getPatnerRates } from "../../redux/actions/comparison";
import { getConversion } from "../../redux/actions/calculator";
import { Platform } from "react-native";

const mapStateToProps = (state) => {
  return {
    countries: state.auth.countries,
    country_selected: state.auth.country_selected,
  };
};
const mapActionsToProps = (dispatch) => ({
  selectFlag: bindActionCreators(selectFlag, dispatch),
  getNews: bindActionCreators(getNews, dispatch),
  getConversion: bindActionCreators(getConversion, dispatch),
  getPatnerRates: bindActionCreators(getPatnerRates, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Remittance);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 75,
  },
  title: {
    fontFamily: fonts.semibold,
    color: "#252525",
    fontSize: 22,
  },
  redbar: {
    position: "absolute",
    width: "40%",
    height: 58,
    backgroundColor: "#E8041D",
    bottom: 0,
    right: 0,
    borderTopEndRadius: 4.5,
    borderBottomEndRadius: 4.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textinput: {
    height: 55,
    fontSize: 15,
    fontFamily: fonts.light,
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
  },
  bgSpirals: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});
