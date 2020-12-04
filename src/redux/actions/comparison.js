import { calculator, conversion } from "../types";
import axios from "axios";
import GetLocation from 'react-native-get-location'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const API_URL = "https://rapidremit1.herokuapp.com/";

export const getPatnerRates = (instance, from, to, amount) => async (
  dispatch,
  getState
) => {
  if (instance) {
    instance.setState({ loading: true });
    console.log("MY DETAILS", instance, from, to, amount);
  }
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
    .then(data => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          axios
            .get(
              `${API_URL}partnerrate?base_currency=${from}&country_name=${to.currency_code}&amount=${amount}&&latitude=${location.latitude}&longitute=${location.longitude}&limit=100&name=`
            )
            .then((res) => {
              console.log("RESPONSE", res);
              if (res.status === 200) {
                if (res.data == 'No Record Found') {
                  alert(res.data);
                  if (instance) {
                    instance.setState({ loading: false });
                  }
                  return;
                }
                dispatch({
                  type: conversion.CONVERSION_PATNERS,
                  payload: res.data,
                });

                if (instance) {
                  instance.setState({ loading: false });
                  instance.props.navigation.navigate("CompareRate");
                }
              }
            })
            .catch((err) => {
              console.log("RESPONSE ERROR", err);
            });
        })
        .catch(error => {
          console.log("eRROR=?", error);
          alert(error.message)
        })
    })



};
