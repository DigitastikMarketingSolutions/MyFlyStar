import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://myflystar.herokuapp.com/'     //Production
    // baseURL: 'http://localhost:5000/'    //Development
});

export default instance