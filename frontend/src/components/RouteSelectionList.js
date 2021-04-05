import React from "react"
import { makeStyles, List, Paper } from "@material-ui/core"
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
}))

function RouteSelectionList(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper>
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

export default RouteSelectionList
