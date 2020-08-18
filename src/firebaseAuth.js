import firebase from "@firebase/app"
import "@firebase/auth"

import { store } from "./store"
import { userActions } from "./features/User/slice"

firebase.auth().onAuthStateChanged(function (firebaseUser) {
  if (firebaseUser) {
    // firebaseUser is a https://firebase.google.com/docs/reference/js/firebase.User
    // User is signed in.
    const user = {
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      id: firebaseUser.uid,
      isAnonymous: firebaseUser.isAnonymous,
    }
    console.log("Signed in: ", user)
    store.dispatch(userActions.userAdded(user))
  } else {
    // User is signed out.
    console.log("Signed out.")
  }
  // ...
})