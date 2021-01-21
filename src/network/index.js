import axios from 'axios'
let isPro = process.env.NODE_ENV == 'production'

const baseURL = isPro?'http://localhost:9090':'back/'
const back = axios.create({
    baseURL,
    headers: {
        contentType : "application/json;charset=UTF-8"
    }
})
back.defaults.withCredentials = true
export default back