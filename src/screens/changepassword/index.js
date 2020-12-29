import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import { Header, SignInButton, Icons } from "../../components";
import { fonts } from "../../theme";
import { CameraIcon } from "../../../assets";
import { TextInput } from "react-native-paper";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-picker";

import { Formik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-native-phone-input";


const validation = yup.object().shape({
  email: yup.string().email().required(),
  newpassword: yup.string().required().min(8),
});

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isPasswordHide: true,
      image: "",
      credentials: [
        { Name: "Email", Type: "email-address", key: "email" },

        { Name: "New Password", Type: "default", key: "newpassword", secure: true },
      ],
    };
  }

  handleSubmit = (form) => {
    this.props.changePassword(this, form);
  };


  render() {
    console.log("EDIT PASSWORD PROPS", this.props.user);
    const { user } = this.props;
    const { isPasswordHide } = this.state;
    return (
      <Container>
        <Header heading="Change Password" navigation={this.props.navigation} back />
        <Formik
          validationSchema={validation}
          onSubmit={(text) => {
            console.log('ChANGE PAsSWOERNJKASBN=>', text);
            // alert("PASSWORD CHANGE");
            this.handleSubmit(text)
          }}
          initialValues={{
            email: user.email,
            newpassword: '',
          }}
        >
          {({ values, handleChange, handleSubmit, handleBlur }) => (
            <Content
              contentContainerStyle={{ justifyContent: "space-between" }}
            >
              <View style={styles.mainCon}>
                {this.state.credentials.map((a, i) => {
                  if (a.key !== "phone") {
                    return (
                      <View style={{ flexDirection: 'row', flex: 1, }}>
                        <TextInput
                          secureTextEntry={a.secure && isPasswordHide}
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
                          value={values[a.key]}
                          onChangeText={handleChange(a.key)}
                          onBlur={handleBlur(a.key)}
                          disabled={a.key === "email"}
                        />
                        {i == 1 && <TouchableOpacity onPress={() => this.setState({ isPasswordHide: !isPasswordHide })} style={{ width: 30, justifyContent: 'center', marginHorizontal: 5 }}>
                          <Icons.FontAwesome
                            name={!isPasswordHide ? "eye" : 'eye-slash'}
                            size={30}
                          />
                        </TouchableOpacity>}
                      </View>
                    );
                  }
                })}
              </View>
              <View
                style={{ width: "92%", alignSelf: "center", marginTop: 20 }}
              >
                <SignInButton
                  loading={this.state.loading}
                  text="SAVE"
                  onPress={() => {
                    // alert("PRESE")
                    handleSubmit()
                  }}
                />
              </View>
            </Content>
          )}
        </Formik>
      </Container>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUser, changePassword } from "../../redux/actions/auth";
import { getNews } from "../../redux/actions/news";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
const mapActionsToProps = (dispatch) => ({
  changePassword: bindActionCreators(changePassword, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(PasswordChange);

const styles = StyleSheet.create({
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
  textField: {
    color: "black",
    height: 55,
    fontSize: 15,
    fontFamily: fonts.light,
    backgroundColor: "white",
    // width: "98%",
    flex: 1,
    // marginTop: 15,
    marginVertical: 10,
    alignSelf: "center",
  },
  changePicMainCon: {
    borderBottomWidth: 1,
    width: "100%",
    height: 80,
    marginTop: 20,
    flexDirection: "row",
    borderColor: "rgba(0,0,0,0.2)",
    paddingBottom: 20,
  },
  mainCon: {
    width: "95%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  cameraMainCOn: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraCon: {
    width: 60,
    height: 60,
    backgroundColor: "#989898",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

const options = {
  title: "Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};
