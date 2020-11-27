import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Container, Content } from "native-base";
import { fonts } from "../../theme";
import { Avatar } from "react-native-elements";
import { Icons, Header } from "../../components";
import { AvatarPic } from "../../../assets";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstrow: [
        { name: "Basic Information", link: "EditProfile" },
        { name: "Change Password", link: "ChangePassword" },
      ],
    };
  }
  render() {
    const { user } = this.props;
    console.log("PROFILE PAGE PROPS" , user)
    return (
      <Container style={{}}>
        <Header back navigation={this.props.navigation} heading="My Account" />
        <Content>
          <View style={{ width: "90%", alignSelf: "center" }}>
            <View style={styles.profileMainCon}>
              <Avatar source={{uri:this.props.user && this.props.user.image ?this.props.user.image : ''  }} size={80} rounded />
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 20,
                    fontFamily: fonts.regular,
                    marginLeft: 10,
                  }}
                >
                  {user && user.firstName + " " + user.lastName}
                </Text>
              </View>
            </View>
            {this.state.firstrow.map((a) => {
              return (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(a.link)}
                  style={styles.button}
                >
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 15,
                      color: "#252525",
                    }}
                  >
                    {a.name}
                  </Text>
                  <Icons.MaterialIcons
                    name="keyboard-arrow-right"
                    color="#E8041D"
                    size={30}
                  />
                </TouchableOpacity>
              );
            })}
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

export default connect(mapStateToProps, mapActionsToProps)(Profile);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 70,
    justifyContent: "space-between",
    flexDirection: "row",
    // paddingHorizontal: "2.5%",
    alignItems: "center",
    borderTopWidth: 0.17,
    borderBottomWidth: 0.17,
    borderColor: "lightgray",
  },
  profileMainCon: {
    width: "100%",
    // height: 145,

    // marginTop: 60,

    // justifyContent: "space-between",
    flexDirection: "row",
    // borderWidth: 1,
    // alignItems: "center",
    paddingVertical: 20,
  },
});
