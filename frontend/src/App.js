import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

<<<<<<< HEAD
import Login from 'pages/Login'
import Layout from 'pages/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
=======
import AuthRoute from 'components/AuthRoute'

import Login from 'pages/Login'
import Layout from 'pages/Layout'
import Journey from 'pages/Journey'
import Station from 'pages/Station'
import Dashboard from 'pages/Dashboard'
import NotFound from 'pages/NotFound'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes: */}
          <Route
            path="/"
            element={<Navigate to="/home/dashboard" replace />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>

          {/* Auth Routes: */}
          <Route
            path="/home"
            element={
              <AuthRoute>
                <Layout />
              </AuthRoute>
            }
          >
            <Route path="/home/dashboard" element={<Dashboard />}></Route>
            <Route path="/home/journey" element={<Journey />}></Route>
            <Route path="/home/station" element={<Station />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
>>>>>>> frontend
  )
}

export default App
