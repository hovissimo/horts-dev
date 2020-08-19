import firebase from "@firebase/app"

import { firebaseConfig } from "../config/firebase.js"

try {
  firebase.initializeApp(firebaseConfig)
} catch (error) {
  if (error.code === "app/duplicate-app") {
    // This is a side-effect of hot-reloading in dev, do nothing
  } else {
    throw error
  }
}
