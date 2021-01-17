import React, { useState } from "react"
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
  item: {
    padding: 0,
  },
}))

export default function BandListItem(props) {
  const classes = useStyles(props)

  const [checkboxSelected, setCheckbox] = useState(false)

  const handleListItemClick = (event, index) => {
    // TODO flip-flop next line
    setCheckbox(true)
    console.log(index)
  }

  return (
    <ListItem
      button
      classes={{ root: classes.item }}
      onClick={(event) => handleListItemClick(event, props.busRouteNumber)}
    >
      <BandCheckbox checked={checkboxSelected} />
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
