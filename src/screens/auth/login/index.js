import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import {
  Container,
  Button,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title,
} from "native-base";
import { BgSpiral, Logo } from "../../../../assets";
import { SignInButton, Icons } from "../../../components";
import { fonts } from "../../../theme";
import { TextInput, ActivityIndicator } from "react-native-paper";

import { Formik } from "formik";
import * as yup from "yup";
import { Avatar } from "react-native-elements";
import * as Animatable from "react-native-animatable";

const validation = yup.object().shape({
  email: yup.string(),
  password: yup.string().required().min(6),
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: [
        { Name: "Email", Type: "email-address", key: "email" },
        { Name: "Password", Type: "default", secure: true, key: "password" },
      ],
      positionY: new Animated.Value(0),
    };
  }

  handleSubmit = (form) => {
    console.log("FORM SUBMIT", { ...form });
    this.props.signIn(this, form);
  };

  animateIcons = () => {
    Animated.timing(this.state.positionY, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
      // useNativeDriver: true // <-- Add this
    }).start(() => {
      this.setState({
        flags: true,
      });
    });
  };

  reanimateBack = () => {
    this.setState({
      flags: false,
    });
    Animated.timing(this.state.positionY, {
      toValue: 0,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
      // useNativeDriver: true // <-- Add this
    }).start(() => { });
  };

  header = () => {
    const valueY = this.state.positionY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 65], // <-- Add this
    });

    let country_selected = false;
    if (this.props.countries) {
      country_selected = this.props.country_selected
        ? this.props.country_selected
        : this.props.countries[0];
    }

    return (
      <Header style={{ backgroundColor: "white", borderBottomColor: "white" }}>
        <Left style={{ padding: 5 }}>
        <TouchableOpacity onPress={()=> { this.props.navigation.goBack()}}>
        <Icons.MaterialIcons name="arrow-back" size={30} />
        </TouchableOpacity>

          {/* <Animated.View style={{ transform: [{ translateY: valueY }] }}>
            <TouchableOpacity
              onPress={() =>
                this.state.flags ? this.reanimateBack() : this.animateIcons()
              }
            >
              <Avatar
                source={{
                  uri: country_selected ? country_selected.country_flag : "",
                }}
                rounded
                size={45}
              />
              {!country_selected && (
                <ActivityIndicator
                  size={"small"}
                  color="lightgray"
                  style={{ position: "absolute", alignSelf: "center", top: 15 }}
                />
              )}
              <Animated.View
                style={{
                  opacity: this.state.positionY,
                  position: "absolute",
                  right: -20,
                  top: 15,
                }}
              >
                <Icons.AntDesign name="caretright" size={20} />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        */}
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>{country_selected && country_selected.country_name}</Title>
        </Body>
        <Right>
          <TouchableOpacity>
            {/* <Icons.Entypo name="dots-three-horizontal" color="red" size={25} /> */}
          </TouchableOpacity>
        </Right>
      </Header>
    );
  };

  render() {
    return (
      <Container>
        {this.header()}
        {this.state.flags && (
          <View style={styles.topPanel}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {this.props.countries &&
                this.props.countries.map((country, index) => {
                  return (
                    <Animatable.View
                      key={index}
                      animation="slideInLeft"
                      style={{ marginHorizontal: 3 }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.props.selectFlag(country);
                          this.reanimateBack();
                        }}
                      >
                        <Avatar
                          source={{ uri: country.country_flag }}
                          rounded
                          size={50}
                        />
                      </TouchableOpacity>
                    </Animatable.View>
                  );
                })}
            </ScrollView>
          </View>
        )}
        <ImageBackground
          resizeMode="cover"
          source={BgSpiral}
          style={styles.bgSpirals}
        >
          <Content
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Formik
              validationSchema={validation}
              onSubmit={(text) => this.handleSubmit(text)}
              initialValues={{ email: "", password: "" }}
            >
              {({ values, handleChange, handleSubmit, handleBlur }) => (
                <View style={styles.mainCon}>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: 24,
                      width: "98%",
                      alignSelf: "center",
                    }}
                  >
                    Welcome{"\n"}to{" "}
                    <Text
                      style={{ fontFamily: fonts.semibold, color: "#E8041D" }}
                    >
                      Rapid Remit
                    </Text>
                  </Text>
                  {this.state.credentials.map((a) => {
                    return (
                      <TextInput
                        secureTextEntry={a.secure && true}
                        keyboardType={a.Type}
                        mode="outlined"
                        style={{
                          height: 55,
                          fontSize: 15,
                          fontFamily: fonts.light,
                          backgroundColor: "white",
                          width: a.width ? a.width : "98%",
                          marginTop: 20,
                          alignSelf: "center",
                        }}
                        theme={{
                          colors: {
                            primary: "#979797",
                          },
                        }}
                        selectionColor="#008784"
                        label={a.Name}
                        onChangeText={handleChange(a.key)}
                        onBlur={handleBlur(a.key)}
                      />
                    );
                  })}
                  <View style={{ marginTop: 40 }}>
                    <SignInButton
                      onPress={() => {
                        handleSubmit();
                      }}
                      loading={this.state.loading}
                      navigation={this.props.navigation}
                      text={"Continue"}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("SignUp")}
                    style={{
                      marginTop: 20,
                      marginBottom: 100,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        fontSize: 15,
                      }}
                    >
                      Not Registered?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signIn } from "../../../redux/actions/auth";
import { selectFlag } from "../../../redux/actions/flags";

const mapStateToProps = (state) => {
  return {
    countries: state.auth.countries,
    country_selected: state.auth.country_selected,
  };
};
const mapActionsToProps = (dispatch) => ({
  signIn: bindActionCreators(signIn, dispatch),
  selectFlag: bindActionCreators(selectFlag, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Login);

const styles = StyleSheet.create({
  topPanel: {
    width: "80%",
    height: 80,
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  bgSpirals: {
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  buttonCon: {
    width: "100%",
    marginTop: 55,
    alignItems: "center",
  },
  bottomText: { fontFamily: fonts.regular, fontSize: 13 },
  bottomRows: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bottompart: {
    // width: '90%',
    // position: 'absolute',
    // bottom: 35,
    marginTop: 30,
  },
  mainCon: {
    width: "95%",
    // height: 500,
  },
});
