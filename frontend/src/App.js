import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import AuthRoute from 'components/AuthRoute'
import { history } from 'utils/history'

import Login from 'pages/Login'
import Layout from 'pages/Layout'
import Journey from 'pages/Journey'
import Station from 'pages/Station'
import Dashboard from 'pages/Dashboard'
import NotFound from 'pages/NotFound'

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/* Public Routes: */}
          <Route path="/" element={<Navigate to="/login" replace />}></Route>
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
      </div>
    </HistoryRouter>
  )
}

export default App
