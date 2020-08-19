import React from "react"
import {useHistory} from "react-router-dom"
import {MenuDrawer} from "./MenuDrawer"
import { AuthContext } from "./AuthContext"

import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export const HeaderBar = () => {
  const history = useHistory();
  const classes = useStyles()

  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    if (open === undefined) {
      setDrawerIsOpen(!drawerIsOpen)
    } else {
      setDrawerIsOpen(open)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <MenuDrawer open={drawerIsOpen} onClose={toggleDrawer(false)} />
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <AuthContext.Consumer>
            {({authApi, user}) => {
              const target = !!user ? "profile" : "login";
              return <Button color="inherit" onClick={() => history.push(`/${target}`)}>{target}</Button>
            }}
          </AuthContext.Consumer>
        </Toolbar>
      </AppBar>
    </div>
  )
}
