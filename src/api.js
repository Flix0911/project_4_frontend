// will add correct headers
// axios is a clean way to send network request
// intercepter will check if you have an access token

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    // allows to import anything inside an environment variable file
    // CHANGE TO HOSTED ONCE READY
    baseURL: `${import.meta.env.VITE_API_URL}/api/`
})

api.interceptors.request.use(
    (config) => {
        // look in local storage and see if there is an access token
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            // pass the JWT 
            // create authorization header
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        // handle the error
        return Promise.reject(error)
    }
)

export default api