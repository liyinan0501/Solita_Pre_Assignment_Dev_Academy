import { Navigate, useLocation } from 'react-router-dom'
import { hasToken } from 'utils/token'
import React from 'react'

const AuthRoute = ({ children }) => {
  let location = useLocation()
  return hasToken() ? (
    <>{children}</>
  ) : (
    <Navigate replace state={{ from: location }} to="/login" />
  )
}

export default AuthRoute
