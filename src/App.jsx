import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/Notfound"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"

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
    <Header/>
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
      {/* Logout Route */}
      <Route path="/logout" element={<Logout />}/>
      {/* Register */}
      <Route path="/register" element={<RegisterAndLogout />}/>
      {/* WRONG PATH ~ NOT FOUND */}
      <Route path="*" element={<NotFound />}/>

    </Routes>
    </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App
