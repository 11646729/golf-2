import React from "react"
import { makeStyles, ListItemText, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  busRouteNameId: (props) => ({
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 500,
    variant: "caption",
  }),
  busRouteViaId: (props) => ({
    paddingLeft: 10,
    fontSize: 12,
    fontWeight: 50,
  }),
})

export default function BandListItemText(props) {
  const classes = useStyles(props)

  return (
    <ListItemText
      primary={
        <Typography className={classes.busRouteNameId}>
          {props.busRouteName}
        </Typography>
      }
      secondary={
        <Typography className={classes.busRouteViaId}>
          {props.busRouteVia}
        </Typography>
      }
    />
  )
}
