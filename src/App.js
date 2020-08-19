import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import "./firebaseInit"
// import "./firebaseAuth"
import { AuthContext, AuthContextProvider } from "./AuthContext"

import { Landing } from "./Landing"
import { Profile } from "./Profile"
import { HeaderBar } from "./HeaderBar"

import { PrivateRoute } from "./PrivateRoute"
import { Login } from "./Login"

import { Provider } from "react-redux"
import { store } from "./store"

export function App() {
  // const [widgets, setWidgets] = useState([])
  // // const [error, setError] = useState(undefined)

  // useEffect(() => {
  //   const widgetsRef = firebase.database().ref("widgets/")
  //   const updateCallback = (snapshot) =>
  //     setWidgets(Object.values(snapshot.val()))
  //   widgetsRef.on("value", updateCallback)
  //   return () => widgetsRef.off("value", updateCallback)
  // }, [])

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <HeaderBar />
          <Route exact path="/login" component={Login} />
          <AuthContext.Consumer>
            {({ user }) => (
              <PrivateRoute
                path="/profile"
                authed={!!user}
                component={() => <Profile />}
              />
            )}
          </AuthContext.Consumer>
          <Route exact path="/" component={Landing} />
        </BrowserRouter>
      </Provider>
    </AuthContextProvider>
  )
}
