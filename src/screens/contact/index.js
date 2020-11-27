import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { Container, Content } from "native-base";
import { Header, Icons } from "../../components";
import { BgSpiral } from "../../../assets";
import { fonts } from "../../theme";
import { ActivityIndicator, Colors } from "react-native-paper";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentWillMount() {
    this.props.getContactus(this);
  }
  render() {
    console.log("CONTACTUS STATE", this.state);

    return (
      <Container>
        <ImageBackground source={BgSpiral} style={styles.bgSpirals}>
          <Header back navigation={this.props.navigation} heading={"Contact"} />
          <Content>
            <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
              {this.state.loading ? (
                <ActivityIndicator color="red" size={"large"} />
              ) : (
                <>
                  <View style={styles.mainCon}>
                    <View style={styles.iconCon}>
                      <Icons.FontAwesome
                        name="building"
                        size={20}
                        color="#E8041D"
                      />
                    </View>
                    <View style={styles.detailsCon}>
                      <Text style={styles.textStyle}>{this.state.address}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.mainCon,
                      {
                        marginTop: 10,
                        paddingBottom: 20,
                      },
                    ]}
                  >
                    <View style={styles.iconCon}>
                      <Icons.FontAwesome
                        name="phone"
                        size={25}
                        color="#E8041D"
                      />
                    </View>
                    <View
                      style={[styles.detailsCon, { justifyContent: "center" }]}
                    >
                      <Text style={styles.textStyle}>
                        {this.state.phone && this.state.phone}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.mainCon,
                      {
                        marginTop: 10,
                        paddingBottom: 20,
                      },
                    ]}
                  >
                    <View style={styles.iconCon}>
                      <Icons.Ionicons
                        name="md-mail"
                        size={23}
                        color="#E8041D"
                      />
                    </View>
                    <View
                      style={[styles.detailsCon, { justifyContent: "center" }]}
                    >
                      <Text style={styles.textStyle}>
                        {this.state.email && this.state.email}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getContactus } from "../../redux/actions/auth";

const mapStateToProps = (state) => {
  return {};
};
const mapActionsToProps = (dispatch) => ({
  getContactus: bindActionCreators(getContactus, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Contact);
const styles = StyleSheet.create({
  bgSpirals: {
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  mainCon: {
    width: "100%",
    minHeight: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    paddingBottom: 10,
  },
  iconCon: {
    flex: 0.25,
    alignItems: "center",
    paddingTop: 10,
  },
  detailsCon: { flex: 1.5, paddingTop: 5 },
  textStyle: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: "#252525",
  },
});
