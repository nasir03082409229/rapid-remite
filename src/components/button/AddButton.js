import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
// import { FontAwesome5, Feather } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import AwesomeButton from "react-native-really-awesome-button";
import { logo_cut } from "../../../assets";
import Instance from "../constants/instance";
// import { MyTabs } from "../../navigator";

export default class AddButton extends React.Component {
  mode = new Animated.Value(0);
  buttonSize = new Animated.Value(1);

  handlePress = () => {
    // Animated.sequence([
    //     Animated.timing(this.buttonSize, {
    //         toValue: 0.95,
    //         duration: 200
    //     }),
    //     Animated.timing(this.buttonSize, {
    //         toValue: 1
    //     }),
    //     Animated.timing(this.mode, {
    //         toValue: this.mode._value === 0 ? 1 : 0
    //     })
    // ]).start();
  };

  render() {
    const thermometerX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -100],
    });

    const thermometerY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100],
    });

    const timeX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -24],
    });

    const timeY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -150],
    });

    const pulseX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, 50],
    });

    const pulseY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100],
    });

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"],
    });

    const sizeStyle = {
      transform: [{ scale: this.buttonSize }],
    };

    return (
      <TouchableOpacity
        onPress={() => Instance.home.props.navigation.navigate("Home")}
        style={[styles.button]}
      >
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          {/* <FontAwesome5 name="plus" size={24} color="#FFF" /> */}
          <Image
            source={logo_cut}
            style={{ width: 20, height: 25 }}
            resizeMode="contain"
          />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 36,
    // backgroundColor: "black",
    // position: "absolute",
    // marginBottom: 10,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    zIndex: 9900,
    // borderWidth: 1,
    borderColor: "white",
  },
  secondaryButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#7F58FF",
  },
});
