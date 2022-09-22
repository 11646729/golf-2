import React from "react"
import PropTypes from "prop-types"
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  button: (props) => ({
    maxWidth: "40px",
    maxHeight: "30px",
    minWidth: "40px",
    minHeight: "30px",
    position: "relative",
    // color: "white",
    color: "#000000", // props.textColor ?
    fontSize: "14px",
    title: props.title,
    backgroundColor: `#${props.routeColor}`, // A fudge because database doesn't contain the hash
    // backgroundColor: "#ff0000",
  }),
})

export default function BandButton(props) {
  const classes = useStyles(props)
  const { routeNumber } = props
  BandButton.propTypes = {
    routeNumber: PropTypes.string,
  }

  return <Button className={classes.button}>{routeNumber}</Button>
}
