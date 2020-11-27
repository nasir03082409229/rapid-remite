import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  TouchableHighlight,
  Animated,
  Easing,
} from "react-native";
import { Container, Button, Content } from "native-base";
import { BgSpiral, Westren, Xpress } from "../../../assets";
import { SignInButton, Header, Icons } from "../../components";
import { Circle } from "../../components/circle";

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
import { TextInput } from "react-native-paper";
import { Avatar } from "react-native-elements";

import * as Animatable from "react-native-animatable";

const icons = [
  {
    name: "globe",
    color: "#009BFF",
  },
  {
    name: "pencil",
    color: "#9BFF00",
  },
  {
    name: "home",
    color: "#FF009B",
  },
  {
    name: "rocket",
    color: "#FF9B00",
  },
  {
    name: "bluetooth",
    color: "#9B00FF",
  },
  {
    name: "car",
    color: "#00FF9B",
  },
];

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectFlag: false,
      showPanel: new Animated.Value(0),
    };
  }

  _renderItem = ({ item }) => (
    <View style={{ width: 100, height: 100, borderWidth: 1 }} />
  );

  _keyExtractor = (item) => item.id;

  hideSelector = () => {
    this.setState({
      selectFlag: false,
    });
    this.closeRing();
    // this.selectorRing.slideOutDown().then(()=>{

    //     // this.setState({
    //     //     selectFlag:false
    //     // })
    // })
  };

  openRing = () => {
    Animated.timing(this.state.showPanel, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        selectFlag: true,
      });
    });
  };

  closeRing = () => {
    Animated.timing(this.state.showPanel, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        selectFlag: false,
      });
    });
  };

  render() {
    const marginTopY = this.state.showPanel.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
      easing: Easing.linear,
    });

    return (
      <Container style={{ backgroundColor: "white" }}>
        <Header back={false} heading={"Live Rate"} bgHeader={"f1f1f1"} />
        <View style={styles.con}>
          {this.props.countries && this.state.selectFlag && (
            <Animatable.View
              ref={(ref) => (this.selectorRing = ref)}
              animation="slideInUp"
              style={{ width: "100%", height: 200, overflow: "hidden" }}
            >
              <Circle
                contentContainerStyle={{
                  alignSelf: "center",
                  position: "absolute",
                  top: 10,
                  zIndex: 1000,
                  width: "100%",
                }}
                blurredView={{
                  tint: "light",
                  intensity: 100,
                }}
                items={this.props.countries}
                onAction={(actions) => {
                  console.log("ON ACTION", actions);
                }}
                selectFlag={(flag) => {
                  this.hideSelector();
                  this.props.selectFlag(flag);
                  console.log("SELECT FLAG", flag);
                }}
              />
            </Animatable.View>
          )}

          <Animated.View
            style={{
              marginBottom: 10,
              position: "absolute",
              marginTop: marginTopY,
              width: "100%",
              zIndex: 1000,
            }}
          >
            <TextInput
              keyboardType="default"
              mode="outlined"
              style={styles.textInput}
              theme={{
                colors: {
                  primary: "#979797",
                },
              }}
              selectionColor="#008784"
              label="Your Currency"
              value=" "
            />

            <TouchableHighlight
              underlayColor={"white"}
              onPress={() => {
                this.state.selectFlag ? this.hideSelector() : this.openRing();
              }}
              style={styles.field}
            >
              <View style={styles.colFlag}>
                <View
                  style={{
                    width: 80,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {this.props.country_selected && (
                    <Avatar
                      rounded
                      source={{
                        uri: this.props.country_selected
                          ? this.props.country_selected.country_flag
                          : "",
                      }}
                    />
                  )}
                </View>
                <View
                  style={{ flex: 1, height: "100%", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 16,
                      width: "90%",
                    }}
                  >
                    {this.props.country_selected &&
                      this.props.country_selected.currency_name}
                  </Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    right: 15,
                    top: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icons.AntDesign name="down" size={20} color="red" />
                </View>
              </View>
            </TouchableHighlight>
          </Animated.View>

          {!this.state.selectFlag && (
            <Animated.View style={{ height: 80, marginTop: marginTopY }} />
          )}

          {this.state.selectFlag && <Animated.View style={{ height: 80 }} />}

          <Animated.ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {this.props.countries &&
              this.props.countries.map((country, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.item,
                      index === this.props.countries.length - 1 && {
                        borderBottomWidth: 0,
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: 70,
                        justifyContent: "center",
                        paddingLeft: 10,
                      }}
                    >
                      <Avatar
                        rounded
                        source={{ uri: country ? country.country_flag : "" }}
                      />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text
                        style={{
                          fontFamily: fonts.regular,
                          fontSize: 16,
                          width: "90%",
                        }}
                      >
                        {country.currency_name}
                      </Text>
                    </View>
                    <View style={{ width: 120, justifyContent: "center" }}>
                      <Text
                        style={{
                          fontFamily: fonts.regular,
                          fontSize: 16,
                          width: "90%",
                          textAlign: "right",
                        }}
                      >
                        {country.currency_values.toFixed(3)}{" "}
                        <Text
                          style={{
                            fontFamily: fonts.semibold,
                            fontSize: 16,
                            width: "90%",
                            textAlign: "right",
                          }}
                        >
                          {" " + country.base_currency}
                        </Text>
                      </Text>
                    </View>
                  </View>
                );
              })}
          </Animated.ScrollView>
        </View>
      </Container>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectFlag } from "../../redux/actions/flags";

const mapStateToProps = (state) => {
  return {
    countries: state.auth.countries,
    country_selected: state.auth.country_selected,
  };
};
const mapActionsToProps = (dispatch) => ({
  selectFlag: bindActionCreators(selectFlag, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Comparison);

const styles = StyleSheet.create({
  item: {
    width: "96%",
    height: 75,
    alignSelf: "center",
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderColor: "gray",
  },
  colFlag: { width: "98%", height: "65%", flexDirection: "row" },
  field: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 55,
    fontSize: 15,
    fontFamily: fonts.light,
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
  },
  con: { flex: 1, backgroundColor: "white" },
  bgSpirals: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
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
