import React from "react"
import {useHistory} from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import Drawer from "@material-ui/core/Drawer"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})

const menuItems = [
  {text: 'Horts', path: '/'},
  {text: 'Login', path: '/login'},
  {text: 'Profile', path: '/profile'}
]


export const MenuDrawer = React.forwardRef(({ open, onClose }, ref) => {
  const history = useHistory();

  return (
    <Drawer anchor={"left"} open={open} onClose={onClose} onClick={onClose} onKeyDown={onClose} ref={ref}>
      <List className={useStyles().list}>
        { menuItems.map(({text, path}) =>
          <ListItem button key={text} to={path} onClick={() => history.push(path)}>
          {/* <ListItem button key={text} component={RouterLink} to={path}> */}
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )}
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </List>
    </Drawer>
  )
})