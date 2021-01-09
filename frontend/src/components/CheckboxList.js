import React from "react"
import { makeStyles, List } from "@material-ui/core"
import BandListItem from "./BandListItem"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function CheckboxList(props) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([0])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <List className={classes.root}>
      {[0, 1, 2].map((value) => {
        // const labelId = `checkbox-list-label-${value}`
        return (
          <BandListItem
            busRouteColor={props.busRouteColor}
            busRouteNumber={props.busRouteNumber}
            busRouteName={props.busRouteName}
            busRouteVia={props.busRouteVia}
          />
        )
      })}
    </List>
  )
}
