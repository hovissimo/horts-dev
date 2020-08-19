import React from "react"
import {useHistory} from "react-router-dom"
import { Button } from "@material-ui/core"
import { AuthContext } from "./AuthContext"

const NotLoggedIn = ({authApi}) => {
  console.log({authApi})
  return <>
    <p>You are not logged in, <em>yet</em>.</p>
    <p>
      <Button onClick={authApi.anonymouseLogIn}>Log me in anonymously</Button>
    </p>
  </>
}

export const Login = () => {
  const history = useHistory()
  return (
    <AuthContext.Consumer>
      {({user, authApi}) => {
        if (user) {
          history.push('/profile')
          return;
        }

        return <NotLoggedIn authApi={authApi} />
      }}
    </AuthContext.Consumer>
  )
}

