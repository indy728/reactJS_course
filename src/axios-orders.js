import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-45bbe.firebaseio.com/'
})

export default instance
