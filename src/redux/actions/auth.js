import { auth } from "../types";
import axios from "axios";
import { CommonActions } from "@react-navigation/native";

const API_URL = "https://rapidremit1.herokuapp.com/";

export const instanceLoadingState = (instance, isLoading) => async (
  dispatch,
  getState
) => {
  if (instance) {
    instance.setState({
      loading: isLoading,
    });
  }
};

export const skipSlider = () => async (dispatch, getState) => {
  dispatch({
    type: auth.SKIP_SLIDER,
    payload: true,
  });
};

export const signIn = (instance, credentials) => async (dispatch, getState) => {
  dispatch(instanceLoadingState(instance, true));

  axios
    .post(API_URL + `users/login`, credentials)
    .then((res) => {
      if (res.status === 200) {
        console.log("signIn RESPONSE", res);
        console.log("signIn RESPONSE", res.data);
        // alert("LOGIN SUCCCESSFUL")
        dispatch({
          type: auth.AUTHENTICATED,
          payload: { token: res.data.token, ...res.data.data },
        });

        if (instance) {
          instance.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          );
        }
      }
      dispatch(instanceLoadingState(instance, false));
    })
    .catch((err) => {
      alert("Email Password Combination Incorrect");
      console.log("signIn ERR", err);
      dispatch(instanceLoadingState(instance, false));
    });
};

export const signUp = (instance, credentials) => async (dispatch, getState) => {
  dispatch(instanceLoadingState(instance, true));
  console.log('credentials=>', credentials);
  // return;
  axios
    .post(API_URL + `users/signup`, credentials)
    .then((res) => {
      if (res.status === 200) {
        console.log("signUp RESPONSE", res);
        console.log("signUp RESPONSE", res.data);
        dispatch({
          type: auth.AUTHENTICATED,
          payload: { token: res.data.token, ...res.data.data },
        });

        if (instance) {
          instance.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          );
        }
        // alert("signUp SUCCCESSFUL")
      }
      dispatch(instanceLoadingState(instance, false));
    })
    .catch((err) => {
      alert(err.response.data.err || err.response.data.status);
      console.log("signUp ERR", err.response);
      dispatch(instanceLoadingState(instance, false));
    });
};

export const updateUser = (instance, credentials, navigate) => async (
  dispatch,
  getState
) => {
  dispatch(instanceLoadingState(instance, true));

  const user = getState().auth.user;

  axios
    .put(API_URL + `users/${user._id}`, credentials)
    .then((res) => {
      if (res.status === 200) {
        console.log("updateUser RESPONSE", res);
        console.log("updateUser RESPONSE", res.data);
        dispatch({
          type: auth.AUTHENTICATED,
          payload: { token: user.token, ...res.data },
        });

        if (instance) {
          // instance.props.navigation.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [{ name: "Home" }],
          //   })
          // );
          instance.props.navigation.goBack();
        }
        // alert("signUp SUCCCESSFUL")
      }
      dispatch(instanceLoadingState(instance, false));
    })
    .catch((err) => {
      alert("Issues Updating User Information");
      console.log("signUp ERR", err.response);
      dispatch(instanceLoadingState(instance, false));
    });
};

export const getConfig = (instance, key) => async (dispatch, getState) => {
  axios
    .get(API_URL + `superUser/config/` + key)
    .then((res) => {
      console.log("GetCONFIG RESPONSE", res);
      if (res.status === 200) {
        instance.setState({
          loading: false,
          ...res.data.response,
        });
      }
    })
    .catch((err) => {
      console.log("GETCONFIG ERROR", err.response);
    });
};
export const getContactus = (instance, key) => async (dispatch, getState) => {
  axios
    .get(API_URL + `footer`)
    .then((res) => {
      console.log("FOOTER DATA RESPONSE", res);
      if (res.status === 200) {
        if (res.data) {
          if (res.data.length > 0) {
            instance.setState({
              loading: false,
              ...res.data[0],
            });
          }
        }
      }
    })
    .catch((err) => {
      console.log("FOOTER DATA ERROR", err);
    });
};
export const changePassword = (instance, form) => async (
  dispatch,
  getState
) => {
  instance.setState({
    loading: true
  })
  console.log("changePassword", form)
  axios
    .post(API_URL + `users/changepassword`, form)
    .then((res) => {
      console.log("CHANGE PASSWORD RES", res);
      instance.props.navigation.goBack();
      alert("Password Update Success");
      instance.setState({
        loading: false
      })
    })
    .catch((err) => {
      console.log("CHANGE PASSWORD ERR", err.response);
    });
};
