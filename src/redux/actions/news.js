
import { flags } from '../types'
import axios from 'axios'


const API_URL = "https://rapidremit1.herokuapp.com/";



export const getNews = (instance) => async (dispatch, getState) => {
    axios.get(API_URL + `news/`).then((res) => {
        if (res.status === 200) {
            console.log("getNews RESPONSE", res);
            if (instance) {
                instance.setState({
                    news: res.data
                })
            }
        }
    }).catch((res) => {
        console.log("getNews ERROR", res)
    })
}