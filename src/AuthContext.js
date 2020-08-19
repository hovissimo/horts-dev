import React, { useState, createContext, useEffect } from "react"
import firebase from "@firebase/app"
import "@firebase/auth"

// import { store } from "./store"
// import { userActions } from "./features/User/slice"

const authApi = {
  logOut: () => { throw "logOut is not implemented" },
  anonymousLogIn: () => {
    console.log("Trying to log in.")
    firebase.auth().signInAnonymously()
    console.log('seriously')
  },
}

export const AuthContext = createContext({
  user: undefined,
  authApi,
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  
  useEffect(() => {
    const authUnsubscribe = firebase
      .auth()
      .onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          // firebaseUser is a https://firebase.google.com/docs/reference/js/firebase.User
          // User is signed in.
          const user = {
            displayName: firebaseUser.isAnonymous ? "An anonymous mouse" : firebaseUser.displayName,
            email: firebaseUser.email,
            id: firebaseUser.uid,
            isAnonymous: firebaseUser.isAnonymous,
          }
          console.debug("Signed in: ", user)
          setUser(user)
          // store.dispatch(userActions.userAdded(user))
        } else {
          // User is signed out.
          console.debug("Signed out.")
          setUser(undefined)
        }
      })
    console.log("firebase Auth subscribed")

    // clean up: unsub from firebase auth
    return () => authUnsubscribe()
  }, [setUser])

  return (
    <AuthContext.Provider value={{ user, authApi }}>
      {children}
    </AuthContext.Provider>
  )
}
