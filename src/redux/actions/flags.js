import { flags } from '../types'
import axios from 'axios'


const API_URL = "https://rapidremit1.herokuapp.com/";

export const getCountries = (base) => async (dispatch, getState) => {
    console.log("getCountries RESPONSE");
    // const base  = "USD";
    // alert(base)
    if (!base) {
        if (getState().auth.country_selected) {
            base = getState().auth.country_selected.currency_code;
        } else {
            base = "USD";
        }
    }

    axios.get(API_URL + `liveRates/?base=${base}`).then((res) => {
        if (res.status === 200) {
            console.log("getCountries RESPONSE", res);
            dispatch({
                type: flags.COUNTRIES,
                payload: res.data
            })
        }
    }).catch((err) => {
        alert("Something Went Wrong Please Retry");
        console.log("getCountries ERR", err.response)
    })
}

export const selectFlag = (flag) => async (dispatch, getState) => {
    console.log('flag=>', flag)
    dispatch({
        type: flags.SELECTED_FLAG,
        payload: flag
    })

    dispatch(getCountries(flag.currency_code))
}