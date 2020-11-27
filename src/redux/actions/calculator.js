import { calculator } from '../types'
import axios from 'axios'


const API_URL = "https://rapidremit1.herokuapp.com/";


export const getConversion = (instance, from, to, amount) => async (dispatch, getState) => {
  console.log("PAYLOAD GATHER getConversion", from, to, amount);
  instance.setState({
    loading: true
  });
  axios
    .post(`${API_URL}convert`, {
      from: from,
      to: to,
      amount: amount
    })
    .then(response => {
      console.log("PAYLOAD GATHER getConversion", response.data);
      if (response.status === 200) {
        if (instance) {
          instance.setState({
            rate: response.data.rate,
            value: response.data.value,
            base: from,
            to: to,
            amount_check: amount
          })
        }
        instance.setState({
          loading: false
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
}