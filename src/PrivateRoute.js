import React from "react"
import { Route, Redirect } from "react-router-dom"

export function PrivateRoute({ component: Component, authed, ...other }) {
  return (
    <Route
      {...other}
      render={(props) =>
        authed === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
