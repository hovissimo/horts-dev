import React from "react"
import { AuthContext } from "./AuthContext"
// import {useHistory} from "react-router-dom"

export const Profile = () => { 
  // const history = useHistory();

  return (
    <AuthContext.Consumer>{({authApi, user}) => {
      // if (!user) { history.push('/login') }
      console.log(user)

      return (
        <div className="profile">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )
    }}</AuthContext.Consumer>
  )
}
