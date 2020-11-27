import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {} from "native-base";
import { fonts } from "../../theme";
import { Button } from "react-native-material-ui";
import { ActivityIndicator } from "react-native-paper";
export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" color="red" />;
    }

    return (
      <Button
        disabled={this.props.disabled}
        raised
        style={{
          container: {
            width: "100%",
            height: 55,
            borderRadius: 8,
            backgroundColor: this.props.disabled ? "lightgray" : "#e8041c",
          },
          text: {
            fontFamily: fonts.semibold,
            fontSize: 15,
            color: "white",
          },
        }}
        accent
        onPress={() =>
          this.props.link
            ? this.props.navigation.navigate(this.props.link)
            : this.props.onPress && this.props.onPress()
        }
        text={this.props.text ? this.props.text : "Sign Up with Email"}
      />
    );
  }
}

const styles = StyleSheet.create({
  MainCon: {
    borderWidth: 1,
    height: 65,
    borderRadius: 7,
    width: "100%",
    backgroundColor: "#e8041c",
    justifyContent: "center",
    alignItems: "center",
  },
  fontStyle: { fontFamily: fonts.semibold, fontSize: 16, color: "white" },
});
