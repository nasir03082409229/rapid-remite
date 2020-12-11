import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Linking, Platform
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
import { SignInButton, Icons, Header } from "../../components";
import { fonts, shadow } from "../../theme";
import Image from "react-native-fast-image";
import FoldView from "react-native-foldview";

export default class CompareRateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceproviders: [],
      selected_partner: [],
      selector_animated: new Animated.Value(0),
      height_animated: new Animated.Value(0),
      foldview: false,
      expand: false,
    };
  }
  expand = () => {
    this.state.expand ? this.decreaseHeight() : this.increaseHeight();
  };

  showSelector = () => {
    Animated.timing(this.state.selector_animated, {
      useNativeDriver: false,
      toValue: 1,
      duration: 200,
    }).start(() => {
      this.state.compare = true;
    });
  };

  hideSelector = () => {
    Animated.timing(this.state.selector_animated, {
      useNativeDriver: false,
      toValue: 0,
      duration: 200,
    }).start(() => {
      this.state.compare = false;
    });
  };

  shouldComponentUpdate(nextProps) {
    console.log("shouldComponentUpdate", nextProps);
    if (nextProps.compare !== this.props.compare) {
      if (nextProps.compare) {
        this.showSelector();
      } else {
        this.hideSelector();
      }
    }

    if (nextProps.selected !== this.state.selected) {
      this.setState({
        selected: nextProps.selected,
      });
    }

    return true;
  }

  renderFrontface() {
    return (
      <View
        style={{ width: "100%", height: 0, backgroundColor: "purple" }}
      ></View>
    );
  }

  renderBackface() {
    /**
     * You can nest <FoldView>s here to achieve the folding effect shown in the GIF above.
     * A reference implementation can be found in examples/Simple.
     */
    return (
      <View
        style={{ width: "100%", height: 150, backgroundColor: "green" }}
      ></View>
    );
  }

  increaseHeight = () => {
    Animated.timing(this.state.height_animated, {
      useNativeDriver: false,
      toValue: 1,
      duration: 200,
    }).start(() => {
      this.setState({
        expand: true,
      });
    });
  };

  decreaseHeight = () => {
    Animated.timing(this.state.height_animated, {
      useNativeDriver: false,
      toValue: 0,
      duration: 200,
    }).start(() => {
      this.setState({
        expand: false,
      });
    });
  };

  isExist = (id) => {
    const found = this.props.selected_partner.find(
      (element) => element.partner_id === id
    );
    console.log("isExist", found);
    if (found) {
      return true;
    }

    return false;
  };

  render() {
    const { item } = this.props;

    console.log("PROPS ITEMS", item);

    const compare_inter = this.state.selector_animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 40],
      easing: Easing.cubic,
    });

    const drop_inter = this.state.selector_animated.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 0],
      easing: Easing.cubic,
    });

    const height_inter = this.state.height_animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300],
      easing: Easing.linear,
    });

    const dim = this.state.selected && this.props.isFull;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.compare ? this.props.selectPartner(item) : this.expand()
          }
          style={{ flexDirection: "row", height: 90 }}
        >
          <Animated.View
            style={{
              width: compare_inter,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scaleX: 1 }],
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.selectPartner(item);
              }}
              style={[
                styles.selectablebutton,
                {
                  borderWidth: this.state.selected ? 0 : 3,
                  backgroundColor: this.state.selected ? "#E8041D" : "white",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 1,
                },
              ]}
            >
              <Icons.MaterialCommunityIcons
                name="check-bold"
                color="white"
                size={15}
              />
            </TouchableOpacity>
          </Animated.View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              transform: [{ scaleX: 1 }],
              paddingHorizontal: 5,
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                source={{
                  uri: item.partner_details && item.partner_details[0].img,
                }}
                resizeMode="contain"
                style={{ width: 80, height: 60 }}
                size={60}
              />
            </View>
            <View
              style={{
                flex: 1.6,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={[styles.servicetitle]}>
                {(item.partner_name + "").toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                flex: 0.9,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.rate}>
                {item.amount_recievable.length > 0 &&
                  item.amount_recievable.toFixed(0)}{" "}
                <Text
                  style={{
                    fontFamily: fonts.semibold,
                  }}
                >
                  {item.country_name}
                </Text>
              </Text>
            </View>
          </View>
          <Animated.View
            style={{
              width: drop_inter,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ scaleX: 1 }],
            }}
          >
            <Icons.MaterialIcons
              name="keyboard-arrow-down"
              size={40}
              color="#E8041D"
            />
          </Animated.View>
        </TouchableOpacity>
        <Animated.View
          style={{
            width: "100%",
            height: height_inter,
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <View style={styles.expandContainer}>
            {this.expandLine(
              "Amount Recievable",
              item.amount_recievable.toFixed(3),
              ' ' + item.country_name
            )}
            {this.expandLine("Transfer Time", item.transfer_time, "")}
            {this.expandLine(
              "Receiving Fee",
              item.payment_fees.toFixed(3),
              ' ' + item.base_currency
            )}
            {this.expandLine(
              "Rate",
              item.rate,
              ' ' + item.base_currency
            )}
            {this.expandLine(
              "Service fee",
              item.tax_deducted,
              ' ' + item.base_currency
            )}
            {this.expandLine(
              "Location",
              <Icons.MaterialIcons
                onPress={() => {
                  const { location } = item;
                  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                  const latLng = `${location['0'].location.coordinates[0]},${location['0'].location.coordinates[1]}`;
                  const url = Platform.select({
                    ios: `${scheme}@${latLng}`,
                    android: `${scheme}${latLng}`
                  });
                  Linking.openURL(url);
                  console.log(url)
                }}
                name="location-on"
                size={30}
                color="#E8041D"
              />
            )}
          </View>
        </Animated.View>
        {!this.props.last && <View style={styles.borderBottom}></View>}
      </View>
    );
  }

  expandLine = (heading, amount, currency) => {
    return (
      <View style={styles.expandRow}>
        <Text style={styles.expandhead}>{heading}</Text>
        <View
          style={{
            width: "46%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.expandhead}>{amount}</Text>
          <Text
            style={[styles.expandhead, { fontFamily: fonts.popins_semibold }]}
          >
            {currency}
          </Text>
        </View>
      </View>
    );
  };
}

// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Avatar } from "react-native-elements";
// // import { selectFlag } from "../../redux/actions/flags";
// // import { getNews } from "../../redux/actions/news";
// // import { getPatnerRates } from "../../redux/actions/comparison";
// // import { getConversion } from "../../redux/actions/calculator";

// const mapStateToProps = (state) => {
//   return {
//     countries: state.auth.countries,
//     country_selected: state.auth.country_selected,
//     results: state.auth.partners_results,
//   };
// };
// const mapActionsToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapActionsToProps)(CompareRateItem);

const styles = StyleSheet.create({
  expandhead: { fontSize: 16, fontFamily: fonts.regular },
  expandRow: {
    height: 50,
    borderBottomWidth: 0.3,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "lightgray",
    justifyContent: "space-between",
  },
  expandContainer: {
    width: "100%",
    height: 150,
    // borderWidth: 1,
    paddingHorizontal: 10,
  },
  borderBottom: {
    width: "95%",
    height: 1,
    backgroundColor: "lightgray",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    opacity: 0.6,
  },
  container: {
    width: "100%",
    minHeight: 90,
    backgroundColor: "white",
    // flexDirection: "row",
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
  servicetitle: {
    fontFamily: fonts.regular,
    color: "#252525",
    fontSize: 16,
  },
  rate: {
    fontSize: 17,
    color: "#252525",
    fontFamily: fonts.regular,
  },
});
