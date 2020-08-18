import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 18,
  },
})

export const WidgetCard = ({ name, price }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>{name}</Typography>$ {price}
      </CardContent>
    </Card>
  )
}

export default WidgetCardDemo = () => (
  <WidgetCard name="Test Widget" price={32.0} />
)
