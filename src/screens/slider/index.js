import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Container } from "native-base";
import {
  background,
  logo_vertical,
  slide_1,
  slide_2,
  slide_3,
  slide_4,
} from "../../../assets";
import Swiper from "react-native-swiper";
import { Header } from "../../components";

import { CommonActions } from "@react-navigation/native";

class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: [
        {
          heading: "Remittance",
          description:
            "Browse through different remittance provider to find the best fit for you",
          image: slide_1,
        },
        {
          heading: "Live Bulletin",
          description: "Stay connected with the live updates and market trends",
          image: slide_2,
        },
        {
          heading: "Conversions",
          description:
            "Select your desired currency and change the rates accordingly.",
          image: slide_3,
        },
        {
          heading: "Comparison Table",
          description:
            "Compare the results in table,so that could help you even more to decide.",
          image: slide_4,
        },
      ],
    };
  }

  componentWillMount() {
    this.props.skipSlider();
  }

  slide = (slide, index) => {
    return (
      <Container style={styles.slide} key={index}>
        <View style={styles.main}>
          <View>
            <Text style={styles.heading}>{slide.heading}</Text>
          </View>

          <View
            style={{
              marginTop: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>{slide.description}</Text>

            <Image
              style={{ height: 300, width: 300 }}
              resizeMode="contain"
              source={slide.image}
            />
          </View>
        </View>
      </Container>
    );
  };

  render() {
    return (
      <ImageBackground
        source={background}
        style={styles.container}
        resizeMode="stretch"
      >
        <Header />
        <View style={styles.topPanel}>
          <View style={styles.skipCon}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Welcome" }],
                  })
                );
                // this.state.index === 3
                //   ? alert("SKIP")
                //   : this.swiper.scrollBy(1);
              }}
            >
              <Text style={{ color: "#E8041D" }}>SKIP</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Swiper
          onIndexChanged={(index) => {
            this.setState({
              index: index,
            });
          }}
          ref={(ref) => (this.swiper = ref)}
          dot={<View style={[styles.dot, { backgroundColor: "#252525" }]} />}
          activeDot={<View style={styles.dot} />}
          buttonWrapperStyle={{ opacity: 0 }}
          horizontal
          loop={false}
          showsButtons={false}
          dots={true}
          style={styles.wrapper}
          showsButtons={true}
        >
          {this.state.slides.map((slide, index) => {
            return this.slide(slide, index);
          })}
        </Swiper>
      </ImageBackground>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { skipSlider } from "../../redux/actions/auth";
import { Row, Col } from "native-base";

const mapStateToProps = (state) => {
  return {
    slider: state.auth.slider,
  };
};
const mapActionsToProps = (dispatch) => ({
  skipSlider: bindActionCreators(skipSlider, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Splash);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: { width: 180, height: 180 },
  wrapper: {},
  main: {
    alignSelf: "center",
    width: "90%",
    height: 400,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#2b2b2b",
  },
  slide: { justifyContent: "center" },
  text: {
    fontSize: 16,
    color: "#2b2b2b",
    marginTop: 10,
  },
  dot: {
    backgroundColor: "#E8041D",
    width: 10,
    height: 10,
    borderRadius: 6,
    marginLeft: 3,
    marginRight: 3,
    marginTop: -40,
    marginBottom: 3,
  },
  topPanel: { height: 40, width: "100%", alignItems: "flex-end" },
  skipCon: {
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
