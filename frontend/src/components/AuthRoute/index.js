import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { hasToken } from 'utils/token'

const AuthRoute = ({ children }) => {
  let location = useLocation()
  return hasToken() ? (
    <>{children}</>
  ) : (
    <Navigate replace state={{ from: location }} to="/login" />
  )
}

export default AuthRoute
