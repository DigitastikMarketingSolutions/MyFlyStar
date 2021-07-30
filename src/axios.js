import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://myflystar.herokuapp.com/' //   The API (cloud function) URL
    // baseURL: 'http://localhost:5000/'
});

export default instance