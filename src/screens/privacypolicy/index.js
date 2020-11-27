import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Container, Content } from "native-base";
import { Header } from "../../components";
import { BgSpiral } from "../../../assets";
import { fonts } from "../../theme";
import { ActivityIndicator, Colors } from "react-native-paper";
import HTMLView from "react-native-htmlview";

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    console.log("DATA YAHAN HAI", this.state);
  }
  componentWillMount() {
    this.props.getConfig(this, "privacy_policy");
  }
  render() {
    return (
      <Container>
        <ImageBackground
          source={BgSpiral}
          style={[
            styles.bgSpirals,
            this.state.loading && { justifyContent: "center" },
          ]}
        >
          <Header
            back
            navigation={this.props.navigation}
            heading={"Privacy Policy"}
          />
          <ScrollView>
            <View
              style={[
                {
                  width: "90%",
                  alignSelf: "center",
                  marginTop: 20,
                },
              ]}
            >
              {!this.state.loading && (
                <>
                  <HTMLView
                    style={{ width: "100%" }}
                    stylesheet={
                      {
                        // h1: {
                        //   textAlign: "center",
                        //   fontSize: 20,
                        //   fontFamily: fonts.bold,
                        //   width: "100%",
                        // },
                        // h5: {
                        //   textAlign: "center",
                        //   fontSize: 12,
                        //   fontFamily: fonts.bold,
                        //   width: "100%",
                        //   opacity: 0.5,
                        // },
                        // h1: {
                        // },
                        // div: {
                        //   paddingHorizontal: 10,
                        // },
                        // center: {
                        //   textAlign: "center",
                        // },
                        // p: {
                        //   paddingHorizontal: 10,
                        //   marginVertical: 20,
                        // },
                      }
                    }
                    value={this.state.content}
                  />
                </>
              )}
            </View>
          </ScrollView>

          {this.state.loading && (
            <View style={{ width: "100%", flex: 1, bottom: 50 }}>
              <ActivityIndicator color="red" size={"large"} />
            </View>
          )}
        </ImageBackground>
      </Container>
    );
  }
}
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getConfig } from "../../redux/actions/auth";

const mapStateToProps = (state) => {
  return {};
};
const mapActionsToProps = (dispatch) => ({
  getConfig: bindActionCreators(getConfig, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(PrivacyPolicy);

const styles = StyleSheet.create({
  bgSpirals: {
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});
