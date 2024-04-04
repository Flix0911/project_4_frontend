// 
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";



function ProtectedRoute({children}) {
    // check someone is authorized before they access the route

    const [ isAuthorized, setIsAuthorized ] = useState(null)

    // useEffect function
    useEffect(() => {
        // call auth function, catch it, and check if setIsAuthorized
        // if true, send to /login
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // refresh the access token automatically to keep someone logged in
    const refreshToken = async () => {
        // get refresh token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            // send request to the backend, with refresh token, to get access token
            const requestURL = `${api.defaults.baseURL}/api/token/refresh/`; // Log the constructed request URL
            console.log('Request URL:', requestURL);
            // send response to the route ~ backend
            const res = await api.post("/api/token/refresh/", {
                // pass that refresh token
                refresh: refreshToken
            });
            // if above is successful ~ we got an access token
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                // state
                setIsAuthorized(true)
            } else {
                // state
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    // auth function to ensure authorized
    const auth = async () => {
        // first look at access token ~ see if we have one -> check if expired -> refresh it
        // if not, send to login
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            // if no token
            setIsAuthorized(false)
        }
        // if you have a functional token
        const decoded = jwtDecode(token)
        // save expiration into a variable
        const tokenExpiration = decoded.exp
        // will return date in seconds
        const now = Date.now() / 1000

        // if it's less than
        if (tokenExpiration < now) {
            // run refreshToken function
            await refreshToken()
        } else {
            // set state of true
            setIsAuthorized(true)
        }

    }

    // check if authorized, if state is not null, check the token
    if (isAuthorized === null){
        return<div>Loading...</div>
    }

    // if isauthorized is true ~ return to /login
    return isAuthorized ? children : <Navigate to="/login"/>
}

// export this out
export default ProtectedRoute