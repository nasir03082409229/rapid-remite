import React from "react";
import { Container, Title, View, Button, Text, Content } from "native-base";
import { Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Icons } from "../";
import { Avatar } from "react-native-elements";
import { AvatarPic } from "../../../assets";
import { fonts } from "../../theme";
import { CommonActions } from "@react-navigation/native";
import Share from "react-native-share";
import Instance from "../constants/instance";
// import {ToggleSwitch} from '../../components';

// import ToggleSwitch from 'toggle-switch-react-native';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerItems: [
        {
          Name: "Terms and Conditions",

          icon: () => {
            return (
              <Icons.MaterialCommunityIcons
                name="file"
                size={30}
                style={{ color: "black" }}
              />
            );
          },
          Link: "TermsConditions",
        },
        {
          Name: "Privacy Policy",
          icon: () => {
            return (
              <Icons.MaterialCommunityIcons
                name="file-document"
                size={30}
                style={{ color: this.state.pressin ? "#E8041D" : "black" }}
              />
            );
          },
          Link: "PrivacyPolicy",
        },
        {
          Name: "Contact Us",
          icon: () => {
            return (
              <Icons.MaterialCommunityIcons
                name="phone"
                style={{ color: this.state.pressin ? "#E8041D" : "black" }}
                size={30}
              />
            );
          },
          Link: "Contact",
        },
      ],
    };
  }

  render() {
    const { user } = this.props;
    console.log("DATA USER HERE", this.props);
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Profile")}
          style={styles.profileMainCon}
        >
          <Avatar
            source={{
              uri:
                this.props.user && this.props.user.image
                  ? this.props.user.image
                  : "",
            }}
            size={80}
            rounded
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                fontFamily: fonts.regular,
              }}
            >
              {user && user.firstName + " " + user.lastName}
            </Text>
          </View>
        </TouchableOpacity>
        <Content
          bounces={false}
          contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
        >
          <View>
            {this.state.drawerItems.map((input, index) => {
              return (
                <View style={styles.buttoncon}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate(input.Link)}
                    style={styles.buttonStyle}
                  >
                    {input.icon()}
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: input.pressin ? "#E8041D" : "black",
                        },
                      ]}
                    >
                      {input.Name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            {/* <View style={styles.buttoncon}>
              <TouchableOpacity style={styles.buttonStyle}>
                <Icons.MaterialCommunityIcons
                  style={{ color: "black" }}
                  name="heart"
                  size={29}
                />
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color: "black",
                    },
                  ]}
                >
                  Share with friend
                </Text>
              </TouchableOpacity>
            </View>
         */}
          </View>

          <View style={styles.buttoncon}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Welcome" }],
                  })
                );
              }}
              style={styles.buttonStyle}
            >
              <Icons.Ionicons name="md-power" color="black" size={30} />
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: "black",
                  },
                ]}
              >
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectFlag, getCountries } from "../../redux/actions/flags";
import { getNews } from "../../redux/actions/news";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    // countries: state.auth.countries,
    // country_selected: state.auth.country_selected,
  };
};
const mapActionsToProps = (dispatch) => ({
  // selectFlag: bindActionCreators(selectFlag, dispatch),
  // getNews: bindActionCreators(getNews, dispatch),
  // getCountries: bindActionCreators(getCountries, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Drawer);

const styles = StyleSheet.create({
  profileMainCon: {
    width: "100%",
    height: 145,
    borderBottomWidth: 0.25,
    marginTop: 60,
    paddingLeft: 15,
    justifyContent: "space-between",
    paddingBottom: 20,
    borderColor: "gray",
    marginBottom: 25,
  },
  bgcolor: {
    width: "100%",
    height: "100%",
    backgroundColor: "#201D1D",
    opacity: 0.04,
    position: "absolute",
  },
  buttoncon: {
    width: "100%",
    height: 60,
  },
  buttonStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  textStyle: { fontSize: 15, marginLeft: 30, fontFamily: fonts.medium },
});
