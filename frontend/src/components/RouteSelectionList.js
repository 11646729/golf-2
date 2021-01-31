import React from "react"
import { makeStyles, List, Paper } from "@material-ui/core"
import yellow from "@material-ui/core/colors/yellow"
import BandListItem from "./BandListItem"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding: 0,
  },
  yellowPaper: {
    backgroundColor: yellow[300],
  },
}))

export default function RouteSelectionList(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.yellowPaper}>
        <List>
          <BandListItem
            routeVisible={props.routeVisible}
            routeColor={props.routeColor}
            routeNumber={props.routeNumber}
            routeName={props.routeName}
            routeVia={props.routeVia}
          />
        </List>
      </Paper>
    </div>
  )
}
