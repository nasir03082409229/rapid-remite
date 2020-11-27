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
} from "react-native";
import { Container, Button, Content } from "native-base";
import { BgSpiral, Logo, UAEFlag } from "../../../assets";
import { SignInButton, Header, Icons } from "../../components";
import { fonts, shadow } from "../../theme";
import { TextInput } from "react-native-paper";
import { Avatar } from "react-native-elements";

export default class AnimatedField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animateYOne: new Animated.Value(0),
      oneShow: false,
    };

    this.timeout = 0;
  }

  doSearch(value) {
    var searchText = value; // this is the search text
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      //search function
      // alert("WORKED")
      this.props.changeAmount(searchText);
    }, 300);
  }

  showOnePanel = () => {
    Animated.timing(this.state.animateYOne, {
      toValue: 1,
      duration: 500,
    }).start(() => {
      this.setState({
        oneShow: true,
      });
    });
  };

  componentWillMount() {
    if (this.props.data) {
      this.state.selected_currency = this.props.data[this.props.initialFlag];
      if (this.props.onChangeCurrency) {
        this.props.onChangeCurrency(this.state.selected_currency);
      }
    }
  }

  hideOnePanel = () => {
    Animated.timing(this.state.animateYOne, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      this.setState({
        oneShow: false,
      });
    });
  };

  selectCurrency = (currency) => {
    if (this.props.onChangeCurrency) {
      this.props.onChangeCurrency(currency);
    }
    this.setState({
      selected_currency: currency,
    });
    this.hideOnePanel();
  };

  render() {
    const oneScrollY = this.state.animateYOne.interpolate({
      inputRange: [0, 1],
      outputRange: [-55, -2],
    });

    const oneScrollIconY = this.state.animateYOne.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });

    const oneScrollIconRotateY = this.state.animateYOne.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const opacityHide = this.state.animateYOne.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    console.log("FIELD DATA PROPS", this.props);
    return (
      <View>
        <View style={[styles.con, { zIndex: 10000 }]}>
          <TextInput
            keyboardType="number-pad"
            mode="outlined"
            style={styles.textInput}
            theme={{
              colors: {
                primary: "#979797",
              },
            }}
            selectionColor="#008784"
            label={this.props.label}
            onChangeText={(text) => {
              this.doSearch(text);
            }}
            value={this.props.value}
            disabled={this.props.disabled}
          />

          <TouchableOpacity
            disabled={!this.props.data}
            onPress={() =>
              this.state.oneShow ? this.hideOnePanel() : this.showOnePanel()
            }
            style={styles.countryButton}
          >
            <Avatar
              rounded
              source={{
                uri: this.state.selected_currency
                  ? this.state.selected_currency.country_flag
                  : "",
              }}
              resizeMode="cover"
              containerStyle={{ borderWidth: 1, borderColor: "white" }}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.semibold,
                color: "white",
              }}
            >
              {this.state.selected_currency
                ? this.state.selected_currency.currency_code
                : ""}
            </Text>
            <Animated.View
              style={{
                marginTop: oneScrollIconY,
                backgroundColor: "transparent",

                transform: [{ rotate: oneScrollIconRotateY }],
              }}
            >
              <Icons.MaterialIcons
                name="keyboard-arrow-down"
                size={30}
                color="white"
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            marginTop: oneScrollY,
            width: "99.5%",
            height: 50,
            alignSelf: "center",
            backgroundColor: "#E8041D",
            justifyContent: "center",
            borderBottomEndRadius: 5,
            borderBottomStartRadius: 5,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {this.props.data &&
              this.props.data.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.selectCurrency(item);
                    }}
                    key={index}
                    style={{
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginLeft: 10,
                      borderLeftWidth: 0.3,
                      borderColor: "white",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Avatar
                      containerStyle={{ borderWidth: 1, borderColor: "white" }}
                      rounded
                      size={35}
                      source={{ uri: item.country_flag }}
                    />
                    <Text
                      style={{
                        fontFamily: fonts.medium,
                        fontSize: 15,
                        textAlign: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      {item.currency_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
          <Animated.View style={{ opacity: this.state.animateYOne }}>
            <TouchableOpacity
              onPress={() => {
                this.hideOnePanel();
              }}
              style={[
                {
                  width: 30,
                  height: 30,
                  position: "absolute",
                  right: 0,
                  bottom: -20,
                  borderRadius: 15,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                },
                styles.shadow,
              ]}
            >
              <Icons.AntDesign name="caretup" color="#E8041D" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
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
    // borderWidth: 1,
    width: "100%",
    minHeight: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginTop: 20,
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
