import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/Notfound"
import ProtectedRoute from "./components/ProtectedRoute"

// function for logging out
function Logout() {
  // clear token in localStorage
  localStorage.clear()
  // navigate to /login
  return<Navigate to="/login"/>
}

// register and logout ~ make sure localstorage is cleared BEFORE registering
function RegisterAndLogout() {
  // go into localstorage and clear tokens
  localStorage.clear()

  return<Register />
}

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        // You cannot access home, you have to go through the ProtectedRoute
        element={
        <ProtectedRoute>
          <Home />
          {/* ADD SHOW */}
          {/* ADD UPDATE */}
        </ProtectedRoute>
      }
      />
      {/* login route */}
      <Route path="/login" element={<Login />}/>
      {/* Register */}
      <Route path="/register" element={<RegisterAndLogout />}/>
      {/* WRONG PATH ~ NOT FOUND */}
      <Route path="*" element={<NotFound />}/>

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
