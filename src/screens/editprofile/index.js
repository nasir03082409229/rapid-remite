import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
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
import CountryPicker, { getAllCountries } from "react-native-country-picker-modal";

import storage from "@react-native-firebase/storage";

const validation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  email: yup.string(),
  country: yup.string().required(),
  city: yup.string().required(),
  streetAddress: yup.string().required(),
  address: yup.string().required(),
});
import axios from 'axios'
const API_URL = "https://rapidremit1.herokuapp.com/";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image: "",
      countryCca2: undefined,
      user: {

      },
      credentials: [
        { Name: "First Name", Type: "default", key: "firstName" },
        { Name: "Last Name", Type: "default", key: "lastName" },
        { Name: "Email", Type: "email-address", key: "email" },
        { Name: "City", Type: "default", key: "city" },
        { Name: "Phone", Type: "default", key: "phone" },
        { Name: "Country", Type: "default", key: "country" },
        { Name: "Address", Type: "default", key: "address" },
        { Name: "State", Type: "default", key: "streetAddress" },
      ],
    };
  }

  handleSubmit = (form) => {
    if (this.inputPhone.isValidNumber()) {
      console.log("FORM SUBMIT", {
        ...form,
        phone: this.state.phone,
        image: this.state.image,
        ...this.state.user
      });
      // return
      // let role = [];
      // role = [...role, "Individual"];
      this.props.updateUser(this, {
        ...form,
        phone: this.state.phone,
        image: this.state.image,
      });
    } else {
      alert("Please provide correct phone number.");
    }
  };

  uploadImage = async (source) => {
    const { user } = this.props;
    const { uri } = source;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    // setUploading(true);
    // setTransferred(0);
    const task = storage().ref(filename);

    const uploader = task.putFile(uploadUri);
    // set progress state
    uploader.on("state_changed", (snapshot) => {
      // setTransferred(
      //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      // );
    });

    try {
      await uploader;
    } catch (e) {
      console.error(e);
    }

    task.getDownloadURL().then((fireBaseUrl) => {
      console.log("fireBaseUrl", fireBaseUrl);

      // axios.put(API_URL + `users/${this.props.user._id}` , {image:fireBaseUrl}).then((profile)=>{
      //   console.log("fireBaseUrl", profile);

      // }).catch((err)=>{
      //   console.log("fireBaseUrl ERR", err.response);

      // })

      this.props.updateUser(this, { image: fireBaseUrl }, false);
      this.setState({
        image: fireBaseUrl,
      });
    });
  };



  componentWillMount() {
    const { user } = this.props;
    this.setState({ user: user })

    getAllCountries().then((countryList) => {
      let country = countryList.find(x => x.name == user.country.trim())
      console.log("render -> country COUNTRIES", country, user.country)
      this.setState({
        countrySelectedName: country.name,
        countrySelectedFlag: country.flag,
        countryCca2: country.cca2,
        countryPickerVisible: false,
      });
    })
    // let selectedCountry
    // if (countries) {
    //   selectedCountry = countries.find(x => {
    //     return x.country_name.trim() === this.state.user.country.trim()
    //   })
    //   console.log('selectedCountry', selectedCountry)
    // }


    if (user.image) {
      this.state.image = user.image;
    }
    if (user.phone) {
      this.state.phone = user.phone;
    }
  }


  onChangeValue = (key, value) => {
    let user = this.state.user;
    user[key] = value;
    this.setState({
      user: user,
    });
  }
  render() {
    // console.log("PHONE=>", this.);
    console.log("EDIT PROFILE PROPS", this.props.user);
    const { user, countries } = this.props;


    if (user.phone) {
      // this.state.phone = "+" + user.phone;
    }
    return (
      <Container>
        <Header heading="Profile" navigation={this.props.navigation} back />
        <Formik
          validationSchema={validation}
          onSubmit={(text) => this.handleSubmit(text)}
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            country: user.country,
            city: user.city,
            streetAddress: user.streetAddress,
            address: user.address,
          }}
        >
          {({ values, handleChange, handleSubmit, handleBlur }) => (
            <Content
              contentContainerStyle={{ justifyContent: "space-between" }}
            >
              <View style={styles.mainCon}>
                <TouchableOpacity
                  onPress={() => {
                    ImagePicker.showImagePicker(options, (response) => {
                      console.log("Response = ", response);

                      if (response.didCancel) {
                        console.log("User cancelled image picker");
                      } else if (response.error) {
                        console.log("ImagePicker Error: ", response.error);
                      } else if (response.customButton) {
                        console.log(
                          "User tapped custom button: ",
                          response.customButton
                        );
                      } else {
                        const source = { uri: response.uri };

                        this.uploadImage(source);

                        this.setState({
                          avatarSource: source,
                        });
                      }
                    });
                  }}
                  style={styles.changePicMainCon}
                >
                  <View style={styles.cameraMainCOn}>
                    {this.state.image === "" && (
                      <View style={styles.cameraCon}>
                        <Icons.Entypo name="camera" color="white" size={25} />
                      </View>
                    )}
                    {this.state.image !== "" && (
                      <Avatar
                        source={{ uri: this.state.image }}
                        size={60}
                        rounded
                      />
                    )}
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontSize: 15, fontFamily: fonts.semibold }}>
                      Update Profile Pic
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.25,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icons.AntDesign
                      name="camera"
                      size={30}
                      color="#E8041D"
                    />
                  </View>
                </TouchableOpacity>
                {this.state.credentials.map((a) => {
                  if (a.key == 'country') {
                    return <TouchableOpacity
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
                          withFilter
                          ref={(ref) => (this.countryPicker = ref)}
                          visible={this.state.countryselector}
                          withEmoji
                          onSelect={(country) => {
                            this.onChangeValue('country', country.name)
                            this.setState({
                              countrySelectedName: country.name,
                              countrySelectedFlag: country.flag,
                              countryCca2: country.cca2,
                              countryPickerVisible: false,
                            });
                            console.log("SELECTED COUNTRY", country);
                          }}
                        />
                      )}
                      {!this.state.countryPickerVisible && (
                        <>
                          <View style={{}}>
                            <Image source={{ uri: `http://www.geognos.com/api/en/countries/flag/${this.state.countryCca2}.png` }} style={{ height: 35, width: 30, resizeMode: 'contain' }} />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              borderWidth: 0,
                              height: "80%",
                              justifyContent: "center",
                              paddingHorizontal: 10
                            }}
                          >
                            <Text>{this.state.countrySelectedName}</Text>
                          </View>
                        </>
                      )}
                    </TouchableOpacity>
                  }
                  if (a.key !== "phone") {
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
                        value={this.state.user[a.key]}
                        onChangeText={(text) => this.onChangeValue(a.key, text)}
                        // onChangeText={handleChange(a.key)}
                        onBlur={handleBlur(a.key)}
                        disabled={a.key === "email"}
                      />
                    );
                  }

                  if (a.key === "phone") {
                    return (
                      <View style={styles.customField}>
                        <PhoneInput
                          value={'+' + this.state.user['phone'].toString()}
                          autoFormat={true}
                          onChangePhoneNumber={(number) => {
                            if (number[0] == '+') {
                              number = number.slice(1)
                            }
                            console.log("PHONE NUMBER", number);
                            let user = this.state.user;
                            user['phone'] = number;
                            this.setState({
                              user: user,
                            });
                          }}
                          onPressConfirm={(data) => {
                            console.log(data)
                          }}
                          ref={(ref) => {
                            this.inputPhone = ref;
                          }}
                        />
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
                  onPress={() => handleSubmit()}
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
import { updateUser } from "../../redux/actions/auth";
import { getNews } from "../../redux/actions/news";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    countries: state.auth.countries,

  };
};
const mapActionsToProps = (dispatch) => ({
  updateUser: bindActionCreators(updateUser, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(EditProfile);

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
    width: "98%",
    marginTop: 15,
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
