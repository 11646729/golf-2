import React, { Fragment } from "react"
import {
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core"
// import Title from "./Title"

// const useStyles = makeStyles({
//   // polyline1: {
//   //   strokeColor: "#ff2343",
//   //   strokeOpacity: "1.0",
//   //   strokeWeight: 2,
//   // },
// })

export default function SingleRoute() {
  // const classes = useStyles()

  return (
    <Fragment>
      <CssBaseline />
      <Typography />
      <Typography
      component="div"
      display="inline"
      variant="h6"
      color="primary"
      p={1}
      m={1}
    >
      <span role="img">✅</span>
    </Typography>
      <Typography
      component="div"
      display="inline"
      variant="h6"
      color="primary"
      p={1}
      m={1}
    >
      17
    </Typography>
      <Typography
      component="div"
      display="inline"
      variant="h6"
      color="primary"
      p={1}
      m={1}
    >
      San Rafael - Sausalito
    </Typography>
      <Typography
      component="div"
      // display="inline"
      variant="h7"
      color="primary"
      p={1}
      m={1}
    >
      via Strawberry, Mill Valley
    </Typography>
    </Fragment>
  )
}

