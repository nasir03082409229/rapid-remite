import { calculator, conversion } from "../types";
import axios from "axios";

const API_URL = "https://rapidremit1.herokuapp.com/";

export const getPatnerRates = (instance, from, to, amount) => async (
  dispatch,
  getState
) => {
  if (instance) {
    instance.setState({ loading: true });
    console.log("MY DETAILS", instance, from, to, amount);
  }

  axios
    .get(
      `${API_URL}partnerrate?base_currency=${from}&country_name=${to.currency_code}&amount=${amount}&limit=100&name=`
    )
    .then((res) => {
      console.log("RESPONSE", res);
      if (res.status === 200) {
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
      console.log("RESPONSE ERROR", err.res);
    });
};
