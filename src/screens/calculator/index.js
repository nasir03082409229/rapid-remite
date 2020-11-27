import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Container, Button, Content } from "native-base";
import { BgSpiral, Logo, UAEFlag } from "../../../assets";
import { SignInButton, Header, Icons } from "../../components";
import { fonts, shadow } from "../../theme";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { Avatar } from "react-native-elements";
import AnimatedField from "./animatedField";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from_currency: false,
      to_currency: false,
      from_amount: 0,
      to_amount: 0,
      amount: 0,
      loading: false,
      rate: false,
    };
  }

  changeCurrency = (currency, key) => {
    this.setState(
      {
        [key]: currency,
      },
      () => {
        this.checkRates();
      }
    );
  };

  changeAmount = (amount, key) => {
    this.setState(
      {
        [key]: amount,
      },
      () => {
        this.checkRates();
      }
    );
  };

  checkRates = () => {
    if (
      this.state.from_currency &&
      this.state.from_amount !== 0 &&
      this.state.to_currency
    ) {
      this.props.getConversion(
        this,
        this.state.from_currency.currency_code,
        this.state.to_currency.currency_code,
        this.state.from_amount
      );
    }
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <ImageBackground
          resizeMode="cover"
          source={BgSpiral}
          style={styles.bgSpirals}
        >
          <Header heading={"Calculator"} />
          <Content>
            <View style={styles.headingCon}>
              <Text style={styles.heading}>Currency Converter</Text>
              {this.state.loading && (
                <ActivityIndicator
                  color="red"
                  size="small"
                  style={{ position: "absolute", right: 15 }}
                />
              )}
            </View>
            <View style={[styles.calculatorMainCon, shadow.shadow]}>
              <AnimatedField
                changeAmount={(amount) =>
                  this.changeAmount(amount, "from_amount")
                }
                onChangeCurrency={(currency) =>
                  this.changeCurrency(currency, "from_currency")
                }
                label={"Currency I have"}
                initialFlag={0}
                data={this.props.countries}
              />

              <AnimatedField
                changeAmount={(amount) =>
                  this.changeAmount(amount, "to_amount")
                }
                onChangeCurrency={(currency) =>
                  this.changeCurrency(currency, "to_currency")
                }
                value={this.state.value ? this.state.value.toFixed(10) : "0"}
                disabled={true}
                label={"Currency I Want"}
                initialFlag={1}
                data={this.props.countries}
              />

              {this.state.rate !== false && (
                <View
                  style={{
                    width: "98%",
                    height: 50,
                    borderTopWidth: 0.3,
                    borderColor: "gray",
                    top: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontFamily: fonts.light, fontSize: 18 }}>
                    {this.state.amount_check + " "}
                    <Text style={{ fontFamily: fonts.medium, fontSize: 18 }}>
                      {this.state.base}{" "}
                    </Text>
                    <Text>
                      = {this.state.value.toFixed(3)}{" "}
                      <Text style={{ fontFamily: fonts.medium }}>
                        {this.state.to}{" "}
                      </Text>
                    </Text>
                  </Text>
                </View>
              )}
            </View>

            <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
              {this.state.base && (
                <Text
                  style={{
                    fontFamily: fonts.semibold,
                    fontSize: 15,
                    color: "#252525",
                  }}
                >
                  Rate Details
                </Text>
              )}
              {this.state.base && (
                <Text
                  style={{
                    color: "#252525",
                    fontFamily: fonts.light,
                    fontSize: 16,
                    marginTop: 5,
                  }}
                >
                  {"1.00 " +
                    this.state.base +
                    " = " +
                    this.state.rate.toFixed(3)}
                </Text>
              )}
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
import { getConversion } from "../../redux/actions/calculator";

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
});

export default connect(mapStateToProps, mapActionsToProps)(Calculator);

const styles = StyleSheet.create({
  bgSpirals: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  heading: {
    fontFamily: fonts.semibold,
    fontSize: 22,
    color: "#252525",
  },
  headingCon: {
    alignSelf: "center",
    width: "95%",
    marginTop: 40,
  },
  calculatorMainCon: {
    width: "100%",
    minHeight: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginTop: 20,
    paddingBottom: 30,
  },
  countryButton: {
    width: "40%",
    height: "90%",
    position: "absolute",
    right: 0,
    backgroundColor: "#E8041D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomEndRadius: 4,
    borderTopEndRadius: 4,
  },
  textInput: {
    height: 55,
    fontSize: 15,
    fontFamily: fonts.light,
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
  },
  con: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    alignItems: "flex-end",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
