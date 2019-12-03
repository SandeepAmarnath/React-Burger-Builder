import axios from 'axios'


const instance = axios.create({
    baseURL:'https://react-my-burger-a25b2.firebaseio.com/'
});

export default instance;

