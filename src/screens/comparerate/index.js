import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Container, Button, Content } from "native-base";
import {
  BgSpiral,
  Logo,
  Westren,
  MoneyGram,
  Ria,
  Xpress,
} from "../../../assets";
import { SignInButton, Icons, Header, CompareItem } from "../../components";
import { fonts, shadow } from "../../theme";
import Image from "react-native-fast-image";

class CompareRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceproviders: [
        { Name: "Western Union", img: Westren, rate: "44.34" },
        { Name: "Money Gram", img: MoneyGram, rate: "44.50", width: 45 },
        { Name: "XPRESS Money", img: Ria, rate: "44.34" },
        { Name: "Ria Money Transfer", img: Xpress, rate: "42.10" },
      ],
      selected_partner: [],
    };
  }
  startCompare = () => {
    this.setState({ compare: !this.state.compare });
  };

  selectPartner = (partner) => {
    const found = this.state.selected_partner.findIndex(
      (element) => element.partner_id === partner.partner_id
    );

    if (found !== -1) {
      this.state.selected_partner.splice(found, 1);
      this.setState({
        selected_partner: this.state.selected_partner,
      });
      return;
    }

    if (this.state.selected_partner.length === 2) {
      alert("You can not add more than two partners");
      return;
    }

    this.state.selected_partner.push(partner);

    this.setState({
      selected_partner: this.state.selected_partner,
    });
  };

  isExist = (id) => {
    const found = this.state.selected_partner.find(
      (element) => element.partner_id === id
    );
    console.log("isExist", found);
    if (found) {
      return true;
    }

    return false;
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <Image resizeMode="cover" source={BgSpiral} style={styles.bgSpirals} />
        <Header
          back
          compare
          navigation={this.props.navigation}
          startCompare={this.startCompare}
          show_compare={this.state.compare}
        />
        <Content
          contentContainerStyle={{
            justifyContent: "space-between",
            paddingBottom: 30,
          }}
        >
          <View style={styles.crossbutton}>
            <View
              style={{
                marginHorizontal: "7%",
                marginBottom: 40,
                marginTop: 20,
              }}
            >
              <Text style={styles.title}>
                We’ve found the best
                {"\n"}
                conversion rates for you
              </Text>
            </View>

            {this.props.results &&
              this.props.results.map((a, index) => {
                return (
                  <CompareItem
                    selectPartner={this.selectPartner}
                    selected={this.isExist(a.partner_id)}
                    key={index}
                    last={this.props.results.length - 1 === index}
                    compare={this.state.compare}
                    isFull={this.state.selected_partner.length > 1}
                    item={a}
                  />
                );
              })}
          </View>
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              marginBottom: 20,
              marginTop: 30,
            }}
          >
            <SignInButton
              disabled={this.state.selected_partner.length > 1 ? false : true}
              text={"Compare"}
              navigation={this.props.navigation}
              // link={"Table"}
              onPress={() => {
                this.props.navigation.navigate("Table", {
                  selected_partner: this.state.selected_partner,
                });
              }}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Avatar } from "react-native-elements";
// import { selectFlag } from "../../redux/actions/flags";
// import { getNews } from "../../redux/actions/news";
// import { getPatnerRates } from "../../redux/actions/comparison";
// import { getConversion } from "../../redux/actions/calculator";

const mapStateToProps = (state) => {
  return {
    countries: state.auth.countries,
    country_selected: state.auth.country_selected,
    results: state.auth.partners_results,
  };
};
const mapActionsToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapActionsToProps)(CompareRate);

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
    // height:
    // paddingHorizontal: "3.5%",
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 19.5,
    color: "#252525",
  },
  button: { flex: 1, flexDirection: "row", minHeight: 80 },
  buttonMainCon: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  selectablebutton: {
    borderRadius: 20,
    borderColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    marginRight: 10,
  },
  selectedbutton: {
    borderRadius: 20,
    borderColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceCon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  servicetitle: {
    fontFamily: fonts.regular,
    color: "#252525",
    fontSize: 14,
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
