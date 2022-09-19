import React from "react"
import { makeStyles, ListItemText, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  routeNameId: () => ({
    paddingLeft: "10px",
    fontSize: "14px",
    fontWeight: "400",
    variant: "caption",
  }),
  routeViaId: () => ({
    paddingLeft: "10px",
    fontSize: "12px",
    fontWeight: "50",
  }),
})

export default function BandListItemText(props) {
  const classes = useStyles(props)

  return (
    <ListItemText
      primary={
        <Typography className={classes.routeNameId}>
          {props.routeName}
        </Typography>
      }
      secondary={
        <Typography className={classes.routeViaId}>{props.routeVia}</Typography>
      }
    />
  )
}
