import React from "react"
import { makeStyles, ListItemText, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  busRouteNameId: (props) => ({
    // marginBottom: 0,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 500,
    variant: "caption",
  }),
  busRouteViaId: (props) => ({
    // textalign: "top",
    // marginTop: 0,
    paddingLeft: 10,
    // paddingTop: 0,
    fontSize: 12,
    fontWeight: 50,
    // variant: "caption",
  }),
})

export default function BandListItemText(props) {
  const classes = useStyles(props)

  return (
    <ListItemText
      primary={props.busRouteName}
      // primary={
      //   <Typography className={classes.busRouteNameId}>
      //     {props.busRouteName}
      //   </Typography>
      // }
      // secondary={
      //   <Typography className={classes.busRouteViaId}>
      //     {props.busRouteVia}
      //   </Typography>
      // }
    />
  )
}
