import React from "react";
import { Header, Left, Body, Right, Title, Button } from "native-base";
import * as Icon from "../vectoricon";
import { TouchableOpacity, Platform } from "react-native";
import { Icons } from "..";
// import { TouchableOpacity } from 'react-native';

export default class Head extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Header
        transparent
        style={{
          backgroundColor: this.props.bgHeader
            ? this.props.bgHeader
            : "#f1f1f1",
        }}
      >
        <Left>
          {this.props.back && (
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon.MaterialIcons
                style={{}}
                name="arrow-back"
                size={25}
                color="red"
              />
            </Button>
          )}
        </Left>
        <Body
          style={
            // Platform.OS === "ios" &&
            { flex: 2 }
          }
        >
          <Title style={{ color: "black" }}>{this.props.heading}</Title>
        </Body>
        <Right>
          {this.props.compare && (
            <TouchableOpacity
              onPress={() =>
                this.props.startCompare && this.props.startCompare()
              }
              style={{ width: 30, height: 30 }}
            >
              {this.props.show_compare ? (
                <Icons.Entypo name="cross" color="#E8041D" size={30} />
              ) : (
                  <Icons.MaterialIcons
                    name="compare-arrows"
                    color="#E8041D"
                    size={30}
                  />
                )}
            </TouchableOpacity>
          )}
        </Right>
      </Header>
    );
  }
}
