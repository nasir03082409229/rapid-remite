import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Screens from "../screens";
import { Icons, AddButton, Drawer as DrawerComponent } from "../components";
import { TableIcon } from "../../assets";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Instance from "../components/constants/instance";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

class DrawerClass extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        edgeWidth={0}
        drawerStyle={{ width: "90%" }}
        drawerContent={(props) => <DrawerComponent {...props} />}
      >
        <Drawer.Screen name="HomePage" component={MyTabs} />
      </Drawer.Navigator>
    );
  }
}

class CompareNavigation extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Remittance">
        <Stack.Screen
          name="CompareRate"
          component={Screens.CompareRate}
          options={{ headerTitle: "Create an Account", headerShown: false }}
        />
        <Stack.Screen
          name="Compare"
          component={Screens.Compare}
          options={{ headerTitle: "Create an Account", headerShown: false }}
        />
        <Stack.Screen
          name="Remittance"
          component={Screens.Remittance}
          options={{ headerTitle: "Create an Account", headerShown: false }}
        />
        <Stack.Screen
          name="Table"
          component={Screens.Table}
          options={{ headerTitle: "Create an Account", headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

class MyTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          labelStyle: {
            color: "white",
          },
          inactiveBackgroundColor: "black",
          tabStyle: { backgroundColor: "black", borderColor: "black" },
          style: {
            backgroundColor: "black",
            paddingTop: 3,
          },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: "Menu",
            tabBarButton: (props, focused) => {
              return (
                <TouchableHighlight
                  onPress={() => Instance.home.props.navigation.openDrawer()}
                  style={{
                    // width: "100%",
                    // height: "220%",
                    // position: "absolute",
                    marginLeft: 20,
                    marginRight: 10,
                  }}
                >
                  <View>
                    <Icons.MaterialCommunityIcons
                      name="menu"
                      color={"white"}
                      size={26}
                      style={{
                        opacity: focused ? 1 : 0.5,
                        alignSelf: "center",
                        // marginTop: 5,
                      }}
                    />
                    <Text style={{ color: "white", fontSize: 12 }}>Menu</Text>
                  </View>
                </TouchableHighlight>
              );
            },
            // tabBarIcon: ({ color, focused }) => (

            // ),
          }}
          name="Menu"
          component={DrawerComponent}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: "Compare",
            tabBarIcon: ({ color, focused }) => (
              <Icons.MaterialIcons
                name="compare-arrows"
                color={focused ? "white" : "white"}
                size={26}
                style={{ opacity: focused ? 1 : 0.5, alignSelf: "center" }}
              />
            ),
          }}
          name="Remittance"
          component={CompareNavigation}
        />
        <Tab.Screen
          options={{
            showLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <AddButton navigation={this.props.navigation} />
            ),
          }}
          name="Home"
          component={Screens.Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: "Live Rates",
            tabBarIcon: ({ color, focused }) => (
              <Icons.MaterialCommunityIcons
                name="view-compact"
                color={focused ? "white" : "white"}
                size={26}
                style={{ opacity: focused ? 1 : 0.5, alignSelf: "center" }}
              />
            ),
          }}
          name="LiveRates"
          component={Screens.LiveRates}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Calculator",
            tabBarIcon: ({ color, focused }) => (
              <Icons.MaterialIcons
                name="grid-on"
                color={focused ? "white" : "white"}
                size={26}
                style={{
                  opacity: focused ? 1 : 0.5,
                }}
              />
            ),
          }}
          name="Calculator"
          component={Screens.Calculator}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({});

class Navigator extends React.Component {
  componentWillMount() {
    this.props.getCountries();
  }

  render() {
    if (!this.props.countries) {
      return <View />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#f1f1f1" },
          }}
          initialRouteName={
            this.props.user ? "Home" : !this.props.slider ? "Slider" : "Welcome"
          }

        // initialRouteName="Contact"
        >
          <Stack.Screen
            name="ChangePassword"
            component={Screens.ChangePassword}
            options={{ headerTitle: "Change Password", headerShown: false }}
          />
          <Stack.Screen
            name="Slider"
            component={Screens.Slider}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Screens.Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={Screens.SignUp}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Screens.Login}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerClass}
            options={{
              headerTitle: "Dashboard",
              headerShown: false,
              headerStyle: { backgroundColor: "#f1f1f1", headerShown: false },
            }}
          />

          <Stack.Screen
            name="NewsDetails"
            component={Screens.NewsDetails}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          />
          <Stack.Screen
            name="TermsConditions"
            component={Screens.TermsConditions}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={Screens.PrivacyPolicy}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          />
          <Stack.Screen
            name="Contact"
            component={Screens.Contact}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          />

          <Stack.Screen
            name="NotificationSet"
            component={Screens.NotificationSet}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Screens.Profile}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={Screens.EditProfile}
            options={{ headerTitle: "Edit Profile", headerShown: false }}
          />
          {/* <Stack.Screen
            name="Remittance"
            component={Screens.Remittance}
            options={{ headerTitle: "Create an Account", headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { skipSlider } from "../redux/actions/auth";
import { Row, Col } from "native-base";
import { getCountries } from "../redux/actions/flags";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    countries: state.auth.countries,
    slider: state.auth.slider,
  };
};
const mapActionsToProps = (dispatch) => ({
  skipSlider: bindActionCreators(skipSlider, dispatch),
  getCountries: bindActionCreators(getCountries, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Navigator);
