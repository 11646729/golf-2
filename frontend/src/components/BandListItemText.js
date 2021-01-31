import React from "react"
import { makeStyles, ListItemText, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  routeNameId: (props) => ({
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 500,
    variant: "caption",
  }),
  routeViaId: (props) => ({
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
