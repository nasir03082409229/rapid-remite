import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Container, Button, Content } from "native-base";
import { BgSpiral, Logo } from "../../../../assets";
import { SignInButton, Header } from "../../../components";
import { fonts } from "../../../theme";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { Avatar } from "react-native-elements";

const validation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  email: yup.string(),
  password: yup.string().required().min(6),
  country: yup.string().required(),
  city: yup.string().required(),
  streetAddress: yup.string().required(),
  address: yup.string().required(),
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryPickerVisible: true,
      credentials: [
        { Name: "First Name", Type: "default", key: "firstName" },
        { Name: "Last Name", Type: "default", key: "lastName" },
        { Name: "Email", Type: "email-address", key: "email" },
        { Name: "Password", Type: "default", secure: true, key: "password" },
        // { Name: "Country", Type: "default", key: "country" },
      ],
    };
  }

  handleSubmit = (form) => {
    if (this.inputPhone.isValidNumber()) {
      console.log("FORM SUBMIT", {
        ...form,
        phone: this.state.phone,
        conformPassword: form.password,
      });
      let role = [];
      role = [...role, "Individual"];
      this.props.signUp(this, {
        ...form,
        phone: this.state.phone,
        conformPassword: form.password,
        role: role,
      });
    } else {
      alert("Please provide correct phone number.");
    }
  };

  render() {
    return (
      <Container>
        <ImageBackground
          resizeMode="cover"
          source={BgSpiral}
          style={styles.bgSpirals}
        >
          <Header
            navigation={this.props.navigation}
            back
            heading={"Create an Account"}
          />
          <Formik
            validationSchema={validation}
            onSubmit={(text) => this.handleSubmit(text)}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              country: "",
              city: "",
              streetAddress: "",
              address: "",
            }}
          >
            {({ values, handleChange, handleSubmit, handleBlur }) => (
              <Content
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "center" }}
              >
                <View style={styles.mainCon}>
                  {this.state.credentials.map((a) => {
                    return (
                      <TextInput
                        secureTextEntry={a.secure && true}
                        keyboardType={a.Type}
                        mode="outlined"
                        style={styles.textField}
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
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        countryPickerVisible: true,
                        countryselector: true,
                      })
                    }
                    style={[styles.customField, { flexDirection: "row" }]}
                  >
                    {this.state.countryPickerVisible && (
                      <CountryPicker
                        withFlag
                        ref={(ref) => (this.countryPicker = ref)}
                        visible={this.state.countryselector}
                        withEmoji
                        onSelect={(country) => {
                          this.setState({
                            countrySelectedName: country.name,
                            countrySelectedFlag: country.flag,
                            countryPickerVisible: false,
                          });
                          console.log("SELECTED COUNTRY", country);
                        }}
                      />
                    )}
                    {!this.state.countryPickerVisible && (
                      <>
                        <View
                          style={{ flex: 0.2, borderWidth: 1, height: "80%" }}
                        >
                          <Avatar source={this.state.countrySelectedFlag} />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            borderWidth: 1,
                            height: "80%",
                            justifyContent: "center",
                          }}
                        >
                          <Text>{this.state.countrySelectedName}</Text>
                        </View>
                      </>
                    )}
                  </TouchableOpacity>
                  <View style={styles.customField}>
                    <PhoneInput
                      autoFormat={true}
                      textProps={{
                        placeholder: "Phone Number",
                        placeholderTextColor: "rgba(0,0,0,0.6)",
                      }}
                      onChangePhoneNumber={(number) => {
                        console.log("PHONE NUMBER", number);
                        this.setState({
                          phone: number,
                        });
                      }}
                      ref={(ref) => {
                        this.inputPhone = ref;
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      paddingHorizontal: "1%",
                    }}
                  >
                    <TextInput
                      keyboardType="default"
                      mode="outlined"
                      style={{
                        height: 55,
                        fontSize: 15,
                        fontFamily: fonts.light,
                        backgroundColor: "white",
                        width: "48.5%",
                        marginTop: 20,
                        alignSelf: "center",
                      }}
                      theme={{
                        colors: {
                          primary: "#979797",
                        },
                      }}
                      selectionColor="#008784"
                      label="City"
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                    />
                    <TextInput
                      keyboardType="default"
                      mode="outlined"
                      style={{
                        height: 55,
                        fontSize: 15,
                        fontFamily: fonts.light,
                        backgroundColor: "white",
                        width: "48.5%",
                        marginTop: 20,
                        alignSelf: "center",
                      }}
                      theme={{
                        colors: {
                          primary: "#979797",
                        },
                      }}
                      selectionColor="#008784"
                      label="State"
                      onChangeText={handleChange("streetAddress")}
                      onBlur={handleBlur("city")}
                    />
                  </View>
                  <TextInput
                    keyboardType="number-pad"
                    mode="outlined"
                    style={{
                      height: 55,
                      fontSize: 15,
                      fontFamily: fonts.light,
                      backgroundColor: "white",
                      width: "98%",
                      marginTop: 20,
                      alignSelf: "center",
                    }}
                    theme={{
                      colors: {
                        primary: "#979797",
                      },
                    }}
                    selectionColor="#008784"
                    label="Postal Code"
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                  />
                </View>
                <View style={styles.bottompart}>
                  <View style={styles.bottomRows}>
                    <Text style={[styles.bottomText]}>
                      By signing up, you agree with theme
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("TermsConditions")
                      }
                    >
                      <Text
                        style={[
                          styles.bottomText,
                          { textDecorationLine: "underline", color: "#E8041D" },
                        ]}
                      >
                        Terms of Services
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.bottomRows}>
                    <Text style={styles.bottomText}> and </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("PrivacyPolicy")
                      }
                    >
                      <Text
                        style={[
                          styles.bottomText,

                          {
                            textDecorationLine: "underline",
                            color: "#E8041D",
                            // alignSelf: 'center',
                          },
                        ]}
                      >
                        Privacy Policy
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <SignInButton
                      onPress={() => {
                        handleSubmit();
                      }}
                      loading={this.state.loading}
                      navigation={this.props.navigation}
                      text={"Register to Rapid Remit"}
                    />
                  </View>
                </View>
              </Content>
            )}
          </Formik>
        </ImageBackground>
      </Container>
    );
  }
}
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signUp } from "../../../redux/actions/auth";

const mapStateToProps = (state) => {
  return {};
};
const mapActionsToProps = (dispatch) => ({
  signUp: bindActionCreators(signUp, dispatch),
  // UserAction: bindActionCreators(UserAction, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Signup);

const styles = StyleSheet.create({
  bgSpirals: {
    position: "absolute",
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
    marginTop: 30,
  },
  mainCon: {
    width: "95%",
    alignItems: "center",
  },
  textField: {
    color: "black",
    height: 55,
    fontSize: 15,
    fontFamily: fonts.light,
    backgroundColor: "white",
    width: "98%",
    marginTop: 15,
    alignSelf: "center",
  },
  customField: {
    paddingHorizontal: 10,
    width: "98%",
    height: 55,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
  },
});
