import React from "react"
import { makeStyles, ListItem } from "@material-ui/core"
import BandButton from "./BandButton"
import BandCheckbox from "./BandCheckbox"
import BandListItemText from "./BandListItemText"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function BandListItem(props) {
  const classes = useStyles(props)

  return (
    <ListItem
      // key={value}
      role={undefined}
      dense
      button
      // onClick={handleToggle(value)}
    >
      <BandCheckbox />
      <BandButton
        busRouteColor={props.busRouteColor}
        busRouteNumber={props.busRouteNumber}
      />
      <BandListItemText
        busRouteName={props.busRouteName}
        busRouteVia={props.busRouteVia}
      />
    </ListItem>
  )
}
