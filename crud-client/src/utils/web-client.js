import axios from 'axios'

const devLocalBaseURL = 'http://localhost:9000'

const WebClient = axios.create({
    baseURL : devLocalBaseURL
})

export default WebClient