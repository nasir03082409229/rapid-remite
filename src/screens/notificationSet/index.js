import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Container, Content } from "native-base";
import { fonts } from "../../theme";
import { Icons, Header, Toggle } from "../../components";
// import ToggleSwitch from "toggle-switch-react-native";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      items: [
        {
          Heading: "Push Notification",
        },
        {
          Heading: "Message Notifications",
        },
      ],
      ItemName: [
        { Name: "Messages", Subtext: "From Friends" },
        { Name: "Account Activity", Subtext: "Changes made to your account" },
        { Name: "Product Announcements", Subtext: "Feature updates and more" },
        { Name: "Recommendations", Subtext: "Ideas and price alerts" },
      ],
    };
  }
  render() {
    return (
      <Container style={{}}>
        <Header
          back
          navigation={this.props.navigation}
          heading="Notification Settings"
        />
        <Content>
          <View style={{ alignSelf: "center", width: "90%" }}>
            {this.state.items.map((a) => {
              return (
                <View>
                  <View style={styles.mainCon}>
                    <Text style={styles.headingTextStyle}>{a.Heading}</Text>
                  </View>
                  {this.state.ItemName.map((a) => {
                    return (
                      <View style={styles.itemDetailCon}>
                        <View style={styles.itemDetail}>
                          <Text style={styles.itemHeading}>{a.Name}</Text>
                          <Text style={styles.itemHeadingSubText}>
                            {a.Subtext}
                          </Text>
                        </View>
                        <View style={styles.toggleMainCon}>
                          <Toggle
                            isOn={this.state.select}
                            onColor="rgba(232,4,29,0.2)"
                            offColor="#c6c6c6"
                            // label="Example label"
                            size="small"
                            select={this.state.select}
                            onToggle={(isOn) => this.setState({ select: isOn })}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  mainCon: { marginTop: 30, marginBottom: 20 },
  headingTextStyle: {
    textTransform: "uppercase",
    fontFamily: fonts.regular,
    fontSize: 15,
    color: "#252525",
  },
  itemDetailCon: {
    width: "100%",
    height: 80,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    flexDirection: "row",
  },
  itemDetail: { flex: 1, justifyContent: "center" },
  itemHeading: {
    color: "#252525",
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  itemHeadingSubText: {
    fontSize: 13,
    fontFamily: fonts.light,
    color: "#5F5F5F",
  },
  toggleMainCon: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
