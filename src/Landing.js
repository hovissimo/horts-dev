import React from "react"

import {AuthContext} from './AuthContext'
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  landing: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
  },
})

export const Landing = ({ children }) => {
  const classes = useStyles()
  return (
    <Container className={classes.landing}>
      <h1>Hello this is the landing page</h1>
      <AuthContext.Consumer>
        {({user}) => (
          <>{user?.displayName} is logged in with id: {user?.id}.</>
        )}
        </AuthContext.Consumer>
    </Container>
  )
}
