import React from "react"
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  button: (props) => ({
    maxWidth: "40px",
    maxHeight: "40px",
    minWidth: "40px",
    minHeight: "40px",
    position: "relative",
    color: "#ffffff", // white
    fontSize: "16px",
    title: props.title,
    backgroundColor: props.busRouteColor,
  }),
})

export default function BandButton(props) {
  const classes = useStyles(props)

  return <Button className={classes.button}>{props.busRouteNumber}</Button>
}
