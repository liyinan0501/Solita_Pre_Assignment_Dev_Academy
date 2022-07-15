import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

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
  )
}

export default App
