import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  ImageBackground,
  Platform,
  Modal,
} from "react-native";
import {
  Container,
  Button,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
} from "native-base";
import { BgSpiral, Logo, ManCashPic, AUDFlag, currency } from "../../../assets";
import { Icons, HeaderCircle, CircleAnimation } from "../../components";
import { fonts, shadow } from "../../theme";
import { Avatar, Overlay } from "react-native-elements";
import { TextInput, ActivityIndicator } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import CountryPicker from "react-native-country-picker-modal";

import Swiper from "react-native-swiper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import instance from "../../components/constants/instance";
// import { TouchableOpacity } from "react-native-gesture-handler";

// import CircleTransition from 'react-native-circle-reveal-view'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionY: new Animated.Value(0),
      news: false,
      opened: false,
    };
    instance.home = this;
  }

  componentWillMount() {
    let country_selected = false;
    if (this.props.countries) {
      country_selected = this.props.country_selected
        ? this.props.country_selected
        : this.props.countries[2];
      console.log('country_selected=>>', country_selected)
      this.props.selectFlag(country_selected);
    }
    this.props.getNews(this);
    //
  }

  shouldComponentUpdate() {
    return true;
  }

  header = () => {
    const valueY = this.state.positionY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 65], // <-- Add this
    });

    let country_selected = false;
    if (this.props.countries) {
      country_selected = this.props.country_selected
        ? this.props.country_selected
        : this.props.countries[2];
    }

    const selectedFlag = this.props.country_selected
      ? this.props.country_selected
      : this.props.countries[2];
    let flags = [];
    let selectedIndex = 0;
    this.props.countries.forEach((item, index) => {
      if (selectedFlag.currency_code === item.currency_code) {
        selectedIndex = index;
      }
      flags.push(item);
    });
    let thirdItem = flags[1];
    flags[1] = selectedFlag;
    flags[selectedIndex] = thirdItem;
    console.log('country_selected=>', country_selected);
    return (
      <View>
        <Header
          style={{
            backgroundColor: "#f1f1f1",
            borderBottomColor: "#f1f1f1",
          }}
        >
          <Left style={{ padding: 5 }}>
            <Animated.View
              style={{
                transform: [{ translateY: valueY }],
                backgroundColor: "#f1f1f1",
                // elevation: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showWheel: true, });
                  // this.setState({ showWheel: true, opened: true }, () => {
                  //   this.transitedView.expand();
                  // })
                }}
              >
                {this.state.showWheel && <CountryPicker
                  withFlag
                  withFilter
                  ref={(ref) => (this.countryPicker = ref)}
                  visible={this.state.showWheel}
                  withEmoji
                  onSelect={(country) => {
                    this.setState({
                      selecting_flag: country.name,
                      showWheel: false,
                    });
                    this.props.selectFlag({
                      currency_code: country.currency[0],
                      country_flag: `http://www.geognos.com/api/en/countries/flag/${country.cca2}.png`
                    })
                  }}
                />}
                <Avatar
                  source={{ uri: country_selected ? country_selected.country_flag : "" }}
                  rounded
                  size={45}
                />
                {!country_selected && (
                  <ActivityIndicator
                    size={"small"}
                    color="lightgray"
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      top: 15,
                    }}
                  />
                )}
                <Animated.View
                  style={{
                    opacity: this.state.positionY,
                    position: "absolute",
                    right: -20,
                    top: 15,
                  }}
                >
                  <Icons.AntDesign name="caretright" size={20} />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          </Left>
          <Body style={{ flex: 3, alignItems: "center" }}>
            <Title style={{ color: "black" }}>
              {this.state.showWheel ? "" : "Dashboard"}
            </Title>
          </Body>
          <Right>
            {/* <TouchableOpacity>
              <Icons.MaterialIcons name="search" color="red" size={30} />
            </TouchableOpacity> */}
          </Right>
        </Header>

        {this.state.showWheel && (
          // <Modal visible={true}>
          <View
            style={{
              position: "absolute",
              width: wp("100%"),
              height: hp("100%"),
              // width: 500,
              // height: 500,
              // backgroundColor: "green",
            }}
          >
            <CircleAnimation
              closePanel={() => {
                this.transitedView.collapse();
                this.animatedHeading.slideOutUp(500);
                setTimeout(() => {
                  if (this.state.selecting_flag) {
                    this.props.selectFlag(this.state.selecting_flag);
                  }
                }, 300);
                setTimeout(() => {
                  this.setState({
                    showWheel: false,
                    showIcon: false,
                    opened: false,
                  });
                }, 500);
              }}
              selectedFlag={this.props.country_selected}
              ref={(ref) => (this.transitedView = ref)}
              backgroundColor={"rgba(255,255,255,.8)"}
              duration={500}
              style={{
                position: "absolute",
                bottom: 48,
                right: 0,
                left: 0,
                top: 0,
                height: 10000,
                width: "100%",
                // backgroundColor: "purple",
                // zIndex: 10,
                // elevation: 20,
              }}
              revealPositionArray={{ left: true }} // must use less than two combination e.g bottom and left or top right or right
            >
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  left: -57,
                  zIndex: 10,
                  elevation: 10,
                  flex: 1,
                  // width: "100%",
                  width: 210,
                  height: 400,
                  // backgroundColor: "yellow",
                }}
              >
                <View
                  style={[
                    {
                      width: 400,
                      height: 400,
                      backgroundColor: "white",
                      position: "absolute",
                      borderRadius: 200,
                      opacity: 1,
                      left: -200,
                    },
                    shadow.shadow,
                  ]}
                ></View>
                {/* <TouchableOpacity
                    onPress={() => alert("Hello world")}
                    style={{
                      width: 200,
                      height: 500,
                      borderWidth: 1,
                      backgroundColor: "red",
                    }}
                  > */}
                <HeaderCircle
                  // size={200}
                  contentContainerStyle={{
                    alignSelf: "center",
                    position: "absolute",
                    top: 10,
                    width: "100%",
                    zIndex: 10,
                    elevation: 15,
                    left: -100,
                  }}
                  blurredView={{
                    tint: "light",
                    intensity: 100,
                  }}
                  items={flags}
                  onAction={(actions) => {
                    this.setState({
                      selecting_flag: flags[actions],
                    });
                  }}
                  selectFlag={(flag) => {
                    console.log(flag);
                    this.hideSelector();
                    this.props.selectFlag(flag);
                    console.log("SELECT FLAG", flag);
                  }}
                />
                {/* </TouchableOpacity> */}
              </View>
            </CircleAnimation>
            <Animatable.View
              ref={(ref) => (this.animatedHeading = ref)}
              animation="slideInLeft"
            >
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  position: "absolute",
                  textAlign: "center",
                  alignSelf: "center",
                  // top: 50,
                  top: Platform.OS === "ios" ? 50 : 15,
                  fontSize: 15,
                }}
              >
                {this.state.selecting_flag
                  ? this.state.selecting_flag.currency_name
                  : this.props.country_selected
                    ? this.props.country_selected.currency_name
                    : country_selected.currency_name}
              </Text>
            </Animatable.View>
          </View>
          // </Modal>
        )}

        {/* {this.state.showIcon &&
        <Animated.View style={{position:"absolute",top:42,left:10,opacity:.6,zIndex:100000000}}>
          <Avatar source={{uri:country_selected ? country_selected.country_flag: ""}} rounded size={45} />
        </Animated.View>
      } */}
      </View>
    );
  };

  animateIcons = () => {
    Animated.timing(this.state.positionY, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
      // useNativeDriver: true // <-- Add this
    }).start(() => {
      this.setState({
        flags: true,
      });
    });
  };

  reanimateBack = () => {
    this.setState({
      flags: false,
    });
    Animated.timing(this.state.positionY, {
      toValue: 0,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
      // useNativeDriver: true // <-- Add this
    }).start(() => { });
  };

  render() {
    const valueY = this.state.positionY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 65], // <-- Add this
    });

    console.log("HOME PROPS", this.props.user);

    return (
      <Container style={{ backgroundColor: "#f1f1f1", paddingBottom: 30 }}>
        <View style={{ zIndex: 10000 }}>{this.header()}</View>

        {this.state.flags && (
          <View style={styles.topPanel}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {this.props.countries &&
                this.props.countries.map((country, index) => {
                  return (
                    <Animatable.View
                      key={index}
                      animation="slideInLeft"
                      style={{
                        marginHorizontal: 3,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.props.selectFlag(country);
                          this.reanimateBack();
                          // this.setState({ opened: false });
                        }}
                      >
                        <Avatar
                          source={{ uri: country.country_flag }}
                          rounded
                          size={50}
                        />
                      </TouchableOpacity>
                    </Animatable.View>
                  );
                })}
            </ScrollView>
          </View>
        )}
        <View
          pointerEvents={this.state.opened ? "none" : "auto"}
          style={{ flex: 1 }}
        >
          <ImageBackground
            resizeMode="cover"
            source={BgSpiral}
            style={styles.bgSpirals}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingBottom: 115,
                  zIndex: -10000,
                  elevation: -10000,
                }}
              >
                <Animated.View
                  style={[
                    styles.mainContainer,
                    { transform: [{ translateY: valueY }] },
                  ]}
                >
                  {this.welcomePanel()}
                  {this.currencyRates()}
                  {this.state.news && this.news()}
                </Animated.View>
              </ScrollView>
            </ScrollView>
          </ImageBackground>
        </View>
      </Container>
    );
  }

  welcomePanel = () => {
    const { user } = this.props;
    return (
      <View style={{ width: "100%" }}>
        {/* 1st Section */}
        <Text style={[styles.welcomeText, { marginTop: 30, marginBottom: 15 }]}>
          Welcome,{"\n"}
          <Text style={{ color: "#252525", fontFamily: fonts.semibold }}>
            {user && user.firstName + " " + user.lastName}
          </Text>
        </Text>
        <TouchableOpacity style={[shadow.shadow, styles.cart]}>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: 17,
              color: "#252525",
            }}
          >
            Transfer your first{"\n"}remittance
          </Text>
          <Image
            style={styles.cartimage}
            resizeMode="contain"
            source={ManCashPic}
          />
        </TouchableOpacity>
      </View>
    );
  };

  currencyRates = () => {
    return (
      <View style={{ width: "100%" }}>
        {/* 2nd Section */}
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: "row",
            marginTop: 30,
            paddingBottom: 5,
          }}
        >
          <Text
            style={[
              styles.welcomeText,

              {
                color: "#252525",
                //   marginBottom: 10,
                //   borderWidth: 1,
                fontFamily: fonts.semibold,
              },
            ]}
          >
            Currency Rates
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("LiveRates")}
          >
            <Text
              style={{
                fontFamily: fonts.regular,
                color: "#E8041D",
              }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {!this.props.countries && (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 40 }}
            color="lightgray"
          />
        )}

        {this.props.countries && (
          <View style={[shadow.shadow, styles.ratesMainCon]}>
            {this.props.countries &&
              this.props.countries.map((country, index) => {
                console.log('country.base_currency=>', country.base_currency)
                if (index >= 3) {
                  return null;
                }
                return (
                  <View style={styles.flagnNameCon}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center", }}
                    >
                      <Avatar
                        rounded
                        size={40}
                        source={{ uri: country.country_flag }}
                      />
                      <Text style={styles.countryName} numberOfLines={1}>
                        {country.currency_name}
                      </Text>
                    </View>
                    <Text style={styles.rates}>
                      {Number(country.currency_values).toFixed(3)}
                      <Text style={{ fontFamily: fonts.semibold }}>
                        {country.base_currency}
                      </Text>
                    </Text>
                  </View>
                );
              })}
          </View>
        )}
      </View>
    );
  };

  news = () => {
    return (
      <View style={{ width: "100%" }}>
        {/* 2nd Section */}
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: "row",
            marginTop: 30,
            paddingBottom: 5,
          }}
        >
          <Text
            style={[
              styles.welcomeText,

              {
                color: "#252525",
                fontFamily: fonts.semibold,
              },
            ]}
          >
            News
          </Text>
        </View>

        <Swiper
          activeDotStyle={{ top: 16 }}
          dotStyle={{ top: 16 }}
          style={styles.wrapper}
          showsButtons={false}
        >
          {this.state.news &&
            this.state.news.map((news, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("NewsDetails", {
                      news: news,
                    })
                  }
                  key={index}
                  style={[shadow.shadow, styles.ratesMainCon]}
                >
                  <Image
                    source={currency}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      opacity: 0.5,
                    }}
                    resizeMode="cover"
                  />
                  <Text style={styles.newsHeading}>{news.heading}</Text>
                  <Text numberOfLines={4} style={styles.textCard}>
                    {news.news}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </Swiper>
      </View>
    );
  };
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectFlag, getCountries } from "../../redux/actions/flags";
import { getNews } from "../../redux/actions/news";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    countries: state.auth.countries,
    country_selected: state.auth.country_selected,
  };
};
const mapActionsToProps = (dispatch) => ({
  selectFlag: bindActionCreators(selectFlag, dispatch),
  getNews: bindActionCreators(getNews, dispatch),
  getCountries: bindActionCreators(getCountries, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Home);

const styles = StyleSheet.create({
  wrapper: { height: 240 },
  textCard: { fontSize: 16, marginTop: 12 },
  newsHeading: { fontSize: 20, fontFamily: fonts.semibold, marginTop: 15 },
  topPanel: {
    width: "80%",
    height: 80,
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignSelf: "flex-end",
    position: "absolute",
    top: 90,
    zIndex: 1000,
    backgroundColor: "#f1f1f1",
  },

  bgSpirals: {
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    width: "95%",
    flex: 1,
  },

  welcomeText: {
    fontSize: 22,
    fontFamily: fonts.regular,
    color: "#252525",
  },
  cart: {
    width: "100%",
    height: 160,
    padding: 18,
    borderRadius: 5,
    backgroundColor: "white",
  },
  cartimage: {
    //   borderWidth: 1,
    width: 220,
    height: 125,
    position: "absolute",
    right: 0,
    bottom: 20,
  },
  countryName: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: "#252525",
    marginLeft: 20,
  },
  flagnNameCon: {
    borderColor: "lightgray",
    borderBottomWidth: 0.2,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rates: {
    fontFamily: fonts.regular,
    fontSize: 16.5,
    color: "#252525",
  },
  ratesMainCon: {
    width: "100%",
    height: 230,
    // padding: 12,p'
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: 10,
  },
});
