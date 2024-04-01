import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

// write in a function for the form
// will work for login, register
function Form({route, method}) {
    // set state for username
    const [ username, setUsername ] = useState("")
    // set state for password
    const [ password, setPassword ] = useState("")
    // set state for loading
    const [ loading, setLoading ] = useState(false)

    // hook for navigate
    const navigate = useNavigate()

    {/* pass the prop ~ if on Login page, show as Login. OR on register, show as Register */}
    const name = method === "login" ? "Login" : "Register";

    // function for handling submit ~ async
    const handleSubmit = async (event) => {
        // when we submit the form
        setLoading(true);
        // as event occurs, prevent page from rerendering
        event.preventDefault()

        // send request to whatever route (login or register)
        try {
            // send request to route passed into the form
            const res = await api.post(route, {username, password})
            // wait till we get it back
            if(method === "login") {
                // queue up localstorage for our tokens ~ and set
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                // send navigate to go to home if the above occurs
                navigate("/")
            // if tokens are not set ~ most likely you were registering so you now need to login
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
            // worked or didn't work, loading will be set to false
        } finally{
            setLoading(false)
        }
    }

    // write the form
    return <form
    onSubmit={handleSubmit}
    // STYLE LATER
    className="form-container">
        {/* Pass prop of name variable */}
        <h1>{name}</h1>
        {/* Input field for username */}
        <input
            className="form-input"
            type="text"
            value={username}
            // take variable event, and will go to state
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            />
        {/* Input field for Password */}
        <input
            className="form-input"
            type="password"
            value={password}
            // take variable event, and will go to state
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            />
            {/* add button */}
            <button
            className="form-button"
            type="submit">
                {/* Will pull name from above */}
                {name}
            </button>
    </form>
}

// export it out
export default Form