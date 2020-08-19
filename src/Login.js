import React from "react"
import { Button } from "@material-ui/core"
import { AuthContext } from "./AuthContext"

export const Login = () => {
  return (
    <AuthContext.Consumer>
      {({user}) => {
        if (user) {
          return <p>{user.display_name} is logged in with id: {user.id}</p>
        } else {
          return <p>You are not logged in.</p>
        }
      }}
    </AuthContext.Consumer>
  )
}
